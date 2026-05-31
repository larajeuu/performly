-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "departemen" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "foto" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GajiJabatan" (
    "id" SERIAL NOT NULL,
    "jabatan" TEXT NOT NULL,
    "gaji_pokok" DOUBLE PRECISION NOT NULL,
    "tunjangan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GajiJabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "karyawan_id" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "gaji_pokok" DOUBLE PRECISION NOT NULL,
    "tunjangan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bonus_absensi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bonus_lainnya" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "potongan_pajak" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "potongan_asuransi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "potongan_absensi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gaji_bersih" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "karyawan_id" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KPI" (
    "id" SERIAL NOT NULL,
    "karyawan_id" INTEGER NOT NULL,
    "kuartal" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "skor_produktivitas" DOUBLE PRECISION NOT NULL,
    "skor_kualitas" DOUBLE PRECISION NOT NULL,
    "skor_kehadiran" DOUBLE PRECISION NOT NULL,
    "skor_akhir" DOUBLE PRECISION NOT NULL,
    "catatan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KPI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_user_id_key" ON "Karyawan"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GajiJabatan_jabatan_key" ON "GajiJabatan"("jabatan");

-- CreateIndex
CREATE UNIQUE INDEX "Payroll_karyawan_id_bulan_tahun_key" ON "Payroll"("karyawan_id", "bulan", "tahun");

-- CreateIndex
CREATE UNIQUE INDEX "Absensi_karyawan_id_tanggal_key" ON "Absensi"("karyawan_id", "tanggal");

-- CreateIndex
CREATE UNIQUE INDEX "KPI_karyawan_id_kuartal_tahun_key" ON "KPI"("karyawan_id", "kuartal", "tahun");

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KPI" ADD CONSTRAINT "KPI_karyawan_id_fkey" FOREIGN KEY ("karyawan_id") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
