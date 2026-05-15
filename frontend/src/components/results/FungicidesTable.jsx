export default function FungicidesTable({ fungicides }) {
  const safeFungicides = Array.isArray(fungicides) ? fungicides : [];

  return (
    <div className="r-panel">
      <div className="r-panel-title">Recommended Fungicides</div>
      <table className="fungicide-table">
        <thead>
          <tr>
            <th>Fungicide</th>
            <th>Type</th>
            <th>Dose</th>
            <th>Interval</th>
          </tr>
        </thead>
        <tbody>
          {safeFungicides.map((f, i) => (
            <tr key={i}>
              <td style={{ color: "var(--text)", fontWeight: 600 }}>{f?.name || "Unknown"}</td>
              <td><span className={`fung-type ${String(f?.type || "unknown").toLowerCase()}`}>{f?.type || "Unknown"}</span></td>
              <td>{f?.dose || "N/A"}</td>
              <td>{f?.frequency || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}