import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const kuartal = parseInt(searchParams.get("kuartal"));
        const tahun = parseInt(searchParams.get("tahun"));
        
        if (!kuartal || !tahun) {
            return NextResponse.json(
                { error : "Parameter kuartal dan tahun wajib diisi" },
                { status : 400 }
            );
        }

        const karyawan = await prisma.karyawan.findMany({
            include: {
                user: true,
                kpi: {
                    where: { kuartal, tahun },
                },
            },
        });

        const data = karyawan.map((k) => ({
            id: k.id,
            nama: k.user.nama_lengkap,
            nip: k.user.nip,
            jabatan: k.user.jabatan,
            kpi: k.kpi[0] || null, // kalau blm ada kpi di kuartal tersebut
        }));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Gagal mengambil data kinerja"},
            { status: 500 }
        );
    }
}