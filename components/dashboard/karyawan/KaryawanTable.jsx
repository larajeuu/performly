"use client";

import { useState } from "react";
import EditKaryawanModal from "./EditKaryawanModal";

const jabatanColors = {
  'HR': { bg: 'rgba(74,95,212,0.2)', color: '#A0B0FF' },
  'Manager': { bg: 'rgba(168,85,247,0.15)', color: '#C084FC' },
  'Staff': { bg: 'rgba(34,197,94,0.12)', color: '#4ADE80' },
  'Supervisor': { bg: 'rgba(251,146,60,0.12)', color: '#FB923C' },
  'Operasional': { bg: 'rgba(251,191,36,0.12)', color: '#FCD34D' },
}

function hitungMasaKerja(tanggal_masuk) {
  const masuk = new Date(tanggal_masuk)
  const sekarang = new Date()
  const tahun = sekarang.getFullYear() - masuk.getFullYear()
  const bulan = sekarang.getMonth() - masuk.getMonth()
  const totalBulan = tahun * 12 + bulan
  const th = Math.floor(totalBulan / 12)
  const bln = totalBulan % 12
  if (th === 0) return `${bln} bulan`
  if (bln === 0) return `${th} tahun`
  return `${th} tahun ${bln} bulan`
}

function getInisial(nama) {
  return nama.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function KaryawanTable({ karyawan, loading, onRefresh }) {
  const [editingId, setEditingId] = useState(null);

  const handleHapus = async (id) => {
    if (!confirm('Yakin ingin menghapus karyawan ini?')) return
    try {
      const res = await fetch(`/api/karyawan/${id}`, { method: 'DELETE' })
      if (res.ok) onRefresh()
      else alert('Gagal menghapus karyawan')
    } catch (err) {
      alert('Terjadi kesalahan')
    }
  }

  return (
    <>
      <style>{`
        .table-wrap { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        thead tr {
          background: rgba(74,95,212,0.08);
          border-bottom: 1px solid rgba(100,120,255,0.08);
        }

        thead th {
          padding: 12px 16px;
          font-size: 11.5px;
          font-weight: 700;
          color: #6B7FCC;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          text-align: left;
          white-space: nowrap;
        }

        tbody tr {
          border-bottom: 1px solid rgba(100,120,255,0.05);
          transition: background 0.15s;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(74,95,212,0.05); }

        tbody td {
          padding: 14px 16px;
          font-size: 13px;
          color: #E8EEFF;
          white-space: nowrap;
        }

        .karyawan-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4A5FD4, #8B6FE8);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          color: white; flex-shrink: 0;
        }

        .karyawan-nama {
          font-size: 13.5px;
          font-weight: 600;
          color: #E8EEFF;
        }

        .karyawan-dept {
          font-size: 11.5px;
          color: #6B7FCC;
          margin-top: 2px;
        }

        .badge-jabatan {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 40px;
          font-size: 11.5px;
          font-weight: 700;
        }

        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
        }
        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }
        .dot-aktif { background: #4ADE80; }
        .dot-nonaktif { background: #F87171; }
        .aktif { color: #4ADE80; }
        .nonaktif { color: #F87171; }

        .kpi-value {
          font-weight: 700;
          font-size: 13px;
        }
        .kpi-high { color: #4ADE80; }
        .kpi-mid  { color: #FCD34D; }
        .kpi-low  { color: #F87171; }

        .aksi-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-aksi {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: background 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .btn-edit:hover { background: rgba(74,95,212,0.2); }
        .btn-hapus:hover { background: rgba(239,68,68,0.15); }

        .btn-aksi:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-aksi:disabled:hover {
          background: transparent;
        }

        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: #4A5888;
          font-size: 14px;
        }

        .loading-state {
          padding: 60px 20px;
          text-align: center;
          color: #6B7FCC;
          font-size: 14px;
        }
      `}</style>

      <div className="table-wrap">
        {loading ? (
          <div className="loading-state">Memuat data karyawan...</div>
        ) : karyawan.length === 0 ? (
          <div className="empty-state">Tidak ada data karyawan.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Karyawan</th>
                <th>NIP</th>
                <th>Masa Kerja</th>
                <th>Jabatan</th>
                <th>KPI</th>
                <th>Gaji Pokok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {karyawan.map((k) => {
                const jabatanStyle = jabatanColors[k.jabatan] || {
                  bg: 'rgba(100,120,255,0.15)',
                  color: '#A0B0FF'
                }
                const kpiColor = k.kpi >= 85 ? 'kpi-high' : k.kpi >= 70 ? 'kpi-mid' : 'kpi-low'
                const isAktif = k.status === 'Aktif'

                return (
                  <tr key={k.id}>
                    {/* Karyawan */}
                    <td>
                      <div className="karyawan-info">
                        <div className="avatar">{getInisial(k.nama_lengkap)}</div>
                        <div>
                          <div className="karyawan-nama">{k.nama_lengkap}</div>
                          <div className="karyawan-dept">{k.departemen}</div>
                        </div>
                      </div>
                    </td>

                    {/* NIP */}
                    <td style={{ color: '#7B8FCC' }}>{k.nip}</td>

                    {/* Masa Kerja */}
                    <td style={{ color: '#7B8FCC' }}>
                      {hitungMasaKerja(k.tanggal_masuk)}
                    </td>

                    {/* Jabatan */}
                    <td>
                      <span
                        className="badge-jabatan"
                        style={{ background: jabatanStyle.bg, color: jabatanStyle.color }}
                      >
                        {k.jabatan}
                      </span>
                    </td>

                    {/* KPI */}
                    <td>
                      <span className={`kpi-value ${kpiColor}`}>
                        {k.kpi !== null ? `${k.kpi}%` : '-'}
                      </span>
                    </td>

                    {/* Gaji Pokok */}
                    <td style={{ color: '#A0B0FF' }}>
                      {k.gaji_pokok !== null
                        ? `Rp ${k.gaji_pokok.toLocaleString('id-ID')}`
                        : '-'}
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge-status ${isAktif ? 'aktif' : 'nonaktif'}`}>
                        <span className={`dot ${isAktif ? 'dot-aktif' : 'dot-nonaktif'}`} />
                        {k.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td>
                      <div className="aksi-wrap">
                        <button
                          className="btn-aksi btn-edit"
                          title={isAktif ? "Edit" : "Karyawan nonaktif tidak dapat diedit"}
                          disabled={!isAktif}
                          onClick={() => setEditingId(k.id)}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M10.5 2L13 4.5L5 12.5H2.5V10L10.5 2Z" stroke={isAktif ? "#6B7FE8" : "#4A5888"} strokeWidth="1.5" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          className="btn-aksi btn-hapus"
                          title="Hapus"
                          onClick={() => handleHapus(k.id)}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M2 4h11M5 4V2.5h5V4M6 7v4M9 7v4M3 4l1 9h7l1-9" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {editingId && (
        <EditKaryawanModal
          karyawanId={editingId}
          onClose={() => setEditingId(null)}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
}