import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nama_lengkap, email } = body;

    if (!nama_lengkap || !email) {
      return NextResponse.json(
        { error: "Nama dan email wajib diisi" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    const emailTaken = await prisma.user.findFirst({
      where: { email, NOT: { id: currentUser.id } },
    });

    if (emailTaken) {
      return NextResponse.json(
        { error: "Email sudah digunakan akun lain" },
        { status: 409 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { nama_lengkap, email },
      select: {
        id: true,
        nama_lengkap: true,
        email: true,
        username: true,
        jabatan: true,
        nip: true,
      },
    });

    return NextResponse.json({
      message: "Profil berhasil diperbarui",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui profil" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";