import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronRight,
  Cloud,
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
  Zap
} from "lucide-react";

import "./App.css";

const clamp = (n, min, max) =>
  Math.min(max, Math.max(min, n));

function useHiveData() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((v) => v + 1);
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return useMemo(
    () => ({
      temperature:
        34.2 + Math.sin(tick * 0.7) * 0.35,

      humidity:
        62 + Math.sin(tick * 0.55) * 1.5,

      weight:
        42.8 + Math.sin(tick * 0.35) * 0.18,

      health:
        clamp(
          94 + Math.sin(tick * 0.45) * 1.5,
          0,
          100
        ),

      activity:
        clamp(
          82 + Math.sin(tick * 0.6) * 8,
          0,
          100
        ),

      pollination:
        clamp(
          87 + Math.sin(tick * 0.25) * 3,
          0,
          100
        )
    }),
    [tick]
  );
}

const hives = [
  {
    id: "01",
    name: "Green Valley Hive",
    place: "Baguio • Demo",
    health: 94,
    status: "Healthy",
    temp: "34.2°C",
    humidity: "62%",
    activity: "High",
    condition: "Stable",
    tone: "healthy"
  },
  {
    id: "02",
    name: "Sunrise Hive",
    place: "Nashik • Demo",
    health: 88,
    status: "Healthy",
    temp: "33.7°C",
    humidity: "59%",
    activity: "High",
    condition: "Good brood activity",
    tone: "healthy"
  },
  {
    id: "03",
    name: "Mountain Hive",
    place: "Pune • Demo",
    health: 74,
    status: "Attention",
    temp: "36.8°C",
    humidity: "71%",
    activity: "Low",
    condition: "Temperature rising",
    tone: "warning"
  },
  {
    id: "04",
    name: "Orchard Hive",
    place: "Satara • Demo",
    health: 61,
    status: "Critical",
    temp: "39.1°C",
    humidity: "78%",
    activity: "Low",
    condition: "Heat stress detected",
    tone: "critical"
  }
];

function Logo() {
  return (
    <a className="logo" href="#home">
      <div className="logo-mark">
        <span className="hex">⬡</span>
        <span className="bee">🐝</span>
      </div>

      <div>
        <strong>
          Hive<span>Sense</span>
        </strong>

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
    ["Pollination", "#pollination", Leaf]
  ];

  return (
    <>
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="side-head">
          <Logo />

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav>
          {items.map(([label, href, Icon], i) => (
            <a
              className={i === 0 ? "active" : ""}
              href={href}
              key={label}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />

              <span>{label}</span>

              {i === 0 && <i />}
            </a>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="bee-note">
            <span>🐝</span>

            <div>
              <strong>
                Protect the pollinators.
              </strong>

              <small>
                Every healthy hive matters.
              </small>
            </div>
          </div>

          <div className="network-mini">
            <span>NETWORK</span>

            <strong>128 hives online</strong>

            <i />
          </div>

          <small>
            HiveSense © 2026
          </small>
        </div>
      </aside>

      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function Topbar({ setOpen }) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>

      <div className="search">
        <Search size={17} />

        <input
          placeholder="Search hives, batches, locations..."
        />
      </div>

      <div className="top-actions">
        <button className="icon-btn">
          <Bell size={18} />
          <i />
        </button>

        <div className="live-chip">
          <span />
          SYSTEM LIVE
        </div>

        <div className="profile">
          <div className="avatar">P</div>

          <div>
            <strong>Hive Operator</strong>
            <small>Demo workspace</small>
          </div>

          <ChevronRight size={15} />
        </div>
      </div>
    </header>
  );
}

function Sparkline({ variant = 0, alert = false }) {
  const pts = Array.from(
    { length: 16 },
    (_, i) =>
      15 +
      Math.sin(i * 0.7 + variant) * 7 +
      i * 0.7
  );

  const d = pts
    .map(
      (v, i) =>
        `${i ? "L" : "M"} ${
          (i * 100) / 15
        } ${40 - v}`
    )
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 45"
      preserveAspectRatio="none"
      className={`spark ${
        alert ? "spark-alert" : ""
      }`}
    >
      <path d={d} />
    </svg>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  variant = 0,
  tone = "blue",
  sub
}) {
  return (
    <div className={`kpi ${tone}`}>
      <div className="kpi-icon">
        <Icon size={20} />
      </div>

      <div className="kpi-main">
        <span>{label}</span>

        <strong>{value}</strong>

        <small>
          ↑ {delta} <em>{sub}</em>
        </small>
      </div>

      <Sparkline
        variant={variant}
        alert={tone === "warning"}
      />

      <div className="hover-arrow">
        <ChevronRight size={15} />
      </div>
    </div>
  );
}

function ActivityChart() {
  const points = Array.from(
    { length: 34 },
    (_, i) =>
      45 +
      Math.sin(i * 0.55) * 12 +
      Math.sin(i * 0.17) * 9 +
      (i > 26 ? (i - 26) * 1.2 : 0)
  );

  const d = points
    .map(
      (v, i) =>
        `${i ? "L" : "M"} ${
          (i * 100) / (points.length - 1)
        } ${80 - v * 0.55}`
    )
    .join(" ");

  return (
    <div className="activity-chart">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            x2="100"
            y1={y}
            y2={y}
          />
        ))}

        <path
          className="area"
          d={`${d} L 100 100 L 0 100 Z`}
        />

        <path
          className="line"
          d={d}
        />
      </svg>

      <div className="axis">
        <span>12AM</span>
        <span>4AM</span>
        <span>8AM</span>
        <span>12PM</span>
        <span>4PM</span>
        <span>8PM</span>
      </div>
    </div>
  );
}

