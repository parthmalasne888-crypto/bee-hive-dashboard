import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Bell,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  Droplets,
  Gauge,
  Leaf,
  MapPin,
  Radio,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Waves,
  Weight,
  Wifi,
  Zap,
} from "lucide-react";
import "./App.css";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function useLiveHive() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    const temperature = 34.1 + Math.sin(tick * 0.7) * 0.45;
    const humidity = 66.5 + Math.sin(tick * 0.55 + 1) * 1.3;
    const weight = 42.8 + Math.sin(tick * 0.3) * 0.28;
    const health = clamp(93 + Math.sin(tick * 0.4) * 1.8, 0, 100);
    const activity = clamp(78 + Math.sin(tick * 0.62) * 7, 0, 100);
    const pollination = clamp(87 + Math.sin(tick * 0.24) * 3, 0, 100);

    return {
      temperature,
      humidity,
      weight,
      health,
      activity,
      pollination,
      connected: true,
    };
  }, [tick]);
}

function Nav() {
  const links = [
    ["Platform", "#platform"],
    ["Live Hive", "#live"],
    ["Intelligence", "#intelligence"],
    ["Traceability", "#traceability"],
  ];

  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label="HiveSense home">
        <span className="brand-mark">
          <span />
          <span />
          <span />
        </span>
        <span>HIVESENSE</span>
      </a>

      <nav className="nav-links">
        {links.map(([label, href]) => (
          <a href={href} key={label}>{label}</a>
        ))}
      </nav>

      <a className="nav-cta" href="#live">
        Explore live hive <ArrowUpRight size={15} />
      </a>
    </header>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i}>
            HIVE INTELLIGENCE <b>✦</b> REAL-TIME DATA <b>✦</b> POLLINATION
            <b>✦</b> TRACEABLE HONEY <b>✦</b> SMART AGRICULTURE <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function HiveOrb({ data }) {
  const nodes = [
    { icon: Thermometer, label: "TEMP", value: `${data.temperature.toFixed(1)}°`, pos: "n1" },
    { icon: Droplets, label: "HUMIDITY", value: `${data.humidity.toFixed(0)}%`, pos: "n2" },
    { icon: Weight, label: "WEIGHT", value: `${data.weight.toFixed(1)} kg`, pos: "n3" },
    { icon: Gauge, label: "HEALTH", value: `${data.health.toFixed(0)}%`, pos: "n4" },
  ];

  return (
    <div className="hive-stage">
      <div className="stage-grid" />
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="orbit orbit-c" />

      <div className="signal signal-1" />
      <div className="signal signal-2" />
      <div className="signal signal-3" />

      <div className="hive-core">
        <div className="core-glow" />
        <div className="hex-stack">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bee-dot bee-a">🐝</div>
        <div className="bee-dot bee-b">🐝</div>
        <div className="core-label">
          <small>HIVE 01</small>
          <strong>ALIVE</strong>
          <em>LIVE SENSOR LINK</em>
        </div>
      </div>

      {nodes.map(({ icon: Icon, label, value, pos }) => (
        <div className={`sensor-node ${pos}`} key={label}>
          <div className="sensor-icon"><Icon size={15} /></div>
          <div>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

function DataCard({ icon: Icon, label, value, unit, trend }) {
  return (
    <div className="data-card">
      <div className="data-icon"><Icon size={18} /></div>
      <div className="data-copy">
        <span>{label}</span>
        <strong>{value}<small>{unit}</small></strong>
      </div>
      <div className="trend"><ArrowUpRight size={13} /> {trend}</div>
    </div>
  );
}

function LiveChart({ weight }) {
  const points = Array.from({ length: 38 }, (_, i) => {
    const base = 42.1 + Math.sin(i * 0.42) * 0.18;
    const drift = i > 30 ? (i - 30) * 0.025 : 0;
    return base + drift + (i === 37 ? weight - 42.8 : 0);
  });

  const min = Math.min(...points) - 0.2;
  const max = Math.max(...points) + 0.2;
  const path = points.map((v, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 88 - ((v - min) / (max - min)) * 64;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="chart">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity=".3" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[22, 44, 66, 88].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} className="chart-grid" />)}
        <path d={`${path} L 100 100 L 0 100 Z`} className="chart-area" />
        <path d={path} className="chart-line" />
      </svg>
      <div className="chart-axis"><span>12:00</span><span>12:30</span><span>13:00</span><span>13:30</span></div>
    </div>
  );
}

function App() {
  const data = useLiveHive();
  const [alert, setAlert] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="app" id="top">
      <div className="noise" />
      <Nav />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> IoT • BIOLOGY • INTELLIGENCE</div>
            <h1>
              TURN EVERY
              <span>HIVE</span>
              INTO A
              <i>SMART HIVE.</i>
            </h1>
            <p>
              Real-time intelligence for bees, farmers and the ecosystem —
              from the inside of the hive to the fields around it.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#live">Enter the hive <ArrowDown size={17} /></a>
              <a className="text-btn" href="#platform">See how it works <ChevronRight size={17} /></a>
            </div>
            <div className="hero-proof">
              <span><Radio size={14} /> LIVE SIGNAL</span>
              <span><Wifi size={14} /> ESP32 LINKED</span>
              <span><span className="green-dot" /> DEMO DATA</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-tag tag-top"><span>HIVE / 01</span><b>ONLINE</b></div>
            <HiveOrb data={data} />
            <div className="visual-tag tag-bottom"><span>DATA STREAM</span><b>02.4 KB/s</b></div>
          </div>

          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><div /></div>
        </section>

        <Marquee />

        <section className="intro section" id="platform">
          <div className="section-index">01 / PLATFORM</div>
          <div className="intro-grid">
            <div>
              <p className="kicker">ONE HIVE. ONE INTELLIGENT ECOSYSTEM.</p>
              <h2>We don't just<br /><em>measure</em> the hive.</h2>
            </div>
            <div className="intro-text">
              <p>
                HiveSense turns invisible hive signals into information people
                can actually act on. Temperature, humidity, weight and activity
                become a living picture of hive health.
              </p>
              <a href="#intelligence">Follow the signal <ArrowUpRight size={16} /></a>
            </div>
          </div>

          <div className="flow">
            {[
              [Radio, "HIVE", "Sense"],
              [Cpu, "SENSORS", "Collect"],
              [Cloud, "HIVESENSE", "Understand"],
              [Bell, "FARMER", "Act"],
            ].map(([Icon, title, verb], i) => (
              <div className="flow-step" key={title}>
                <div className="flow-num">0{i + 1}</div>
                <div className="flow-icon"><Icon size={22} /></div>
                <strong>{title}</strong>
                <span>{verb}</span>
                {i < 3 && <ChevronRight className="flow-arrow" size={20} />}
              </div>
            ))}
          </div>
        </section>

        <section className="live section" id="live">
          <div className="section-index">02 / LIVE HIVE</div>
          <div className="live-heading">
            <div>
              <p className="kicker">INSIDE THE HIVE. RIGHT NOW.</p>
              <h2>A living dashboard,<br /><em>not a spreadsheet.</em></h2>
            </div>
            <div className="live-status"><span className="pulse-dot" /> LIVE • UPDATING</div>
          </div>

          <div className="live-layout">
            <div className="live-main panel">
              <div className="panel-top">
                <div><span className="mini-label">HIVE WEIGHT</span><strong>{data.weight.toFixed(1)} <small>kg</small></strong></div>
                <div className="delta"><ArrowUp size={13} /> +0.3% <span>today</span></div>
              </div>
              <LiveChart weight={data.weight} />
              <div className="chart-foot"><span>WEIGHT TELEMETRY</span><span>LAST 90 MIN</span></div>
            </div>

            <div className="live-side">
              <DataCard icon={Thermometer} label="Temperature" value={data.temperature.toFixed(1)} unit="°C" trend="stable" />
              <DataCard icon={Droplets} label="Humidity" value={data.humidity.toFixed(0)} unit="%" trend="normal" />
              <DataCard icon={Gauge} label="Hive health" value={data.health.toFixed(0)} unit="%" trend="good" />
              <div className="alert-card">
                <div className="alert-icon"><ShieldCheck size={20} /></div>
                <div><span>STATUS</span><strong>Hive conditions are stable.</strong></div>
                <span className="ok-pill">HEALTHY</span>
              </div>
            </div>
          </div>

          <div className="demo-note">
            <span>◉ DEMO TELEMETRY</span>
            Current values are simulated for the prototype. Real ESP32/Firebase data can replace this stream.
          </div>
        </section>

        <section className="intelligence section" id="intelligence">
          <div className="section-index">03 / INTELLIGENCE</div>
          <div className="big-statement">
            <p className="kicker">DATA SHOULD BECOME A DECISION.</p>
            <h2>When something<br />changes, <em>know.</em></h2>
          </div>

          <div className="intelligence-grid">
            <article className="intel-card intel-main">
              <div className="intel-orb"><Waves size={28} /></div>
              <span className="card-number">01</span>
              <h3>Detect the unusual.</h3>
              <p>A sudden weight shift, thermal change or activity drop becomes a signal — before it becomes a problem.</p>
              <div className="fake-alert">
                <Bell size={16} />
                <div><b>ANOMALY DETECTED</b><span>Hive #03 • sudden weight change</span></div>
              </div>
            </article>

            <article className="intel-card">
              <span className="card-number">02</span>
              <Leaf size={25} />
              <h3>See beyond honey.</h3>
              <p>Bee activity can become a window into pollination and agricultural intelligence.</p>
              <div className="metric-orbit"><strong>{data.pollination.toFixed(0)}</strong><span>POLLINATION<br />INDEX</span></div>
            </article>

            <article className="intel-card">
              <span className="card-number">03</span>
              <MapPin size={25} />
              <h3>Think in regions.</h3>
              <p>Aggregate hive signals into a future layer for regional agricultural and environmental insights.</p>
              <div className="map-lines"><i /><i /><i /><i /><i /><i /></div>
              <small>MAHARASHTRA / DEMO VIEW</small>
            </article>
          </div>
        </section>

        <section className="trace section" id="traceability">
          <div className="section-index">04 / TRACEABILITY</div>
          <div className="trace-heading">
            <p className="kicker">FROM HIVE TO HAND.</p>
            <h2>Every jar has<br /><em>a story.</em></h2>
          </div>

          <div className="trace-flow">
            {[
              ["01", "HIVE", "Origin"],
              ["02", "HARVEST", "Record"],
              ["03", "QUALITY", "Verify"],
              ["04", "CERTIFICATE", "Identify"],
              ["05", "RETAIL", "Share"],
            ].map(([num, title, sub], i) => (
              <div className="trace-item" key={num}>
                <span>{num}</span>
                <div className="trace-hex">{i === 3 ? "ID" : "✦"}</div>
                <strong>{title}</strong>
                <small>{sub}</small>
                {i < 4 && <div className="trace-line" />}
              </div>
            ))}
          </div>

          <div className="certificate">
            <div className="cert-left">
              <div className="cert-stamp">HS</div>
              <div><span>DIGITAL HONEY ID</span><strong>HIVE-2026-001</strong></div>
            </div>
            <div className="cert-data"><span>ORIGIN</span><b>DEMO HIVE 01</b></div>
            <div className="cert-data"><span>STATUS</span><b>TRACEABLE</b></div>
            <div className="cert-arrow"><ArrowUpRight size={20} /></div>
          </div>
        </section>

        <section className="ecosystem section">
          <div className="section-index">05 / ECOSYSTEM</div>
          <div className="eco-title"><h2>One platform.<br /><em>Three perspectives.</em></h2></div>
          <div className="eco-grid">
            <div className="eco-card farmer"><span>01 / FARMER</span><h3>Know your hives.</h3><p>Live conditions, alerts, multi-hive visibility and production insights.</p><ArrowUpRight /></div>
            <div className="eco-card agriculture"><span>02 / AGRICULTURE</span><h3>Understand regions.</h3><p>Pollination signals, environmental trends and aggregated intelligence.</p><ArrowUpRight /></div>
            <div className="eco-card retail"><span>03 / RETAIL</span><h3>Show the story.</h3><p>Honey traceability, product identity and transparent origin information.</p><ArrowUpRight /></div>
          </div>
        </section>

        <section className="tech section">
          <div className="tech-backdrop" />
          <div className="section-index">06 / TECHNOLOGY</div>
          <div className="tech-content">
            <p className="kicker">HARDWARE MEETS INTELLIGENCE.</p>
            <h2>The signal has<br /><em>a nervous system.</em></h2>
            <div className="tech-pipeline">
              {[
                [Radio, "SENSORS", "Measure"],
                [Cpu, "ESP32", "Connect"],
                [Cloud, "CLOUD", "Store"],
                [Sparkles, "HIVESENSE", "Understand"],
              ].map(([Icon, title, sub], i) => (
                <div className="tech-node" key={title}>
                  <div className="tech-icon"><Icon /></div><b>{title}</b><span>{sub}</span>
                  {i < 3 && <div className="tech-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="emergency section">
          <div className={`emergency-panel ${alert ? "triggered" : ""}`}>
            <div className="emergency-noise" />
            <div className="emergency-copy">
              <span>SAFETY LAYER / HIVE 03</span>
              <h2>{alert ? "SUDDEN WEIGHT CHANGE." : "WHEN SOMETHING CHANGES."}</h2>
              <p>{alert ? "Inspect the hive immediately. The system has flagged an abnormal telemetry shift." : "A smart hive should not wait for someone to open it before asking for attention."}</p>
              <button onClick={() => setAlert(!alert)} className="danger-btn">
                <Bell size={16} /> {alert ? "Reset simulation" : "Test emergency alert"}
              </button>
            </div>
            <div className="emergency-readout">
              <span>WEIGHT DELTA</span>
              <strong>{alert ? "+7.8" : "+0.3"}<small>kg</small></strong>
              <div className="readout-bar"><i style={{ width: alert ? "92%" : "16%" }} /></div>
              <small>{alert ? "ATTENTION REQUIRED" : "WITHIN EXPECTED RANGE"}</small>
            </div>
          </div>
        </section>

        <section className="final section">
          <div className="final-grid">
            <div className="final-orb"><div className="final-hex">🐝</div></div>
            <div>
              <p className="kicker">THE NEXT GENERATION OF BEEKEEPING.</p>
              <h2>THE HIVE<br /><em>IS ALIVE.</em></h2>
              <p className="final-copy">Now make it visible.</p>
              <a className="primary-btn" href="#top">Enter HiveSense <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><span /><span /><span /></span><strong>HIVESENSE</strong></div>
        <p>Smart intelligence for the hive ecosystem.</p>
        <div className="footer-links"><a href="#platform">Platform</a><a href="#live">Live Hive</a><a href="#intelligence">Intelligence</a><a href="#traceability">Traceability</a></div>
        <small>© 2026 HiveSense</small>
      </footer>

      <button className={`floating-menu ${menu ? "open" : ""}`} onClick={() => setMenu(!menu)} aria-label="Menu">
        {menu ? "×" : "☰"}
      </button>
    </div>
  );
}

export default App;
