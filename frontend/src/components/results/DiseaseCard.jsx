import { useEffect, useState } from "react";
import { WarningIcon } from "../../assets/icons";

export default function DiseaseCard({ result }) {
  const safeResult = result || {};
  const [confAnim, setConfAnim] = useState(0);
  useEffect(() => {
    setTimeout(() => setConfAnim(safeResult.confidence || 0), 100);
  }, [safeResult.confidence]);

  const severity = String(safeResult?.severity || "Medium");
  const severityClass = `severity-${severity.toLowerCase()}`;
  const diseaseName = safeResult?.disease || "Unknown disease";
  const scientificName = safeResult?.scientificName || "N/A";
  const confidence = safeResult?.confidence ?? 0;
  const crop = safeResult?.crop || "Unknown";
  const pathogen = safeResult?.pathogen || "Unknown";

  return (
    <div className="disease-card">
      <div className={`disease-severity ${severityClass}`}>
        <WarningIcon />
        {severity} Severity
      </div>
      <div>
        <div className="disease-name">{diseaseName}</div>
        <div className="disease-scientific">{scientificName}</div>
      </div>

      <div className="confidence-section">
        <div className="conf-label">
          <div className="conf-title">AI Confidence</div>
          <div className="conf-val">{confidence}%</div>
        </div>
        <div className="conf-bar-bg">
          <div className="conf-bar-fill" style={{ width: `${confAnim}%` }} />
        </div>
      </div>

      <div className="disease-meta">
        <div className="meta-chip">
          <div>
            <div className="meta-chip-label">Crop</div>
            <div className="meta-chip-val">{crop}</div>
          </div>
        </div>
        <div className="meta-chip">
          <div>
            <div className="meta-chip-label">Pathogen</div>
            <div className="meta-chip-val" style={{ fontSize: 12 }}>{pathogen}</div>
          </div>
        </div>
        <div className="meta-chip">
          <div>
            <div className="meta-chip-label">Action</div>
            <div className="meta-chip-val" style={{ color: "var(--red)", fontSize: 12 }}>Immediate</div>
          </div>
        </div>
      </div>
    </div>
  );
}