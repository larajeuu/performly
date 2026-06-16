"use client";

import { useState, useEffect } from "react";
import PayrollFilter from "@/components/dashboard/payroll/PayrollFilter";
import PayrollDetail from "@/components/dashboard/payroll/PayrollDetail";

export default function PayrollPage() {
    const [karyawanList, setKaryawanList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [detail, setDetail] = useState(null);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingDetail, setLoadingDetail] = useState(false);

    // fetch list karyawan untuk dropdown
    useEffect(() => {
        const fetchKaryawan = async () => {
            try {
                const res = await fetch("/api/payroll/karyawan");
                const data = await res.json();
                setKaryawanList(data);
            } catch (error) {
                console.log("Gagal Fetch Karyawan", error);
            } finally {
                setLoadingList(false);
            }
        };
        fetchKaryawan()
    }, [])

    //fetch detail payroll saat karyawan dipilih
    useEffect(() => {
        if (!selectedId) {
            setDetail(null);
            return;
        }

        const fetchDetail = async () => {
            setLoadingDetail(true);
            try {
                const res = await fetch(`/api/payroll/${selectedId}`);
                const data = await res.json();
                if (res.ok) {
                    setDetail(data);
                } else {
                    setDetail(null);
                }
            } catch (error) {
                console.log("Gagal Fetch Detail Payroll: ", error);
                setDetail(null);
            } finally {
                setLoadingDetail(false);
            }
        };
        fetchDetail();
    }, [selectedId]);

    return (
        <>
            <style>{`
                .payroll-wrap {
                background: rgba(18,33,80,0.85);
                border: 1px solid rgba(100,120,255,0.1);
                border-radius: 16px;
                padding: 24px;
                backdrop-filter: blur(10px);
                font-family: 'Plus Jakarta Sans', sans-serif;
                margin-bottom: 20px;
                }

                .payroll-header {
                display: flex;
                align-items: flex-start;
                gap: 14px;
                }
                
                .payroll-icon {
                width: 44px; height: 44px;
                border-radius: 12px;
                background: linear-gradient(135deg, #F59E0B, #FBBF24);
                display: flex; align-items: center; justify-content: center;
                font-size: 20px;
                flex-shrink: 0;
                }
                
                .payroll-title {
                font-size: 16px;
                font-weight: 700;
                color: #E8EEFF;
                }   
                
                .payroll-subtitle {
                font-size: 12.5px;
                color: #6B7FCC;
                margin-top: 2px;
                line-height: 1.4;
                }
            `} </style>

            <div className="payroll-wrap">
                <div className="payroll-header">
                    <div className="payroll-icon">💰</div>
                    <div style={{ flex: 1 }}>
                        <div className="payroll-title">Kalkulator Gaji & Bonus Karyawan</div>
                        <div className="payroll-subtitle">
                            Hitung total kompensasi berdasarkan gaji pokok, tunjangan, dan pencapaian KPI secara otomatis.
                        </div>
                    </div>
                    <PayrollFilter
                        karyawanList={karyawanList}
                        loading={loadingList}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                    />
                </div>
            </div>

            <PayrollDetail
                detail={detail}
                loading={loadingDetail}
                hasSelection={!!selectedId}
            />
        </>
    );
}
