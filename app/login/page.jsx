"use client";

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Username dan password harus diisi");
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        setLoading(false);

        console.log("Login dengan : ", username, password);
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
                    width: 420px;
                    padding: 52px 44px 44px;
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
                    margin-bottom: 40px;
                }

                .brand-logo {
                    width: 56px; height: 56px;
                    border-radius: 14px;
                    background: linear-gradient(145deg, #2C3E8C, #5B4FCF, #8B6FE8);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 6px 24px rgba(79,100,241,0.35);
                }
                .brand-logo svg { width: 32px; height: 32px; }

                .brand-name {
                    font-family: 'Raleway', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    color: #E8EEFF;
                    letter-spacing: -0.5px;
                    line-height: 1;
                }
                .brand-tagline {
                    font-size: 11.5px;
                    color: #6B7FCC;
                    margin-top: 3px;
                }

                .field { margin-bottom: 14px; }
                .field label {
                    display: block;
                    font-size: 13px;
                    font-weight: 500;
                    color: #A0AECE;
                    margin-bottom: 7px;
                }

                .field input {
                    width: 100%;
                    background: rgba(30, 55, 120, 0.55);
                    border: 1px solid rgba(100,130,255,0.15);
                    border-radius: 10px;
                    padding: 13px 16px;
                    font-size: 14px;
                    color: #E8EEFF;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                }
                .field input:focus {
                    border-color: rgba(100,130,255,0.45);
                    background: rgba(40,70,150,0.5);
                    box-shadow: 0 0 0 3px rgba(79,100,241,0.12);
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

                .btn-masuk {
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
                    margin-top: 26px;
                    transition: opacity 0.2s, transform 0.15s;
                    box-shadow: 0 4px 20px rgba(79,100,241,0.4);
                }
                .btn-masuk:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
                .btn-masuk:disabled { opacity: 0.55; cursor: not-allowed; }

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

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <div className="error-box">{error}</div>}

                        <button type="submit" className="btn-masuk" disabled={loading}>
                            {loading ? "Memverifikasi..." : "MASUK"}
                        </button>

                        <p className="footer-note">
                            * Jika belum memiliki akun, silahkan <a href="/register">Daftar</a>
                        </p>
                    </form>

                </div>                                       
            </div>
        </>
    );
}
