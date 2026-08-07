import { Link } from "react-router-dom";

export default function Breadcrumb({ trail }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs font-semibold text-ink-700">
      <Link to="/dashboard" className="transition-colors hover:text-brass">
        Dashboard
      </Link>
      {trail.map((crumb, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            <span className="text-ink-500">›</span>
            {isLast || !crumb.to ? (
              <span className="text-ink-900">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.to}
                className="transition-colors hover:text-brass"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
