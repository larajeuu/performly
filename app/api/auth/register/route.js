import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    // 1. Ambil data dari request
    const body = await request.json()
    const {
      nama_lengkap,
      nip,
      email,
      tanggal_masuk,
      tanggal_lahir,
      jabatan,
      username,
      password,
      konfirmasi_password
    } = body

    // 2. Validasi semua field harus terisi
    if (!nama_lengkap || !nip || !email || !tanggal_masuk || 
        !tanggal_lahir || !jabatan || !username || !password) {
      return NextResponse.json(
        { message: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    // 3. Validasi hanya HR yang bisa daftar
    if (jabatan !== 'HR') {
      return NextResponse.json(
        { message: 'Hanya staff HR yang dapat mendaftar' },
        { status: 403 }
      )
    }

    // 4. Validasi password match
    if (password !== konfirmasi_password) {
      return NextResponse.json(
        { message: 'Password dan konfirmasi password tidak cocok' },
        { status: 400 }
      )
    }

    // 5. Cek duplikat NIP, email, username
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { nip },
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      if (existingUser.nip === nip) {
        return NextResponse.json(
          { message: 'NIP sudah terdaftar' },
          { status: 409 }
        )
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { message: 'Email sudah terdaftar' },
          { status: 409 }
        )
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { message: 'Username sudah digunakan' },
          { status: 409 }
        )
      }
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 7. Simpan ke database
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

    return NextResponse.json(
      { message: 'Akun berhasil dibuat', userId: user.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'