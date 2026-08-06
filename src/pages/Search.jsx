import { useState } from "react";
import { Search as SearchIcon, PackageSearch } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-ink-900">
          Global Search
        </h2>
        <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
          Locate anything across your entire inventory
        </p>
      </div>

      <div className="mb-8 flex w-full items-center rounded-xl border border-ink-900/20 bg-white px-4 py-3 shadow-sm focus-within:border-brass focus-within:ring-4 focus-within:ring-brass-light">
        <SearchIcon size={20} className="text-ink-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by tag code (e.g., CN-102) or item name..."
          className="ml-3 w-full bg-transparent font-sans text-[15px] text-ink-900 placeholder-ink-500 outline-none"
        />
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-900/20 py-24 text-center">
        <PackageSearch size={56} className="mb-5 text-ink-500/40" />
        <p className="font-sans text-lg font-semibold text-ink-900">
          Advanced Search Coming Soon
        </p>
        <p className="mt-1 font-sans text-sm text-ink-700">
          Full-text search API is currently in development.
        </p>
      </div>
    </div>
  );
}
