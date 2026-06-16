"use client";

const bulanNama = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function formatRupiah(angka) {
    return `Rp ${angka.toLocaleString('id-ID')}`;   
}

export default function PayrollDetail({ detail, loading, hasSelection }) {
  return (
    <>
      <style>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-card {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          padding: 22px;
          backdrop-filter: blur(10px);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .detail-card-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #E8EEFF;
          margin-bottom: 18px;
          padding-left: 10px;
          border-left: 3px solid #6B7FE8;
        }

        .row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(100,120,255,0.06);
        }
        .row-item:last-of-type { border-bottom: none; }

        .row-label {
          font-size: 13px;
          color: #7B8FCC;
        }

        .row-value {
          font-size: 13.5px;
          font-weight: 600;
          color: #E8EEFF;
        }
        .row-value.positive { color: #4ADE80; }
        .row-value.negative { color: #F87171; }
        .row-value.highlight { color: #FCD34D; }

        .total-box {
          margin-top: 16px;
          padding: 14px 16px;
          background: rgba(74,95,212,0.12);
          border: 1px solid rgba(74,95,212,0.2);
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total-label {
          font-size: 13px;
          font-weight: 600;
          color: #A0B0FF;
        }
        .total-value {
          font-size: 18px;
          font-weight: 800;
          color: #93C5FD;
          font-family: 'Raleway', sans-serif;
        }

        .empty-state, .loading-state {
          background: rgba(18,33,80,0.85);
          border: 1px solid rgba(100,120,255,0.1);
          border-radius: 16px;
          padding: 60px 24px;
          text-align: center;
          color: #4A5888;
          font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          grid-column: 1 / -1;
        }

        .periode-badge {
          display: inline-block;
          background: rgba(251,191,36,0.12);
          color: #FCD34D;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 40px;
          margin-bottom: 16px;
        }
      `}</style>

      {!hasSelection ? (
        <div className="detail-grid">
          <div className="empty-state">Pilih divisi dan karyawan untuk melihat rincian payroll.</div>
        </div>
      ) : loading ? (
        <div className="detail-grid">
          <div className="loading-state">Memuat data payroll...</div>
        </div>
      ) : !detail ? (
        <div className="detail-grid">
          <div className="empty-state">Data payroll belum tersedia untuk karyawan ini.</div>
        </div>
      ) : (
        <div className="detail-grid">
          {/* Rincian Gaji */}
          <div className="detail-card">
            <div className="periode-badge">
              {bulanNama[detail.periode.bulan]} {detail.periode.tahun}
            </div>
            <div className="detail-card-title">Rincian Gaji</div>

            <div className="row-item">
              <span className="row-label">Gaji Pokok</span>
              <span className="row-value">{formatRupiah(detail.rincian_gaji.gaji_pokok)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Tunjangan</span>
              <span className="row-value positive">+{formatRupiah(detail.rincian_gaji.tunjangan)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Uang Lembur</span>
              <span className="row-value positive">+{formatRupiah(detail.rincian_gaji.uang_lembur)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Bonus Absensi</span>
              <span className="row-value positive">+{formatRupiah(detail.rincian_gaji.bonus_absensi)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Potongan Pajak</span>
              <span className="row-value negative">-{formatRupiah(detail.rincian_gaji.potongan_pajak)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Potongan Asuransi</span>
              <span className="row-value negative">-{formatRupiah(detail.rincian_gaji.potongan_asuransi)}</span>
            </div>
            <div className="row-item">
              <span className="row-label">Potongan Absensi</span>
              <span className="row-value negative">-{formatRupiah(detail.rincian_gaji.potongan_absensi)}</span>
            </div>

            <div className="total-box">
              <span className="total-label">Total Gaji Bersih</span>
              <span className="total-value">{formatRupiah(detail.rincian_gaji.gaji_bersih)}</span>
            </div>
          </div>

          {/* Bonus KPI */}
          <div className="detail-card">
            <div className="periode-badge" style={{ visibility: 'hidden' }}>spacer</div>
            <div className="detail-card-title">Perhitungan Bonus KPI</div>

            <div className="row-item">
              <span className="row-label">Pencapaian KPI</span>
              <span className="row-value highlight">
                {detail.bonus_kpi.pencapaian_kpi !== null
                  ? `${detail.bonus_kpi.pencapaian_kpi}%`
                  : 'Belum ada data'}
              </span>
            </div>
            <div className="row-item">
              <span className="row-label">Bonus Lainnya</span>
              <span className="row-value positive">+{formatRupiah(detail.bonus_kpi.bonus_lainnya)}</span>
            </div>

            <div className="total-box">
              <span className="total-label">Total Kompensasi</span>
              <span className="total-value">{formatRupiah(detail.total_kompensasi)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
