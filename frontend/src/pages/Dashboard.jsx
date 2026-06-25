import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Brain,
  BarChart3,
  Trophy,
  Mic,
  Upload,
} from "lucide-react";

function Dashboard() {
    const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 px-6 py-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <h1 className="text-5xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Track your interview performance and continue improving.
          </p>

          {/* Stats Cards */}
          <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <Trophy className="text-yellow-400" size={40} />
              <h3 className="text-slate-400 mt-4">
                Average Score
              </h3>
              <p className="text-4xl font-bold text-white mt-2">
                92%
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <Brain className="text-blue-400" size={40} />
              <h3 className="text-slate-400 mt-4">
                Interviews Taken
              </h3>
              <p className="text-4xl font-bold text-white mt-2">
                27
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <FileText className="text-green-400" size={40} />
              <h3 className="text-slate-400 mt-4">
                Resume Score
              </h3>
              <p className="text-4xl font-bold text-white mt-2">
                88%
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <BarChart3 className="text-purple-400" size={40} />
              <h3 className="text-slate-400 mt-4">
                Questions Solved
              </h3>
              <p className="text-4xl font-bold text-white mt-2">
                127
              </p>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <Mic size={50} className="text-blue-400" />

              <h2 className="text-2xl font-bold text-white mt-5">
                Start AI Interview
              </h2>

              <p className="text-slate-400 mt-2">
                Practice with AI-generated interview questions and receive instant feedback.
              </p>

              <button
                onClick={() => window.location.href = "/interview"}
                className="mt-6 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white py-4 font-semibold transition"
              >
                Start Interview
              </button>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <Upload size={50} className="text-green-400" />

              <h2 className="text-2xl font-bold text-white mt-5">
                Resume Analysis
              </h2>

              <p className="text-slate-400 mt-2">
                Upload your resume and get AI-powered improvement suggestions.
              </p>

              <button
                onClick={() => window.location.href = "/upload"}
                className="mt-6 w-full rounded-2xl bg-green-600 hover:bg-green-700 text-white py-4 font-semibold transition"
              >
                Analyze Resume
              </button>
            </div>

          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {/* Recent Interviews */}
            <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <h2 className="text-2xl font-bold text-white mb-6">
                Recent Interviews
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between rounded-2xl bg-slate-800 p-4">
                  <div>
                    <h3 className="text-white">
                      React Developer
                    </h3>
                    <p className="text-slate-400 text-sm">
                      June 22, 2026
                    </p>
                  </div>

                  <span className="text-green-400 font-bold">
                    91%
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-800 p-4">
                  <div>
                    <h3 className="text-white">
                      Java Developer
                    </h3>
                    <p className="text-slate-400 text-sm">
                      June 20, 2026
                    </p>
                  </div>

                  <span className="text-blue-400 font-bold">
                    87%
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-800 p-4">
                  <div>
                    <h3 className="text-white">
                      HR Round
                    </h3>
                    <p className="text-slate-400 text-sm">
                      June 18, 2026
                    </p>
                  </div>

                  <span className="text-purple-400 font-bold">
                    94%
                  </span>
                </div>

              </div>

            </div>

            {/* AI Suggestions */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <h2 className="text-2xl font-bold text-white mb-6">
                AI Suggestions
              </h2>

              <ul className="space-y-4 text-slate-300">
                <li>• Improve Data Structures knowledge</li>
                <li>• Practice SQL joins and indexing</li>
                <li>• Work on System Design basics</li>
                <li>• Improve communication confidence</li>
              </ul>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;