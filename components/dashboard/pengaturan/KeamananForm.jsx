"use client";

import { useState } from "react";

export default function KeamananForm() {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validasi client-side dulu — biar user dapat feedback cepat
    // tanpa nunggu round-trip ke server buat kesalahan yang sepele
    if (passwordBaru !== konfirmasiPassword) {
      setMessage({ type: "error", text: "Konfirmasi password tidak cocok" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/settings/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password_lama: passwordLama,
          password_baru: passwordBaru,
          konfirmasi_password: konfirmasiPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Gagal memperbarui password" });
        return;
      }

      setMessage({ type: "success", text: "Password berhasil diperbarui" });
      // Reset form setelah sukses — jangan biarkan password lama nyangkut di input
      setPasswordLama("");
      setPasswordBaru("");
      setKonfirmasiPassword("");
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
        .form-hint {
          font-size: 11.5px;
          color: #5A6488;
          margin-top: 5px;
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
      `}</style>

      <div className="form-card">
        <div className="form-card-title">Ubah Password</div>
        <div className="form-card-desc">Pastikan password baru minimal 8 karakter dan mudah kamu ingat</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Password Lama</label>
            <input
              className="form-input"
              type="password"
              value={passwordLama}
              onChange={(e) => setPasswordLama(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password Baru</label>
            <input
              className="form-input"
              type="password"
              value={passwordBaru}
              onChange={(e) => setPasswordBaru(e.target.value)}
              minLength={8}
              required
            />
            <div className="form-hint">Minimal 8 karakter</div>
          </div>

          <div className="form-group">
            <label className="form-label">Konfirmasi Password Baru</label>
            <input
              className="form-input"
              type="password"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Ubah Password"}
          </button>

          {message && <div className={`msg ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </>
  );
}