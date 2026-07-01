"use client";

import { useState, useEffect } from "react";
import KaryawanTable from "@/components/dashboard/karyawan/KaryawanTable";
import KaryawanFilter from "@/components/dashboard/karyawan/KaryawanFilter";

export default function KaryawanPage() {
  const [karyawan, setKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    jabatan: '',
    status: '',
    search: ''
  });

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams()
      if (filter.jabatan) params.append('jabatan', filter.jabatan)
      if (filter.status) params.append('status', filter.status)
      if (filter.search) params.append('search', filter.search)

      const res = await fetch(`/api/karyawan?${params.toString()}`)
      const data = await res.json()
      setKaryawan(data)
    } catch (err) {
      console.error('Gagal fetch karyawan:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKaryawan()
  }, [filter])

  return (
    <>
      <style>{`
        .karyawan-wrap {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .karyawan-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(100,120,255,0.08);
        }
        .karyawan-title {
          font-size: 15px;
          font-weight: 700;
          color: #E8EEFF;
        }
      `}</style>

      <div className="karyawan-wrap">
        <div className="karyawan-header">
          <div className="karyawan-title">Data Seluruh Karyawan</div>
          <KaryawanFilter filter={filter} setFilter={setFilter} />
        </div>
        <KaryawanTable
          karyawan={karyawan}
          loading={loading}
          onRefresh={fetchKaryawan}
        />
      </div>
    </>
  );
}