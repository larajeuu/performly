"use client";

import { useState } from "react";
import KinerjaRow from "./KinerjaRow";
import DetailKPIModal from "./DetailKPIModal";

export default function KinerjaTable({ data }) {
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);

  return (
    <>
      <style>{`
        .kinerja-table {
          width: 100%;
          border-collapse: collapse;
        }
        .kinerja-table th {
          padding: 12px 22px;
          text-align: left;
          font-size: 11px;
          font-weight: 500;
          color: #5A6488;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .kinerja-table td {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 13px;
          color: #EEF0F8;
        }
        .kinerja-table tr:last-child td {
          border-bottom: none;
        }
        .kinerja-table tr:hover td {
          background: rgba(255,255,255,0.025);
        }
      `}</style>

      <table className="kinerja-table">
        <thead>
          <tr>
            <th>Karyawan</th>
            <th>Jabatan</th>
            <th>Target KPI</th>
            <th>Pencapaian</th>
            <th>Predikat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <KinerjaRow
              key={item.id}
              item={item}
              onClick={() => setSelectedKaryawan(item)}
            />
          ))}
        </tbody>
      </table>

      {selectedKaryawan && (
        <DetailKPIModal
          karyawan={selectedKaryawan}
          onClose={() => setSelectedKaryawan(null)}
        />
      )}
    </>
  );
}