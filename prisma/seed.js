import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// ── HELPER: generate semua tanggal Senin-Jumat di suatu bulan ──
function getHariKerja(tahun, bulan) {
  const hariKerja = []
  const jumlahHari = new Date(tahun, bulan, 0).getDate() // total hari di bulan itu

  for (let tanggal = 1; tanggal <= jumlahHari; tanggal++) {
    const date = new Date(tahun, bulan - 1, tanggal)
    const hari = date.getDay() // 0 = Minggu, 6 = Sabtu

    if (hari !== 0 && hari !== 6) {
      hariKerja.push(date.toISOString().split('T')[0]) // format "YYYY-MM-DD"
    }
  }

  return hariKerja
}

// ── HELPER: pilih status absensi secara acak dengan bobot probabilitas ──
function getRandomStatusAbsensi() {
  const random = Math.random() * 100

  if (random < 73) return 'Hadir'        // 0 - 73       → 73%
  if (random < 83) return 'WFH'          // 73 - 83      → 10%
  if (random < 89) return 'Cuti'         // 83 - 89      → 6%
  if (random < 95) return 'Izin'         // 89 - 95      → 6%
  if (random < 99) return 'Sakit'        // 95 - 99      → 4%
  return 'Alpha'                          // 99 - 100     → 1%
}

