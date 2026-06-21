import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const bulan = parseInt(searchParams.get("bulan"));
        const tahun = parseInt(searchParams.get("tahun"));
        const divisi = searchParams.get("divisi");

        if (!bulan || !tahun || !divisi) {
            return NextResponse.json(
                { error: "Parameter bulan, tahun, dan divisi wajib diisi" },
                { status: 400 }
            );
        }

        //menentukan rentang tanggal awal-akhir bulan yang dipilih
        const tanggalAwal = new Date(tahun, bulan - 1, 1);
        const tanggalAkhir = new Date(tahun, bulan, 0);

        //ambil karyawan sesuai divisi, sekaligus data absensi
        const karyawanList = await prisma.karyawan.findMany({
            where: { departemen: divisi },
            include: {
                user: true,
                absensi: {
                    where: {
                        tanggal: {
                            gte: tanggalAwal,
                            lte: tanggalAkhir,
                        },
                    },
                },
            },
        });

        // susun ulang data supaya gampang dipakai di frontend
        const data = karyawanList.map((k) => {
            const absensiPerTanggal = {};
            const rekap = { Hadir: 0, Izin: 0, Sakit: 0, Cuti: 0, Alpha: 0, WFH: 0};

            k.absensi.forEach((a) => {
                const tgl = new Date(a.tanggal).getDate(); //ambil tanggal 1-31
                absensiPerTanggal[tgl] = a.status;
                rekap[a.status] = (rekap[a.status] || 0) + 1;
            });

            return {
                karyawan_id: k.id,
                nama: k.user.nama_lengkap,
                absensi: absensiPerTanggal,
                rekap,
            };
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Absensi GET error: ", error);
        return NextResponse.json(
            { error: "Gagal mengambil data absensi"},
            { status: 500 }
        );
    }
}