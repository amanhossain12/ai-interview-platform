import { Brain, FileText, BarChart3 } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <Brain size={40} />,
      title: "AI Mock Interviews",
      desc: "Practice with AI-generated technical and HR questions.",
    },
    {
      icon: <FileText size={40} />,
      title: "Resume Analysis",
      desc: "Get ATS score and personalized resume feedback.",
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Performance Tracking",
      desc: "Track interview scores and monitor progress.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-5xl font-bold text-white mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:scale-105 transition"
            >
              <div className="text-blue-500 mb-4">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;