import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  ChevronRight,
  Cloud,
  Cpu,
  Droplets,
  Gauge,
  HeartPulse,
  Leaf,
  MapPin,
  Menu,
  PackageCheck,
  Radio,
  Search,
  ShieldCheck,
  Thermometer,
  Users,
  Weight,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function useHiveData() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => ({
    temperature: 34.2 + Math.sin(tick * .7) * .35,
    humidity: 62 + Math.sin(tick * .55) * 1.5,
    weight: 42.8 + Math.sin(tick * .35) * .18,
    health: clamp(94 + Math.sin(tick * .45) * 1.5, 0, 100),
    activity: clamp(82 + Math.sin(tick * .6) * 8, 0, 100),
    pollination: clamp(87 + Math.sin(tick * .25) * 3, 0, 100),
  }), [tick]);
}

const hives = [
  { id: "01", name: "Green Valley Hive", place: "Baguio • Demo", health: 94, status: "Healthy" },
  { id: "02", name: "Sunrise Hive", place: "Nashik • Demo", health: 88, status: "Healthy" },
  { id: "03", name: "Mountain Hive", place: "Pune • Demo", health: 74, status: "Attention" },
];

function Logo() {
  return (
    <a className="logo" href="#home">
      <div className="logo-mark">
        <span className="hex">⬡</span>
        <span className="bee">🐝</span>
      </div>
      <div>
        <strong>Hive<span>Sense</span></strong>
        <small>Smart hive intelligence</small>
      </div>
    </a>
  );
}

