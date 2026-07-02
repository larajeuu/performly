"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar({ isOpen, setIsOpen, user }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const menuItems = [
    {
      group: "Menu",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: "⊞" },
        { label: "Data Karyawan", href: "/dashboard/karyawan", icon: "👥" },
        { label: "Payroll", href: "/dashboard/payroll", icon: "💳" },
      ]
    },
    {
      group: "Laporan",
      items: [
        { label: "Pencapaian & Kinerja", href: "/dashboard/kinerja", icon: "📈" },
        { label: "Absensi", href: "/dashboard/absensi", icon: "📋" },
      ]
    },
    {
      group: "Sistem",
      items: [
        { label: "Pengaturan", href: "/dashboard/pengaturan", icon: "⚙️" },
      ]
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Raleway:wght@800&display=swap');

        .sidebar {
          width: ${isOpen ? '240px' : '68px'};
          min-height: 100vh;
          background: rgba(10, 20, 60, 0.95);
          border-right: 1px solid rgba(100,120,255,0.1);
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          overflow: hidden;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-logo {
          padding: 20px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(100,120,255,0.08);
          height : 72px;
          min-height: 72px;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(145deg, #2C3E8C, #5B4FCF, #8B6FE8);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(79,100,241,0.35);
        }
        .logo-icon svg { width: 26px; height: 26px; }

        .logo-text {
          overflow: hidden;
          white-space: nowrap;
          opacity: ${isOpen ? '1' : '0'};
          transition: opacity 0.2s ease;
        }
        .logo-name {
          font-family: 'Raleway', sans-serif;
          font-size: 16px; font-weight: 800;
          color: #E8EEFF; letter-spacing: -0.3px;
        }
        .logo-tagline {
          font-size: 9px; color: #6B7FCC;
          margin-top: 2px;
        }

        .sidebar-menu {
          flex: 1;
          padding: 16px 10px;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .sidebar-menu::-webkit-scrollbar {
          display: none;
        }

        .menu-group {
          margin-bottom: 24px;
        }

        .menu-group-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #4A5888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 8px;
          margin-bottom: 6px;
          white-space: nowrap;
          opacity: ${isOpen ? '1' : '0'};
          transition: opacity 0.2s ease;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 8px;
          border-radius: 10px;
          text-decoration: none;
          color: #7B8FCC;
          font-size: 13.5px;
          font-weight: 500;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
          margin-bottom: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .menu-item:hover {
          background: rgba(74,95,212,0.1);
          color: #E8EEFF;
        }
        .menu-item.active {
          background: rgba(74,95,212,0.2);
          color: #A0B0FF;
          font-weight: 600;
        }

        .menu-icon {
          font-size: 16px;
          flex-shrink: 0;
          width: 20px;
          text-align: center;
        }

        .menu-label {
          opacity: ${isOpen ? '1' : '0'};
          transition: opacity 0.2s ease;
          overflow: hidden;
        }

        .sidebar-footer {
          padding: 16px 10px;
          border-top: 1px solid rgba(100,120,255,0.08);
        }

        .profile-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .profile-box:hover {
          background: rgba(74,95,212,0.1);
        }

        .profile-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(74,95,212,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .profile-info {
          overflow: hidden;
          opacity: ${isOpen ? '1' : '0'};
          transition: opacity 0.2s ease;
          white-space: nowrap;
        }
        .profile-name {
          font-size: 13px; font-weight: 600;
          color: #E8EEFF;
        }
        .profile-role {
          font-size: 11px; color: #6B7FCC;
          margin-top: 1px;
        }

        .btn-logout-icon {
          margin-left: auto;
          background: transparent;
          border: none;
          color: #6B7FCC;
          font-size: 16px;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .btn-logout-icon:hover {
          color: #FCA5A5;
          background: rgba(239,68,68,0.1);
        }

        .toggle-btn {
          position: absolute;
          top: 22px;
          right: -12px;
          width: 24px; height: 24px;
          background: #1a2a6e;
          border: 1px solid rgba(100,120,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #7B8FCC;
          font-size: 12px;
          transition: background 0.15s, color 0.15s;
          z-index: 10;
        }
        .toggle-btn:hover {
          background: rgba(74,95,212,0.3);
          color: #E8EEFF;
        }

        .sidebar-wrap {
          position: relative;
        }
      `}</style>

      <div className="sidebar-wrap">
        <div className="sidebar">
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <rect x="3" y="18" width="5" height="10" rx="1.5" fill="white" fillOpacity="0.9"/>
                <rect x="10" y="12" width="5" height="16" rx="1.5" fill="white" fillOpacity="0.75"/>
                <rect x="17" y="7" width="5" height="21" rx="1.5" fill="white" fillOpacity="0.6"/>
                <polyline points="4,20 11,13 18,8 26,4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="26" cy="4" r="2" fill="white"/>
              </svg>
            </div>
            <div className="logo-text">
              <div className="logo-name">Performly</div>
              <div className="logo-tagline">Where Performance Meets Reward</div>
            </div>
          </div>

          {/* Menu */}
          <nav className="sidebar-menu">
            {menuItems.map((group) => (
              <div key={group.group} className="menu-group">
                <div className="menu-group-label">{group.group}</div>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`menu-item ${pathname === item.href ? 'active' : ''}`}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer Profile */}
          <div className="sidebar-footer">
            <div className="profile-box">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <div className="profile-name">{user?.nama_lengkap || "User"}</div>
                <div className="profile-role">{user?.jabatan || "-"}</div>
              </div>
              {isOpen && (
                <button className="btn-logout-icon" onClick={handleLogout}>
                  ⏻
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
    </>
  );
}