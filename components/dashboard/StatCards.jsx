"use client";

export default function StatCards({ stats }) {
  const statCards = [
    {
      icon: "👥",
      value: stats.karyawan_aktif,
      label: "Karyawan Aktif",
      trend: "+2 bulan ini",
      trendUp: true,
      bg: "rgba(74,95,212,0.15)",
    },
    {
      icon: "📈",
      value: `${stats.rata_kpi}%`,
      label: "Rata-rata Pencapaian KPI",
      trend: "4.2% dari 3 bulan ini",
      trendUp: true,
      bg: "rgba(34,197,94,0.12)",
    },
    {
      icon: "💳",
      value: `Rp ${(stats.total_gaji / 1000000).toFixed(0)} Jt`,
      label: "Total Pengeluaran Gaji 1 Bulan",
      trend: "1.8% dari bulan lalu",
      trendUp: true,
      bg: "rgba(251,146,60,0.12)",
    },
    {
      icon: "📋",
      value: `${stats.absensi}%`,
      label: "Absensi Karyawan Harian",
      trend: "8 dari 10 Pegawai Hadir",
      trendUp: false,
      bg: "rgba(168,85,247,0.12)",
    },
  ];

  return (
    <>
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          padding: 22px;
          backdrop-filter: blur(10px);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }
        .stat-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          margin-bottom: 14px;
        }
        .stat-value {
          font-family: 'Raleway', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #E8EEFF;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 12px;
          color: #6B7FCC;
          margin-bottom: 14px;
          line-height: 1.4;
        }
        .stat-trend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
        }
        .trend-up { color: #4ADE80; }
        .trend-down { color: #F87171; }
      `}</style>

      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: card.bg }}>
              {card.icon}
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
            <div className={`stat-trend ${card.trendUp ? 'trend-up' : 'trend-down'}`}>
              {card.trendUp ? '↗' : '↘'} {card.trend}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}