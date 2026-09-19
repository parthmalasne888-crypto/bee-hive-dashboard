import { useMemo, useState } from "react";

function fmt(value, unit) {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}${unit}`;
}

export default function MetricChart({ label, data, unit, accent = "teal", labels = [] }) {
  const [hovered, setHovered] = useState(data.length - 1);
  const width = 520;
  const height = 190;
  const pad = { left: 26, right: 12, top: 16, bottom: 28 };

  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const range = max - min || 1;

  const points = useMemo(() => data.map((value, i) => {
    const x = pad.left + (i * (width - pad.left - pad.right)) / (data.length - 1);
    const y = pad.top + (1 - (value - min) / range) * (height - pad.top - pad.bottom);
    return { x, y, value };
  }), [data, min, range]);

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `M ${points[0].x} ${height - pad.bottom} ${points.map((p) => `L ${p.x} ${p.y}`).join(" ")} L ${points.at(-1).x} ${height - pad.bottom} Z`;
  const gradientId = `grad-${label.toLowerCase().replace(/\s+/g, "-")}-${accent}`;

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const nearest = Math.max(0, Math.min(data.length - 1, Math.round((x - pad.left) / ((width - pad.left - pad.right) / (data.length - 1)))));
    setHovered(nearest);
  };

  const labelFor = (i) => labels[i] || `${String(i).padStart(2, "0")}:00`;

  return (
    <article className={`chart ${accent}`}>
      <div className="chart-head">
        <div>
          <span>{label}</span>
          <strong>{fmt(data.at(-1), unit)}</strong>
        </div>
        <div className="chart-change">
          <em>{data.at(-1) >= data[0] ? "↗" : "↘"} {Math.abs(data.at(-1) - data[0]).toFixed(1)}{unit}</em>
          <small>24H</small>
        </div>
      </div>

      <div className="chart-stage">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${label} 24 hour trend`}
          onMouseMove={handleMove}
          onMouseLeave={() => setHovered(data.length - 1)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopOpacity=".28"/>
              <stop offset="100%" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((row) => {
            const y = pad.top + row * ((height - pad.top - pad.bottom) / 3);
            return <line key={row} className="grid-line" x1={pad.left} y1={y} x2={width - pad.right} y2={y}/>;
          })}

          <path d={areaPath} className="chart-area" fill={`url(#${gradientId})`} />
          <path d={linePath} className="chart-line" />

          {points.map((p, i) => <circle key={i} className={`chart-point ${i === hovered ? "is-hovered" : ""}`} cx={p.x} cy={p.y} r={i === hovered ? 4.5 : 2.1} />)}

          <line className="hover-line" x1={points[hovered].x} x2={points[hovered].x} y1={pad.top} y2={height - pad.bottom} />

          <text className="axis-label" x={pad.left} y={height - 7}>{labelFor(0)}</text>
          <text className="axis-label" x={width / 2 - 14} y={height - 7}>{labelFor(Math.floor((labels.length || data.length) / 2))}</text>
          <text className="axis-label" x={width - pad.right - 25} y={height - 7}>{labelFor(data.length - 1)}</text>
        </svg>

        <div className="chart-tooltip" style={{ left: `${(points[hovered].x / width) * 100}%` }}>
          <b>{fmt(points[hovered].value, unit)}</b>
          <span>{labelFor(hovered)}</span>
        </div>
      </div>

      <div className="chart-stats">
        <span><small>MIN</small><b>{fmt(min, unit)}</b></span>
        <span><small>AVG</small><b>{fmt(avg, unit)}</b></span>
        <span><small>MAX</small><b>{fmt(max, unit)}</b></span>
      </div>
    </article>
  );
}
