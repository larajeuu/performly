"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import TambahKaryawanModal from "@/components/dashboard/karyawan/TambahKaryawanModal";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .layout {
          display: flex;
          min-height: 100vh;
          background: #0C1A3D;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .main-area {
          display: flex;
          flex-direction: column;
          flex: 1;
          transition: margin-left 0.3s ease;
          min-width: 0;
        }
        .content { flex: 1; padding: 32px; overflow-y: auto; }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Raleway:wght@800&display=swap"
        rel="stylesheet"
      />

      <div className="layout">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="main-area">
          <Navbar
            isOpen={isOpen}
            onTambah={() => setShowModal(true)}
          />
          <main className="content">
            {children}
          </main>
        </div>
      </div>

      {/* Modal Tambah Karyawan */}
      {showModal && (
        <TambahKaryawanModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
            }}
        />
      )}
    </>
  );
}
