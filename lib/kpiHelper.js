export function getKpiColor(skor) {
  if (skor < 70) return "#F76F6F";
  if (skor < 80) return "#FFAA44";
  if (skor < 90) return "#4F8EF7";
  return "#2DD4A0";
}