function Sidebar({ open, setOpen }) {
  const items = [
    ["Home", "#home", Gauge],
    ["Hive Health", "#health", HeartPulse],
    ["My Hives", "#hives", Radio],
    ["Analytics", "#analytics", Activity],
    ["Traceability", "#traceability", PackageCheck],
    ["Pollination", "#pollination", Leaf],
  ];

  return (
    <>
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="side-head"><Logo /><button onClick={() => setOpen(false)}><X /></button></div>
        <nav>
          {items.map(([label, href, Icon], i) => (
            <a className={i === 0 ? "active" : ""} href={href} key={label} onClick={() => setOpen(false)}>
              <Icon size={18} /> <span>{label}</span>
              {i === 0 && <i />}
            </a>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="bee-note">
            <span>🐝</span>
            <div><strong>Protect the pollinators.</strong><small>Every healthy hive matters.</small></div>
          </div>
          <small>HiveSense © 2026</small>
        </div>
      </aside>
      {open && <div className="mobile-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}

function Topbar({ setOpen }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setOpen(true)}><Menu /></button>
      <div className="search"><Search size={17} /><input placeholder="Search hives, batches, locations..." /></div>
      <div className="top-actions">
        <button className="icon-btn"><Bell size={18} /><i /></button>
        <div className="live-chip"><span /> SYSTEM LIVE</div>
        <div className="profile"><div className="avatar">P</div><div><strong>Hive Operator</strong><small>Demo workspace</small></div><ChevronRight size={15} /></div>
      </div>
    </header>
  );
}

function Sparkline({ variant = 0 }) {
  const pts = Array.from({ length: 16 }, (_, i) => 15 + Math.sin(i * .7 + variant) * 7 + i * .7);
  const d = pts.map((v, i) => `${i ? "L" : "M"} ${i * 100 / 15} ${40 - v}`).join(" ");
  return <svg viewBox="0 0 100 45" preserveAspectRatio="none" className="spark"><path d={d} /></svg>;
}

function Kpi({ icon: Icon, label, value, delta, variant = 0 }) {
  return (
    <div className="kpi">
      <div className="kpi-icon"><Icon size={20} /></div>
      <div className="kpi-main"><span>{label}</span><strong>{value}</strong><small>↑ {delta}</small></div>
      <Sparkline variant={variant} />
    </div>
  );
}

function ActivityChart({ activity }) {
  const points = Array.from({ length: 34 }, (_, i) => 45 + Math.sin(i * .55) * 12 + Math.sin(i * .17) * 9 + (i > 26 ? (i - 26) * 1.2 : 0));
  const d = points.map((v, i) => {
    const x = i * 100 / (points.length - 1);
    const y = 80 - v * .55;
    return `${i ? "L" : "M"} ${x} ${y}`;
  }).join(" ");
  return (
    <div className="activity-chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {[25, 50, 75].map(y => <line key={y} x1="0" x2="100" y1={y} y2={y} />)}
        <path className="area" d={`${d} L 100 100 L 0 100 Z`} />
        <path className="line" d={d} />
      </svg>
      <div className="axis"><span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span></div>
    </div>
  );
}

function HiveCard({ hive }) {
  return (
    <div className="hive-card">
      <div className="hive-photo"><div className="mini-hive">⬡</div><span>LIVE</span></div>
      <div className="hive-info">
        <div><strong>{hive.name} #{hive.id}</strong><small><MapPin size={12} /> {hive.place}</small></div>
        <div className={`health-pill ${hive.health < 80 ? "attention" : ""}`}><span /> {hive.status}</div>
      </div>
      <div className="hive-meta">
        <div><Thermometer /><span>Temperature</span><b>34.2°C</b></div>
        <div><Droplets /><span>Humidity</span><b>62%</b></div>
        <div><Activity /><span>Activity</span><b>High</b></div>
      </div>
    </div>
  );
}

function Traceability() {
  return (
    <div className="trace-card" id="traceability">
      <div className="card-title"><div><span>PRODUCT TRACEABILITY</span><h3>Track a jar. See the journey.</h3></div><a href="#traceability">View all <ChevronRight size={14} /></a></div>
      <div className="trace-id"><span>HIVE-2026-001</span><button>Track</button></div>
      <div className="trace-body">
        <div className="timeline">
          {[
            ["Hive", "Collected at Green Valley Hive"],
            ["Processing", "Extracted & tested"],
            ["Quality", "Lab verified"],
            ["Certificate", "Digital identity created"],
            ["Retail", "Ready for consumer"],
          ].map(([title, text], i) => (
            <div className="timeline-row" key={title}>
              <div className="timeline-dot">{i + 1}</div>
              <div><strong>{title}</strong><small>{text}</small></div>
            </div>
          ))}
        </div>
        <div className="jar">
          <div className="jar-lid" /><div className="jar-body"><b>HS</b><span>HIVESENSE</span><strong>Wildflower<br />Honey</strong><small>TRACEABLE</small></div>
        </div>
      </div>
      <div className="trace-verified"><ShieldCheck size={18} /><div><strong>100% Traceable</strong><span>From hive to home</span></div></div>
    </div>
  );
}

function MapCard() {
  return (
    <div className="map-card">
      <div className="card-title"><div><span>GLOBAL HIVE MAP</span><h3>Hive network</h3></div><a href="#hives">View map <ChevronRight size={14} /></a></div>
      <div className="map">
        <div className="map-grid" />
        {[["18%","24%"],["37%","52%"],["59%","32%"],["72%","64%"],["48%","73%"],["83%","28%"]].map(([x,y],i) => <i key={i} style={{left:x,top:y}} />)}
        <div className="map-label"><strong>12</strong><span>hives online</span></div>
      </div>
      <div className="map-legend"><span><i /> Healthy</span><span><i /> Attention</span><span><i /> Offline</span></div>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="quick-links">
      {[
        [Users, "Beekeepers", "Manage your hives"],
        [PackageCheck, "Traceable Honey", "Verify every batch"],
        [Leaf, "Pollination", "See ecosystem impact"],
        [Cloud, "Data Intelligence", "Explore hive insights"],
      ].map(([Icon, title, text]) => (
        <a href="#intelligence" className="quick" key={title}>
          <div><Icon size={21} /><span><strong>{title}</strong><small>{text}</small></span></div><ChevronRight size={16} />
        </a>
      ))}
    </div>
  );
}

function App() {
  const data = useHiveData();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className="app">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="main">
        <Topbar setOpen={setOpen} />
        <main>
          <section className="hero-dashboard" id="home">
            <div className="hero-banner">
              <div className="hero-copy">
                <div className="eyebrow"><span /> REAL-TIME HIVE INTELLIGENCE</div>
                <h1>Know your hives.<br /><em>Protect what matters.</em></h1>
                <p>Smart monitoring for healthier bees, stronger pollination and traceable honey.</p>
                <div className="hero-buttons"><a href="#health" className="hero-btn">Explore hive health <ChevronRight size={15} /></a><span><Wifi size={14} /> ESP32 connected</span></div>
              </div>
              <div className="hero-bee-scene">
                <div className="sun" /><div className="honey-ring r1" /><div className="honey-ring r2" /><div className="hero-bee">🐝</div>
                <div className="hero-honeycomb">{Array.from({length: 9}).map((_,i)=><span key={i}>⬡</span>)}</div>
                <div className="hero-floating hf1"><Thermometer size={14} /><b>{data.temperature.toFixed(1)}°C</b></div>
                <div className="hero-floating hf2"><Weight size={14} /><b>{data.weight.toFixed(1)} kg</b></div>
                <div className="hero-floating hf3"><HeartPulse size={14} /><b>{data.health.toFixed(0)}%</b></div>
              </div>
            </div>
            <aside className="quote-card"><div className="quote-mark">“</div><h3>When we protect bees,<br />we protect life.</h3><p>Small signals. Big change.</p><Leaf size={23} /></aside>
          </section>

          <section className="kpis" id="health">
            <Kpi icon={PackageCheck} label="Hives monitored" value="128" delta="18%" variant={1} />
            <Kpi icon={HeartPulse} label="Healthy hives" value={`${data.health.toFixed(0)}%`} delta="6%" variant={2} />
            <Kpi icon={Users} label="Beekeepers onboard" value="1,203" delta="27%" variant={3} />
            <Kpi icon={Leaf} label="Pollination index" value={`${data.pollination.toFixed(0)}/100`} delta="12%" variant={4} />
          </section>

          <section className="content-grid" id="hives">
            <div className="panel hive-panel">
              <div className="card-title"><div><span>LIVE HIVE HEALTH</span><h3>Hives right now</h3></div><a href="#hives">See all <ChevronRight size={14} /></a></div>
              <HiveCard hive={hives[0]} />
              <div className="sensor-row">
                <div><Thermometer /><span>Temperature</span><b>{data.temperature.toFixed(1)}°C</b></div>
                <div><Droplets /><span>Humidity</span><b>{data.humidity.toFixed(0)}%</b></div>
                <div><Activity /><span>Bee activity</span><b>{data.activity.toFixed(0)}%</b></div>
              </div>
              <div className="subchart-title"><span>HIVE ACTIVITY</span><b>LAST 24 HOURS</b></div>
              <ActivityChart activity={data.activity} />
            </div>

            <Traceability />

            <div className="right-stack">
              <MapCard />
              <div className="activity-feed panel">
                <div className="card-title"><div><span>RECENT ACTIVITY</span><h3>Latest signals</h3></div><a href="#analytics">View all <ChevronRight size={14} /></a></div>
                {[
                  [PackageCheck, "New batch recorded", "Wildflower honey • 2h ago"],
                  [HeartPulse, "Hive health updated", "Mountain Hive #03 • 5h ago"],
                  [Users, "New beekeeper joined", "Demo workspace • 1d ago"],
                ].map(([Icon, title, text]) => <div className="feed-row" key={title}><div className="feed-icon"><Icon size={15} /></div><div><strong>{title}</strong><small>{text}</small></div><ChevronRight size={14} /></div>)}
              </div>
            </div>
          </section>

          <section className="quick-section" id="intelligence"><QuickLinks /></section>

          <section className="compact-alert" id="analytics">
            <div><Zap size={20} /><div><span>SAFETY INTELLIGENCE</span><strong>{alert ? "Sudden weight change detected — inspect Hive #03." : "Your hive network is operating within expected ranges."}</strong></div></div>
            <button onClick={() => setAlert(!alert)}>{alert ? "Reset alert" : "Test alert"} <Bell size={14} /></button>
          </section>

          <div id="pollination" />
        </main>
        <footer><Logo /><span>Smart intelligence for the hive ecosystem.</span><div><a href="#home">Home</a><a href="#health">Health</a><a href="#traceability">Traceability</a><a href="#pollination">Pollination</a></div><small>© 2026 HiveSense</small></footer>
      </div>
    </div>
  );
}

export default App;
