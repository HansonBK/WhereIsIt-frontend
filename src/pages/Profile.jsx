import { useAuth } from "../context/AuthContext";
import { User, Mail, LogOut } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-ink-900">
          Your Profile
        </h2>
        <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
          Manage your personal information
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-sm">
        <div className="bg-ink-900 px-8 py-10 text-paper">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brass font-mono text-4xl font-bold text-white shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "H"}
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">
                {user?.name || "Hussein Bani Khaled"}
              </h3>
              <p className="font-sans text-paper/70">
                {user?.email || "husseinbanikhaled1@gmail.com"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 max-w-md">
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              Full Name
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-paper/50 px-3.5 py-3">
              <User size={18} className="text-ink-500" />
              <span className="font-sans text-[14.5px] text-ink-900">
                {user?.name || "Hussein Bani Khaled"}
              </span>
            </div>
          </div>

          <div className="mb-8 max-w-md">
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-paper/50 px-3.5 py-3">
              <Mail size={18} className="text-ink-500" />
              <span className="font-sans text-[14.5px] text-ink-900">
                {user?.email || "husseinbanikhaled1@gmail.com"}
              </span>
            </div>
          </div>

          <div className="border-t border-ink-900/10 pt-6">
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg bg-clay px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-card"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
