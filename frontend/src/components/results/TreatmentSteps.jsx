export default function TreatmentSteps({ treatments }) {
  const safeTreatments = Array.isArray(treatments) ? treatments : [];

  return (
    <div className="treatment-panel">
      <div className="r-panel-title" style={{ marginBottom: 20 }}>Treatment Protocol</div>
      <div className="treatment-steps">
        {safeTreatments.map((t) => (
          <div key={t.step} className="treatment-step">
            <div className="ts-top">
              <div className="ts-num">0{t.step}</div>
              <div className={`ts-priority ${t.priority}`}>{t.priority}</div>
            </div>
            <div className="ts-action">{t.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}