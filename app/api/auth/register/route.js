import { NextResponse } from "next/server";
import { registerUser } from "@/services/auth/register.service";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await registerUser(body);

    return NextResponse.json(
      { message: "Akun berhasil dibuat", userId: result.userId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan server" },
      { status: error.status || 500 }
    );
  }
}

export const dynamic = "force-dynamic";