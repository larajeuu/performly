import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request) {
  try {
    // 1. Ambil data dari request
    const body = await request.json()
    const { username, password } = body
    const passwordStr = String(password)

    // 2. Validasi field tidak kosong
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password harus diisi' },
        { status: 400 }
      )
    }

    // 3. Cari user di database
    const user = await prisma.user.findUnique({
      where: { username }
    })

    // 4. Kalau user tidak ditemukan
    if (!user) {
      return NextResponse.json(
        { message: 'Username atau password salah' },
        { status: 401 }
      )
    }

    // 5. Cek password
    const passwordMatch = await bcrypt.compare(passwordStr, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Username atau password salah' },
        { status: 401 }
      )
    }

    // 6. Buat JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        jabatan: user.jabatan
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    // 7. Kirim response dengan token di cookie
    const response = NextResponse.json(
      {
        message: 'Login berhasil',
        user: {
          id: user.id,
          nama_lengkap: user.nama_lengkap,
          username: user.username,
          jabatan: user.jabatan
        }
      },
      { status: 200 }
    )

    // Simpan token di HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8 // 8 jam
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'