import { Link, useOutletContext } from "react-router-dom";
import MemberList from "../components/MemberList.jsx";
import { stats } from "../data.js";
import { useStore } from "../store.jsx";

const card = "bg-surface-container-low border border-border-subtle rounded-xl";

export default function Dashboard() {
  const { query, openWhatsApp, openBroadcast } = useOutletContext();
  const { atRisk: members, all, todayCount, pendingCount, returnedCount, threshold, expiring7, expiring2, user } = useStore();
  const q = query.trim().toLowerCase();
  const list = q ? members.filter((m) => m.name.toLowerCase().includes(q) || m.phone.includes(q)) : members.slice(0, 5);
  const pct = Math.round((todayCount / stats.target) * 100);
  const critical = members.filter((m) => m.risk === "critical").length;

  return (
    <>
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Good morning, {user.name.split(" ")[0]}</h1>
        <p className="text-slate-300">Here's what needs your attention today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className={`${card} p-4 sm:p-6 flex flex-col justify-between`}>
          <span className="text-sm font-medium text-slate-200">Active Members</span>
          <span className="font-display text-4xl font-extrabold text-white my-3">{all.length}</span>
          <span className="text-sm font-medium text-emerald-400 flex items-center gap-1"><span className="material-symbols-outlined text-base">trending_up</span>+12 this month</span>
        </div>
        <div className={`${card} p-4 sm:p-6 flex flex-col justify-between`}>
          <span className="text-sm font-medium text-slate-200">Today's Check-ins</span>
          <span className="font-display text-4xl font-extrabold text-white my-2">{todayCount}</span>
          <div>
            <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden"><div className="bg-primary h-full rounded-full" style={{ width: `${pct}%` }} /></div>
            <p className="mt-2 text-xs font-medium text-slate-300">{todayCount} of {stats.target} target ({pct}%)</p>
          </div>
        </div>
        <div className={`${card} p-4 sm:p-6 flex flex-col justify-between`}>
          <span className="text-sm font-medium text-slate-200">Members Needing Follow-up</span>
          <span className="font-display text-4xl font-extrabold text-amber-400 my-3">{members.length}</span>
          <span className="text-sm font-medium text-amber-400">{threshold}+ days inactive • {critical} critical</span>
        </div>
        <div className={`${card} p-4 sm:p-6 flex flex-col justify-between`}>
          <span className="text-sm font-medium text-slate-200">Memberships Expiring Soon</span>
          <span className="font-display text-4xl font-extrabold text-white my-3">{expiring7}</span>
          <span className="text-sm font-medium text-slate-200">{expiring2} expire in 2 days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className={`${card} lg:col-span-8 overflow-hidden`}>
          <div className="p-4 sm:p-6 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Members Needing Attention</h2>
              <p className="text-sm text-slate-300 mt-0.5">Members with steep drop-offs in their usual gym routine.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/20 text-rose-400 text-[13px] font-semibold">
              {q ? `${list.length} found` : `${list.length} of ${members.length} shown`}
            </span>
          </div>
          <MemberList items={list} onContact={openWhatsApp} />
          <div className="p-4 bg-surface-container/40 border-t border-border-subtle text-center">
            <Link to="/at-risk" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View All {members.length} At-Risk Members <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className={`${card} p-6 flex flex-col gap-5`}>
            <h2 className="font-display text-lg font-bold text-white">Today's Follow-ups</h2>
            <div>
              <span className="font-display text-3xl font-extrabold text-white">{pendingCount} Pending</span>
              <p className="text-sm text-slate-200">Scheduled for contact today</p>
            </div>
            <div className="p-3.5 rounded-lg bg-surface-container border border-border-subtle text-sm text-slate-300">
              <span className="text-emerald-400 font-semibold">{returnedCount} members</span> follow-up ke baad gym wapas aaye.
            </div>
            <Link to="/follow-ups" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-surface-container text-white text-sm font-semibold border border-border-subtle">
              View Follow-up Queue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className={`${card} p-6 flex flex-col gap-4`}>
            <div className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined text-[20px]">bolt</span><span className="font-display text-sm font-bold">Quick Action</span></div>
            <h3 className="font-display font-semibold text-white">Send Daily Habit Nudge</h3>
            <p className="text-sm text-slate-300">Dispatch personalized WhatsApp messages to all members who missed their 3-day workout routine.</p>
            <button onClick={openBroadcast} className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-teal-500 text-slate-950 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-400">
              <span className="material-symbols-outlined text-[18px]">send</span>Send to {members.length} members
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
