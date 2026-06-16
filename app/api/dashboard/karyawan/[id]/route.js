import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    try {
        const { id: idStr } = await params
        const id = parseInt(idStr)

        const karyawan = await prisma.karyawan.findUnique({
            where: { id },
            include: { user: true }
        })

        if (!karyawan) {
            return NextResponse.json(
                { message: 'Karyawan tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(karyawan)

    } catch (error) {
        console.error('Karyawan GET [id] error:', error)
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)
    const body = await request.json()
    console.log('body:', body)
    console.log('tanggal_masuk:', body.tanggal_masuk)
    console.log('tanggal_lahir:', body.tanggal_lahir)

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

    const karyawan = await prisma.karyawan.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!karyawan) {
      return NextResponse.json(
        { message: 'Karyawan tidak ditemukan' },
        { status: 404 }
      )
    }

    // Cek duplikat NIP & email (exclude diri sendiri)
    const existing = await prisma.user.findFirst({
      where: {
        AND: [
          { id: { not: karyawan.user_id } },
          { OR: [{ nip }, { email }] }
        ]
      }
    })

    if (existing) {
      if (existing.nip === nip) {
        return NextResponse.json(
          { message: 'NIP sudah digunakan karyawan lain' },
          { status: 409 }
        )
      }
      if (existing.email === email) {
        return NextResponse.json(
          { message: 'Email sudah digunakan karyawan lain' },
          { status: 409 }
        )
      }
    }

    // Update User
    await prisma.user.update({
      where: { id: karyawan.user_id },
      data: {
        nama_lengkap,
        nip,
        email,
        tanggal_masuk: tanggal_masuk ? new Date(tanggal_masuk) : null,
        tanggal_lahir: tanggal_lahir ? new Date(tanggal_lahir) : null,
        jabatan,
      }
    })

    // Update Karyawan
    await prisma.karyawan.update({
      where: { id },
      data: { departemen, status }
    })

    return NextResponse.json(
      { message: 'Data karyawan berhasil diupdate' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Karyawan PUT error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id: idStr } = await params
    const id = parseInt(idStr)

    const karyawan = await prisma.karyawan.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!karyawan) {
      return NextResponse.json(
        { message: 'Karyawan tidak ditemukan' },
        { status: 404 }
      )
    }

    await prisma.absensi.deleteMany({ where: { karyawan_id: id } })
    await prisma.kPI.deleteMany({ where: { karyawan_id: id } })
    await prisma.payroll.deleteMany({ where: { karyawan_id: id } })
    await prisma.karyawan.delete({ where: { id } })
    await prisma.user.delete({ where: { id: karyawan.user_id } })

    return NextResponse.json(
      { message: 'Karyawan berhasil dihapus' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Karyawan DELETE error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'