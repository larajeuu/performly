"use client";

export default function KPIChart({ data }) {
  const maxSkor = Math.max(...data.map((d) => d.skor));

  return (
    <>
      <style>{`
        .chart-card {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .chart-title {
          font-size: 15px;
          font-weight: 700;
          color: #E8EEFF;
          margin-bottom: 24px;
        }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          height: 160px;
          padding: 0 8px;
          margin-bottom: 12px;
        }
        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .bar-fill {
          width: 100%;
          border-radius: 6px 6px 0 0;
          background: rgba(74,95,212,0.5);
          border: 1px solid rgba(100,120,255,0.2);
          transition: background 0.2s;
          min-height: 4px;
          cursor: pointer;
          position: relative;
        }
        .bar-fill:hover {
          background: rgba(107,127,232,0.8);
        }
        .bar-label {
          font-size: 11px;
          color: #6B7FCC;
          text-align: center;
        }
        .bar-caption {
          text-align: center;
          font-size: 11.5px;
          color: #4A5888;
          margin-top: 8px;
        }
        .bar-value {
          font-size: 11px;
          font-weight: 700;
          color: #A0B0FF;
          text-align: center;
          margin-bottom: 4px;
        }
      `}</style>

      <div className="chart-card">
        <div className="chart-title">Distribusi KPI Departemen</div>
        <div className="bar-chart">
          {data.map((item, i) => (
            <div key={i} className="bar-group">
              <div className="bar-value">{item.skor}</div>
              <div
                className="bar-fill"
                style={{ height: `${(item.skor / maxSkor) * 130}px` }}
                title={`${item.departemen}: ${item.skor}`}
              />
              <div className="bar-label">{item.departemen}</div>
            </div>
          ))}
        </div>
        <div className="bar-caption">Rata-rata pencapaian dalam 1 bulan</div>
      </div>
    </>
  );
}