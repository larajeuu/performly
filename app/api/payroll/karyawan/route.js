import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const karyawan = await prisma.karyawan.findMany({
            where: {status: 'Aktif'},
            include: {user: true},
            orderBy: {departemen: 'asc'}
        })

        const result = karyawan.map((k) => ({
            id: k.id,
            nama_lengkap: k.user.nama_lengkap,
            jabatan: k.user.jabatan,
            departemen: k.departemen,
        }))

        return NextResponse.json(result)

    } catch (error) {
        console.error('Payroll Karyawan GET Error', error)
        return NextResponse.json(
            { message: 'Terjadi Kesalahan Server' },
            { status: 500 }
        )
    }
}

export const dynamic = 'force-dynamic'