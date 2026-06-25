import { motion } from "framer-motion";
import { Upload, MessageSquareText, BarChart3 } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={40} />,
      title: "Upload Resume",
      desc: "Upload your resume and let AI analyze your skills and experience.",
    },
    {
      icon: <MessageSquareText size={40} />,
      title: "Practice Interview",
      desc: "Get personalized interview questions based on your profile.",
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Get Feedback",
      desc: "Receive detailed scores, insights and improvement suggestions.",
    },
  ];

  return (
    <section className="bg-slate-900 py-28">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Prepare for interviews in just three simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 hover:border-blue-500 transition"
            >
              <div className="mb-6 text-blue-500">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-slate-400">
                {step.desc}
              </p>

              <div className="mt-6 text-blue-500 font-bold text-lg">
                0{index + 1}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;