"use client";

export default function ScoreChart({ value }) {
  const cx = 100, cy = 95, r = 70;
  const angle = (value / 100) * 180;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toFixed = (num) => Math.round(num * 100) / 100;

  const startX = toFixed(cx - r);
  const startY = toFixed(cy);
  const endX = toFixed(cx + r * Math.cos(toRad(180 - angle)));
  const endY = toFixed(cy - r * Math.sin(toRad(180 - angle)));
  const largeArc = angle > 180 ? 1 : 0;

  return (
    <>
      <style>{`
        .score-card {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(10px);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .score-title {
          font-size: 15px;
          font-weight: 700;
          color: #E8EEFF;
          margin-bottom: 24px;
        }
        .gauge-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        .gauge-trend {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #4ADE80;
        }
      `}</style>

      <div className="score-card">
        <div className="score-title">Overall Score</div>
        <div className="gauge-wrap">
          <svg width="200" height="110" viewBox="0 0 200 110">
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ADE80"/>
                <stop offset="100%" stopColor="#FB923C"/>
              </linearGradient>
            </defs>
            {/* Track */}
            <path
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke="rgba(100,120,255,0.1)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Fill */}
            <path
              d={`M ${startX} ${startY} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${endY}`}
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Score */}
            <text
              x={cx} y={cy + 8}
              textAnchor="middle"
              fill="#E8EEFF"
              fontSize="22"
              fontWeight="800"
              fontFamily="Raleway, sans-serif"
            >
              {value}%
            </text>
          </svg>
          <div className="gauge-trend">↗ +2.3 dari bulan lalu</div>
        </div>
      </div>
    </>
  );
}