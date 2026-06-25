import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Trophy, Brain, Target } from "lucide-react";

function Result() {
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("interviewAnswers");

    if (data) {
      setAnswers(JSON.parse(data));
    }

    const aiFeedback =
      localStorage.getItem("aiFeedback");

    if (aiFeedback) {
      setFeedback(aiFeedback);
    }
  }, []);

  const totalQuestions = answers.length;

  const score = Math.min(
    100,
    totalQuestions * 10 + 20
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold mb-3">
            Interview Result
          </h1>

          <p className="text-slate-400">
            Your interview performance summary
          </p>

          {/* Score Cards */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <Trophy
                size={40}
                className="text-yellow-400"
              />

              <h3 className="text-slate-400 mt-4">
                Overall Score
              </h3>

              <p className="text-4xl font-bold mt-2">
                {score}%
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <Brain
                size={40}
                className="text-blue-400"
              />

              <h3 className="text-slate-400 mt-4">
                Technical Score
              </h3>

              <p className="text-4xl font-bold mt-2">
                85%
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <Target
                size={40}
                className="text-green-400"
              />

              <h3 className="text-slate-400 mt-4">
                Communication
              </h3>

              <p className="text-4xl font-bold mt-2">
                90%
              </p>
            </div>

          </div>

          {/* AI Feedback */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              AI Feedback
            </h2>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
              <p className="text-slate-300 whitespace-pre-wrap">
                {feedback || "Generating AI Feedback..."}
              </p>
            </div>

          </div>

          {/* Answers */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Your Answers
            </h2>

            <div className="space-y-6">

              {answers.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5"
                >
                  <h3 className="font-semibold text-blue-400">
                    Q{index + 1}. {item.question}
                  </h3>

                  <p className="text-slate-300 mt-3">
                    {item.answer || "No Answer"}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Result;