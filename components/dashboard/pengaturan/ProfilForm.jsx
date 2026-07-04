// components/dashboard/pengaturan/ProfilForm.jsx
"use client";

import { useState } from "react";

export default function ProfilForm({ user, setUser }) {
  const [namaLengkap, setNamaLengkap] = useState(user?.nama_lengkap || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "" }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama_lengkap: namaLengkap, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Gagal memperbarui profil" });
        return;
      }

      setUser(data.user); // sync data terbaru ke parent (PengaturanTabs)
      setMessage({ type: "success", text: "Profil berhasil diperbarui" });
    } catch (error) {
      setMessage({ type: "error", text: "Terjadi kesalahan, coba lagi" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .form-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .form-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #EEF0F8;
          margin-bottom: 4px;
        }
        .form-card-desc {
          font-size: 12.5px;
          color: #5A6488;
          margin-bottom: 18px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-label {
          display: block;
          font-size: 12.5px;
          color: #8A93B8;
          margin-bottom: 6px;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          color: #EEF0F8;
          font-size: 13.5px;
          outline: none;
        }
        .form-input:focus {
          border-color: #4F8EF7;
        }
        .btn-primary {
          padding: 10px 20px;
          background: #4F8EF7;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .msg {
          font-size: 12.5px;
          margin-top: 10px;
        }
        .msg.success { color: #2DD4A0; }
        .msg.error { color: #F76F6F; }

        .placeholder-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .placeholder-avatar {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          color: #5A6488;
        }
        .placeholder-text {
          font-size: 12.5px;
          color: #5A6488;
        }
        .badge-soon {
          font-size: 10px;
          padding: 2px 8px;
          background: rgba(255,170,68,0.15);
          color: #FFAA44;
          border-radius: 20px;
          margin-left: 8px;
        }
      `}</style>

      {/* Form Nama & Email — fungsional */}
      <div className="form-card">
        <div className="form-card-title">Informasi Akun</div>
        <div className="form-card-desc">Perbarui nama dan email yang terhubung ke akun kamu</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              className="form-input"
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>

          {message && <div className={`msg ${message.type}`}>{message.text}</div>}
        </form>
      </div>

      {/* Foto Profil — placeholder */}
      <div className="form-card">
        <div className="form-card-title">
          Foto Profil <span className="badge-soon">Segera Hadir</span>
        </div>
        <div className="form-card-desc">Fitur upload foto profil masih dalam pengembangan</div>

        <div className="placeholder-row">
          <div className="placeholder-avatar">👤</div>
          <div className="placeholder-text">Belum bisa diubah saat ini</div>
        </div>
      </div>

      {/* Kontak/Sosmed — placeholder */}
      <div className="form-card">
        <div className="form-card-title">
          Kontak & Sosial Media <span className="badge-soon">Segera Hadir</span>
        </div>
        <div className="form-card-desc">Tambahkan nomor telepon dan tautan sosial media</div>

        <div className="placeholder-row">
          <div className="placeholder-text">Belum tersedia — akan ditambahkan di update berikutnya</div>
        </div>
      </div>
    </>
  );
}