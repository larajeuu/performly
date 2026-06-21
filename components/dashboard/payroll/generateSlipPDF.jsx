import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const bulanNama = [
  "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatRupiah(angka) {
  return `Rp ${angka.toLocaleString("id-ID")}`;
}

export async function generateSlipPDF(detail) {
  const doc = new jsPDF();
  const karyawan = detail.karyawan;

  // --- Header: Logo + Judul ---
  const logoUrl = "/logo-performly.png";
  const logoBase64 = await getBase64FromUrl(logoUrl);

  doc.addImage(logoBase64, "PNG", 14, 12, 16, 16);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Performly", 34, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Where Performance Meets Reward", 34, 25);

  doc.setDrawColor(200);
  doc.line(14, 32, 196, 32);

  // --- Info Karyawan ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SLIP GAJI KARYAWAN", 14, 42);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nama       : ${karyawan.nama_lengkap}`, 14, 50);
  doc.text(`NIP        : ${karyawan.nip}`, 14, 56);
  doc.text(`Jabatan    : ${karyawan.jabatan}`, 14, 62);
  doc.text(
    `Periode    : ${bulanNama[detail.periode.bulan]} ${detail.periode.tahun}`,
    14,
    68
  );

  // --- Tabel Rincian Gaji ---
  autoTable(doc, {
    startY: 76,
    head: [["Rincian Gaji", "Jumlah"]],
    body: [
      ["Gaji Pokok", formatRupiah(detail.rincian_gaji.gaji_pokok)],
      ["Tunjangan", `+ ${formatRupiah(detail.rincian_gaji.tunjangan)}`],
      ["Uang Lembur", `+ ${formatRupiah(detail.rincian_gaji.uang_lembur)}`],
      ["Bonus Absensi", `+ ${formatRupiah(detail.rincian_gaji.bonus_absensi)}`],
      ["Potongan Pajak", `- ${formatRupiah(detail.rincian_gaji.potongan_pajak)}`],
      ["Potongan Asuransi", `- ${formatRupiah(detail.rincian_gaji.potongan_asuransi)}`],
      ["Potongan Absensi", `- ${formatRupiah(detail.rincian_gaji.potongan_absensi)}`],
      ["Total Gaji Bersih", formatRupiah(detail.rincian_gaji.gaji_bersih)],
    ],
    theme: "grid",
    headStyles: { fillColor: [74, 95, 212] },
    bodyStyles: { fontSize: 10 },
  });

  // --- Tabel Bonus KPI ---
  const finalY = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: finalY,
    head: [["Bonus KPI", "Jumlah"]],
    body: [
      [
        "Pencapaian KPI",
        detail.bonus_kpi.pencapaian_kpi !== null
          ? `${detail.bonus_kpi.pencapaian_kpi}%`
          : "Belum ada data",
      ],
      ["Bonus Lainnya", `+ ${formatRupiah(detail.bonus_kpi.bonus_lainnya)}`],
      ["Total Kompensasi", formatRupiah(detail.total_kompensasi)],
    ],
    theme: "grid",
    headStyles: { fillColor: [251, 191, 36] },
    bodyStyles: { fontSize: 10 },
  });

  // --- Save File ---
  const fileName = `Slip_Gaji_${karyawan.nama_lengkap.replace(/\s/g, "_")}_${bulanNama[detail.periode.bulan]}_${detail.periode.tahun}.pdf`;
  doc.save(fileName);
}

// Helper: convert gambar dari public/ jadi base64
async function getBase64FromUrl(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}