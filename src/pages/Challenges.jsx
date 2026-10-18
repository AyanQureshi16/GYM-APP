import { useStore } from "../store.jsx";

const GOAL = 12;

export default function Challenges() {
  const { all } = useStore();
  const board = [...all].sort((a, b) => b.month - a.month).slice(0, 8);
  const done = all.filter((m) => m.month >= GOAL).length;
  return (
    <section className="bg-surface-container-low border border-border-subtle rounded-xl overflow-hidden max-w-3xl">
      <div className="p-6 border-b border-border-subtle">
        <h1 className="font-display text-xl font-bold text-white">12 Visits in 30 Days</h1>
        <p className="text-sm text-slate-300 mt-0.5">Optional gym challenge. {done} members goal tak pohanch chuke hain. Members apni progress apne phone par dekhte hain.</p>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {board.map((m, i) => (
          <div key={m.id} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm"><span className="text-white font-medium">{i + 1}. {m.name}</span><span className="text-slate-300">{Math.min(m.month, GOAL)} / {GOAL}</span></div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (m.month / GOAL) * 100)}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
