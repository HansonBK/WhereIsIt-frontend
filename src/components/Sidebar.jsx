import { Link, useLocation } from "react-router-dom";
import { Grid, Search, Settings, PackageSearch, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Grid },
    { name: "Search", path: "/search", icon: Search },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ink-900 p-6 text-paper transition-transform duration-300 ease-in-out md:static md:w-60 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-linear-to-br from-brass to-[#7c5722] p-1.5 shadow-sm">
              <PackageSearch size={22} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              WhereIsIt
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 hover:bg-paper/10 md:hidden"
          >
            <X size={20} className="text-paper/70" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname.includes(item.path) ||
              (item.name === "Dashboard" &&
                (location.pathname.includes("/property") ||
                  location.pathname.includes("/space") ||
                  location.pathname.includes("/container")));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-brass text-white"
                    : "text-paper/65 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/profile"
          onClick={() => setIsOpen(false)}
          className="mt-auto flex items-center gap-3 border-t border-paper/15 pt-5 transition hover:opacity-80"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass font-mono text-xs font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "H"}
          </div>
          <div className="overflow-hidden">
            <span className="block truncate font-sans text-[13px] font-semibold text-paper">
              {user?.name || "Hussein Bani Khaled"}
            </span>
            <span className="block truncate font-sans text-[11.5px] text-paper/55">
              {user?.email || "husseinbanikhaled1@gmail.com"}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
