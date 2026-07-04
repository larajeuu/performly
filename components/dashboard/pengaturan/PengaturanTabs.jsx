"use client";

import { useState } from "react";
import ProfilForm from "./ProfilForm";
import KeamananForm from "./KeamananForm";

export default function PengaturanTabs({ initialUser }) {
  const [activeTab, setActiveTab] = useState("profil");
  const [user, setUser] = useState(initialUser);

  return (
    <>
      <style>{`
        .pengaturan-header {
          margin-bottom: 24px;
        }
        .pengaturan-title {
          font-size: 20px;
          font-weight: 700;
          color: #EEF0F8;
        }
        .pengaturan-subtitle {
          font-size: 13px;
          color: #5A6488;
          margin-top: 4px;
        }
        .tab-bar {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 24px;
        }
        .tab-btn {
          padding: 10px 18px;
          background: transparent;
          border: none;
          color: #5A6488;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .tab-btn.active {
          color: #A0B0FF;
          border-bottom-color: #4F8EF7;
        }
        .tab-btn:hover:not(.active) {
          color: #EEF0F8;
        }
      `}</style>

      <div className="pengaturan-header">
        <div className="pengaturan-subtitle">Kelola informasi akun dan keamanan kamu</div>
      </div>

      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "profil" ? "active" : ""}`}
          onClick={() => setActiveTab("profil")}
        >
          Profil
        </button>
        <button
          className={`tab-btn ${activeTab === "keamanan" ? "active" : ""}`}
          onClick={() => setActiveTab("keamanan")}
        >
          Keamanan
        </button>
      </div>

      {activeTab === "profil" && <ProfilForm user={user} setUser={setUser} />}
      {activeTab === "keamanan" && <KeamananForm />}
    </>
  );
}