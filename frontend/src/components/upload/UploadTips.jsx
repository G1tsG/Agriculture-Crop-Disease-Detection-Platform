const TIPS = [
  "Ensure good natural lighting — avoid harsh direct sunlight or deep shadows on the leaf.",
  "Focus clearly on the affected area showing visible symptoms like spots, lesions, or discoloration.",
  "Capture the whole leaf plus a close-up of the damaged portion for maximum accuracy.",
  "Avoid blurry images — hold the camera steady and wait for autofocus to lock in.",
  "Clean background preferred — place leaf on a plain surface for cleaner segmentation.",
  "Include multiple leaves if the disease is widespread across the plant canopy.",
];

export default function UploadTips() {
  return (
    <div className="tips-panel">
      <div className="tips-title">Tips for best results</div>
      <div className="tips-grid">
        {TIPS.map((tip, i) => (
          <div key={i} className="tip">
            <div className="tip-dot" />
            <div className="tip-text">{tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}