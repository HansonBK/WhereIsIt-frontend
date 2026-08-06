import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PackageSearch } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-115 shrink-0 flex-col overflow-hidden bg-ink-900 p-12 text-paper md:flex">
        <div className="mb-16 flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md bg-linear-to-br from-brass to-[#7c5722] p-1.5 shadow-sm">
            <PackageSearch size={22} className="text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            WhereIsIt
          </span>
        </div>

        <div className="z-10">
          <h2 className="mb-4 font-display text-3xl font-bold leading-tight">
            Every box, tagged.
            <br />
            Every item, found.
          </h2>
          <p className="max-w-77.5 text-[14.5px] leading-relaxed text-paper/70">
            Track properties, spaces, containers, and items in one searchable
            record — so nothing gets lost in a garage again.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-6%] top-[20%] flex -rotate-6 items-center gap-2 rounded-lg border border-paper/20 bg-paper/10 px-3 py-2">
            <span className="font-mono text-xs font-semibold text-paper/85">
              SP-014
            </span>
          </div>
          <div className="absolute left-[106%] top-[47%] flex rotate-4 items-center gap-2 rounded-lg border border-paper/20 bg-paper/10 px-3 py-2">
            <span className="font-mono text-xs font-semibold text-paper/85">
              CN-102
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-paper p-10">
        <div className="w-full max-w-95">
          <div className="mb-7">
            <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-brass">
              Welcome back
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-900">
              Log in to your account
            </h3>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-clay/50 bg-clay/10 p-3 text-sm text-clay">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="husseinbanikhaled1@gmail.com"
                className="w-full rounded-lg border border-ink-900/10 bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink-900 outline-none transition-all focus:border-brass focus:ring-4 focus:ring-brass-light"
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-ink-900/10 bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink-900 outline-none transition-all focus:border-brass focus:ring-4 focus:ring-brass-light"
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-ink-900 px-5 py-3 font-sans text-sm font-semibold text-paper transition-all hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(22,33,61,0.3)]"
            >
              Log in
            </button>
          </form>

          <div className="mt-8 text-center font-sans text-[13.5px] text-ink-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brass hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
