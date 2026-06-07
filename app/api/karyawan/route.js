import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const jabatan = searchParams.get('jabatan')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where = {}

    if (status) where.status = status

    if (jabatan || search) {
      where.user = {}
      if (jabatan) where.user.jabatan = jabatan
      if (search) {
        where.user.OR = [
          { nama_lengkap: { contains: search, mode: 'insensitive' } },
          { nip: { contains: search, mode: 'insensitive' } },
        ]
      }
    }

    const karyawan = await prisma.karyawan.findMany({
      where,
      include: {
        user: true,
        kpi: {
          orderBy: [{ tahun: 'desc' }, { kuartal: 'desc' }],
          take: 1
        },
        payroll: {
          orderBy: [{ tahun: 'desc' }, { bulan: 'desc' }],
          take: 1
        }
      },
      orderBy: { created_at: 'asc' }
    })

    const result = karyawan.map((k) => ({
      id: k.id,
      nama_lengkap: k.user.nama_lengkap,
      nip: k.user.nip,
      email: k.user.email,
      jabatan: k.user.jabatan,
      departemen: k.departemen,
      tanggal_masuk: k.user.tanggal_masuk,
      status: k.status,
      foto: k.foto,
      kpi: k.kpi[0]?.skor_akhir ?? null,
      gaji_pokok: k.payroll[0]?.gaji_pokok ?? null,
    }))

    return NextResponse.json(result)

  } catch (error) {
    console.error('Karyawan GET error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'