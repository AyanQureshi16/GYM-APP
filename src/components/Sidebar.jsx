import { NavLink } from "react-router-dom";
import { useStore } from "../store.jsx";

const links = [
  { to: "/", icon: "dashboard", label: "Dashboard", end: true },
  { to: "/members", icon: "group", label: "Members" },
  { to: "/attendance", icon: "calendar_month", label: "Attendance" },
  { to: "/at-risk", icon: "warning", label: "At-Risk Members", badge: "risk", badgeCls: "bg-danger/10 text-rose-400" },
  { to: "/follow-ups", icon: "mark_chat_unread", label: "Follow-ups", badge: "fu", badgeCls: "bg-warning/10 text-warning" },
  { to: "/challenges", icon: "trophy", label: "Challenges" },
  { to: "/member-preview", icon: "smartphone", label: "Member App Preview" },
  { to: "/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar({ open, onClose }) {
  const { atRisk, pendingCount, user } = useStore();
  return (
    <>
    {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
    <aside className={`fixed left-0 top-0 h-screen w-64 bg-surface-container-low border-r border-border-subtle z-50 flex flex-col justify-between py-6 px-4 overflow-y-auto transition-transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-lg">K</div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[17px] text-white leading-tight">GYM Flow</span>
            <span className="text-xs text-on-surface-variant font-medium">Retention SaaS</span>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          {links.filter((l) => user.role === "owner" || !["/settings", "/challenges"].includes(l.to)).map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary text-slate-950 font-semibold" : "text-on-surface-variant hover:text-white hover:bg-surface-container font-medium"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">{l.icon}</span>
                <span>{l.label}</span>
              </div>
              {l.badge && <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${l.badgeCls}`}>{l.badge === "risk" ? atRisk.length : pendingCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-container/60 text-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
          <div className="flex flex-col">
            <span className="text-on-surface-variant text-[11px] font-semibold">Active Branch</span>
            <span className="text-white font-medium">Clifton Main, Karachi</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
