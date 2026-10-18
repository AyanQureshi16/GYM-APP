import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import QrScanner from "../components/QrScanner.jsx";
import { useStore } from "../store.jsx";

export default function Attendance() {
  const { query, showToast } = useOutletContext();
  const [scanning, setScanning] = useState(false);
  const { all, checkIn, todayCount } = useStore();
  const q = query.trim().toLowerCase();
  const notYet = all.filter((m) => !m.today && (!q || m.name.toLowerCase().includes(q) || m.phone.includes(q)));
  const today = all.filter((m) => m.today);

  const doCheckIn = (m, via) => {
    const r = checkIn(m.id);
    showToast(r === "duplicate" ? `${m.name} aaj pehle hi check in kar chuka hai.` : r === "returned" ? `${m.name} wapas aa gaya! Follow-up "Returned" mark ho gaya.` : `${via}: ${m.name} ka check-in ho gaya.`);
  };
  const handleCode = (text) => {
    const [tag, gym, id] = text.split(":");
    const m = tag === "KATH" && gym === "g1" ? all.find((x) => x.id === Number(id)) : null;
    if (!m) return showToast("Invalid QR: ye K-Athletic member ka QR nahi hai.");
    doCheckIn(m, "QR scan");
  };
  const simulateScan = () => {
    const pool = all.filter((m) => !m.today);
    if (pool.length) doCheckIn(pool[Math.floor(Math.random() * pool.length)], "QR scan");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <section className="lg:col-span-7 bg-surface-container-low border border-border-subtle rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border-subtle flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Check-in</h1>
            <p className="text-sm text-slate-300 mt-0.5">QR kaam na kare to staff yahan se manual check-in karta hai.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
          <button onClick={() => setScanning((s) => !s)} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary hover:bg-teal-500 text-slate-950 text-sm font-semibold shrink-0">
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>{scanning ? "Stop camera" : "Scan with camera"}
          </button>
          <button onClick={simulateScan} className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm font-medium shrink-0">
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>Simulate scan
          </button>
          </div>
        </div>
        {scanning && (
          <div className="p-4 border-b border-border-subtle">
            <QrScanner onCode={handleCode} onError={(msg) => { showToast(msg); setScanning(false); }} />
          </div>
        )}
        <div className="divide-y divide-border-subtle lg:max-h-[560px] lg:overflow-y-auto">
          {notYet.map((m) => (
            <div key={m.id} className="px-6 py-3.5 flex items-center justify-between gap-3 hover:bg-slate-800/40">
              <div>
                <div className="font-semibold text-white text-[15px]">{m.name}</div>
                <div className="text-xs text-slate-400">Last visit: {m.days} days ago</div>
              </div>
              <button onClick={() => doCheckIn(m, "Manual")} className="px-3.5 py-2 rounded-lg border border-slate-600 hover:border-primary/60 hover:bg-surface-container text-slate-200 text-sm font-medium">Check in</button>
            </div>
          ))}
          {!notYet.length && <p className="p-6 text-sm text-slate-300">Sab members check in kar chuke hain.</p>}
        </div>
      </section>

      <section className="lg:col-span-5 bg-surface-container-low border border-border-subtle rounded-xl p-6 flex flex-col gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-white">Aaj ki attendance</h2>
          <p className="text-sm text-slate-300">{todayCount} members aaj aa chuke hain.</p>
        </div>
        <div className="flex flex-col gap-2">
          {today.map((m) => (
            <div key={m.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-container text-sm text-slate-200">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>{m.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
