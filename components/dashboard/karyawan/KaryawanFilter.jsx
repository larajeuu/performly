"use client";

export default function KaryawanFilter({ filter, setFilter }) {
  const jabatanOptions = [
    'Semua Jabatan', 'HR', 'Manager', 'Staff', 'Supervisor', 'Operasional'
  ];

  const statusOptions = ['Semua Status', 'Aktif', 'Tidak Aktif'];

  return (
    <>
      <style>{`
        .filter-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-select {
          background: rgba(30,55,120,0.5);
          border: 1px solid rgba(100,130,255,0.15);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          color: #E8EEFF;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7FCC' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
          transition: border-color 0.2s;
        }
        .filter-select:focus {
          border-color: rgba(100,130,255,0.4);
        }
        .filter-select option {
          background: #1a2a6e;
          color: #E8EEFF;
        }
      `}</style>

      <div className="filter-wrap">
        <select
          className="filter-select"
          value={filter.jabatan}
          onChange={(e) => setFilter({
            ...filter,
            jabatan: e.target.value === 'Semua Jabatan' ? '' : e.target.value
          })}
        >
          {jabatanOptions.map((opt) => (
            <option key={opt} value={opt === 'Semua Jabatan' ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filter.status}
          onChange={(e) => setFilter({
            ...filter,
            status: e.target.value === 'Semua Status' ? '' : e.target.value
          })}
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt === 'Semua Status' ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}