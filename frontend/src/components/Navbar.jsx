import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white">
          Interview
          <span className="text-blue-500">AI</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-300">
          <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className="hover:text-white transition"
          >
            Resume
          </Link>

          <Link
            to="/interview"
            className="hover:text-white transition"
          >
            Interview
          </Link>

          <Link
            to="/result"
            className="hover:text-white transition"
          >
            Results
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;