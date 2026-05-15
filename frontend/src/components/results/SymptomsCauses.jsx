export default function SymptomsCauses({ symptoms, causes }) {
  const safeSymptoms = Array.isArray(symptoms) ? symptoms : [];
  const safeCauses = Array.isArray(causes) ? causes : [];

  return (
    <div className="results-grid">
      <div className="r-panel">
        <div className="r-panel-title">Symptoms Detected</div>
        <div className="symptom-list">
          {safeSymptoms.map((s, i) => (
            <div key={i} className="symptom-item">
              <div className="symptom-dot" />
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="r-panel">
        <div className="r-panel-title">Root Causes</div>
        <div className="cause-list">
          {safeCauses.map((c, i) => (
            <div key={i} className="symptom-item">
              <div className="cause-dot" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}