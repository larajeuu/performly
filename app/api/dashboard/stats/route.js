import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const sekarang = new Date()
    const bulanIni = sekarang.getMonth() + 1
    const tahunIni = sekarang.getFullYear()
    const kuartalIni = Math.ceil(bulanIni / 3)

    const payrollTerbaru = await prisma.payroll.findFirst({
      orderBy: [{ tahun: 'desc' }, { bulan: 'desc' }]
    })

    const bulanQuery = payrollTerbaru?.bulan ?? bulanIni
    const tahunQuery = payrollTerbaru?.tahun ?? tahunIni

    // 1. Karyawan Aktif
    const karyawanAktif = await prisma.karyawan.count({
      where: { status: 'Aktif' }
    })

    // 2. Rata-rata KPI kuartal ini
    const kpiData = await prisma.kPI.findMany({
      where: {
        kuartal: kuartalIni,
        tahun: tahunIni
      }
    })

    const rataKPI = kpiData.length > 0
      ? Math.round(kpiData.reduce((sum, k) => sum + k.skor_akhir, 0) / kpiData.length)
      : 0

    // 3. Total gaji bulan ini
    const payrollData = await prisma.payroll.findMany({
      where: {
        bulan: bulanQuery,
        tahun: tahunQuery
      }
    })

    const totalGaji = payrollData.reduce((sum, p) => sum + p.gaji_bersih, 0)

    // 4. Absensi harian (hari ini)
    const hariIni = new Date()
    hariIni.setHours(0, 0, 0, 0)
    const besok = new Date(hariIni)
    besok.setDate(besok.getDate() + 1)

    const absensiHariIni = await prisma.absensi.findMany({
      where: {
        tanggal: {
          gte: hariIni,
          lt: besok
        }
      }
    })

    const hadirHariIni = absensiHariIni.filter(a => a.status === 'Hadir').length
    const persenAbsensi = karyawanAktif > 0
      ? Math.round((hadirHariIni / karyawanAktif) * 100)
      : 0

    // 5. Overall Score
    const overallScore = kpiData.length > 0
      ? Math.round(kpiData.reduce((sum, k) => sum + k.skor_akhir, 0) / kpiData.length * 10) / 10
      : 0

    // 6. KPI per departemen
    const karyawanDenganKPI = await prisma.karyawan.findMany({
      where: { status: 'Aktif' },
      include: {
        kpi: {
          where: {
            kuartal: kuartalIni,
            tahun: tahunIni
          }
        }
      }
    })

    const departemenMap = {}
    for (const k of karyawanDenganKPI) {
      if (k.kpi.length === 0) continue
      if (!departemenMap[k.departemen]) {
        departemenMap[k.departemen] = { total: 0, count: 0 }
      }
      departemenMap[k.departemen].total += k.kpi[0].skor_akhir
      departemenMap[k.departemen].count += 1
    }

    const kpiPerDepartemen = Object.entries(departemenMap).map(([dept, val]) => ({
      departemen: dept,
      skor: Math.round(val.total / val.count)
    }))

    return NextResponse.json({
      karyawan_aktif: karyawanAktif,
      rata_kpi: rataKPI,
      total_gaji: totalGaji,
      absensi: persenAbsensi,
      overall_score: overallScore,
      kpi_per_departemen: kpiPerDepartemen
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'