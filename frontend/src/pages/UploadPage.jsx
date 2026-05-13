import { useState } from "react";
import Dropzone from "../components/upload/Dropzone";
import CameraCapture from "../components/upload/CameraCapture";
import UploadTips from "../components/upload/UploadTips";
import AnalyzingOverlay from "../components/common/AnalyzingOverlay";
import { MicroscopeIcon } from "../assets/icons";
import { MOCK_RESULT } from "../data/mockData";

export default function UploadPage({ onResult }) {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);

  const analyze = async () => {
    setAnalyzing(true);
    setAnalysisStep(0);
    const steps = [600, 1200, 2000, 2800];
    steps.forEach((t, i) => setTimeout(() => setAnalysisStep(i + 1), t));
    await new Promise(r => setTimeout(r, 3200));
    setAnalyzing(false);
    onResult({ image, result: MOCK_RESULT });
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