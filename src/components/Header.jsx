import { useNavigate } from "react-router-dom";
import { useStore } from "../store.jsx";

export default function Header({ query, setQuery, onMenu }) {
  const navigate = useNavigate();
  const { user, logout } = useStore();
  return (
    <header className="sticky top-0 h-16 bg-surface/80 backdrop-blur-md z-20 border-b border-border-subtle flex items-center justify-between gap-3 px-4 sm:px-8">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenu} aria-label="Menu" className="lg:hidden p-2 -ml-2 rounded-lg text-white hover:bg-surface-container-low"><span className="material-symbols-outlined">menu</span></button>
        <div className="relative flex-1 sm:flex-none sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[19px]">search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && query && navigate("/at-risk")}
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low border border-border-subtle text-sm rounded-lg text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
            placeholder="Search member by name or phone..."
          />
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-border-subtle text-xs text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>Clifton Main, Karachi</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-surface-container border border-border-subtle flex items-center justify-center font-bold text-xs text-primary">{user.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}</div>
        <span className="hidden sm:inline text-sm font-semibold text-white">{user.name} <span className="text-slate-400 font-normal capitalize">· {user.role}</span></span>
        <button onClick={() => { logout(); navigate("/login"); }} aria-label="Logout" title="Logout" className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-surface-container-low"><span className="material-symbols-outlined text-[20px]">logout</span></button>
      </div>
    </header>
  );
}
