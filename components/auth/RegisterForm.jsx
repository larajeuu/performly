"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nama_lengkap: "",
        nip: "",
        email: "",
        tanggal_masuk: "",
        tanggal_lahir: "",
        jabatan: "HR",
        username: "",
        password: "",
        konfirmasi_password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validasi frontend
        if (formData.password !== formData.konfirmasi_password) {
            setError("Password dan konfirmasi password tidak cocok");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Terjadi kesalahan");
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000);

        } catch (err) {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Raleway:wght@800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .root {
                    min-height: 100vh;
                    background: #0C1A3D;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    position: relative;
                    overflow: hidden;
                    padding: 40px 16px;
                }

                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    pointer-events: none;
                }
                .blob-tl {
                    width: 500px; height: 500px;
                    background: rgba(60,80,200,0.18);
                    top: -160px; left: -120px;
                }
                .blob-br {
                    width: 380px; height: 380px;
                    background: rgba(80,60,180,0.12);
                    bottom: -100px; right: -80px;
                }

                .card {
                    position: relative; z-index: 10;
                    background: rgba(18, 33, 80, 0.92);
                    border: 1px solid rgba(100,120,255,0.12);
                    border-radius: 24px;
                    width: 100%;
                    max-width: 560px;
                    padding: 48px 44px 40px;
                    backdrop-filter: blur(28px);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
                    animation: rise 0.55s cubic-bezier(0.22,1,0.36,1) both;
                }

                @keyframes rise {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .brand {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                    margin-bottom: 32px;
                }

                .brand-logo {
                    width: 48px; height: 48px;
                    border-radius: 12px;
                    background: linear-gradient(145deg, #2C3E8C, #5B4FCF, #8B6FE8);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 6px 24px rgba(79,100,241,0.35);
                }
                .brand-logo svg { width: 28px; height: 28px; }

                .brand-name {
                    font-family: 'Raleway', sans-serif;
                    font-size: 26px;
                    font-weight: 800;
                    color: #E8EEFF;
                    letter-spacing: -0.5px;
                    line-height: 1;
                }
                .brand-tagline {
                    font-size: 11px;
                    color: #6B7FCC;
                    margin-top: 3px;
                }

                .page-title {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;
                    color: #E8EEFF;
                    margin-bottom: 28px;
                    letter-spacing: -0.3px;
                }

                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .field { margin-bottom: 14px; }
                .field label {
                    display: block;
                    font-size: 13px;
                    font-weight: 500;
                    color: #A0AECE;
                    margin-bottom: 7px;
                }

                .field input,
                .field select {
                    width: 100%;
                    background: rgba(30, 55, 120, 0.55);
                    border: 1px solid rgba(100,130,255,0.15);
                    border-radius: 10px;
                    padding: 12px 16px;
                    font-size: 14px;
                    color: #E8EEFF;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                }
                .field input:focus,
                .field select:focus {
                    border-color: rgba(100,130,255,0.45);
                    background: rgba(40,70,150,0.5);
                    box-shadow: 0 0 0 3px rgba(79,100,241,0.12);
                }
                .field select option {
                    background: #1a2a6e;
                    color: #E8EEFF;
                }

                .divider {
                    border: none;
                    border-top: 1px solid rgba(100,130,255,0.08);
                    margin: 18px 0;
                }

                .error-box {
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.2);
                    border-radius: 8px;
                    padding: 10px 14px;
                    font-size: 12.5px;
                    color: #FCA5A5;
                    margin-bottom: 14px;
                }

                .success-box {
                    background: rgba(34,197,94,0.1);
                    border: 1px solid rgba(34,197,94,0.2);
                    border-radius: 8px;
                    padding: 10px 14px;
                    font-size: 12.5px;
                    color: #86EFAC;
                    margin-bottom: 14px;
                    text-align: center;
                }

                .btn-daftar {
                    width: 100%;
                    background: linear-gradient(90deg, #4A5FD4, #6B7FE8);
                    border: none;
                    border-radius: 40px;
                    padding: 14px;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    color: #fff;
                    cursor: pointer;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    margin-top: 20px;
                    transition: opacity 0.2s, transform 0.15s;
                    box-shadow: 0 4px 20px rgba(79,100,241,0.4);
                }
                .btn-daftar:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                .btn-daftar:disabled { opacity: 0.55; cursor: not-allowed; }

                .footer-note {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 12.5px;
                    color: #6B7FAA;
                    font-style: italic;
                }
                .footer-note a {
                    color: #8FA0F0;
                    font-weight: 600;
                    text-decoration: none;
                }
                .footer-note a:hover { color: #A8B8FF; }
            `}</style>

            <div className="root">
                <div className="blob blob-tl" />
                <div className="blob blob-br" />

                <div className="card">
                    {/* Brand */}
                    <div className="brand">
                        <div className="brand-logo">
                            <svg viewBox="0 0 32 32" fill="none">
                                <rect x="3" y="18" width="5" height="10" rx="1.5" fill="white" fillOpacity="0.9"/>
                                <rect x="10" y="12" width="5" height="16" rx="1.5" fill="white" fillOpacity="0.75"/>
                                <rect x="17" y="7" width="5" height="21" rx="1.5" fill="white" fillOpacity="0.6"/>
                                <polyline points="4,20 11,13 18,8 26,4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="26" cy="4" r="2" fill="white"/>
                            </svg>
                        </div>
                        <div>
                            <div className="brand-name">Performly</div>
                            <div className="brand-tagline">Where Performance Meets Reward</div>
                        </div>
                    </div>

                    <div className="page-title">Daftar Akun</div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Nama Lengkap */}
                        <div className="field">
                            <label>Nama Lengkap</label>
                            <input
                                type="text"
                                name="nama_lengkap"
                                value={formData.nama_lengkap}
                                onChange={handleChange}
                                autoFocus
                            />
                        </div>

                        {/* NIP & Email */}
                        <div className="row">
                            <div className="field">
                                <label>NIP</label>
                                <input
                                    type="text"
                                    name="nip"
                                    value={formData.nip}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Tanggal Masuk & Tanggal Lahir */}
                        <div className="row">
                            <div className="field">
                                <label>Tanggal Masuk</label>
                                <input
                                    type="date"
                                    name="tanggal_masuk"
                                    value={formData.tanggal_masuk}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>Tanggal Lahir</label>
                                <input
                                    type="date"
                                    name="tanggal_lahir"
                                    value={formData.tanggal_lahir}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Jabatan */}
                        <div className="field">
                            <label>Jabatan</label>
                            <select
                                name="jabatan"
                                value={formData.jabatan}
                                onChange={handleChange}
                            >
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <hr className="divider" />

                        {/* Username */}
                        <div className="field">
                            <label>Buat Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password */}
                        <div className="field">
                            <label>Buat Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Konfirmasi Password */}
                        <div className="field">
                            <label>Konfirmasi Password</label>
                            <input
                                type="password"
                                name="konfirmasi_password"
                                value={formData.konfirmasi_password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Error & Success */}
                        {error && <div className="error-box">{error}</div>}
                        {success && (
                            <div className="success-box">
                                Akun berhasil dibuat! Mengarahkan ke halaman login...
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-daftar"
                            disabled={loading}
                        >
                            {loading ? "Memproses..." : "DAFTAR"}
                        </button>

                        <p className="footer-note">
                            Sudah punya akun? <a href="/login">Masuk di sini</a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}