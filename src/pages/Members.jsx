import { useOutletContext } from "react-router-dom";
import { useStore } from "../store.jsx";
import { initials, FEE } from "../data.js";

export default function Members() {
  const { query, showToast } = useOutletContext();
  const { all, threshold, followups, addFollowup, markPaid } = useStore();
  const pay = (m) => { markPaid(m.id); showToast(`${m.name} ki fee (PKR ${FEE.toLocaleString()}) paid mark ho gayi.`); };
  const q = query.trim().toLowerCase();
  const list = all.filter((m) => !q || m.name.toLowerCase().includes(q) || m.phone.includes(q));

  const status = (m) =>
    m.days >= threshold ? ["Follow-up suggested", "bg-amber-500/15 text-amber-400"]
    : m.week * 2 <= m.usual ? ["Attendance drop", "bg-orange-500/15 text-orange-400"]
    : ["On track", "bg-emerald-500/15 text-emerald-400"];

  return (
    <section className="bg-surface-container-low border border-border-subtle rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border-subtle">
        <h1 className="font-display text-xl font-bold text-white">Members</h1>
        <p className="text-sm text-slate-300 mt-0.5">{list.length} members. Har member ki routine ke muqable mein is hafte ki visits.</p>
      </div>
      <div className="md:hidden divide-y divide-border-subtle">
        {list.map((m) => {
          const [label, cls] = status(m);
          const onBoard = followups.some((f) => f.memberId === m.id && f.status !== "returned");
          return (
            <div key={m.id} className="p-4 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div><div className="font-semibold text-white">{m.name}</div><div className="text-xs text-slate-400">{m.phone}</div></div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold text-center ${cls}`}>{label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-200">
                <div><div className="text-slate-500">Last visit</div>{m.days === 0 ? "Today" : `${m.days}d ago`}</div>
                <div><div className="text-slate-500">This week</div>{m.week} / {m.usual}</div>
                <div><div className="text-slate-500">Expiry</div><span className={m.expiry <= 7 ? "text-amber-400 font-medium" : ""}>{m.expiry} days</span></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Monthly fee (PKR {FEE.toLocaleString()})</span>
                {m.expiry <= 7
                  ? <button onClick={() => pay(m)} className="px-3 py-1.5 rounded-full font-semibold bg-amber-500/15 text-amber-400">Due: Mark paid</button>
                  : <span className="px-3 py-1.5 rounded-full font-semibold bg-emerald-500/15 text-emerald-400">Paid</span>}
              </div>
              {m.days >= threshold && !onBoard && (
                <button onClick={() => addFollowup(m.id)} className="px-3 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm font-medium">Add to follow-ups</button>
              )}
              {onBoard && <span className="text-xs text-slate-400">On follow-up board</span>}
            </div>
          );
        })}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-300 border-b border-border-subtle">
            <tr>{["Member", "Last visit", "This week / usual", "Expiry", "Fee", "Status", ""].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {list.map((m) => {
              const [label, cls] = status(m);
              const onBoard = followups.some((f) => f.memberId === m.id && f.status !== "returned");
              return (
                <tr key={m.id} className="hover:bg-slate-800/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-surface-container border border-border-subtle flex items-center justify-center text-xs font-bold text-white">{initials(m.name)}</div>
                      <div><div className="font-semibold text-white">{m.name}</div><div className="text-xs text-slate-400">{m.phone}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-200">{m.days === 0 ? "Today" : `${m.days} days ago`}</td>
                  <td className="px-5 py-3 text-slate-200">{m.week} / {m.usual}</td>
                  <td className={`px-5 py-3 ${m.expiry <= 7 ? "text-amber-400 font-medium" : "text-slate-200"}`}>{m.expiry} days</td>
                  <td className="px-5 py-3">
                    {m.expiry <= 7
                      ? <button onClick={() => pay(m)} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 hover:bg-amber-500/25">Due: Mark paid</button>
                      : <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400">Paid</span>}
                  </td>
                  <td className="px-5 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>{label}</span></td>
                  <td className="px-5 py-3 text-right">
                    {m.days >= threshold && !onBoard && (
                      <button onClick={() => addFollowup(m.id)} className="px-3 py-1.5 rounded-lg border border-slate-600 hover:border-primary/60 text-slate-200 text-xs font-medium">Add to follow-ups</button>
                    )}
                    {onBoard && <span className="text-xs text-slate-400">On follow-up board</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
