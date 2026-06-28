import { useState } from "react";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
  const response = await fetch(
    "https://ai-interview-platform-l487.onrender.com/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const result = await response.text();

  if (result === "Login Success") {
    alert("Login Success");

    // Dashboard page e redirect
    window.location.href = "/dashboard";
  } else {
    alert("Invalid Credentials");
  }

} catch (error) {
  console.error(error);
  alert("Server Error");
}
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <h2 className="text-4xl font-bold text-center mb-3">
            Login
          </h2>

          <p className="text-center text-slate-400 mb-8">
            Welcome back to InterviewAI
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 mb-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 mb-6 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>

          </form>

        </div>

      </div>
    </>
  );
}
}
export default Login;
