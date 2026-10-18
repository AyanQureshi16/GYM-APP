import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store.jsx";

export default function Login() {
  const { user, login, all } = useStore();
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  if (user) return <Navigate to={user.role === "member" ? "/member-app" : "/"} replace />;

  const go = (i, p) => { if (!login(i, p)) setErr("Phone/username ya PIN ghalat hai."); };
  const alimember = all.find((m) => m.name === "Ali Raza");
  const input = "w-full px-3.5 py-3 bg-surface-container-low border border-border-subtle rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-primary";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl">K</div>
          <div><div className="font-display font-bold text-xl text-white">GYM Flow</div><div className="text-xs text-slate-400">Retention SaaS</div></div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); go(id, pin); }} className="flex flex-col gap-3">
          <h1 className="font-display text-2xl font-bold text-white">Login</h1>
          <input className={input} placeholder="Username ya member ka phone number" value={id} onChange={(e) => { setId(e.target.value); setErr(""); }} autoComplete="username" />
          <input className={input} placeholder="PIN" type="password" inputMode="numeric" value={pin} onChange={(e) => { setPin(e.target.value); setErr(""); }} autoComplete="current-password" />
          {err && <p className="text-sm text-rose-400">{err}</p>}
          <button className="py-3 rounded-lg bg-primary hover:bg-teal-500 text-slate-950 font-semibold">Login</button>
        </form>
        <div className="border border-border-subtle rounded-xl p-4 flex flex-col gap-2.5 bg-surface-container-low/60">
          <p className="text-xs text-slate-300">Demo login (PIN sab ka 1234). Asli app mein ye buttons nahi honge.</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => go("owner", "1234")} className="py-2 rounded-lg border border-slate-600 text-slate-200 text-sm hover:border-primary/60">Owner</button>
            <button onClick={() => go("staff", "1234")} className="py-2 rounded-lg border border-slate-600 text-slate-200 text-sm hover:border-primary/60">Staff</button>
            <button onClick={() => go(alimember.phone, "1234")} className="py-2 rounded-lg border border-slate-600 text-slate-200 text-sm hover:border-primary/60">Member</button>
          </div>
        </div>
      </div>
    </div>
  );
}
