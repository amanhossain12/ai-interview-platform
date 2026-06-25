import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user");

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden">


      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="container mx-auto px-6">

        <div className="flex min-h-screen flex-col items-center justify-center text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl text-6xl font-bold text-white md:text-7xl"
          >
            Prepare Smarter.
            <br />
            <span className="text-blue-500">
              Get Hired Faster.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 max-w-2xl text-xl text-slate-400"
          >
            Upload your resume, practice AI-powered interviews,
            receive instant feedback and improve your confidence.
          </motion.p>

          <div className="mt-10 flex gap-4">

           <button
  onClick={() => {
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }}
  className="cursor-pointer rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
>
  Start Free
</button>

            <button
              className="rounded-xl border border-slate-700 px-8 py-4 text-white hover:bg-slate-800 transition"
            >
              Watch Demo
            </button>

          </div>

          {/* Dashboard Mockup */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 w-full max-w-5xl"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl">

              <div className="grid md:grid-cols-3 gap-6">

                <div className="rounded-2xl bg-slate-800 p-6">
                  <h3 className="text-slate-400">
                    Interview Score
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-green-400">
                    92%
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-800 p-6">
                  <h3 className="text-slate-400">
                    Resume Score
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-blue-400">
                    88%
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-800 p-6">
                  <h3 className="text-slate-400">
                    Questions Solved
                  </h3>

                  <p className="mt-2 text-4xl font-bold text-purple-400">
                    127
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;