function HiveMini({ hive, selected, onClick }) {
  return (
    <button
      className={`hive-mini ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`status-dot ${hive.tone}`}
      />

      <div className="mini-hex">⬡</div>

      <div className="mini-copy">
        <strong>
          {hive.name} #{hive.id}
        </strong>

        <small>{hive.place}</small>

        <span>{hive.condition}</span>
      </div>

      <div className="mini-score">
        <b>{hive.health}%</b>

        <small>{hive.status}</small>
      </div>
    </button>
  );
}

function HivePanel({ data }) {
  const [selected, setSelected] = useState(0);

  const hive = hives[selected];

  return (
    <div
      className="panel hive-panel"
      id="hives"
    >
      <div className="card-title">
        <div>
          <span>LIVE HIVE HEALTH</span>
          <h3>Hive network</h3>
        </div>

        <a href="#hives">
          See all <ChevronRight size={14} />
        </a>
      </div>

      <div className="hive-feature">
        <div className="feature-photo">
          <div className="large-hive">⬡</div>

          <span className="live-badge">
            <i />
            LIVE
          </span>

          <div className="feature-bees">
            🐝 🐝
          </div>
        </div>

        <div className="feature-copy">
          <div className="feature-top">
            <div>
              <strong>
                {hive.name} #{hive.id}
              </strong>

              <small>
                <MapPin size={12} />
                {hive.place}
              </small>
            </div>

            <div
              className={`health-pill ${hive.tone}`}
            >
              <span />
              {hive.status}
            </div>
          </div>

          <p>
            {hive.condition}. Sensor stream is
            updating every few seconds.
          </p>
        </div>
      </div>

      <div className="sensor-row">
        <div>
          <Thermometer />

          <span>Temperature</span>

          <b>
            {selected === 0
              ? `${data.temperature.toFixed(1)}°C`
              : hive.temp}
          </b>

          <small className={hive.tone}>
            {selected === 2 || selected === 3
              ? "Needs attention"
              : "Normal range"}
          </small>
        </div>

        <div>
          <Droplets />

          <span>Humidity</span>

          <b>
            {selected === 0
              ? `${data.humidity.toFixed(0)}%`
              : hive.humidity}
          </b>

          <small>Target 50–75%</small>
        </div>

        <div>
          <Activity />

          <span>Bee activity</span>

          <b>
            {selected === 0
              ? `${data.activity.toFixed(0)}%`
              : hive.activity}
          </b>

          <small>
            {hive.activity === "Low"
              ? "Below baseline"
              : "Strong traffic"}
          </small>
        </div>
      </div>

      <div className="subchart-title">
        <span>HIVE ACTIVITY</span>
        <b>LAST 24 HOURS</b>
      </div>

      <ActivityChart />

      <div className="hive-list">
        {hives.map((h, i) => (
          <HiveMini
            key={h.id}
            hive={h}
            selected={selected === i}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
    </div>
  );
}

function Traceability() {
  const batches = [
    {
      id: "HC-2026-001",
      product: "Wildflower Honey",
      status: "Verified",
      date: "17 Sep 2026",
      tone: "good"
    },
    {
      id: "HC-2026-002",
      product: "Acacia Honey",
      status: "Testing",
      date: "16 Sep 2026",
      tone: "test"
    },
    {
      id: "HC-2026-003",
      product: "Sunflower Honey",
      status: "In transit",
      date: "14 Sep 2026",
      tone: "transit"
    }
  ];

  const [active, setActive] = useState(0);

  const batch = batches[active];

  return (
    <div
      className="trace-card"
      id="traceability"
    >
      <div className="card-title">
        <div>
          <span>PRODUCT TRACEABILITY</span>
          <h3>Track every jar</h3>
        </div>

        <a href="#traceability">
          History <ChevronRight size={14} />
        </a>
      </div>

      <div className="batch-tabs">
        {batches.map((b, i) => (
          <button
            className={
              active === i ? "active" : ""
            }
            onClick={() => setActive(i)}
            key={b.id}
          >
            {b.id.slice(-3)}
          </button>
        ))}
      </div>

      <div className="trace-id">
        <div>
          <PackageCheck size={14} />

          <span>{batch.id}</span>

          <small>{batch.date}</small>
        </div>

        <button>TRACK</button>
      </div>

      <div className="trace-body">
        <div className="timeline">
          {[
            ["Hive", "Collected & sensor-linked"],
            ["Processing", "Extracted & tested"],
            ["Quality", "Lab verification"],
            ["Certificate", "Digital identity created"],
            ["Retail", "Consumer-ready"]
          ].map(([title, text], i) => (
            <div
              className={`timeline-row ${
                i === 0 ? "done" : ""
              }`}
              key={title}
            >
              <div className="timeline-dot">
                {i < 3 ? "✓" : i + 1}
              </div>

              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="jar">
          <div className="jar-lid" />

          <div className="jar-body">
            <b>HS</b>

            <span>HIVESENSE</span>

            <strong>
              {batch.product.replace(
                " Honey",
                ""
              )}
              <br />
              Honey
            </strong>

            <small>
              {batch.status.toUpperCase()}
            </small>
          </div>
        </div>
      </div>

      <div
        className={`trace-verified ${batch.tone}`}
      >
        <ShieldCheck size={18} />

        <div>
          <strong>{batch.status}</strong>
          <span>
            Chain of custody recorded
          </span>
        </div>
      </div>
    </div>
  );
}

function MapCard() {
  const points = [
    ["18%", "24%", "Healthy"],
    ["37%", "52%", "Healthy"],
    ["59%", "32%", "Attention"],
    ["72%", "64%", "Healthy"],
    ["48%", "73%", "Offline"],
    ["83%", "28%", "Healthy"],
    ["29%", "78%", "Attention"],
    ["91%", "55%", "Healthy"]
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div className="map-card">
      <div className="card-title">
        <div>
          <span>GLOBAL HIVE MAP</span>
          <h3>8 active locations</h3>
        </div>

        <a href="#hives">
          View full <ChevronRight size={14} />
        </a>
      </div>

      <div className="map">
        {points.map(
          ([x, y, status], i) => (
            <button
              key={i}
              className={`map-pin ${status.toLowerCase()}`}
              style={{
                left: x,
                top: y
              }}
              onClick={() =>
                setSelected(i)
              }
              title={status}
            />
          )
        )}

        <div className="map-label">
          <strong>{selected + 1}</strong>
          <span>selected location</span>
        </div>
      </div>

      <div className="map-stats">
        <span>
          <b>5</b> Healthy
        </span>

        <span>
          <b>2</b> Attention
        </span>

        <span>
          <b>1</b> Offline
        </span>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const items = [
    [
      PackageCheck,
      "New batch recorded",
      "Wildflower honey • 2 min ago",
      "good"
    ],
    [
      AlertTriangle,
      "Temperature alert",
      "Mountain Hive #03 • 18 min ago",
      "warning"
    ],
    [
      HeartPulse,
      "Hive health improved",
      "Sunrise Hive #02 • 42 min ago",
      "good"
    ],
    [
      Users,
      "New beekeeper joined",
      "Demo workspace • 2 hr ago",
      "blue"
    ],
    [
      Leaf,
      "Pollination index updated",
      "Orchard zone • 5 hr ago",
      "blue"
    ]
  ];

  return (
    <div className="activity-feed panel">
      <div className="card-title">
        <div>
          <span>RECENT ACTIVITY</span>
          <h3>Latest signals</h3>
        </div>

        <a href="#analytics">
          View all <ChevronRight size={14} />
        </a>
      </div>

      {items.map(
        ([Icon, title, text, tone]) => (
          <div
            className="feed-row"
            key={title}
          >
            <div
              className={`feed-icon ${tone}`}
            >
              <Icon size={15} />
            </div>

            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>

            <span
              className={`feed-tag ${tone}`}
            >
              {tone === "warning"
                ? "CHECK"
                : "LIVE"}
            </span>
          </div>
        )
      )}
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="quick-links">
      {[
        [
          Users,
          "Beekeepers",
          "Manage hive access",
          "blue"
        ],
        [
          PackageCheck,
          "Traceable Honey",
          "Verify every batch",
          "amber"
        ],
        [
          Leaf,
          "Pollination",
          "See ecosystem impact",
          "green"
        ],
        [
          Cloud,
          "Data Intelligence",
          "Explore hive insights",
          "navy"
        ]
      ].map(
        ([Icon, title, text, tone]) => (
          <a
            href="#intelligence"
            className={`quick ${tone}`}
            key={title}
          >
            <div>
              <Icon size={21} />

              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </div>

            <ChevronRight size={16} />
          </a>
        )
      )}
    </div>
  );
}

function App() {
  const data = useHiveData();

  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className="app">
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <div className="main">
        <Topbar setOpen={setOpen} />

        <main>
          <section
            className="hero-dashboard"
            id="home"
          >
            <div className="hero-banner">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span />
                  REAL-TIME HIVE INTELLIGENCE
                </div>

                <h1>
                  Know your hives.
                  <br />
                  <em>
                    Protect what matters.
                  </em>
                </h1>

                <p>
                  One compact command center
                  for bee health, honey
                  traceability and ecosystem
                  intelligence.
                </p>

                <div className="hero-buttons">
                  <a
                    href="#health"
                    className="hero-btn"
                  >
                    Open live health
                    <ChevronRight size={15} />
                  </a>

                  <span>
                    <Wifi size={14} />
                    ESP32 connected
                  </span>
                </div>
              </div>

              <div className="hero-bee-scene">
                <div className="sun" />

                <div className="honey-ring r1" />
                <div className="honey-ring r2" />

                <div className="hero-bee">
                  🐝
                </div>

                <div className="hero-honeycomb">
                  {Array.from(
                    { length: 9 }
                  ).map((_, i) => (
                    <span key={i}>
                      ⬡
                    </span>
                  ))}
                </div>

                <div className="hero-floating hf1">
                  <Thermometer size={14} />
                  <b>
                    {data.temperature.toFixed(
                      1
                    )}
                    °C
                  </b>
                  <small>LIVE</small>
                </div>

                <div className="hero-floating hf2">
                  <Weight size={14} />
                  <b>
                    {data.weight.toFixed(1)} kg
                  </b>
                  <small>LIVE</small>
                </div>

                <div className="hero-floating hf3">
                  <HeartPulse size={14} />
                  <b>
                    {data.health.toFixed(0)}%
                  </b>
                  <small>HEALTH</small>
                </div>
              </div>
            </div>

            <aside className="quote-card">
              <div className="quote-mark">
                “
              </div>

              <h3>
                When we protect bees,
                <br />
                we protect life.
              </h3>

              <p>
                Small signals. Big change.
              </p>

              <Leaf size={23} />

              <div className="quote-orbit">
                🐝
              </div>
            </aside>
          </section>

          <section
            className="kpis"
            id="health"
          >
            <Kpi
              icon={PackageCheck}
              label="Hives monitored"
              value="128"
              delta="18%"
              sub="vs last month"
              variant={1}
              tone="blue"
            />

            <Kpi
              icon={HeartPulse}
              label="Healthy hives"
              value={`${data.health.toFixed(0)}%`}
              delta="6%"
              sub="stable"
              variant={2}
              tone="green"
            />

            <Kpi
              icon={Users}
              label="Beekeepers"
              value="1,203"
              delta="27%"
              sub="connected"
              variant={3}
              tone="amber"
            />

            <Kpi
              icon={Leaf}
              label="Pollination index"
              value={`${data.pollination.toFixed(0)}/100`}
              delta="12%"
              sub="improving"
              variant={4}
              tone="navy"
            />
          </section>

          <section className="content-grid">
            <HivePanel data={data} />

            <Traceability />

            <div className="right-stack">
              <MapCard />
              <ActivityFeed />
            </div>
          </section>

          <section
            className="quick-section"
            id="intelligence"
          >
            <QuickLinks />
          </section>

          <section
            className="compact-alert"
            id="analytics"
          >
            <div>
              <Zap size={20} />

              <div>
                <span>
                  SAFETY INTELLIGENCE
                </span>

                <strong>
                  {alert
                    ? "⚠ Sudden temperature rise detected in Mountain Hive #03 — inspect the hive."
                    : "All monitored conditions are within expected operating ranges."}
                </strong>
              </div>
            </div>

            <button
              onClick={() =>
                setAlert(!alert)
              }
            >
              {alert
                ? "Reset alert"
                : "Test alert"}

              <Bell size={14} />
            </button>
          </section>

          <div id="pollination" />
        </main>

        <footer>
          <Logo />

          <span>
            Smart intelligence for the hive
            ecosystem.
          </span>

          <div>
            <a href="#home">Home</a>
            <a href="#health">Health</a>
            <a href="#traceability">
              Traceability
            </a>
            <a href="#pollination">
              Pollination
            </a>
          </div>

          <small>
            © 2026 HiveSense
          </small>
        </footer>
      </div>
    </div>
  );
}

export default App;