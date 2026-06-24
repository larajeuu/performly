"use client";

export default function AbsensiFilter({
  bulan,
  setBulan,
  tahun,
  setTahun,
  divisi,
  setDivisi,
  search,
  setSearch,
  divisiList,
  bulanOptions,
}) {
  const tahunOptions = [2024, 2025, 2026, 2027];

  return (
    <>
      <style>{`
        .filter-bar {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-select {
          background: #111E48;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 9px 14px;
          font-size: 13px;
          color: #EEF0F8;
          outline: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .filter-select:focus {
          border-color: rgba(79,142,247,0.4);
        }
        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
          max-width: 280px;
        }
        .search-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 9px 14px;
          font-size: 13px;
          color: #EEF0F8;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }
        .search-input:focus {
          border-color: rgba(79,142,247,0.4);
        }
        .search-input::placeholder {
          color: #5A6488;
        }
      `}</style>

      <div className="filter-bar">
        <select
          className="filter-select"
          value={bulan}
          onChange={(e) => setBulan(Number(e.target.value))}
        >
          {bulanOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={tahun}
          onChange={(e) => setTahun(Number(e.target.value))}
        >
          {tahunOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={divisi}
          onChange={(e) => setDivisi(e.target.value)}
        >
          <option value="">Pilih Divisi</option>
          {divisiList.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {divisi && (
          <div className="search-input-wrap">
            <input
              type="text"
              className="search-input"
              placeholder="Cari karyawan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
}