import { useRef } from "react";
import { UploadIcon } from "../../assets/icons";

export default function Dropzone({ image, onImageChange, dragOver, setDragOver }) {
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onImageChange(url);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      className={`dropzone ${dragOver ? "drag-over" : ""} ${image ? "has-image" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {image ? (
        <img src={image} alt="Preview" className="preview-img" />
      ) : (
        <>
          <div className="dz-icon"><UploadIcon /></div>
          <div className="dz-title">Drop your plant image here</div>
          <div className="dz-sub">or click to browse from your device</div>
          <div className="dz-formats">
            {["JPG", "PNG", "WEBP", "HEIC"].map(f => <span key={f} className="dz-format">{f}</span>)}
          </div>
        </>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}