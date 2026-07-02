"use client";

import PredikatBadge from "./PredikatBadge";
import { getKpiColor } from "@/lib/kpiHelper";

function ScoreBar({ label, value }) {
  const color = getKpiColor(value);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#EEF0F8" }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#EEF0F8", fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.07)" }}>
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: "4px",
            background: color,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function DetailKPIModal({ karyawan, onClose }) {
  const kpi = karyawan.kpi;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1A1F35",
          padding: "28px",
          margin: "100px auto",
          width: "420px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h2 style={{ color: "#EEF0F8", fontSize: "17px", margin: 0 }}>{karyawan.nama}</h2>
            <p style={{ color: "#5A6488", fontSize: "13px", margin: "4px 0 0" }}>{karyawan.jabatan}</p>
          </div>
          {kpi && <PredikatBadge skor={kpi.skor_akhir} />}
        </div>

        {kpi ? (
          <div>
            <ScoreBar label="Produktivitas" value={kpi.skor_produktivitas} />
            <ScoreBar label="Kualitas" value={kpi.skor_kualitas} />
            <ScoreBar label="Kehadiran" value={kpi.skor_kehadiran} />

            <div
              style={{
                marginTop: "20px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#5A6488", fontSize: "13px" }}>Skor Akhir</span>
              <span style={{ color: "#EEF0F8", fontSize: "20px", fontWeight: 700 }}>{kpi.skor_akhir}</span>
            </div>

            {kpi.catatan && (
              <p style={{ color: "#5A6488", fontSize: "12.5px", marginTop: "14px", fontStyle: "italic" }}>
                "{kpi.catatan}"
              </p>
            )}
          </div>
        ) : (
          <p style={{ color: "#5A6488", fontSize: "13px" }}>Belum ada data KPI untuk kuartal ini.</p>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "rgba(255,255,255,0.06)",
            color: "#EEF0F8",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}