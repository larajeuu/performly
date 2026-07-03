import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function getTokenPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  const payload = await getTokenPayload();
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      nama_lengkap: true,
      email: true,
      username: true,
      jabatan: true,
      nip: true,
    },
  });

  return user;
}