"use client";

const STATUS_CONFIG = {
  Hadir: { label: "H", color: "#2DD4A0" },
  WFH: { label: "W", color: "#4F8EF7" },
  Cuti: { label: "C", color: "#A78BFA" },
  Izin: { label: "I", color: "#FFAA44" },
  Sakit: { label: "S", color: "#FB923C" },
  Alpha: { label: "A", color: "#F76F6F" },
};

export default function AbsensiTable({ data, bulan, tahun }) {
  const jumlahHari = new Date(tahun, bulan, 0).getDate();
  const tanggalArray = Array.from({ length: jumlahHari }, (_, i) => i + 1);

  if (data.length === 0) {
    return (
      <p style={{ color: "#8A93B8", textAlign: "center", padding: "40px" }}>
        Tidak ada karyawan yang cocok dengan pencarian.
      </p>
    );
  }

  return (
    <>
      <style>{`
        .absensi-table-wrap {
          overflow-x: auto;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
        }
        .absensi-table-wrap::-webkit-scrollbar {
            height: 6px;
        }
        .absensi-table-wrap::-webkit-scrollbar-track {
            background: transparent;
        }
        .absensi-table-wrap::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.15);
            border-radius: 10px;
        }
        .absensi-table-wrap::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.25);
        }
        .absensi-table {
          border-collapse: collapse;
          font-size: 12px;
          min-width: 100%;
        }
        .absensi-table th {
          padding: 8px 6px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          font-weight: 500;
          color: #8A93B8;
          text-align: center;
          min-width: 28px;
        }
        .absensi-table th.nama-col {
          position: sticky;
          left: 0;
          background: #111E48;
          text-align: left;
          padding: 8px 14px;
          min-width: 160px;
          z-index: 2;
        }
        .absensi-table th.rekap-col {
          min-width: 90px;
        }
        .absensi-table td {
          padding: 8px 6px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-align: center;
        }
        .absensi-table td.nama-col {
          position: sticky;
          left: 0;
          background: #0B1437;
          text-align: left;
          padding: 8px 14px;
          font-weight: 500;
          color: #EEF0F8;
          z-index: 1;
        }
        .absensi-table tr:hover td {
          background: rgba(255,255,255,0.025);
        }
        .absensi-table tr:hover td.nama-col {
          background: rgba(255,255,255,0.04);
        }
        .status-badge {
          display: inline-flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 600;
        }
        .legend-row {
          display: flex;
          gap: 16px;
          margin-top: 14px;
          flex-wrap: wrap;
          font-size: 12px;
          color: #8A93B8;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
        }
      `}</style>

      <div className="absensi-table-wrap">
        <table className="absensi-table">
          <thead>
            <tr>
              <th className="nama-col">Karyawan</th>
              {tanggalArray.map((tgl) => (
                <th key={tgl}>{tgl}</th>
              ))}
              <th className="rekap-col">Rekap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.karyawan_id}>
                <td className="nama-col">{item.nama}</td>
                {tanggalArray.map((tgl) => {
                  const status = item.absensi[tgl];
                  const config = status ? STATUS_CONFIG[status] : null;
                  return (
                    <td key={tgl}>
                      {config ? (
                        <span
                          className="status-badge"
                          style={{
                            background: `${config.color}20`,
                            color: config.color,
                          }}
                        >
                          {config.label}
                        </span>
                      ) : (
                        <span style={{ color: "#3A4368" }}>-</span>
                      )}
                    </td>
                  );
                })}
                <td style={{ color: "#8A93B8", fontSize: "11px" }}>
                  {Object.entries(item.rekap)
                    .filter(([, count]) => count > 0)
                    .map(([status, count]) => `${count}${STATUS_CONFIG[status]?.label}`)
                    .join(" ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="legend-row">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => (
            <div key={status} className="legend-item">
                <span className="legend-dot" style={{ background: config.color }} />
                <span>{status}</span>
            </div>
        ))}
      </div>
    </>
  );
}