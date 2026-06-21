"use client";

import { useState, useEffect } from "react";
import KinerjaTable from "@/components/dashboard/kinerja/KinerjaTable";

function getDefaultPeriode() {
  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahunSekarang = now.getFullYear();

  if (bulan >= 1 && bulan <= 3) {
    return { kuartal: 4, tahun: tahunSekarang - 1 };
  }
  if (bulan >= 4 && bulan <= 6) {
    return { kuartal: 1, tahun: tahunSekarang };
  }
  if (bulan >= 7 && bulan <= 9) {
    return { kuartal: 2, tahun: tahunSekarang };
  }
  return { kuartal: 3, tahun: tahunSekarang };
}

const KUARTAL_OPTIONS = [
  { value: 1, label: "Maret" },
  { value: 2, label: "Juni" },
  { value: 3, label: "September" },
  { value: 4, label: "Desember" },
];

export default function KinerjaPage() {
  const defaultPeriode = getDefaultPeriode();
  const [kuartal, setKuartal] = useState(defaultPeriode.kuartal);
  const [tahun, setTahun] = useState(defaultPeriode.tahun);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/kinerja?kuartal=${kuartal}&tahun=${tahun}`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kuartal, tahun]);

  return (
    <>
      <style>{`
        .kinerja-card {
          background: rgba(26,39,82,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
        }

        .kinerja-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .kinerja-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #EEF0F8;
        }

        .kuartal-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          color: #8A93B8;
          outline: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .kuartal-select:focus {
          border-color: rgba(79,142,247,0.4);
        }

        .loading-text {
          padding: 40px;
          text-align: center;
          color: #8A93B8;
          font-size: 14px;
        }
      `}</style>

      <div style={{ padding: "28px 32px" }}>
        <div className="kinerja-card">
          <div className="kinerja-header">
            <div className="kinerja-title">Laporan Kinerja & KPI</div>
            <select
              className="kuartal-select"
              value={kuartal}
              onChange={(e) => setKuartal(Number(e.target.value))}
            >
              {KUARTAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} {tahun}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="loading-text">Memuat data...</p>
          ) : (
            <KinerjaTable data={data} />
          )}
        </div>
      </div>
    </>
  );
}