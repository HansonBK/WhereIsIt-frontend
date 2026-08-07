import { ChevronRight, Edit2, Trash2 } from "lucide-react";

export default function EntityCard({
  title,
  subtitle,
  code,
  icon: Icon,
  onClick,
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-2xl border border-ink-900/10 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-card-hover cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-ink-900/5 text-ink-900 transition-colors duration-300 group-hover:bg-brass group-hover:text-white">
            {Icon && <Icon size={24} />}
          </div>

          <div className="min-w-0">
            {code && (
              <div className="mb-1 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#A8763A_55%,#7c5722_100%)]" />
                <span className="font-mono text-[10.5px] font-semibold tracking-wide text-brass">
                  {code}
                </span>
              </div>
            )}
            <h3 className="truncate font-display text-lg font-bold text-ink-900 transition-colors group-hover:text-brass sm:text-xl">
              {title}
            </h3>
            <p className="truncate font-sans text-xs text-ink-700 sm:text-sm">
              {subtitle}
            </p>
          </div>
        </div>

        <ChevronRight
          size={20}
          className="shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 group-hover:text-brass"
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink-900/5 pt-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">
          View Details
        </span>

        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onEdit}
            title="Edit"
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-ink-600 transition hover:bg-ink-900/5 hover:text-brass"
          >
            <Edit2 size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-ink-600 transition hover:bg-clay/10 hover:text-clay"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
