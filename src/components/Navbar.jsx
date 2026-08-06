import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-ink-900/10 bg-paper/90 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex shrink-0 items-center justify-center rounded-lg p-2 text-ink-900 transition-colors hover:bg-ink-900/5 md:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex w-full max-w-xl items-center rounded-xl border border-ink-900/15 bg-white px-3 py-2 shadow-xs focus-within:border-brass focus-within:ring-4 focus-within:ring-brass-light">
          <Search size={16} className="shrink-0 text-ink-500" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="ml-2.5 w-full bg-transparent font-sans text-xs text-ink-900 placeholder-ink-500 outline-none sm:text-sm"
          />
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-3">
        <Link
          to="/profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-paper shadow-card transition hover:bg-brass hover:shadow-card-hover sm:h-10 sm:w-10"
        >
          <User size={16} className="sm:h-4.5 sm:w-4.5" />
        </Link>
      </div>
    </nav>
  );
}
