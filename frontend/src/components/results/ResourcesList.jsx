import { ExternalLinkIcon } from "../../assets/icons";

export default function ResourcesList({ links }) {
  const safeLinks = Array.isArray(links) ? links : [];

  return (
    <div className="r-panel">
      <div className="r-panel-title">External Resources</div>
      <div className="links-list">
        {safeLinks.map((l, i) => (
          <div key={i} className="ext-link" onClick={() => {}}>
            <span>{l?.title || l || "Resource"}</span>
            <span className="ext-link-icon"><ExternalLinkIcon /></span>
          </div>
        ))}
        <div className="ext-link" onClick={() => {}}>
          <span>Download Full Report (PDF)</span>
          <span className="ext-link-icon"><ExternalLinkIcon /></span>
        </div>
      </div>
    </div>
  );
}