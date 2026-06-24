import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const result = await prisma.karyawan.findMany({
            select: { departemen: true},
            distinct: ["departemen"],
            orderBy: { departemen: "asc"},
        });

        const divisiList = result.map((r) => r.departemen);
        
        return NextResponse.json(divisiList);
    } catch (error) {
        console.error("Divisi GET Error: ", error);
        return NextResponse.json(
            { error: "Gagal mengambil data divisi" },
            { status: 500 }
        );
    }
}