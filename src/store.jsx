import { createContext, useContext, useState } from "react";
import { seedMembers, seedFollowups, riskOf } from "./data.js";

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const readUser = () => { try { return JSON.parse(sessionStorage.getItem("kath_user")); } catch { return null; } };
const saveUser = (u) => { try { u ? sessionStorage.setItem("kath_user", JSON.stringify(u)) : sessionStorage.removeItem("kath_user"); } catch {} };

export function StoreProvider({ children }) {
  const [all, setAll] = useState(seedMembers);
  const [threshold, setThreshold] = useState(6);
  const [followups, setFollowups] = useState(seedFollowups);
  const [user, setUserState] = useState(readUser);
  const setUser = (u) => { setUserState(u); saveUser(u); };

  // DEMO login (sirf frontend). Asli app mein ye backend par hoga: hashed password + token.
  const login = (id, pin) => {
    if (pin !== "1234") return null;
    const key = id.trim().toLowerCase();
    let u = null;
    if (key === "owner") u = { role: "owner", name: "Tariq Alvi" };
    else if (key === "staff") u = { role: "staff", name: "Rizwan" };
    else {
      const digits = key.replace(/\D/g, "");
      const m = digits.length >= 10 && all.find((x) => x.phone.replace(/\D/g, "") === digits);
      if (m) u = { role: "member", name: m.name, memberId: m.id };
    }
    if (u) setUser(u);
    return u;
  };
  const logout = () => setUser(null);

  const upsert = (memberId, patch) =>
    setFollowups((fs) =>
      fs.some((f) => f.memberId === memberId)
        ? fs.map((f) => (f.memberId === memberId ? { ...f, ...patch } : f))
        : [...fs, { memberId, status: "pending", note: "", next: "", ...patch }]
    );

  // Check-in: days reset ho jate hain. Agar follow-up open tha to automatically "Returned" ho jata hai.
  const checkIn = (id) => {
    if (all.find((m) => m.id === id)?.today) return "duplicate";
    const wasOpen = followups.some((f) => f.memberId === id && f.status !== "returned");
    setAll((ms) => ms.map((m) => (m.id === id ? { ...m, days: 0, today: true, week: m.week + 1, month: m.month + 1 } : m)));
    if (wasOpen) upsert(id, { status: "returned" });
    return wasOpen ? "returned" : "ok";
  };

  const markContacted = (id) => {
    const f = followups.find((x) => x.memberId === id);
    if (!f || f.status === "pending") upsert(id, { status: "contacted" });
  };

  const atRisk = all
    .filter((m) => m.days >= threshold)
    .sort((a, b) => b.days - a.days)
    .map((m) => ({ ...m, risk: riskOf(m.days) }));

  const value = {
    user, login, logout, all, atRisk, followups, threshold, setThreshold, checkIn, markContacted,
    // Owner/staff fee receive karke "paid" mark karta hai: membership 30 din aage barh jati hai
    markPaid: (id) => setAll((ms) => ms.map((m) => (m.id === id ? { ...m, expiry: m.expiry + 30 } : m))),
    addFollowup: (id) => upsert(id, {}),
    updateFollowup: upsert,
    todayCount: all.filter((m) => m.today).length,
    pendingCount: followups.filter((f) => f.status === "pending").length,
    returnedCount: followups.filter((f) => f.status === "returned").length,
    expiring7: all.filter((m) => m.expiry <= 7).length,
    expiring2: all.filter((m) => m.expiry <= 2).length,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
