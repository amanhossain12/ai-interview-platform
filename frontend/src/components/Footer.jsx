function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Interview<span className="text-blue-500">AI</span>
            </h2>

            <p className="mt-4 text-slate-400">
              AI-powered interview preparation platform.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">
              Product
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>Dashboard</li>
              <li>Resume Analysis</li>
              <li>Mock Interview</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">
              Resources
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>Blog</li>
              <li>Documentation</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4 font-semibold">
              Newsletter
            </h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-3 text-white"
            />
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
          © 2026 By Aman InterviewAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;