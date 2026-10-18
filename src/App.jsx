import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./store.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AtRisk from "./pages/AtRisk.jsx";
import Members from "./pages/Members.jsx";
import Attendance from "./pages/Attendance.jsx";
import FollowUps from "./pages/FollowUps.jsx";
import Challenges from "./pages/Challenges.jsx";
import MemberApp from "./pages/MemberApp.jsx";
import MemberShell from "./pages/MemberShell.jsx";
import Settings from "./pages/Settings.jsx";

// Login nahi to /login. Role allowed nahi to apne ghar wapas.
function Guard({ roles, children }) {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={user.role === "member" ? "/member-app" : "/"} replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/member-app" element={<Guard roles={["member"]}><MemberShell /></Guard>} />
      <Route element={<Guard roles={["owner", "staff"]}><Layout /></Guard>}>
        <Route index element={<Dashboard />} />
        <Route path="at-risk" element={<AtRisk />} />
        <Route path="members" element={<Members />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="follow-ups" element={<FollowUps />} />
        <Route path="member-preview" element={<MemberApp preview />} />
        <Route path="challenges" element={<Guard roles={["owner"]}><Challenges /></Guard>} />
        <Route path="settings" element={<Guard roles={["owner"]}><Settings /></Guard>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
