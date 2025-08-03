import { useState } from "react";
import { Header } from "./components/Header";
import { NewsInputForm } from "./components/NewsInputForm";
import { AnalysisResults } from "./components/AnalysisResults";
import { Alert, AlertDescription } from "./components/ui/alert";
import { AlertCircle } from "lucide-react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async (newsInput, inputType) => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("https://echohub-buster.onrender.com/api/analyze-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newsInput, inputType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Something went wrong on the server."
        );
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setError(err.message || "Failed to analyze news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="space-y-8">
          <NewsInputForm onAnalyze={handleAnalyze} loading={loading} />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {analysisResult && <AnalysisResults result={analysisResult} />}
        </div>
      </div>
    </div>
  );
}

export default App;
