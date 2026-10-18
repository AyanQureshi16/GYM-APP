import { RISK, initials } from "../data.js";

export default function MemberList({ items, onContact }) {
  if (!items.length) return <p className="p-6 text-sm text-slate-300">Koi member nahi mila. Search badal kar dekho.</p>;
  return (
    <div className="divide-y divide-border-subtle">
      {items.map((m) => {
        const critical = m.risk === "critical";
        return (
          <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-surface-container border border-border-subtle flex items-center justify-center font-bold text-sm text-white">{initials(m.name)}</div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-[15px]">{m.name}</span>
                <span className="text-sm text-slate-200 font-medium">Last visit: {m.days} days ago</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
              <span className={`px-3.5 py-1.5 rounded-full border text-[13px] font-semibold ${RISK[m.risk].cls}`}>{RISK[m.risk].label}</span>
              <button
                type="button"
                onClick={() => onContact(m)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                  critical
                    ? "bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold"
                    : "border border-slate-600 hover:border-primary/60 bg-surface-container/60 hover:bg-surface-container text-slate-200 hover:text-white font-medium"
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${critical ? "" : "text-primary"}`}>chat</span>
                <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Contact via WhatsApp</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
