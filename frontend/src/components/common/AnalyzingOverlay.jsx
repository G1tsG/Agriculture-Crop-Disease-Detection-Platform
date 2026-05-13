import { CheckIcon } from "../../assets/icons";

const STEPS = ["Preprocessing image", "Running AI inference", "Detecting disease markers", "Generating report"];

export default function AnalyzingOverlay({ step }) {
  return (
    <div className="analyzing-overlay">
      <div className="analyzing-ring" />
      <div className="analyzing-text">Analyzing Plant Sample</div>
      <div className="analyzing-sub">Please wait while our AI processes your image</div>
      <div className="analyzing-steps">
        {STEPS.map((s, i) => (
          <div key={i} className={`analyzing-step ${step > i ? "done" : ""}`}>
            <div className={`step-check ${step > i ? "done" : ""}`}>
              {step > i && <CheckIcon />}
            </div>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
