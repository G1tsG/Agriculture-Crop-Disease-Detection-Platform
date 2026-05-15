import { useState } from "react";
import Navbar from "./components/common/Navbar";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import "./styles/global.css";

export default function App() {
  const [resultData, setResultData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleResult = (data) => {
    setResultData(data);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setResultData(null);
  };

  return (
    <div className="app">
      <Navbar />
      {!showResults ? (
        <UploadPage onResult={handleResult} />
      ) : (
        resultData && <ResultsPage data={resultData} onBack={handleBack} />
      )}
    </div>
  );
}