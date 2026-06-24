export default function ComingSoonTabs({ label }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 24px",
        color: "#5A6488",
        background: "rgba(26,39,82,0.4)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>🚧</div>
      <h3 style={{ color: "#8A93B8", fontSize: "16px", marginBottom: "8px" }}>
        {label}
      </h3>
      <p style={{ fontSize: "13px" }}>
        Fitur ini sedang dalam tahap pengembangan. Coming soon!
      </p>
    </div>
  );
}