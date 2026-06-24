"use client";

import { useState, useEffect } from "react";
import AbsensiFilter from "@/components/dashboard/absensi/AbsensiFilter";
import AbsensiTable from "@/components/dashboard/absensi/AbsensiTable";
import ComingSoonTabs from "@/components/dashboard/absensi/ComingSoonTabs";

const TAB_OPTIONS = [
    { key: "kalender", label: "Kalender Absensi" },
    { key: "lembur", label: "Permintaan Lembur" },
    { key: "cuti", label: "Permintaan Cuti" },
    { key: "wfh", label: "Permintaan WFH/WFA" },
];

const BULAN_OPTIONS = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

export default function AbsensiPage() {
    const [activeTab, setActiveTab] = useState("kalender");

    const now = new Date();
    const [bulan, setBulan] = useState(now.getMonth() + 1);
    const [tahun, setTahun] = useState(now.getFullYear());
    const [divisi, setDivisi] = useState("");
    const [search, setSearch] = useState("");

    const [divisiList, setDivisiList] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch daftar divisi sekali saat halaman dimuat
    useEffect(() => {
        const fetchDivisi = async() => {
            try {
                const res = await fetch("/api/absensi/divisi");
                const json = await res.json();
                setDivisiList(json);
            } catch(error) {
                console.error("Gagal fetch divisi: ", error);
            }
        };
        fetchDivisi();
    }, []);

    // fetch data absensi setiap kali bulan/tahun/divisi berubah
    useEffect(() => {
        if (!divisi) {
            setData([]);
            return;
        }

        const fetchAbsensi = async() => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/absensi?bulan=${bulan}&tahun=${tahun}&divisi=${divisi}`
                );
                const json = await res.json();
                setData(json);
            } catch(error) {
                console.error("Gagal fetch absensi: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAbsensi();
    }, [bulan, tahun, divisi]);

    // filter data berdasarkan pencarian nama
    const filteredData = data.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <>
      <style>{`
        .absensi-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .absensi-tab {
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          color: #8A93B8;
          background: none;
          border: none;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .absensi-tab:hover {
          color: #EEF0F8;
        }
        .absensi-tab.active {
          color: #4F8EF7;
          border-bottom-color: #4F8EF7;
        }
      `}</style>

      <div style={{ padding: "28px 32px" }}>
        <h1 style={{ color: "#EEF0F8", marginBottom: "20px" }}>Absensi</h1>

        <div className="absensi-tabs">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.key}
              className={`absensi-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "kalender" ? (
          <>
            <AbsensiFilter
              bulan={bulan}
              setBulan={setBulan}
              tahun={tahun}
              setTahun={setTahun}
              divisi={divisi}
              setDivisi={setDivisi}
              search={search}
              setSearch={setSearch}
              divisiList={divisiList}
              bulanOptions={BULAN_OPTIONS}
            />

            {!divisi ? (
              <p style={{ color: "#8A93B8", textAlign: "center", padding: "40px" }}>
                Pilih divisi untuk menampilkan data absensi.
              </p>
            ) : loading ? (
              <p style={{ color: "#8A93B8", textAlign: "center", padding: "40px" }}>
                Memuat data...
              </p>
            ) : (
              <AbsensiTable data={filteredData} bulan={bulan} tahun={tahun} />
            )}
          </>
        ) : (
          <ComingSoonTabs label={TAB_OPTIONS.find((t) => t.key === activeTab)?.label} />
        )}
      </div>
    </>
  );
}


