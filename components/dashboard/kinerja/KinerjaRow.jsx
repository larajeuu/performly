"use client";

import PredikatBadge from "./PredikatBadge";
import { getKpiColor } from "@/lib/kpiHelper";

export default function KinerjaRow({ item, onClick }) {
  const hasKPI = item.kpi !== null;
  const skorAkhir = hasKPI ? item.kpi.skor_akhir : null;
  const kpiColor = hasKPI ? getKpiColor(skorAkhir) : "#5A6488";

  return (
    <>
      <style>{`
        .karyawan-cell {
          font-weight: 500;
          cursor: pointer;
          transition: color 0.15s;
        }
        .karyawan-cell:hover {
          color: #4F8EF7;
        }
        .jabatan-badge {
          display: inline-flex;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(255,255,255,0.06);
          color: #8A93B8;
        }
        .kpi-bar-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kpi-track {
          flex: 1;
          max-width: 100px;
          height: 5px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .kpi-fill {
          height: 100%;
          border-radius: 3px;
        }
        .kpi-pct {
          font-size: 12px;
          font-weight: 500;
          min-width: 40px;
        }
        .no-data {
          font-size: 12px;
          color: #5A6488;
          font-style: italic;
        }
      `}</style>

      <tr>
        <td className="karyawan-cell" onClick={onClick}>
          {item.nama}
        </td>
        <td>
          <span className="jabatan-badge">{item.jabatan}</span>
        </td>
        <td style={{ color: "#8A93B8" }}>100%</td>
        <td>
          {hasKPI ? (
            <div className="kpi-bar-wrap">
              <div className="kpi-track">
                <div
                  className="kpi-fill"
                  style={{ width: `${skorAkhir}%`, background: kpiColor }}
                />
              </div>
              <span className="kpi-pct" style={{ color: kpiColor }}>
                {skorAkhir.toFixed(1)}%
              </span>
            </div>
          ) : (
            <span className="no-data">Data KPI Belum Tersedia</span>
          )}
        </td>
        <td>
          {hasKPI ? <PredikatBadge skor={skorAkhir} /> : <span>-</span>}
        </td>
      </tr>
    </>
  );
}
