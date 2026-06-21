export default function PredikatBadge({ skor }) {
  let label = "";
  let color = "";

  if (skor < 70) {
    label = "Buruk";
    color = "#F76F6F";
  } else if (skor < 80) {
    label = "Kurang Baik";
    color = "#FFAA44";
  } else if (skor < 90) {
    label = "Baik";
    color = "#4F8EF7";
  } else {
    label = "Sangat Baik";
    color = "#2DD4A0";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        background: `${color}20`,
        color: color,
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}