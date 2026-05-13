import { LeafIcon, UploadIcon } from "../../assets/icons";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-icon"><LeafIcon /></div>
        PhytoScan AI
      </div>
      <div className="nav-tabs">
        {/* Only Scan tab – Dashboard removed */}
        <button className="nav-tab active">
          <UploadIcon />
          Scan
        </button>
      </div>
    </nav>
  );
}