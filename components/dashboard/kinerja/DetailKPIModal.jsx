export default function DetailKPIModal({ karyawan, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", padding: "20px", margin: "100px auto", width: "400px" }}>
        <h2>{karyawan.nama}</h2>
        <p>Detail KPI akan ditampilkan di sini.</p>
        <button onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
}