import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Radio, ScanLine, Sparkles } from "lucide-react";
import HexField from "./HexField";

export default function Hero({ hive, onEnter }) {
  const [phase, setPhase] = useState(0);
  const orbitDots = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  useEffect(() => {
    const id = setInterval(() => setPhase(v => (v + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  return <section className="hero" id="top">
    <div className="hero-bg" />
    <div className="hero-noise" />
    <HexField strength={1.3}/>
    <div className="hero-copy-wrap page-shell">
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot"/> SYSTEM ONLINE <i/> 12 HIVES CONNECTED</div>
        <h1>
          The hive is <span className="hero-word">alive.</span><br/>
          <span className="hero-outline">We make it visible.</span>
        </h1>
        <p className="hero-lede">HiveSense turns a living colony into a real-time intelligence layer — from the first sensor pulse to the last traceable jar.</p>
        <div className="hero-actions">
          <button className="primary-cta" onClick={() => onEnter("health")}>Explore live health <ArrowUpRight size={17}/></button>
          <button className="secondary-cta" onClick={() => onEnter("market")}>Enter B-Mart <ArrowDownRight size={17}/></button>
        </div>
        <div className="hero-stats">
          <div><b>{hive.health}%</b><span>current hive health</span></div>
          <div><b>{hive.temperature.toFixed(1)}°C</b><span>internal temperature</span></div>
          <div><b>{hive.weight.toFixed(1)} kg</b><span>live hive weight</span></div>
        </div>
      </div>

      <div className="hero-stage">
        <div className="stage-caption"><ScanLine size={13}/> DIGITAL TWIN / HIVE 07</div>
        <div className={`hive-world phase-${phase}`}>
          <div className="world-ring ring-a"/><div className="world-ring ring-b"/><div className="world-ring ring-c"/>
          <div className="world-core-shadow"/>
          <div className="hive-body">
            <div className="hive-top"><span/><span/><span/></div>
            <div className="hive-box"><i/><i/><i/><i/><i/></div>
            <div className="hive-bottom"><span/></div>
            <div className="hive-sensor"><Radio size={14}/><small>NODE-07</small></div>
          </div>
          {orbitDots.map(i => <span key={i} className="orbit-dot" style={{ "--n": i }} />)}
          <div className="telemetry-card tc-one"><small>HEALTH</small><b>{hive.health}%</b><em>stable</em></div>
          <div className="telemetry-card tc-two"><small>WEIGHT</small><b>{hive.weight.toFixed(1)}<small> kg</small></b><em>{hive.delta || "+1.4 kg"}</em></div>
          <div className="telemetry-card tc-three"><small>ACTIVITY</small><b>{Math.round(hive.activity)}%</b><em>high</em></div>
          <div className="live-pill"><span/>LIVE FEED</div>
        </div>
        <div className="stage-footer"><Sparkles size={13}/> continuous telemetry / simulated prototype data</div>
      </div>
    </div>
  </section>;
}
