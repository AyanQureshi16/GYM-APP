import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useStore } from "../store.jsx";
import { FEE } from "../data.js";

// preview=true: owner/staff kisi bhi member ka view dekh sakte hain. Asli member sirf apna data dekhta hai.
export default function MemberApp({ memberId, preview = false }) {
  const { all } = useStore();
  const [sel, setSel] = useState(14);
  const m = all.find((x) => x.id === (preview ? sel : memberId));
  const pct = Math.min(100, Math.round((m.week / m.usual) * 100));
  const R = 52, C = 2 * Math.PI * R;
  const due = m.expiry <= 7;
  const msg = m.today ? "Shabash! Aaj ki visit ho gayi." : m.week >= m.usual ? "Is hafte ka goal pura ho gaya!" : `Goal tak ${m.usual - m.week} visits baqi hain. Aap kar sakte ho!`;
  const box = "bg-surface-container-low border border-border-subtle rounded-xl";

  return (
    <div className={preview ? "flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start justify-center" : ""}>
      {preview && (
        <div className="w-full max-w-sm flex flex-col gap-3">
          <h1 className="font-display text-2xl font-bold text-white">Member App Preview</h1>
          <p className="text-slate-300 text-sm">Member apne phone par login karke sirf ye screen dekhta hai. Yahan se tum kisi bhi member ka view dekh sakte ho. QR scan karne ke liye Attendance page kholo.</p>
          <select value={sel} onChange={(e) => setSel(Number(e.target.value))} className="bg-surface-container-low border border-border-subtle rounded-lg text-sm text-white px-3 py-2">
            {all.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </div>
      )}

      <div className={`w-full max-w-[340px] mx-auto bg-surface flex flex-col gap-5 ${preview ? "sm:border-4 sm:border-slate-700 sm:rounded-[36px] sm:p-5 sm:shadow-2xl" : ""}`}>
        <h2 className="font-display text-xl font-bold text-white">Salam, {m.name.split(" ")[0]}</h2>
        <div className={`${box} flex flex-col items-center gap-2 py-5`}>
          <svg width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r={R} fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle cx="65" cy="65" r={R} fill="none" stroke="#14b8a6" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 65 65)" />
            <text x="65" y="65" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="800">{m.week}/{m.usual}</text>
            <text x="65" y="85" textAnchor="middle" fill="#94a3b8" fontSize="11">visits is hafte</text>
          </svg>
          <p className="text-sm text-slate-200 text-center px-4">{msg}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`${box} p-3`}><span className="material-symbols-outlined text-amber-400">local_fire_department</span><div className="text-xl font-bold text-white">{m.streak} din</div><div className="text-xs text-slate-400">Streak</div></div>
          <div className={`${box} p-3`}><span className="material-symbols-outlined text-primary">emoji_events</span><div className="text-xl font-bold text-white">{Math.min(m.month, 12)}/12</div><div className="text-xs text-slate-400">Challenge</div></div>
        </div>
        <div className={`rounded-xl p-3.5 border flex items-center gap-3 ${due ? "bg-amber-500/10 border-amber-500/25" : "bg-emerald-500/10 border-emerald-500/25"}`}>
          <span className={`material-symbols-outlined ${due ? "text-amber-400" : "text-emerald-400"}`}>{due ? "schedule" : "check_circle"}</span>
          <div>
            <div className="text-sm font-semibold text-white">{due ? "Fee due" : "Fee paid"} · PKR {FEE.toLocaleString()}</div>
            <div className="text-xs text-slate-300">{due ? `Membership ${m.expiry} din mein khatam. Reception par fee de dein.` : `Membership ${m.expiry} din tak chalu hai.`}</div>
          </div>
        </div>
        <div className={`${box} p-4 flex flex-col items-center gap-3`}>
          <div className="bg-white p-3 rounded-xl"><QRCodeSVG value={`KATH:g1:${m.id}`} size={150} /></div>
          <p className="text-xs text-slate-300 text-center">Mera check-in QR. Gym ke reception par staff ye scan karega. {m.today ? "Aaj ka check-in ho chuka hai." : ""}</p>
        </div>
      </div>
    </div>
  );
}
