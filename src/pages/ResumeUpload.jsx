import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a resume first");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://ai-interview-platform-l487.onrender.com/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      console.log("Resume Analysis");
      console.log(data);

      setAnalysis(data);

      localStorage.setItem(
        "generatedQuestions",
        JSON.stringify(data.questions || [])
      );

      localStorage.setItem(
        "atsScore",
        data.atsScore
      );

    } catch (error) {

      console.error(error);

      alert(
        "Upload Failed\n\n" +
        error.message
      );

    } finally {

      setLoading(false);

    }

  };  return (
    <>
      <Navbar />

      {/* Loading Overlay */}

      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 w-[420px] text-center">

            <div className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            <h2 className="text-3xl font-bold text-white mt-8">
              AI is analyzing your Resume...
            </h2>

            <p className="text-slate-400 mt-5">
              Reading Resume...
            </p>

            <p className="text-slate-400">
              Extracting Skills...
            </p>

            <p className="text-slate-400">
              Calculating ATS Score...
            </p>

            <p className="text-slate-400">
              Generating Interview Questions...
            </p>

          </div>

        </div>
      )}

      <div className="min-h-screen bg-slate-950 text-white px-6 py-12">

        <div className="max-w-6xl mx-auto">

          {/* Header */}

          <div className="text-center mb-12">

            <h1 className="text-5xl font-bold">
              Resume Analysis
            </h1>

            <p className="text-slate-400 mt-4 text-lg">
              Upload your resume and get AI-powered insights
            </p>

          </div>

          {/* Upload Card */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

            <div className="border-2 border-dashed border-blue-500 rounded-3xl p-12 text-center">

              <div className="text-7xl">
                📄
              </div>

              <h2 className="text-3xl font-bold mt-5">
                Upload Your Resume
              </h2>

              <p className="text-slate-400 mt-3">
                PDF Resume Supported
              </p>

              <input
                id="resume"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label
                htmlFor="resume"
                className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold cursor-pointer"
              >
                Choose Resume
              </label>

            </div>

            {file && (

              <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">

                <h3 className="text-green-400 font-semibold">
                  Selected File
                </h3>

                <p className="mt-2">
                  {file.name}
                </p>

                <p className="text-sm text-slate-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>

              </div>

            )}

            <div className="flex justify-center mt-8">

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition rounded-xl px-10 py-4 font-semibold flex items-center gap-3 min-w-[240px] justify-center"
              >

                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  "Analyze Resume"
                )}

              </button>

            </div>

          </div>

          {/* ===== Analysis Section ===== */}

          {analysis && ( 
            <div className="mt-10">

              {/* Stats */}

              <div className="grid md:grid-cols-3 gap-6">

                {/* ATS Score */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center">

                  <h3 className="text-xl font-semibold">
                    ATS Score
                  </h3>

                  <div className="mt-6 w-36 h-36 rounded-full border-[10px] border-green-500 flex items-center justify-center">

                    <span className="text-4xl font-bold text-green-400">
                      {analysis.atsScore}%
                    </span>

                  </div>

                </div>

                {/* Skills */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <h3 className="text-xl font-semibold mb-5">
                    Skills Found
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {Array.isArray(analysis.skills) &&
                      analysis.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 border border-blue-500 text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                  </div>

                </div>

                {/* Missing Skills */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                  <h3 className="text-xl font-semibold mb-5">
                    Missing Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {Array.isArray(analysis.missingSkills) &&
                      analysis.missingSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}

                  </div>

                </div>

              </div>

              {/* AI Feedback */}

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

                <h2 className="text-2xl font-bold mb-6">
                  🤖 AI Feedback
                </h2>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-h-[350px] overflow-y-auto whitespace-pre-wrap leading-8 text-slate-300">

                  {analysis.feedback}

                </div>

              </div>

              {/* Interview Questions */}

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

                <h2 className="text-2xl font-bold mb-6">
                  AI Generated Interview Questions
                </h2>

                <div className="space-y-4">

                  {Array.isArray(analysis.questions) &&
                    analysis.questions.map((question, index) => (

                      <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-2xl p-5"
                      >

                        <span className="text-blue-400 font-bold">
                          Question {index + 1}
                        </span>

                        <p className="mt-2 text-slate-300">
                          {question}
                        </p>

                      </div>

                    ))}

                </div>

              </div>

              {/* Start Interview */}

              <div className="text-center mt-10">

                <button
                  onClick={() => navigate("/interview")}
                  className="bg-green-600 hover:bg-green-700 transition px-10 py-4 rounded-xl font-semibold text-white shadow-lg"
                >
                  🚀 Start AI Interview
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </>

  );

}

export default ResumeUpload;