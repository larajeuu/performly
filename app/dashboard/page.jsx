"use client";

import { useState, useEffect } from "react";
import StatCards from "@/components/dashboard/StatCards";
import KPIChart from "@/components/dashboard/KPIChart";
import ScoreChart from "@/components/dashboard/ScoreChart";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Gagal fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ color: '#6B7FCC', padding: '40px', textAlign: 'center' }}>
        Memuat data dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ color: '#FCA5A5', padding: '40px', textAlign: 'center' }}>
        Gagal memuat data.
      </div>
    );
  }

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
        <KPIChart data={stats.kpi_per_departemen} />
        <ScoreChart value={stats.overall_score} />
      </div>
    </>
  );
}