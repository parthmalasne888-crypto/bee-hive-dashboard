import { ArrowDownRight, Radio, ShoppingBag } from "lucide-react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 17 + 7) % 91}%`,
  top: `${(index * 29 + 11) % 78}%`,
  delay: `${(index % 6) * 0.7}s`,
  size: `${2 + (index % 3)}px`,
}));

export default function Hero({ hive, navigate }) {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="kicker"><Radio size={13}/> LIVE APIARY INTELLIGENCE <b>DEMO</b></p>
        <h1>See the hive.<br/><em>Understand the harvest.</em></h1>
        <p className="lede">Real-time hive intelligence for healthier colonies, better harvest decisions and traceable honey.</p>

        <div className="hero-actions">
          <button className="button orange" onClick={() => navigate("health")}>View live hive <ArrowDownRight size={18}/></button>
          <button className="text-action" onClick={() => navigate("market")}><ShoppingBag size={16}/> Explore B-Mart</button>
        </div>

        <div className="hero-proof">
          <span><strong>12</strong> monitored hives</span>
          <span><strong>94%</strong> apiary health</span>
          <span><strong>LIVE</strong> telemetry</span>
        </div>

        <div className="hero-signal-strip" aria-hidden="true">
          <i/><span>EDGE LINK</span><i/><span>SYNC 12 SEC</span><i/><span>HIVE 07 ONLINE</span>
        </div>
      </div>

      <div className="hero-scene" aria-label="Illustrated monitored beehive">
        {particles.map((p, i) => <i key={i} className="hero-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }} />)}
        <div className="scene-grid" aria-hidden="true" />
        <div className="sun"/>
        <div className="signal one"/>
        <div className="signal two"/>
        <div className="signal three"/>
        <div className="scan-line" aria-hidden="true"/>

        <div className="hive-illustration">
          <div className="roof"/>
          <div className="hive-lines"><i/><i/><i/><i/></div>
          <div className="entrance"/>
          <b className="sensor"/>
          <span className="sensor-node node-a"/>
          <span className="sensor-node node-b"/>
        </div>

        <div className="live-readout">
          <small>HIVE 07 / LIVE</small>
          <strong>{hive.temperature.toFixed(1)}°<em>C</em></strong>
          <span>Temperature stable</span>
          <b className="readout-pulse"><i/> SIGNAL STABLE</b>
        </div>

        <div className="scene-label label-one">ACTIVITY <b>HIGH</b></div>
        <div className="scene-label label-two">WEIGHT <b>{hive.weight.toFixed(1)} KG</b></div>
        <div className="scene-label label-three">HEALTH <b>{hive.health}%</b></div>
      </div>
    </section>
  );
}
