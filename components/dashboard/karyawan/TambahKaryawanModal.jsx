"use client";

import { useState } from "react";

export default function TambahKaryawanModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nip: "",
    email: "",
    tanggal_masuk: "",
    tanggal_lahir: "",
    jabatan: "",
    departemen: "",
    status: "Aktif",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const jabatanOptions = ['HR', 'Manager', 'Staff', 'Supervisor', 'Operasional'];
  const departemenOptions = ['HR', 'IT', 'Marketing', 'Finance', 'Operasional'];
  const statusOptions = ['Aktif', 'Tidak Aktif'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const required = ['nama_lengkap', 'nip', 'email', 'tanggal_masuk', 'tanggal_lahir', 'jabatan', 'departemen'];
    for (const field of required) {
      if (!formData[field]) {
        setError("Semua field harus diisi");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/karyawan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Terjadi kesalahan");
        return;
      }

      onSuccess?.();
      onClose();

    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .modal-card {
          background: rgba(14,26,70,0.98);
          border: 1px solid rgba(100,120,255,0.15);
          border-radius: 20px;
          width: 100%; max-width: 520px;
          padding: 32px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          animation: modalRise 0.3s cubic-bezier(0.22,1,0.36,1) both;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-height: 90vh;
          overflow-y: auto;
        }
        @keyframes modalRise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .modal-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .modal-title {
          font-family: 'Raleway', sans-serif;
          font-size: 18px; font-weight: 800; color: #E8EEFF;
        }
        .btn-close {
          background: transparent; border: none;
          color: #6B7FCC; font-size: 20px; cursor: pointer;
          padding: 4px 8px; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .btn-close:hover { color: #E8EEFF; background: rgba(100,120,255,0.1); }
        .modal-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .modal-field { margin-bottom: 14px; }
        .modal-field label {
          display: block; font-size: 12.5px; font-weight: 600;
          color: #7B8FCC; margin-bottom: 6px;
        }
        .modal-field input,
        .modal-field select {
          width: 100%;
          background: rgba(30,55,120,0.5);
          border: 1px solid rgba(100,130,255,0.15);
          border-radius: 8px; padding: 10px 14px;
          font-size: 13.5px; color: #E8EEFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .modal-field input:focus,
        .modal-field select:focus {
          border-color: rgba(100,130,255,0.4);
          box-shadow: 0 0 0 3px rgba(79,100,241,0.1);
        }
        .modal-field select option { background: #1a2a6e; color: #E8EEFF; }
        .error-box {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 10px 14px;
          font-size: 12.5px; color: #FCA5A5; margin-bottom: 14px;
        }
        .modal-footer { display: flex; gap: 10px; margin-top: 20px; }
        .btn-batal {
          flex: 1; background: transparent;
          border: 1px solid rgba(100,120,255,0.2);
          border-radius: 40px; padding: 12px;
          font-size: 13.5px; font-weight: 600; color: #7B8FCC;
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.2s, color 0.2s;
        }
        .btn-batal:hover { background: rgba(100,120,255,0.1); color: #E8EEFF; }
        .btn-simpan {
          flex: 2;
          background: linear-gradient(90deg, #4A5FD4, #6B7FE8);
          border: none; border-radius: 40px; padding: 12px;
          font-size: 13.5px; font-weight: 700; color: #fff;
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(79,100,241,0.35);
          transition: opacity 0.2s;
        }
        .btn-simpan:hover:not(:disabled) { opacity: 0.9; }
        .btn-simpan:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal-card">
          <div className="modal-header">
            <div className="modal-title">Tambah Karyawan Baru</div>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Nama Lengkap */}
            <div className="modal-field">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={handleChange}
                autoFocus
              />
            </div>

            {/* NIP & Email */}
            <div className="modal-row">
              <div className="modal-field">
                <label>NIP</label>
                <input
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tanggal Masuk & Tanggal Lahir */}
            <div className="modal-row">
              <div className="modal-field">
                <label>Tanggal Masuk</label>
                <input
                  type="date"
                  name="tanggal_masuk"
                  value={formData.tanggal_masuk}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-field">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Jabatan & Departemen */}
            <div className="modal-row">
              <div className="modal-field">
                <label>Jabatan</label>
                <select name="jabatan" value={formData.jabatan} onChange={handleChange}>
                  <option value="">Pilih Jabatan</option>
                  {jabatanOptions.map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div className="modal-field">
                <label>Departemen</label>
                <select name="departemen" value={formData.departemen} onChange={handleChange}>
                  <option value="">Pilih Departemen</option>
                  {departemenOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="modal-field">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {error && <div className="error-box">{error}</div>}

            <div className="modal-footer">
              <button type="button" className="btn-batal" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn-simpan" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Karyawan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}