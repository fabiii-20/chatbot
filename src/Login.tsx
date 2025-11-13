import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "demo@chat.com" && pass === "demo123") {
      localStorage.setItem("auth", "true");
      navigate("/chat");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <div
        className="w-full max-w-sm p-8 rounded-2xl shadow-xl border backdrop-blur"
        style={{
          backgroundColor: "var(--bg-alt)",
          borderColor: "var(--bg-alt)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg border"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--bg-alt)",
            color: "var(--fg)",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg border"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--bg-alt)",
            color: "var(--fg)",
          }}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:shadow-lg transition"
        >
          Login
        </button>

        <p className="text-xs opacity-70 mt-4 text-center">
          Demo: demo@chat.com / demo123
        </p>
      </div>
    </div>
  );
}
