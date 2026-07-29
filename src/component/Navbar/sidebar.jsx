import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);

  // --- TAMBAHAN: Mengambil data user dari localStorage ---
  const role = localStorage.getItem("userRole");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // Menentukan Nama dan Email berdasarkan Role
  let displayName = "Pengguna";
  let displayEmail = "user@bandara.com";

  if (role === "admin") {
    displayName = "Super Admin";
    displayEmail = "admin@bandara.com";
  } else if (role === "karyawan") {
    displayName = userData.nama_lengkap || "Karyawan";
    displayEmail = userData.email || "";
  } else if (role === "user_umum") {
    displayName = "Terminal Area";
    displayEmail = "Terminal Publik";
  }
  // --------------------------------------------------------

  // Fungsi Logout sederhana
  const handleLogout = () => {
    localStorage.clear(); // Hapus semua data sesi
    navigate("/"); // Kembali ke halaman login
  };

  const colors = {
    bgSidebar: "#ffffff",
    border: "#e2e8f0",
    textPrimary: "#1e293b",
    textMuted: "#64748b",
    navyAccent: "#1b365d",
    cyanAccent: "#00a8b5",
    activeBg: "#f1f5f9",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sidebarRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      gsap.fromTo(
        logoRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        navRef.current.children,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.5, ease: "power2.out" }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="w-64 min-h-screen border-r p-4 flex flex-col justify-between shrink-0"
      style={{
        backgroundColor: colors.bgSidebar,
        borderColor: colors.border,
      }}
    >
      <div className="space-y-6">
        <div
          ref={logoRef}
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

        <nav ref={navRef} className="space-y-1">
          {/* MENU DASHBOARD - Hanya muncul jika role adalah admin */}
          {role === "admin" && (
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
          )}

          {/* MENU CHATBOT - Hanya muncul jika role adalah karyawan ATAU user_umum */}
          {(role === "karyawan" || role === "user_umum") && (
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
          )}
        </nav>
      </div>

      <div
        ref={footerRef}
        className="border-t pt-3.5 flex flex-col gap-2 px-2"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200"
            style={{ backgroundColor: colors.navyAccent }}
          >
            <img
              src="/Background/165709690da655b5ab1.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="overflow-hidden">
            {/* Menampilkan Nama dan Email secara Dinamis */}
            <p
              className="text-xs font-semibold truncate"
              style={{ color: colors.textPrimary }}
            >
              {displayName}
            </p>
            <p
              className="text-[11px] truncate"
              style={{ color: colors.textMuted }}
            >
              {displayEmail}
            </p>
          </div>
        </div>
        
        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          className="mt-2 w-full text-left px-2 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-md transition-colors"
        >
          Keluar (Logout)
        </button>
      </div>
    </aside>
  );
}