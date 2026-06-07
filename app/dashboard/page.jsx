"use client";

import StatCards from "@/components/dashboard/StatCards";
import KPIChart from "@/components/dashboard/KPIChart";
import ScoreChart from "@/components/dashboard/ScoreChart";

export default function DashboardPage() {
  const stats = {
    karyawan_aktif: 10,
    rata_kpi: 87,
    total_gaji: 76000000,
    absensi: 80,
    overall_score: 84.2,
  };

  const kpiDepartemen = [
    { departemen: "IT", skor: 75 },
    { departemen: "Operasional", skor: 68 },
    { departemen: "Marketing", skor: 88 },
    { departemen: "Finance", skor: 82 },
    { departemen: "HR", skor: 79 },
  ];

  return (
    <>
      <style>{`
        .charts-row {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 16px;
        }
      `}</style>

      <StatCards stats={stats} />
      <div className="charts-row">
        <KPIChart data={kpiDepartemen} />
        <ScoreChart value={stats.overall_score} />
      </div>
    </>
  );
}