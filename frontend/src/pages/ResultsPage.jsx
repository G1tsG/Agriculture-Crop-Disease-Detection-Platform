import DiseaseCard from "../components/results/DiseaseCard";
import SymptomsCauses from "../components/results/SymptomsCauses";
import TreatmentSteps from "../components/results/TreatmentSteps";
import FungicidesTable from "../components/results/FungicidesTable";
import ResourcesList from "../components/results/ResourcesList";

export default function ResultsPage({ data, onBack }) {
  const { result, image, source } = data;
  const safeResult = result || {};
  const isLivePrediction = source === "actual";
  const sourceLabel = isLivePrediction ? "Live AI prediction" : "Mock fallback result";
  const sourceClass = isLivePrediction ? "results-img-badge-live" : "results-img-badge-mock";

  return (
    <div className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="page-tag">Analysis Complete</div>
          <h1 className="page-title">Detection <span>Results</span></h1>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
          <div className={`results-source-pill ${isLivePrediction ? "results-source-pill-live" : "results-source-pill-mock"}`}>
            {sourceLabel}
          </div>
          <button className="btn-secondary" onClick={onBack}>← New Scan</button>
        </div>
      </div>

      <div className="results-hero">
        <div className="results-img-wrap">
          <img src={image} alt="Scanned" className="results-img" />
          <div className={`results-img-badge ${sourceClass}`}>
            {sourceLabel} · {new Date().toLocaleDateString()}
          </div>
        </div>
        <DiseaseCard result={safeResult} />
      </div>

      <SymptomsCauses symptoms={safeResult.symptoms || []} causes={safeResult.causes || []} />
      <TreatmentSteps treatments={safeResult.treatments || []} />

      <div className="results-grid">
        <FungicidesTable fungicides={safeResult.fungicides || []} />
        <ResourcesList links={safeResult.links || []} />
      </div>
    </div>
  );
}