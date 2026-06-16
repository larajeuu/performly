import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    try {
        const { karyawan_id: idStr } = await params
        const karyawan_id = parseInt(idStr)

        //ambil data payroll dari bulan terakhir yang ada
        const payroll = await prisma.payroll.findFirst({
            where: { karyawan_id },
            orderBy: [{tahun: 'desc'}, {bulan:'desc'}]
        })

        if (!payroll) {
            return NextResponse.json(
                {message: 'Data Payroll Belum Tersedia untuk Karyawan ini.'},
                {status: 404}
            )
        }

        // ambil data karyawan + user
        const karyawan = await prisma.karyawan.findUnique({
            where: {id: karyawan_id},
            include: {user: true}
        })

        // ambil KPI kwartal terakhir untuk hitung pencapaian KPI
        const kuartalDariBulan = Math.ceil(payroll.bulan/3)
        const kpi = await prisma.kPI.findFirst({
            where: {
                karyawan_id,
                kuartal: kuartalDariBulan,
                tahun: payroll.tahun
            }
        })

        return NextResponse.json({
            karyawan: {
                nama_lengkap: karyawan.user.nama_lengkap,
                jabatam: karyawan.user.jabatan,
                departemen: karyawan.departemen,
            },
            periode: {
                bulan: payroll.bulan,
                tahun: payroll.tahun,
            },
            rincian_gaji: {
                gaji_pokok: payroll.gaji_pokok,
                tunjangan: payroll.tunjangan,
                uang_lembur: payroll.uang_lembur,
                bonus_absensi: payroll.bonus_absensi,
                potongan_pajak: payroll.potongan_pajak,
                potongan_asuransi: payroll.potongan_asuransi,
                potongan_absensi: payroll.potongan_absensi,
                gaji_bersih: payroll.gaji_bersih,
            },
            bonus_kpi: {
                pencapaian_kpi: kpi?.skor_akhir ?? null,
                bonus_lainnya: payroll.bonus_lainnya,
            },
            total_kompensasi: payroll.gaji_bersih + payroll.bonus_lainnya
        })

    } catch (error) {
        console.error('Payroll Detail GET Error: ', error)
        return NextResponse.json(
            { message: 'Terjadi Kesalahan Server.' },
            { status: 500 }
        )
    }
}

export const dynamic = 'force-dynamic'