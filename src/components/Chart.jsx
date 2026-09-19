import { useId, useMemo } from "react";

function pointsFor(data, width = 620, height = 150) {
  const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1;
  return data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - 16 - ((v - min) / range) * (height - 32),
  ]);
}

export default function Chart({ data, color = "#6c5cff", fill, label, value, delta, unit = "" }) {
  const pts = useMemo(() => pointsFor(data), [data]);
  const gradientId = `chartFill-${useId().replace(/:/g, "")}`;
  const polyline = pts.map(([x,y]) => `${x},${y}`).join(" ");
  const area = `M ${pts[0][0]} ${pts[0][1]} L ${pts.map(([x,y]) => `${x} ${y}`).join(" L ")} L ${pts.at(-1)[0]} 150 L ${pts[0][0]} 150 Z`;
  const last = pts.at(-1);
  return <div className="chart-card">
    <div className="chart-head">
      <div><span>{label}</span><b>{value}<small>{unit}</small></b></div>
      <div className="chart-delta">{delta}</div>
    </div>
    <svg viewBox="0 0 620 150" preserveAspectRatio="none" role="img" aria-label={`${label} trend`}>
      <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".26"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      {[24,55,86,117].map(y => <line key={y} x1="0" x2="620" y1={y} y2={y} className="chart-grid"/>) }
      <path d={area} fill={`url(#${gradientId})`}/>
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" className="chart-line"/>
      <circle cx={last[0]} cy={last[1]} r="5" fill={color}/><circle cx={last[0]} cy={last[1]} r="10" fill="none" stroke={color} strokeOpacity=".22" className="chart-pulse"/>
    </svg>
    <div className="chart-foot"><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span></div>
  </div>;
}
