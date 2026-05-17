import { ExternalLinkIcon } from "../../assets/icons";

export default function ResourcesList({ links }) {
  const safeLinks = Array.isArray(links) ? links : [];

  const renderHref = (item) => {
    if (!item) return "#";
    if (typeof item === "string") return item;
    return item.url || "#";
  };

  const renderTitle = (item) => {
    if (!item) return "Resource";
    if (typeof item === "string") return item;
    return item.title || item.name || "Resource";
  };

  return (
    <div className="r-panel">
      <div className="r-panel-title">External Resources</div>
      <div className="links-list">
        {safeLinks.map((l, i) => (
          <a
            key={i}
            className="ext-link"
            href={renderHref(l)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{renderTitle(l)}</span>
            <span className="ext-link-icon"><ExternalLinkIcon /></span>
          </a>
        ))}

        <a className="ext-link" href="#" onClick={(e) => e.preventDefault()}>
          <span>Download Full Report (PDF)</span>
          <span className="ext-link-icon"><ExternalLinkIcon /></span>
        </a>
      </div>
    </div>
  );
}