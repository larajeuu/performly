"use client";

import { useState, useMemo } from "react";

export default function PayrollFilter({ karyawanList, loading, selectedId, onSelect }) {
    const [selectedDept, setSelectedDept] = useState("");

    //ambil daftar divisi unik dari data karyawan
    const departemenList = useMemo(() => {
        const unique = [...new Set(karyawanList.map((k) => k.departemen))];
        return unique.sort();
    }, [karyawanList]);

    //filter karyawan berdasarkan divisi yang dipilih
    const filteredKaryawan = useMemo(() => {
        if (!selectedDept) return [];
        return karyawanList.filter((k) => k.departemen == selectedDept);
    }, [karyawanList, selectedDept]);

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
        onSelect(null); //reset pilihan karyawan setelah divisi berubah
    };

    return (
        <>
            <style>{`
                .filter-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    min-width: 220px;
                }

                .filter-select {
                    background: rgba(30,55,120,0.5);
                    border: 1px solid rgba(100,130,255,0.15);
                    border-radius: 10px;
                    padding: 10px 14px;
                    font-size: 13px;
                    color: #E8EEFF;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    outline: none;
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7FCC' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    padding-right: 32px;
                    transition: border-color 0.2s;
                }
                
                .filter-select:focus {
                    border-color: rgba(100,130,255,0.4);
                }
            
                .filter-select:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }
            
                .filter-select option {
                    background: #1a2a6e;
                    color: #E8EEFF;
                }
            `}</style>

            <div className="filter-stack">
                {/* Dropdown Divisi */}
                <select
                    className="filter-select"
                    value={selectedDept}
                    onChange={handleDeptChange}
                    disabled={loading}
                >

                    <option value="">Pilih Divisi</option>
                    {departemenList.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>

                {/* Dropdown Karyawan — aktif setelah divisi dipilih */}
                <select
                    className="filter-select"
                    value={selectedId || ""}
                    onChange={(e) => onSelect(e.target.value ? parseInt(e.target.value) : null)}
                    disabled={!selectedDept}
                >
                    <option value="">
                        {selectedDept ? "Pilih Karyawan" : "Pilih Divisi Terlebih Dahulu"}
                    </option>
                    {filteredKaryawan.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.nama_lengkap} — {k.jabatan}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}