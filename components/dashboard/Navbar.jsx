"use client";

import { usePathname } from "next/navigation";

export default function Navbar({ onTambah }) {
  const pathname = usePathname();

  const pageTitle = {
    "/dashboard": "Dashboard",
    "/dashboard/karyawan": "Data Karyawan",
    "/dashboard/payroll": "Payroll",
    "/dashboard/kinerja": "Pencapaian & Kinerja",
    "/dashboard/absensi": "Absensi",
    "/dashboard/pengaturan": "Pengaturan",
  };

  const isKaryawanPage = pathname === "/dashboard/karyawan";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Raleway:wght@800&display=swap');

        .navbar {
          height: 72px;
          background: rgba(10, 20, 60, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(100,120,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .navbar-left { display: flex; align-items: center; gap: 16px; }
        .page-title {
          font-family: 'Raleway', sans-serif;
          font-size: 22px; font-weight: 800;
          color: #E8EEFF; letter-spacing: -0.3px;
        }
        .navbar-right { display: flex; align-items: center; gap: 12px; }
        .search-wrap { position: relative; }
        .search-icon {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          color: #6B7FCC; pointer-events: none;
        }
        .search-input {
          background: rgba(30,55,120,0.5);
          border: 1px solid rgba(100,130,255,0.12);
          border-radius: 10px;
          padding: 9px 16px 9px 36px;
          font-size: 13px; color: #E8EEFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none; width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus {
          border-color: rgba(100,130,255,0.35);
          box-shadow: 0 0 0 3px rgba(79,100,241,0.1);
        }
        .search-input::placeholder { color: #4A5888; }
        .search-input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-tambah {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(90deg, #4A5FD4, #6B7FE8);
          border: none; border-radius: 10px;
          padding: 9px 18px; font-size: 13px; font-weight: 700;
          color: #fff; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(79,100,241,0.35);
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn-tambah:hover { opacity: 0.9; transform: translateY(-1px); }
      `}</style>

      <div className="navbar">
        <div className="navbar-left">
          <div className="page-title">
            {pageTitle[pathname] || "Dashboard"}
          </div>
        </div>

        <div className="navbar-right">
          {/* Search — hanya aktif di halaman karyawan */}
          <div className="search-wrap">
            <span className="search-icon">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="6.5" cy="6.5" r="5" stroke="#6B7FCC" strokeWidth="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="#6B7FCC" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder={isKaryawanPage ? "Cari Data Karyawan..." : "Cari Data Karyawan..."}
              disabled={!isKaryawanPage}
              onChange={() => {
                if (isKaryawanPage && onTambah) {
                  // nanti dihandle via prop onSearch
                }
              }}
            />
          </div>

          {/* Tambah Karyawan — hanya muncul di halaman karyawan */}
          {isKaryawanPage && (
            <button className="btn-tambah" onClick={onTambah}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Tambah Karyawan
            </button>
          )}
        </div>
      </div>
    </>
  );
}
