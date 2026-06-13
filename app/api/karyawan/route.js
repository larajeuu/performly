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

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      nama_lengkap,
      nip,
      email,
      tanggal_masuk,
      tanggal_lahir,
      jabatan,
      departemen,
      status
    } = body

    // 1. Validasi field
    if (!nama_lengkap || !nip || !email || !tanggal_masuk ||
        !tanggal_lahir || !jabatan || !departemen) {
      return NextResponse.json(
        { message: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    // 2. Cek duplikat NIP & email
    const existing = await prisma.user.findFirst({
      where: { OR: [{ nip }, { email }] }
    })

    if (existing) {
      if (existing.nip === nip) {
        return NextResponse.json(
          { message: 'NIP sudah terdaftar' },
          { status: 409 }
        )
      }
      if (existing.email === email) {
        return NextResponse.json(
          { message: 'Email sudah terdaftar' },
          { status: 409 }
        )
      }
    }

    // 3. Generate username & password otomatis
    const username = nama_lengkap
      .toLowerCase()
      .replace(/\s+/g, '.')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.default.hash('performly123', 10)

    // 4. Simpan ke User
    const user = await prisma.user.create({
      data: {
        nama_lengkap,
        nip,
        email,
        tanggal_masuk: new Date(tanggal_masuk),
        tanggal_lahir: new Date(tanggal_lahir),
        jabatan,
        username,
        password: hashedPassword
      }
    })

    // 5. Simpan ke Karyawan
    await prisma.karyawan.create({
      data: {
        user_id: user.id,
        departemen,
        status: status || 'Aktif'
      }
    })

    return NextResponse.json(
      { message: 'Karyawan berhasil ditambahkan' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Karyawan POST error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
export const dynamic = 'force-dynamic'