async function main() {
  console.log('🌱 Seeding database...')

  // ── 1. GAJI JABATAN ──
  const gajiData = [
    { jabatan: 'HR', gaji_pokok: 8000000, tunjangan: 1500000 },
    { jabatan: 'Manager', gaji_pokok: 12000000, tunjangan: 2500000 },
    { jabatan: 'Staff', gaji_pokok: 5000000, tunjangan: 800000 },
    { jabatan: 'Supervisor', gaji_pokok: 9000000, tunjangan: 1800000 },
    { jabatan: 'Operasional', gaji_pokok: 6000000, tunjangan: 1000000 },
  ]

  for (const gaji of gajiData) {
    await prisma.gajiJabatan.upsert({
      where: { jabatan: gaji.jabatan },
      update: {},
      create: gaji
    })
  }
  console.log('✅ GajiJabatan selesai')

  // ── 2. USER + KARYAWAN ──
  const karyawanData = [
    {
      nama_lengkap: 'Larasati Dwi Febriyanti',
      nip: '21950001',
      email: 'larasati@performly.com',
      tanggal_masuk: new Date('2021-01-15'),
      tanggal_lahir: new Date('1995-05-20'),
      jabatan: 'HR',
      username: 'larasati.hr',
      departemen: 'HR',
    },
    {
      nama_lengkap: 'Budi Santoso',
      nip: '20920002',
      email: 'budi@performly.com',
      tanggal_masuk: new Date('2020-03-10'),
      tanggal_lahir: new Date('1992-07-15'),
      jabatan: 'Manager',
      username: 'budi.manager',
      departemen: 'IT',
    },
    {
      nama_lengkap: 'Siti Rahayu',
      nip: '22980003',
      email: 'siti@performly.com',
      tanggal_masuk: new Date('2022-06-02'),
      tanggal_lahir: new Date('1998-03-12'),
      jabatan: 'Staff',
      username: 'siti.staff',
      departemen: 'Marketing',
    },
    {
      nama_lengkap: 'Rizky Aditya',
      nip: '19970004',
      email: 'rizky@performly.com',
      tanggal_masuk: new Date('2019-08-20'),
      tanggal_lahir: new Date('1997-11-08'),
      jabatan: 'Supervisor',
      username: 'rizky.supervisor',
      departemen: 'Operasional',
    },
    {
      nama_lengkap: 'Dewi Kusuma',
      nip: '23000005',
      email: 'dewi@performly.com',
      tanggal_masuk: new Date('2023-01-11'),
      tanggal_lahir: new Date('2000-09-25'),
      jabatan: 'Staff',
      username: 'dewi.staff',
      departemen: 'Finance',
    },
    {
      nama_lengkap: 'Ahmad Fauzi',
      nip: '20930006',
      email: 'ahmad@performly.com',
      tanggal_masuk: new Date('2020-05-18'),
      tanggal_lahir: new Date('1993-04-30'),
      jabatan: 'Manager',
      username: 'ahmad.manager',
      departemen: 'Finance',
    },
    {
      nama_lengkap: 'Nur Hidayah',
      nip: '21960007',
      email: 'nur@performly.com',
      tanggal_masuk: new Date('2021-09-01'),
      tanggal_lahir: new Date('1996-12-14'),
      jabatan: 'Staff',
      username: 'nur.staff',
      departemen: 'IT',
    },
    {
      nama_lengkap: 'Dimas Prasetyo',
      nip: '22990008',
      email: 'dimas@performly.com',
      tanggal_masuk: new Date('2022-03-07'),
      tanggal_lahir: new Date('1999-06-22'),
      jabatan: 'Operasional',
      username: 'dimas.operasional',
      departemen: 'Operasional',
    },
    {
      nama_lengkap: 'Fitri Amalia',
      nip: '23010009',
      email: 'fitri@performly.com',
      tanggal_masuk: new Date('2023-04-03'),
      tanggal_lahir: new Date('2001-02-18'),
      jabatan: 'Staff',
      username: 'fitri.staff',
      departemen: 'Marketing',
    },
    {
      nama_lengkap: 'Hendra Wijaya',
      nip: '20910010',
      email: 'hendra@performly.com',
      tanggal_masuk: new Date('2020-11-25'),
      tanggal_lahir: new Date('1991-08-05'),
      jabatan: 'Supervisor',
      username: 'hendra.supervisor',
      departemen: 'HR',
    },
  ]

  const password = await bcrypt.hash('performly123', 10)

  for (const data of karyawanData) {
    const user = await prisma.user.upsert({
      where: { nip: data.nip },
      update: {},
      create: {
        nama_lengkap: data.nama_lengkap,
        nip: data.nip,
        email: data.email,
        tanggal_masuk: data.tanggal_masuk,
        tanggal_lahir: data.tanggal_lahir,
        jabatan: data.jabatan,
        username: data.username,
        password,
      }
    })

    await prisma.karyawan.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        user_id: user.id,
        departemen: data.departemen,
        status: 'Aktif',
      }
    })
  }
  console.log('✅ User & Karyawan selesai')

  // ── 3. ABSENSI (Mei 2026, 22 hari kerja) ──
  const karyawanList = await prisma.karyawan.findMany()
  const hariKerja = [
    '2026-05-04', '2026-05-05', '2026-05-06', '2026-05-07', '2026-05-08',
    '2026-05-11', '2026-05-12', '2026-05-13', '2026-05-14', '2026-05-15',
    '2026-05-18', '2026-05-19', '2026-05-20', '2026-05-21', '2026-05-22',
    '2026-05-25', '2026-05-26', '2026-05-27', '2026-05-28', '2026-05-29',
  ]

  const statusAbsensi = ['Hadir', 'Hadir', 'Hadir', 'Hadir', 'Sakit', 'Izin', 'Alpha']

  for (const karyawan of karyawanList) {
    for (const hari of hariKerja) {
      const randomStatus = statusAbsensi[Math.floor(Math.random() * statusAbsensi.length)]
      await prisma.absensi.upsert({
        where: {
          karyawan_id_tanggal: {
            karyawan_id: karyawan.id,
            tanggal: new Date(hari)
          }
        },
        update: {},
        create: {
          karyawan_id: karyawan.id,
          tanggal: new Date(hari),
          status: randomStatus,
          keterangan: randomStatus === 'Sakit' ? 'Sakit demam' :
                      randomStatus === 'Izin' ? 'Keperluan keluarga' : null
        }
      })
    }
  }
  console.log('✅ Absensi (Mei 2026) selesai')

  // ── 3b. ABSENSI TAMBAHAN (Juni - September 2026) ──
  // Catatan: data Mei 2026 di atas TIDAK disentuh, supaya Payroll Mei tetap konsisten.
  // Bulan ini ditambahkan baru dengan status lebih lengkap: Hadir, WFH, Cuti, Izin, Sakit, Alpha

  const bulanTambahan = [
    { tahun: 2026, bulan: 6 }, // Juni
    { tahun: 2026, bulan: 7 }, // Juli
    { tahun: 2026, bulan: 8 }, // Agustus
    { tahun: 2026, bulan: 9 }, // September
  ]

  for (const { tahun, bulan } of bulanTambahan) {
    const hariKerjaBulanIni = getHariKerja(tahun, bulan)

    for (const karyawan of karyawanList) {
      for (const hari of hariKerjaBulanIni) {
        const randomStatus = getRandomStatusAbsensi()

        const keteranganMap = {
          Sakit: 'Sakit demam',
          Izin: 'Keperluan keluarga',
          Cuti: 'Cuti tahunan',
          WFH: 'Work From Home',
        }

        await prisma.absensi.upsert({
          where: {
            karyawan_id_tanggal: {
              karyawan_id: karyawan.id,
              tanggal: new Date(hari)
            }
          },
          update: {},
          create: {
            karyawan_id: karyawan.id,
            tanggal: new Date(hari),
            status: randomStatus,
            keterangan: keteranganMap[randomStatus] || null
          }
        })
      }
    }
    console.log(`✅ Absensi (${bulan}/${tahun}) selesai`)
  }

  // ── 4. KPI (Kuartal 1 & 2 2026) ──
  for (const karyawan of karyawanList) {
    for (const kuartal of [1, 2]) {
      const produktivitas = Math.floor(Math.random() * 30) + 70
      const kualitas = Math.floor(Math.random() * 30) + 70
      const kehadiran = Math.floor(Math.random() * 20) + 80
      const skor_akhir = (produktivitas * 0.4) + (kualitas * 0.3) + (kehadiran * 0.3)

      await prisma.kPI.upsert({
        where: {
          karyawan_id_kuartal_tahun: {
            karyawan_id: karyawan.id,
            kuartal,
            tahun: 2026
          }
        },
        update: {},
        create: {
          karyawan_id: karyawan.id,
          kuartal,
          tahun: 2026,
          skor_produktivitas: produktivitas,
          skor_kualitas: kualitas,
          skor_kehadiran: kehadiran,
          skor_akhir: Math.round(skor_akhir * 10) / 10,
        }
      })
    }
  }
  console.log('✅ KPI selesai')

  // ── 5. PAYROLL (Mei 2026) ──
  const gajiJabatan = await prisma.gajiJabatan.findMany()

  for (const karyawan of karyawanList) {
    const user = await prisma.user.findUnique({
      where: { id: karyawan.user_id }
    })

    const gajiRef = gajiJabatan.find(g => g.jabatan === user.jabatan)
    if (!gajiRef) continue

    const absensiKaryawan = await prisma.absensi.findMany({
      where: {
        karyawan_id: karyawan.id,
        tanggal: {
          gte: new Date('2026-05-01'),
          lte: new Date('2026-05-31')
        }
      }
    })

    const totalHari = hariKerja.length
    const hadirCount = absensiKaryawan.filter(a => a.status === 'Hadir').length
    const alphaCount = absensiKaryawan.filter(a => a.status === 'Alpha').length

    const bonus_absensi = hadirCount === totalHari ? 500000 : 0
    const potongan_absensi = alphaCount * 200000
    const potongan_pajak = gajiRef.gaji_pokok * 0.05
    const potongan_asuransi = gajiRef.gaji_pokok * 0.02
    const gaji_bersih = gajiRef.gaji_pokok + gajiRef.tunjangan +
                        bonus_absensi - potongan_absensi -
                        potongan_pajak - potongan_asuransi

    await prisma.payroll.upsert({
      where: {
        karyawan_id_bulan_tahun: {
          karyawan_id: karyawan.id,
          bulan: 5,
          tahun: 2026
        }
      },
      update: {},
      create: {
        karyawan_id: karyawan.id,
        bulan: 5,
        tahun: 2026,
        gaji_pokok: gajiRef.gaji_pokok,
        tunjangan: gajiRef.tunjangan,
        bonus_absensi,
        potongan_pajak,
        potongan_asuransi,
        potongan_absensi,
        gaji_bersih: Math.round(gaji_bersih),
        status: 'Dibayar'
      }
    })
  }
  console.log('✅ Payroll selesai')

  console.log('🎉 Seeding selesai!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })