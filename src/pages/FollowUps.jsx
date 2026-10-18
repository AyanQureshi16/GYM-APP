import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStore } from "../store.jsx";

const cols = [
  { key: "pending", title: "Pending", dot: "bg-amber-400" },
  { key: "contacted", title: "Contacted", dot: "bg-sky-400" },
  { key: "returned", title: "Returned", dot: "bg-emerald-400" },
];

export default function FollowUps() {
  const { openWhatsApp } = useOutletContext();
  const { all, atRisk, followups, updateFollowup, addFollowup } = useStore();
  const [pick, setPick] = useState("");
  const available = atRisk.filter((m) => !followups.some((f) => f.memberId === m.id));
  const memberOf = (id) => all.find((m) => m.id === id);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Follow-up Board</h1>
          <p className="text-slate-300">Kis ko contact karna hai, kis se baat hui, aur kaun wapas aaya.</p>
        </div>
        <div className="flex gap-2">
          <select value={pick} onChange={(e) => setPick(e.target.value)} className="bg-surface-container-low border border-border-subtle rounded-lg text-sm text-white px-3 py-2">
            <option value="">Member chuno...</option>
            {available.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.days}d)</option>)}
          </select>
          <button disabled={!pick} onClick={() => { addFollowup(Number(pick)); setPick(""); }} className="px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-slate-950 text-sm font-semibold">Add</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {cols.map((c) => {
          const items = followups.filter((f) => f.status === c.key);
          return (
            <section key={c.key} className="bg-surface-container-low border border-border-subtle rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                <h2 className="font-display font-bold text-white">{c.title}</h2>
                <span className="text-sm text-slate-400">{items.length}</span>
              </div>
              {items.map((f) => {
                const m = memberOf(f.memberId);
                return (
                  <div key={f.memberId} className="bg-surface-container border border-border-subtle rounded-lg p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-[15px]">{m.name}</span>
                      <span className="text-xs text-slate-400">{m.days === 0 ? "Aaj aaya" : `${m.days}d inactive`}</span>
                    </div>
                    <input value={f.note} onChange={(e) => updateFollowup(f.memberId, { note: e.target.value })} placeholder="Note likho (e.g. kaam ki wajah se busy)"
                      className="w-full px-2.5 py-2 bg-surface border border-border-subtle rounded-md text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary" />
                    <label className="text-xs text-slate-400 flex items-center justify-between gap-2">Agla follow-up
                      <input type="date" value={f.next} onChange={(e) => updateFollowup(f.memberId, { next: e.target.value })} className="bg-surface border border-border-subtle rounded-md px-2 py-1 text-xs text-white" />
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => openWhatsApp(m)} className="flex-1 px-2.5 py-1.5 rounded-md border border-slate-600 hover:border-primary/60 text-slate-200 text-xs font-medium">WhatsApp</button>
                      {c.key === "pending" && <button onClick={() => updateFollowup(f.memberId, { status: "contacted" })} className="flex-1 px-2.5 py-1.5 rounded-md bg-sky-500/20 text-sky-300 text-xs font-semibold">Mark contacted</button>}
                      {c.key === "contacted" && <button onClick={() => updateFollowup(f.memberId, { status: "returned" })} className="flex-1 px-2.5 py-1.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">Mark returned</button>}
                    </div>
                  </div>
                );
              })}
              {!items.length && <p className="text-sm text-slate-400 px-1 pb-1">Abhi koi nahi.</p>}
            </section>
          );
        })}
      </div>
    </>
  );
}
