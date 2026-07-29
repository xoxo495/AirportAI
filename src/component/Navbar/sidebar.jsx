// src/component/Navbar/sidebar.jsx
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const colors = {
    bgSidebar: "#ffffff",
    border: "#e2e8f0",
    textPrimary: "#1e293b",
    textMuted: "#64748b",
    navyAccent: "#1b365d",
    cyanAccent: "#00a8b5",
    activeBg: "#f1f5f9",
  };

  return (
    <aside
      className="w-64 min-h-screen border-r p-4 flex flex-col justify-between shrink-0"
      style={{
        backgroundColor: colors.bgSidebar,
        borderColor: colors.border,
      }}
    >
      <div className="space-y-6">
        <div
          className="flex items-center gap-3 px-2 py-2 border-b pb-4"
          style={{ borderColor: colors.border }}
        >
          <div className="h-10 w-10 flex items-center justify-center shrink-0">
            <img
              src="/Logo/AAILogo.png"
              alt="AAI Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h2
              className="font-bold text-sm leading-tight tracking-wide"
              style={{ color: colors.textPrimary }}
            >
              AAI System
            </h2>
            <p
              className="text-xs font-medium"
              style={{ color: colors.cyanAccent }}
            >
              Airport Intelligence
            </p>
          </div>
        </div>
        <nav className="space-y-1">
          <Link
            to="/dashboard"
            style={{
              backgroundColor:
                location.pathname === "/dashboard" || location.pathname === "/"
                  ? colors.activeBg
                  : "transparent",
              color:
                location.pathname === "/dashboard" || location.pathname === "/"
                  ? colors.navyAccent
                  : colors.textMuted,
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-slate-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
          <Link
            to="/chat"
            style={{
              backgroundColor:
                location.pathname === "/chat" ? colors.activeBg : "transparent",
              color:
                location.pathname === "/chat"
                  ? colors.navyAccent
                  : colors.textMuted,
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-slate-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Chatbot
          </Link>
        </nav>
      </div>
      <div
        className="border-t pt-3.5 flex items-center gap-3 px-2"
        style={{ borderColor: colors.border }}
      >
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: colors.navyAccent }}
        >
          F
        </div>
        <div className="overflow-hidden">
          <p
            className="text-xs font-semibold truncate"
            style={{ color: colors.textPrimary }}
          >
            Fahri Admin
          </p>
          <p
            className="text-[11px] truncate"
            style={{ color: colors.textMuted }}
          >
            fahri@airport.id
          </p>
        </div>
      </div>
    </aside>
  );
}
