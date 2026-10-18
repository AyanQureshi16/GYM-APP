import { useNavigate } from "react-router-dom";
import { useStore } from "../store.jsx";
import MemberApp from "./MemberApp.jsx";

// Member ko sirf ye screen milti hai. Admin sidebar/dashboard is tak pohanchta hi nahi.
export default function MemberShell() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-w-md mx-auto px-4 py-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold">K</div>
          <span className="font-display font-bold text-white">K-Athletic</span>
        </div>
        <button onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white">
          <span className="material-symbols-outlined text-[20px]">logout</span>Logout
        </button>
      </div>
      <MemberApp memberId={user.memberId} />
    </div>
  );
}
