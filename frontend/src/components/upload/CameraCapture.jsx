import { useRef, useEffect } from "react";
import { CameraIcon } from "../../assets/icons";

export default function CameraCapture({ onCapture, onCancel, isActive }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => alert("Camera access denied or unavailable."));
    } else if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, [isActive]);

  const capture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const url = canvas.toDataURL("image/jpeg");
    onCapture(url);
  };

  if (!isActive) {
    return (
      <div className="camera-panel">
        <div className="weather-bg" />
        <div className="cam-icon"><CameraIcon /></div>
        <div className="cam-title">Live Camera Capture</div>
        <div className="cam-sub">Use device camera to photograph<br />infected leaves directly in field</div>
        <button className="cam-btn" onClick={onCancel}>Open Camera</button>
      </div>
    );
  }

  return (
    <div className="camera-panel">
      <video ref={videoRef} autoPlay playsInline />
      <div className="camera-controls">
        <button className="cam-btn" onClick={capture}>📸 Capture</button>
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}