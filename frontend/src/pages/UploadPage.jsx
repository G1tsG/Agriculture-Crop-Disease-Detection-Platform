import { useState } from "react";
import Dropzone from "../components/upload/Dropzone";
import CameraCapture from "../components/upload/CameraCapture";
import UploadTips from "../components/upload/UploadTips";
import AnalyzingOverlay from "../components/common/AnalyzingOverlay";
import { MicroscopeIcon } from "../assets/icons";
import { MOCK_RESULT } from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Helper function to map MongoDB disease data to frontend format
const mapDatabaseResultToFrontend = (dbData) => {
  const hasDetailedData =
    Array.isArray(dbData.symptoms) ||
    Array.isArray(dbData.causes) ||
    Array.isArray(dbData.treatments) ||
    Array.isArray(dbData.treatment_steps) ||
    Array.isArray(dbData.fungicides) ||
    Array.isArray(dbData.links) ||
    Array.isArray(dbData.useful_links);

  if (!hasDetailedData) {
    return {
      ...MOCK_RESULT,
      disease: dbData.disease || dbData.disease_name || MOCK_RESULT.disease,
      confidence: dbData.confidence ?? MOCK_RESULT.confidence,
      scientificName: dbData.scientificName || dbData.scientific_name || MOCK_RESULT.scientificName,
    };
  }

  return {
    disease: dbData.disease || dbData.disease_name || "Unknown",
    crop: dbData.crop || dbData.plant_name || "Unknown",
    confidence: dbData.confidence || 0,
    severity: dbData.severity || "Medium",
    scientificName: dbData.scientificName || dbData.scientific_name || "N/A",
    symptoms: Array.isArray(dbData.symptoms) ? dbData.symptoms : [],
    causes: Array.isArray(dbData.causes) ? dbData.causes : [],
    treatments: Array.isArray(dbData.treatments)
      ? dbData.treatments.map((step, idx) => ({
          step: step.step || idx + 1,
          action: step.action || step,
          priority: step.priority || "medium",
        }))
      : Array.isArray(dbData.treatment_steps)
      ? dbData.treatment_steps.map((step, idx) => ({
          step: idx + 1,
          action: typeof step === "string" ? step : step.action || step,
          priority: step.priority || "medium",
        }))
      : [],
    fungicides: Array.isArray(dbData.fungicides) ? dbData.fungicides : [],
    links: Array.isArray(dbData.links)
      ? dbData.links
      : Array.isArray(dbData.useful_links)
      ? dbData.useful_links
      : [],
    features: Array.isArray(dbData.features) ? dbData.features : [],
    precautions: Array.isArray(dbData.precautions)
      ? dbData.precautions
      : Array.isArray(dbData.prevention)
      ? dbData.prevention
      : [],
  };
};

export default function UploadPage({ onResult }) {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const analyze = async () => {
    if (!image) {
      return;
    }

    setAnalyzing(true);
    setAnalysisStep(0);

    let diseaseResult = null;
    let predictionSource = "mock";

    try {
      const imageBlob = await fetch(image).then((response) => response.blob());
      const formData = new FormData();
      formData.append("file", imageBlob, "scan.jpg");

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed with ${response.status}`);
      }

      const data = await response.json();
      diseaseResult = data?.prediction || null;
      if (diseaseResult) {
        predictionSource = "actual";
      }
    } catch (error) {
      console.error("Prediction request failed:", error);
    }

    const steps = [600, 1200, 2000, 2800];
    steps.forEach((t, i) => setTimeout(() => setAnalysisStep(i + 1), t));
    await new Promise((r) => setTimeout(r, 3200));

    // Debug: log backend response
    console.log("Disease Result from backend:", diseaseResult);

    // Map the result based on whether it's from database or just model prediction
    const result = diseaseResult
      ? mapDatabaseResultToFrontend(diseaseResult)
      : MOCK_RESULT;

    console.log("Final mapped result:", result);

    setAnalyzing(false);
    onResult({ image, result, source: predictionSource });
  };

  return (
    <div className="page">
      {analyzing && <AnalyzingOverlay step={analysisStep} />}

      <div className="page-header">
        <div className="page-tag">Scan Now</div>
        <h1 className="page-title">Upload <span>Plant Image</span></h1>
        <p className="page-sub">Drag & drop, browse files, or capture with camera</p>
      </div>

      <div className="upload-grid">
        <Dropzone
          image={image}
          onImageChange={setImage}
          dragOver={dragOver}
          setDragOver={setDragOver}
        />

        <CameraCapture
          isActive={cameraActive}
          onCapture={(url) => { setImage(url); setCameraActive(false); }}
          onCancel={() => setCameraActive(!cameraActive)}
        />

        <UploadTips />
      </div>

      <div className="submit-row">
        <button className="btn-analyze" disabled={!image} onClick={analyze}>
          <MicroscopeIcon />
          Analyze Disease — Run AI Scan
        </button>
      </div>
    </div>
  );
}