import { Search, User, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/80 p-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
       
        <Link to="/dashboard" className="flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300">
          <PackageSearch size={28} />
          <span className="text-xl font-bold tracking-wide text-white">WhereIsIt</span>
        </Link>

        
        <div className="hidden w-1/3 items-center rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search all items, spaces..."
            className="ml-2 w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

  
        <div className="flex items-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-slate-300 transition hover:bg-slate-600 hover:text-white">
            <User size={18} />
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;