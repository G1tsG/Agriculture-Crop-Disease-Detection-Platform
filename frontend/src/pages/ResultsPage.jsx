import DiseaseCard from "../components/results/DiseaseCard";
import SymptomsCauses from "../components/results/SymptomsCauses";
import TreatmentSteps from "../components/results/TreatmentSteps";
import FungicidesTable from "../components/results/FungicidesTable";
import ResourcesList from "../components/results/ResourcesList";

export default function ResultsPage({ data, onBack }) {
  const { result, image } = data;

  return (
    <div className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="page-tag">Analysis Complete</div>
          <h1 className="page-title">Detection <span>Results</span></h1>
        </div>
        <button className="btn-secondary" onClick={onBack} style={{ marginTop: 8 }}>← New Scan</button>
      </div>

      <div className="results-hero">
        <div className="results-img-wrap">
          <img src={image} alt="Scanned" className="results-img" />
          <div className="results-img-badge">Analyzed sample · {new Date().toLocaleDateString()}</div>
        </div>
        <DiseaseCard result={result} />
      </div>

      <SymptomsCauses symptoms={result.symptoms} causes={result.causes} />
      <TreatmentSteps treatments={result.treatments} />

      <div className="results-grid">
        <FungicidesTable fungicides={result.fungicides} />
        <ResourcesList links={result.links} />
      </div>
    </div>
  );
}