import { Bell, Shield, CreditCard, Monitor } from "lucide-react";

export default function Settings() {
  const sections = [
    {
      id: "preferences",
      title: "App Preferences",
      icon: Monitor,
      description: "Manage your theme and display settings",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Choose what alerts you receive",
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      description: "Update your password and secure your account",
    },
    {
      id: "billing",
      title: "Billing & Subscription",
      icon: CreditCard,
      description: "Manage your SaaS plan and payment methods",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-ink-900">
          Settings
        </h2>
        <p className="mt-1 font-mono text-sm tracking-wide text-ink-700">
          Manage your application preferences
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="flex cursor-pointer items-start gap-4 rounded-xl border border-ink-900/10 bg-white p-5 shadow-sm transition hover:-translate-y-px hover:border-brass/30 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900/5 text-ink-900 transition-colors">
                <Icon size={24} />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-sans text-base font-semibold text-ink-900">
                  {section.title}
                </h3>
                <p className="font-sans text-sm text-ink-700">
                  {section.description}
                </p>
              </div>
              <div className="pt-2">
                <span className="rounded-full bg-paper px-3 py-1 font-mono text-xs font-semibold text-ink-500">
                  Coming Soon
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
