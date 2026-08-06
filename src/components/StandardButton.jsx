export default function StandardButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-5 py-3 rounded-lg transition hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0";
  const variants = {
    primary: "bg-ink-900 text-paper hover:opacity-90",
    brass: "bg-brass text-white hover:opacity-90",
    ghost:
      "bg-transparent text-ink-900 border border-ink-900/10 hover:bg-ink-900/5",
    danger: "bg-clay text-white hover:opacity-90",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
