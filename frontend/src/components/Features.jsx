import {
  Brain,
  FileText,
  BarChart3,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Mock Interviews",
      desc: "Practice with AI-generated technical and HR interview questions.",
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      desc: "Get ATS score and personalized resume feedback instantly.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      desc: "Track your interview progress and score improvements.",
    },
  ];

  return (
    <section className="bg-slate-950 py-32">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-slate-400 mt-4 text-lg">
            Everything you need to crack your next interview.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                rounded-3xl
                border border-slate-800
                bg-slate-900/50
                backdrop-blur-xl
                p-8
                hover:border-blue-500
                hover:-translate-y-2
                transition-all
                duration-300
                "
              >
                <div className="mb-6">
                  <Icon
                    size={42}
                    className="text-blue-500"
                  />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;