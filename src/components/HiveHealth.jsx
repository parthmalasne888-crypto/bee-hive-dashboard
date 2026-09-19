import { Activity, Battery, Droplets, Radio, Thermometer, Weight } from "lucide-react";
import MetricChart from "./MetricChart";

export default function HiveHealth({ hive, series, onPlayTone }) {
  const metrics = [
    [Thermometer, "Temperature", `${hive.temperature.toFixed(1)}°C`, "Stable"],
    [Droplets, "Humidity", `${hive.humidity.toFixed(0)}%`, "Within expected range"],
    [Weight, "Hive weight", `${hive.weight.toFixed(1)} kg`, "+1.4 kg today"],
    [Activity, "Bee activity", hive.activity > 70 ? "High" : "Moderate", "Normal for current period"],
  ];

  const statusClass = hive.status.toLowerCase();

  return (
    <section id="health" className="health section">
      <div className="section-title">
        <p className="kicker">LIVE HIVE HEALTH <b>DEMO DATA</b></p>
        <h2>A clear reading of<br/><em>what your colony needs.</em></h2>
        <p>Simulated telemetry updates every few seconds to show how a connected HiveSense apiary behaves.</p>
      </div>

      <div className="health-layout">
        <aside className={`hive-panel ${statusClass}`}>
          <div className="panel-top">
            <span>SELECTED HIVE</span>
            <b><Radio size={13}/> ONLINE</b>
          </div>
          <h3>{hive.name}</h3>
          <p>{hive.location} · last update {7 + (hive.health % 6)} sec ago</p>

          <div className="score">
            <div><strong>{hive.health}</strong><span>/100</span></div>
            <small>HEALTH SCORE</small>
          </div>

          <div className="hive-pulse">
            <i/><i/><i/>
            <div className="core-dot">{hive.health}</div>
            <b>LIVE</b>
          </div>

          <div className="health-bar">
            <span><i style={{ width: `${hive.health}%` }}/></span>
            <b>{hive.status}</b>
          </div>

          <div className="battery"><Battery size={16}/><span>Battery</span><strong>{hive.battery}%</strong></div>
        </aside>

        <div className="health-main">
          <div className="metric-grid">
            {metrics.map(([Icon,label,value,note]) => (
              <article className="metric" key={label}>
                <Icon size={18}/>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>

          <div className="insight">
            <span>WHAT WE’RE SEEING</span>
            <p>Hive weight is moving steadily while activity remains high. Temperature and humidity are holding within the current pattern.</p>
          </div>

          <div className="chart-tabs">
            <span>24 HOUR TELEMETRY</span>
            <div>
              <button className="active" onClick={() => onPlayTone?.("tab")}>24H</button>
              <button onClick={() => onPlayTone?.("tab")}>7D</button>
              <button onClick={() => onPlayTone?.("tab")}>30D</button>
            </div>
          </div>

          <div className="charts">
            <MetricChart label="Temperature" data={series.temperature} unit="°C" labels={series.labels}/>
            <MetricChart label="Hive weight" data={series.weight} unit="kg" accent="orange" labels={series.labels}/>
            <MetricChart label="Humidity" data={series.humidity} unit="%" accent="blue" labels={series.labels}/>
            <MetricChart label="Bee activity" data={series.activity} unit="%" accent="orange" labels={series.labels}/>
          </div>

          <div className="trend-strip">
            <div><small>HEALTH TREND</small><strong>{series.health.at(-1)} / 100</strong></div>
            <div className="mini-spark">
              <svg viewBox="0 0 220 45" preserveAspectRatio="none">
                <polyline points={series.health.map((v,i)=>`${(i*(220/(series.health.length-1)))},${40-(v-85)*1.7}`).join(" ")}/>
              </svg>
            </div>
            <div className="trend-note"><b>Stable</b><span>Last 24 hours</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
