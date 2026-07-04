import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { password_lama, password_baru, konfirmasi_password } = body;

    if (!password_lama || !password_baru || !konfirmasi_password) {
      return NextResponse.json(
        { error: "Semua field password wajib diisi" },
        { status: 400 }
      );
    }

    if (password_baru !== konfirmasi_password) {
      return NextResponse.json(
        { error: "Konfirmasi password tidak cocok" },
        { status: 400 }
      );
    }

    if (password_baru.length < 8) {
      return NextResponse.json(
        { error: "Password baru minimal 8 karakter" },
        { status: 400 }
      );
    }

    const userWithPassword = await prisma.user.findUnique({
      where: { id: currentUser.id },
      select: { password: true },
    });

    const isMatch = await bcrypt.compare(password_lama, userWithPassword.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Password lama tidak sesuai" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password_baru, 10);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui password" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";