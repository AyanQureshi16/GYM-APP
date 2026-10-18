import { useStore } from "../store.jsx";

export default function Settings() {
  const { threshold, setThreshold, atRisk } = useStore();
  return (
    <section className="bg-surface-container-low border border-border-subtle rounded-xl p-6 max-w-xl flex flex-col gap-5">
      <div>
        <h1 className="font-display text-xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-300">Gym: GYM Flow, Clifton Main, Karachi</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white font-medium text-sm">Kitne din visit na ho to "follow-up suggested" dikhao?</label>
        <div className="flex items-center gap-4">
          <input type="range" min="3" max="14" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="flex-1 accent-teal-500" />
          <span className="font-display text-2xl font-bold text-primary w-16 text-right">{threshold} din</span>
        </div>
        <p className="text-sm text-slate-300">Abhi {atRisk.length} members is list mein hain. Slider hilao, Dashboard foran badal jata hai.</p>
      </div>
    </section>
  );
}
