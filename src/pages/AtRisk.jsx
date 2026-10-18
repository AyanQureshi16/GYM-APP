import { useOutletContext } from "react-router-dom";
import MemberList from "../components/MemberList.jsx";
import { useStore } from "../store.jsx";

export default function AtRisk() {
  const { query, openWhatsApp } = useOutletContext();
  const { atRisk: members } = useStore();
  const q = query.trim().toLowerCase();
  const list = q ? members.filter((m) => m.name.toLowerCase().includes(q) || m.phone.includes(q)) : members;
  return (
    <section className="bg-surface-container-low border border-border-subtle rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border-subtle">
        <h1 className="font-display text-xl font-bold text-white">At-Risk Members</h1>
        <p className="text-sm text-slate-300 mt-0.5">{list.length} members, sabse zyada inactive pehle.</p>
      </div>
      <MemberList items={list} onContact={openWhatsApp} />
    </section>
  );
}
