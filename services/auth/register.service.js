import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data) {
  const {
    nama_lengkap,
    nip,
    email,
    tanggal_masuk,
    tanggal_lahir,
    jabatan,
    username,
    password,
    konfirmasi_password,
  } = data;

  if (
    !nama_lengkap ||
    !nip ||
    !email ||
    !tanggal_masuk ||
    !tanggal_lahir ||
    !jabatan ||
    !username ||
    !password
  ) {
    throw createError("Semua field harus diisi", 400);
  }

  if (jabatan !== "HR") {
    throw createError("Hanya staff HR yang dapat mendaftar", 403);
  }

  if (password !== konfirmasi_password) {
    throw createError("Password dan konfirmasi password tidak cocok", 400);
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ nip }, { email }, { username }],
    },
  });

  if (existingUser) {
    if (existingUser.nip === nip) {
      throw createError("NIP sudah terdaftar", 409);
    }

    if (existingUser.email === email) {
      throw createError("Email sudah terdaftar", 409);
    }

    if (existingUser.username === username) {
      throw createError("Username sudah digunakan", 409);
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      nama_lengkap,
      nip,
      email,
      tanggal_masuk: new Date(tanggal_masuk),
      tanggal_lahir: new Date(tanggal_lahir),
      jabatan,
      username,
      password: hashedPassword,
    },
  });

  return {
    userId: user.id,
  };
}

function createError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}