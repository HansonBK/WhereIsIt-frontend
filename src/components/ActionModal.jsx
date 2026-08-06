import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export default function ActionModal({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  submitText,
  initialData = null,
}) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await onSubmit(formData);
      setFormData({});
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Database rejected the request.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-card-hover animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-ink-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md text-ink-500 transition hover:bg-ink-900/5 hover:text-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-clay/50 bg-clay/10 p-3 text-[13px] font-medium text-clay">
            <AlertCircle size={16} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="mb-1.5 block text-[13px] font-semibold text-ink-700">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-900/10 bg-paper/50 px-3.5 py-3 font-sans text-[14.5px] text-ink-900 outline-none transition-all focus:border-brass focus:ring-4 focus:ring-brass-light"
              />
            </div>
          ))}

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 font-sans text-sm font-semibold text-ink-700 transition hover:bg-ink-900/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`rounded-lg px-5 py-2.5 font-sans text-sm font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(168,118,58,0.4)] disabled:opacity-50 ${
                submitText === "Delete" ? "bg-clay" : "bg-brass"
              }`}
            >
              {isLoading ? "Processing..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
