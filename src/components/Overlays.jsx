import { useEffect, useState } from "react";
import { useStore } from "../store.jsx";

const waNumber = (phone) => "92" + phone.replace(/-/g, "").slice(1); // 0321-... -> 92321...

export function WhatsAppDialog({ member, onClose, onSent }) {
  const { markContacted } = useStore();
  const [text, setText] = useState("");
  useEffect(() => {
    if (member) setText(`Salam ${member.name.split(" ")[0]}! Missed you at GYM Flow this week. Sab khairiyat? Let's get a session in tomorrow!`);
  }, [member]);
  if (!member) return null;

  const send = () => {
    window.open(`https://wa.me/${waNumber(member.phone)}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    markContacted(member.id);
    onSent(`WhatsApp khul gaya: ${member.name}. Follow-up "Contacted" mark ho gaya.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-surface-container-low border border-border-subtle rounded-xl p-6 flex flex-col gap-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">Send WhatsApp Message</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-white"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container text-sm">
          <span className="font-semibold text-white">{member.name}</span>
          <span className="text-primary font-medium">{member.phone}</span>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
          className="w-full p-3 bg-surface border border-border-subtle rounded-lg text-sm text-white focus:outline-none focus:border-primary" />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-white">Cancel</button>
          <button onClick={send} className="px-4 py-2 rounded-lg bg-primary hover:bg-teal-500 text-slate-950 text-sm font-semibold">Send WhatsApp</button>
        </div>
      </div>
    </div>
  );
}

export function BroadcastModal({ open, onClose, onSent }) {
  const { atRisk: members } = useStore();
  if (!open) return null;
  const shown = members.slice(0, 5);
  const confirm = () => {
    onClose();
    onSent(`Simulated: ${members.length} members ko reminder queue ho gaya.`);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface-container-low border border-border-subtle rounded-xl p-5 sm:p-6 flex flex-col gap-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-white">Confirm Habit Reminder Broadcast</h3>
            <span className="text-xs text-slate-200">{members.length} inactive members</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </div>
        <div className="p-3.5 rounded-lg bg-surface-container border border-primary/20 text-xs text-slate-200">
          <span className="text-white font-semibold">Prototype simulation:</span> confirm karne par asli messages nahi jayenge.
        </div>
        <div className="p-3 rounded-lg bg-surface-container/60 border border-border-subtle flex flex-wrap gap-2 text-xs">
          {shown.map((m) => (
            <span key={m.id} className="px-2.5 py-1 rounded bg-surface-container border border-border-subtle text-slate-200">{m.name} ({m.days}d)</span>
          ))}
          <span className="px-2.5 py-1 text-slate-400">+{members.length - shown.length} others</span>
        </div>
        <div className="p-3 rounded-lg bg-surface border border-border-subtle text-xs text-slate-200 leading-relaxed">
          “Salam [First Name]! Missed you at GYM Flow this week. Sab khairiyat? Let's get a quick 30-min session in tomorrow!”
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white border border-border-subtle">Cancel</button>
          <button onClick={confirm} className="px-4 py-2 rounded-lg bg-primary hover:bg-teal-500 text-slate-950 text-sm font-semibold">Confirm send (simulated)</button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-surface-container-high border border-border-subtle text-white shadow-lg text-sm">
      <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
      <span>{message}</span>
    </div>
  );
}
