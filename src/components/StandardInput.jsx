export default function StandardInput({
  label,
  type = "text",
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-sans font-semibold text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3.5 py-3 rounded-lg border bg-white font-sans text-[14.5px] text-ink-900 outline-none transition
          ${error ? "border-clay focus:ring-4 focus:ring-clay-light" : "border-ink-900/10 focus:border-brass focus:ring-4 focus:ring-brass-light"}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-clay font-sans">{error}</p>}
    </div>
  );
}
