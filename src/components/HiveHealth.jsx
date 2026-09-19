import { useMemo, useState } from "react";
import { Activity, BatteryCharging, CircleAlert, Droplets, Gauge, Radio, Thermometer, Weight, Zap } from "lucide-react";
import Chart from "./Chart";
import { series, events } from "../data/demoData";

const ranges = ["24H", "7D", "30D"];

export default function HiveHealth({ hives, selectedHive, setSelectedHive, liveHive, simulate, onSound }) {
  const [range, setRange] = useState("24H");
  const [metric, setMetric] = useState("temperature");
  const [alertMode, setAlertMode] = useState(false);
  const visibleSeries = useMemo(() => {
    const base = series[metric] || series.temperature;
    if (range === "7D") return base.concat(base.map(v => v + (Math.sin(v) * 0.35)));
    if (range === "30D") return Array.from({length: 18}, (_, i) => base[i % base.length] + Math.sin(i * .7) * 0.5);
    return base;
  }, [metric, range, alertMode]);

  const fireAlert = () => {
    setAlertMode(v => !v);
    simulate(!alertMode);
    onSound("alert");
  };

  const metricConfig = {
    temperature: { label: "Temperature", value: `${liveHive.temperature.toFixed(1)}°`, sub: "Stable", icon: Thermometer, color: "#6c5cff", delta: "+0.2°C" },
    weight: { label: "Hive weight", value: `${liveHive.weight.toFixed(1)}`, sub: "kg / +1.4 today", icon: Weight, color: "#ff8a3d", delta: "+3.3%" },
    humidity: { label: "Humidity", value: `${Math.round(liveHive.humidity)}`, sub: "% / within range", icon: Droplets, color: "#62b8ff", delta: "+1.2%" },
    activity: { label: "Bee activity", value: `${Math.round(liveHive.activity)}`, sub: "% / high", icon: Activity, color: "#54d6b0", delta: "+12%" },
  };
  const cfg = metricConfig[metric];

  return <section className="health-section page-section" id="health">
    <div className="page-shell">
      <div className="section-intro split">
        <div>
          <div className="eyebrow purple"><span className="pulse-dot"/> LIVE HIVE HEALTH</div>
          <h2>See the colony <span>as it happens.</span></h2>
        </div>
        <p>One glance should tell a beekeeper what changed, where it changed, and whether the hive needs attention.</p>
      </div>

      <div className="health-top-grid">
        <aside className="hive-selector glass-panel">
          <div className="panel-kicker">CONNECTED HIVES <b>04</b></div>
          <div className="hive-list-neo">
            {hives.map(h => <button key={h.id} className={`hive-item ${selectedHive.id === h.id ? "selected" : ""}`} onClick={() => { setSelectedHive(h); onSound("click"); }}>
              <span className={`state ${h.status.toLowerCase()}`}/><span className="hive-item-text"><b>{h.name}</b><small>{h.location}</small></span><strong>{h.health}%</strong><span className="hive-arrow">↗</span>
            </button>)}
          </div>
          <button className={`simulate-btn ${alertMode ? "armed" : ""}`} onClick={fireAlert}><CircleAlert size={14}/>{alertMode ? "Reset simulation" : "Simulate alert"}</button>
        </aside>

        <div className="health-hero-card">
          <div className="health-card-orbit" />
          <div className="health-card-grid" />
          <div className="health-card-top"><span>HIVE 0{selectedHive.id === "07" ? "7" : selectedHive.id}</span><span><Radio size={12}/> ONLINE · 8 SEC AGO</span></div>
          <div className={`health-dial ${alertMode ? "alert" : ""}`}>
            <span>COLONY HEALTH</span><b>{alertMode ? Math.max(48, liveHive.health - 17) : Math.round(liveHive.health)}%</b><i>{alertMode ? "attention" : "stable baseline"}</i>
          </div>
          <div className="health-radar"><span/><span/><span/><span/></div>
          <div className="health-float hf-a"><small>ACTIVITY</small><b>{Math.round(liveHive.activity)}%</b><em>+12 today</em></div>
          <div className="health-float hf-b"><small>TEMP</small><b>{liveHive.temperature.toFixed(1)}°C</b><em>within baseline</em></div>
          <div className="health-float hf-c"><small>WEIGHT</small><b>{liveHive.weight.toFixed(1)} kg</b><em>{liveHive.delta || "+1.4 kg"}</em></div>
          <div className="health-core"><div className="hex-ring r1"/><div className="hex-ring r2"/><div className="hex-heart"><Zap size={23}/></div></div>
        </div>
      </div>

      <div className="metric-strip">
        {Object.entries(metricConfig).map(([key, item]) => { const Icon = item.icon; return <button key={key} className={`metric-tile ${metric === key ? "selected" : ""}`} onClick={() => { setMetric(key); onSound("click"); }}>
          <span className="metric-icon"><Icon size={17}/></span><span className="metric-copy"><small>{item.label}</small><b>{item.value}{key === "temperature" ? "" : key === "weight" ? " kg" : "%"}</b><em>{item.sub}</em></span><span className="metric-live"/>
        </button>; })}
      </div>

      <div className="charts-wrap">
        <div className="charts-header"><div><div className="eyebrow purple">TELEMETRY / {range}</div><h3>{cfg.label} over time</h3></div><div className="range-tabs">{ranges.map(r => <button key={r} className={range === r ? "active" : ""} onClick={() => { setRange(r); onSound("click"); }}>{r}</button>)}</div></div>
        <div className="featured-chart"><Chart data={visibleSeries} color={cfg.color} label={cfg.label} value={cfg.value} unit={metric === "temperature" ? "°C" : metric === "weight" ? " kg" : "%"} delta={cfg.delta}/></div>
        <div className="mini-charts"><Chart data={series.temperature} color="#6c5cff" label="Temperature" value={`${liveHive.temperature.toFixed(1)}`} unit="°C" delta="+0.2"/><Chart data={series.weight} color="#ff8a3d" label="Hive weight" value={`${liveHive.weight.toFixed(1)}`} unit="kg" delta="+3.3%"/><Chart data={series.humidity} color="#62b8ff" label="Humidity" value={`${Math.round(liveHive.humidity)}`} unit="%" delta="+1.2"/></div>
      </div>

      <div className="insight-row">
        <div className="insight-card glass-panel"><div className="insight-icon"><Gauge size={16}/></div><div><small>WHAT WE'RE SEEING</small><p>{alertMode ? "Hive weight shifted outside its recent baseline. The change is marked for inspection." : "Weight rose steadily while activity stayed high — a normal daytime pattern for this simulated hive."}</p></div><span className="insight-arrow">↗</span></div>
        <div className="event-stream glass-panel"><div className="panel-kicker">RECENT SIGNALS <b>LIVE</b></div>{events.slice(0,3).map((event,i) => <div className="event-item" key={i}><i/><span>{event.time}</span><p>{event.label}</p><em>{i === 0 ? "now" : `${i * 6 + 2}m ago`}</em></div>)}</div>
      </div>
    </div>
  </section>;
}
