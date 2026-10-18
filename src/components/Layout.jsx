import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { WhatsAppDialog, BroadcastModal, Toast } from "./Overlays.jsx";

export default function Layout() {
  const [query, setQuery] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [waMember, setWaMember] = useState(null);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  // Child pages ye context useOutletContext() se lete hain
  const ctx = { query, showToast, openWhatsApp: setWaMember, openBroadcast: () => setBroadcastOpen(true) };

  return (
    <>
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="lg:pl-64">
        <Header query={query} setQuery={setQuery} onMenu={() => setNavOpen(true)} />
        <main className="px-4 sm:px-8 py-6 sm:py-8 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          <Outlet context={ctx} />
        </main>
      </div>
      <WhatsAppDialog member={waMember} onClose={() => setWaMember(null)} onSent={showToast} />
      <BroadcastModal open={broadcastOpen} onClose={() => setBroadcastOpen(false)} onSent={showToast} />
      <Toast message={toast} />
    </>
  );
}
