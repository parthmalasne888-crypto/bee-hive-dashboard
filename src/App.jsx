import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  Database,
  Droplets,
  Gauge,
  Globe2,
  HeartPulse,
  Leaf,
  LineChart,
  ListFilter,
  LockKeyhole,
  Map,
  MapPin,
  Menu,
  PackageCheck,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Store,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Users,
  Weight,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import "./App.css";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const navItems = [
  ["Home", "home", Gauge],
  ["Hive Health", "health", HeartPulse],
  ["My Hives", "hives", Boxes],
  ["Analytics", "analytics", LineChart],
  ["Traceability", "traceability", PackageCheck],
  ["Pollination", "pollination", Leaf],
  ["B-Mart", "bmart", ShoppingBag],
];

const hives = [
  {
    id: "01",
    name: "Green Valley",
    location: "Nashik, MH",
    health: 94,
    status: "Healthy",
    tone: "good",
    temp: 34.2,
    humidity: 62,
    weight: 42.8,
    activity: 88,
    battery: 94,
    condition: "Stable",
    note: "Good brood activity",
  },
  {
    id: "02",
    name: "Sunrise",
    location: "Pune, MH",
    health: 88,
    status: "Healthy",
    tone: "good",
    temp: 33.7,
    humidity: 59,
    weight: 39.4,
    activity: 81,
    battery: 88,
    condition: "Stable",
    note: "Strong traffic",
  },
  {
    id: "03",
    name: "Mountain",
    location: "Satara, MH",
    health: 74,
    status: "Attention",
    tone: "warn",
    temp: 36.8,
    humidity: 71,
    weight: 36.9,
    activity: 63,
    battery: 71,
    condition: "Temperature rising",
    note: "Inspect ventilation",
  },
  {
    id: "04",
    name: "Orchard",
    location: "Kolhapur, MH",
    health: 61,
    status: "Critical",
    tone: "danger",
    temp: 39.1,
    humidity: 78,
    weight: 34.2,
    activity: 47,
    battery: 56,
    condition: "Heat stress detected",
    note: "Immediate inspection",
  },
];

const batches = [
  {
    id: "HC-2026-001",
    product: "Wildflower Honey",
    source: "Green Valley #01",
    producer: "Demo Honey Farm",
    date: "17 Sep 2026",
    quality: "A+",
    status: "Verified",
    tone: "good",
  },
  {
    id: "HC-2026-002",
    product: "Acacia Honey",
    source: "Sunrise #02",
    producer: "Demo Honey Farm",
    date: "16 Sep 2026",
    quality: "A",
    status: "Testing",
    tone: "warn",
  },
  {
    id: "HC-2026-003",
    product: "Sunflower Honey",
    source: "Mountain #03",
    producer: "Orchard Collective",
    date: "14 Sep 2026",
    quality: "B+",
    status: "In transit",
    tone: "info",
  },
];

const defaultProducts = [
  {
    id: "p1",
    name: "Wildflower Gold",
    type: "Raw honey",
    weight: "500 g",
    price: 480,
    stock: 24,
    quality: "A+",
    source: "Green Valley #01",
    verified: true,
  },
  {
    id: "p2",
    name: "Acacia Bloom",
    type: "Premium honey",
    weight: "250 g",
    price: 320,
    stock: 18,
    quality: "A",
    source: "Sunrise #02",
    verified: true,
  },
  {
    id: "p3",
    name: "Forest Nectar",
    type: "Organic honey",
    weight: "500 g",
    price: 560,
    stock: 11,
    quality: "A+",
    source: "Mountain #03",
    verified: true,
  },
];

const activityItems = [
  {
    icon: PackageCheck,
    title: "New batch recorded",
    text: "Wildflower Honey • 2 min ago",
    tone: "good",
  },
  {
    icon: AlertTriangle,
    title: "Temperature alert",
    text: "Mountain Hive #03 • 18 min ago",
    tone: "warn",
  },
  {
    icon: HeartPulse,
    title: "Hive health improved",
    text: "Sunrise Hive #02 • 42 min ago",
    tone: "good",
  },
  {
    icon: Users,
    title: "New beekeeper joined",
    text: "Demo workspace • 2 hr ago",
    tone: "info",
  },
  {
    icon: Leaf,
    title: "Pollination index updated",
    text: "Orchard zone • 5 hr ago",
    tone: "info",
  },
];

function useLiveTelemetry(emergency) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(timer);
  }, []);

  return useMemo(() => {
    const temperature = 34.2 + Math.sin(tick * 0.72) * 0.35;
    const humidity = 62 + Math.sin(tick * 0.5) * 1.6;
    const weight = emergency
      ? 49.9 + Math.sin(tick * 0.28) * 0.25
      : 42.8 + Math.sin(tick * 0.32) * 0.18;

    return {
      temperature,
      humidity,
      weight,
      health: clamp(
        emergency ? 61 + Math.sin(tick * 0.4) * 1.5 : 94 + Math.sin(tick * 0.45) * 1.4,
        0,
        100
      ),
      activity: clamp(
        emergency ? 46 + Math.sin(tick * 0.45) * 5 : 82 + Math.sin(tick * 0.6) * 7,
        0,
        100
      ),
      pollination: clamp(87 + Math.sin(tick * 0.24) * 3, 0, 100),
      updated: new Date(),
    };
  }, [tick, emergency]);
}

function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? "compact" : ""}`} onClick={() => scrollToSection("home")}>
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-hex">⬡</span>
        <span className="logo-core">✦</span>
      </div>
      {!compact && (
        <div className="logo-text">
          <strong>
            Hive<span>Sense</span>
          </strong>
          <small>SMART BEE INTELLIGENCE</small>
        </div>
      )}
    </div>
  );
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function Sidebar({ open, setOpen, activeSection, onNavigate }) {
  return (
    <>
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <div className="side-head">
          <Logo />
          <button
            className="icon-button side-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="nav-group-label">COMMAND CENTER</div>

        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map(([label, id, Icon]) => (
            <button
              key={id}
              className={`nav-item ${activeSection === id ? "active" : ""}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {activeSection === id && <i aria-hidden="true" />}
            </button>
          ))}
        </nav>

        <div className="side-card">
          <div className="side-card-top">
            <span>DEMO WORKSPACE</span>
            <Wifi size={14} />
          </div>
          <strong>128 hives online</strong>
          <p>
            Live-looking interface. Connect ESP32 + cloud data when your backend
            is ready.
          </p>
        </div>

        <div className="side-bottom">
          <div className="side-note">
            <div className="side-note-icon">
              <Leaf size={15} />
            </div>
            <div>
              <strong>Protect the pollinators.</strong>
              <span>Every healthy hive matters.</span>
            </div>
          </div>
          <small>HiveSense © 2026</small>
        </div>
      </aside>

      {open && (
        <button
          className="mobile-overlay"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}

function Topbar({
  setOpen,
  query,
  setQuery,
  notificationsOpen,
  setNotificationsOpen,
  workspace,
  setWorkspace,
}) {
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hiveMatches = hives
      .filter((h) =>
        `${h.name} ${h.location} ${h.id}`.toLowerCase().includes(q)
      )
      .slice(0, 3)
      .map((h) => ({
        kind: "Hive",
        label: `${h.name} Hive #${h.id}`,
        meta: h.location,
        id: "hives",
      }));

    const batchMatches = batches
      .filter((b) =>
        `${b.id} ${b.product} ${b.source}`.toLowerCase().includes(q)
      )
      .slice(0, 3)
      .map((b) => ({
        kind: "Batch",
        label: b.id,
        meta: b.product,
        id: "traceability",
      }));

    return [...hiveMatches, ...batchMatches].slice(0, 5);
  }, [query]);

  return (
    <header className="topbar">
      <button
        className="mobile-menu icon-button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="search-wrap">
        <div className="search-box">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hives, batches, locations..."
            aria-label="Search hives, batches, locations"
          />
          <kbd>⌘ K</kbd>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <button
                key={`${result.kind}-${result.label}-${index}`}
                onClick={() => {
                  setQuery("");
                  scrollToSection(result.id);
                }}
              >
                <span className="search-kind">{result.kind}</span>
                <span className="search-result-copy">
                  <strong>{result.label}</strong>
                  <small>{result.meta}</small>
                </span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="topbar-spacer" />

      <div className="workspace-toggle">
        <button
          className={workspace === "farm" ? "active" : ""}
          onClick={() => setWorkspace("farm")}
        >
          FARM
        </button>
        <button
          className={workspace === "agri" ? "active" : ""}
          onClick={() => setWorkspace("agri")}
        >
          AGRI
        </button>
      </div>

      <button
        className="icon-button notification-button"
        onClick={() => setNotificationsOpen((v) => !v)}
        aria-label="Notifications"
      >
        <Bell size={17} />
        <i />
      </button>

      <div className="live-chip">
        <span />
        SYSTEM LIVE
      </div>

      <div className="profile-chip">
        <div className="avatar">P</div>
        <div>
          <strong>Hive Operator</strong>
          <small>{workspace === "agri" ? "Agriculture view" : "Farm workspace"}</small>
        </div>
        <ChevronDown size={14} />
      </div>

      {notificationsOpen && (
        <div className="notification-panel">
          <div className="notification-head">
            <div>
              <span>ALERT CENTER</span>
              <strong>3 signals need attention</strong>
            </div>
            <button onClick={() => setNotificationsOpen(false)}>
              <X size={15} />
            </button>
          </div>

          {[
            ["Critical", "Orchard Hive #04", "Heat stress detected", "danger"],
            ["Warning", "Mountain Hive #03", "Temperature rising", "warn"],
            ["Info", "HC-2026-001", "Batch verified", "good"],
          ].map(([label, title, text, tone]) => (
            <div className="notification-row" key={title}>
              <span className={`status-dot ${tone}`} />
              <div>
                <small>{label}</small>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span />
          {eyebrow}
        </div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function DataSpark({ seed = 0, danger = false }) {
  const points = Array.from(
    { length: 16 },
    (_, i) => 20 + Math.sin(i * 0.7 + seed) * 7 + i * 0.5
  );
  const d = points
    .map((v, i) => `${i ? "L" : "M"} ${i * (100 / 15)} ${45 - v}`)
    .join(" ");

  return (
    <svg className={`spark ${danger ? "danger" : ""}`} viewBox="0 0 100 45" preserveAspectRatio="none">
      <path d={d} />
    </svg>
  );
}

function KpiCard({ icon: Icon, label, value, trend, note, seed, tone }) {
  return (
    <div className={`kpi-card ${tone}`}>
      <div className="kpi-icon">
        <Icon size={18} />
      </div>
      <div className="kpi-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>
          <TrendingUp size={11} />
          {trend} <em>{note}</em>
        </small>
      </div>
      <DataSpark seed={seed} />
      <ChevronRight className="kpi-arrow" size={15} />
    </div>
  );
}

function HomeHero({ data, workspace }) {
  return (
    <section id="home" className="dashboard-section home-section">
      <div className="hero-grid">
        <div className="hero-card focus-card">
          <div className="hero-background-grid" />
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              {workspace === "agri"
                ? "REGIONAL AGRICULTURE COMMAND"
                : "REAL-TIME HIVE INTELLIGENCE"}
            </div>
            <h1>
              Know your hives.
              <br />
              <em>Protect what matters.</em>
            </h1>
            <p>
              One compact command center for bee health, traceability,
              pollination intelligence and direct honey commerce.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToSection("health")}>
                Open hive health
                <ChevronRight size={15} />
              </button>
              <div className="hero-status">
                <span className="pulse-dot" />
                ESP32 data-ready architecture
              </div>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>{data.temperature.toFixed(1)}°C</strong>
                <span>Temperature</span>
              </div>
              <div>
                <strong>{data.weight.toFixed(1)} kg</strong>
                <span>Hive weight</span>
              </div>
              <div>
                <strong>{data.health.toFixed(0)}%</strong>
                <span>Hive health</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-aura" />
            <div className="hero-orbit orbit-a" />
            <div className="hero-orbit orbit-b" />
            <div className="hero-orbit orbit-c" />

            <div className="hero-data-stream stream-a" />
            <div className="hero-data-stream stream-b" />
            <div className="hero-data-stream stream-c" />

            <div className="hero-hex hex-a" />
            <div className="hero-hex hex-b" />
            <div className="hero-hex hex-c" />
            <div className="hero-hex hex-d" />
            <div className="hero-hex hex-e" />
            <div className="hero-hex hex-f" />
            <div className="hero-hex hex-g" />
            <div className="hero-hex hex-h" />

            <div className="hero-bee-mark" role="img" aria-label="Animated smart hive bee">
              <svg className="hero-bee-svg" viewBox="0 0 120 90" aria-hidden="true">
                <defs>
                  <linearGradient id="beeGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE27A" />
                    <stop offset="48%" stopColor="#F4B63C" />
                    <stop offset="100%" stopColor="#D88B1F" />
                  </linearGradient>
                  <linearGradient id="beeWing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#EAF7FF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#74C8FF" stopOpacity="0.18" />
                  </linearGradient>
                  <filter id="beeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* rear wings */}
                <g className="bee-wing bee-wing-back">
                  <ellipse cx="53" cy="25" rx="28" ry="12" fill="url(#beeWing)" stroke="#BFE8FF" strokeOpacity="0.55" transform="rotate(-24 53 25)" />
                  <ellipse cx="67" cy="28" rx="26" ry="11" fill="url(#beeWing)" stroke="#BFE8FF" strokeOpacity="0.42" transform="rotate(-3 67 28)" />
                </g>

                {/* legs */}
                <g className="bee-legs" stroke="#2A241D" strokeWidth="2" strokeLinecap="round">
                  <path d="M49 59 L40 71 L34 72" />
                  <path d="M57 63 L51 77 L46 79" />
                  <path d="M68 62 L72 76 L78 79" />
                  <path d="M77 57 L88 68 L94 68" />
                </g>

                {/* abdomen */}
                <g filter="url(#beeGlow)">
                  <ellipse cx="78" cy="49" rx="27" ry="20" fill="url(#beeGold)" stroke="#FFE58B" strokeOpacity="0.7" strokeWidth="1.2" />
                  <path d="M67 31 C74 38 74 60 67 68" fill="none" stroke="#26221C" strokeWidth="7" />
                  <path d="M82 30 C89 38 89 61 81 68" fill="none" stroke="#26221C" strokeWidth="7" />
                  <path d="M96 35 C101 42 101 56 96 63" fill="none" stroke="#26221C" strokeWidth="6" />
                </g>

                {/* thorax */}
                <ellipse cx="55" cy="48" rx="17" ry="16" fill="#2A241D" stroke="#66533B" strokeWidth="1.2" />
                <path d="M46 39 Q55 35 64 39" fill="none" stroke="#F6B946" strokeWidth="3" strokeLinecap="round" />

                {/* head */}
                <circle cx="37" cy="48" r="13" fill="#332A20" stroke="#8A6B3B" strokeWidth="1.2" />
                <circle cx="33" cy="45" r="2.1" fill="#F7F4DE" />
                <circle cx="33.4" cy="45.3" r="0.9" fill="#172018" />
                <path d="M27 53 Q36 58 44 53" fill="none" stroke="#F1C65B" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />

                {/* antennae */}
                <g fill="none" stroke="#D7AA4F" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M30 39 Q23 25 14 22" />
                  <path d="M41 38 Q40 24 49 19" />
                </g>
                <circle cx="14" cy="22" r="2" fill="#F4B63C" />
                <circle cx="49" cy="19" r="2" fill="#F4B63C" />

                {/* front wings */}
                <g className="bee-wing bee-wing-front">
                  <ellipse cx="50" cy="26" rx="18" ry="8" fill="#F4FBFF" fillOpacity="0.68" stroke="#D5F1FF" strokeOpacity="0.75" transform="rotate(-35 50 26)" />
                  <ellipse cx="63" cy="30" rx="17" ry="7" fill="#F4FBFF" fillOpacity="0.5" stroke="#D5F1FF" strokeOpacity="0.6" transform="rotate(8 63 30)" />
                </g>

                {/* stinger */}
                <path d="M104 48 L113 52 L104 56" fill="#2A241D" />
              </svg>
            </div>

            <div className="hero-signal-core">
              <span />
              <span />
              <span />
            </div>

            <div className="floating-telemetry telemetry-a">
              <Thermometer size={14} />
              <div>
                <span>LIVE TEMP</span>
                <strong>{data.temperature.toFixed(1)}°C</strong>
              </div>
              <em>LIVE</em>
            </div>

            <div className="floating-telemetry telemetry-b">
              <Activity size={14} />
              <div>
                <span>BEE ACTIVITY</span>
                <strong>{data.activity.toFixed(0)}%</strong>
              </div>
              <em>LIVE</em>
            </div>

            <div className="floating-telemetry telemetry-c">
              <HeartPulse size={14} />
              <div>
                <span>HEALTH</span>
                <strong>{data.health.toFixed(0)}%</strong>
              </div>
              <em>LIVE</em>
            </div>

            <div className="hero-micro-label label-a">HIVE #01</div>
            <div className="hero-micro-label label-b">EDGE LINK</div>
            <div className="hero-micro-label label-c">01.24s</div>
          </div>
        </div>

        <div className="hero-side-stack">
          <div className="command-card">
            <div className="command-top">
              <span>QUICK STATUS</span>
              <span className="live-label">
                <i /> LIVE
              </span>
            </div>
            <div className="command-main">
              <div className="health-ring" style={{ "--progress": `${data.health}%` }}>
                <div>
                  <strong>{data.health.toFixed(0)}</strong>
                  <span>%</span>
                </div>
              </div>
              <div>
                <strong>Hive health</strong>
                <p>{data.health > 90 ? "Stable operating conditions." : "Inspect recent signals."}</p>
              </div>
            </div>
            <div className="command-footer">
              <span>
                <span className="small-dot good" />
                3 healthy
              </span>
              <span>
                <span className="small-dot warn" />
                1 attention
              </span>
              <span>
                <span className="small-dot danger" />
                1 critical
              </span>
            </div>
          </div>

          <div className="quote-card">
            <Bot size={17} />
            <strong>HiveSense insight</strong>
            <p>
              Stable hive conditions can be monitored continuously without
              opening every hive.
            </p>
            <small>Concept intelligence layer</small>
          </div>
        </div>
      </div>

      <div className="kpi-grid" aria-label="Key performance indicators">
        <KpiCard
          icon={Boxes}
          label="Hives monitored"
          value="128"
          trend="+18%"
          note="vs last month"
          seed={1}
          tone="blue"
        />
        <KpiCard
          icon={HeartPulse}
          label="Healthy hives"
          value={`${data.health.toFixed(0)}%`}
          trend="+6%"
          note="stable"
          seed={2}
          tone="green"
        />
        <KpiCard
          icon={Users}
          label="Beekeepers"
          value="1,203"
          trend="+27%"
          note="connected"
          seed={3}
          tone="amber"
        />
        <KpiCard
          icon={Leaf}
          label="Pollination index"
          value={`${data.pollination.toFixed(0)}/100`}
          trend="+12%"
          note="improving"
          seed={4}
          tone="lime"
        />
      </div>

      <div className="home-lower-grid">
        <ActivityFeed />
        <QuickCommand />
      </div>
    </section>
  );
}

function QuickCommand() {
  const items = [
    [Thermometer, "Hive health", "Monitor environmental signals", "health", "health"],
    [PackageCheck, "Traceability", "Verify batch identities", "traceability", "traceability"],
    [Leaf, "Pollination", "View ecosystem impact", "pollination", "pollination"],
    [ShoppingBag, "B-Mart", "Sell and discover honey", "bmart", "bmart"],
  ];

  return (
    <div className="panel quick-command">
      <div className="card-header">
        <div>
          <span>QUICK COMMANDS</span>
          <h3>Move through the platform</h3>
        </div>
      </div>
      <div className="quick-command-grid">
        {items.map(([Icon, title, text, id, target]) => (
          <button key={id} onClick={() => scrollToSection(target)}>
            <div className="quick-icon">
              <Icon size={16} />
            </div>
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            <ChevronRight size={14} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="panel activity-card">
      <div className="card-header">
        <div>
          <span>RECENT ACTIVITY</span>
          <h3>Latest signals</h3>
        </div>
        <span className="micro-tag">LIVE FEED</span>
      </div>

      <div className="activity-list">
        {activityItems.map(({ icon: Icon, title, text, tone }) => (
          <div className="activity-row" key={title}>
            <div className={`activity-icon ${tone}`}>
              <Icon size={14} />
            </div>
            <div className="activity-copy">
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
            <span className={`activity-badge ${tone}`}>
              {tone === "warn" ? "CHECK" : tone === "danger" ? "URGENT" : "LIVE"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HiveHealth({ data, activeSection, onTestAlert }) {
  const [selectedId, setSelectedId] = useState("01");
  const selected = hives.find((h) => h.id === selectedId) ?? hives[0];

  return (
    <section id="health" className={`dashboard-section ${activeSection === "health" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow="HIVE HEALTH"
        title="Know what is happening inside the hive."
        subtitle="Farmer-first monitoring with clear status, live-looking telemetry and simple actions."
        action={
          <button className="ghost-button" onClick={onTestAlert}>
            <Zap size={14} />
            Test alert
          </button>
        }
      />

      <div className="health-layout">
        <div className="selected-hive-card panel">
          <div className="selected-header">
            <div>
              <span>SELECTED HIVE</span>
              <h3>{selected.name} #{selected.id}</h3>
              <p>
                <MapPin size={12} />
                {selected.location}
              </p>
            </div>
            <div className={`status-pill ${selected.tone}`}>
              <span />
              {selected.status}
            </div>
          </div>

          <div className="selected-score">
            <div className="big-health-ring" style={{ "--progress": `${selected.health}%` }}>
              <div>
                <strong>{selected.health}</strong>
                <span>%</span>
              </div>
            </div>
            <div className="score-copy">
              <span>HEALTH SCORE</span>
              <strong>{selected.note}</strong>
              <p>
                Keep an eye on recent changes before opening the hive. Values
                below are demonstration data.
              </p>
              <div className="score-tags">
                <span><Wifi size={11} /> IoT ready</span>
                <span><LockKeyhole size={11} /> Demo workspace</span>
              </div>
            </div>
          </div>

          <div className="sensor-grid">
            <SensorTile icon={Thermometer} label="Temperature" value={`${selected.id === "01" ? data.temperature.toFixed(1) : selected.temp.toFixed(1)}°C`} status={selected.tone === "danger" ? "Critical" : selected.tone === "warn" ? "Rising" : "Normal"} tone={selected.tone} />
            <SensorTile icon={Droplets} label="Humidity" value={`${selected.id === "01" ? data.humidity.toFixed(0) : selected.humidity}%`} status="Target 50–75%" tone="neutral" />
            <SensorTile icon={Weight} label="Hive weight" value={`${selected.weight.toFixed(1)} kg`} status={selected.tone === "danger" ? "Change detected" : "Stable"} tone={selected.tone} />
            <SensorTile icon={Activity} label="Bee activity" value={`${selected.id === "01" ? data.activity.toFixed(0) : selected.activity}%`} status={selected.activity < 70 ? "Low" : "Strong"} tone={selected.tone} />
          </div>

          <MiniSignalChart danger={selected.tone === "danger"} />
        </div>

        <div className="health-list-panel panel">
          <div className="card-header">
            <div>
              <span>STATUS BOARD</span>
              <h3>My hive conditions</h3>
            </div>
            <span className="micro-tag">{hives.length} demo hives</span>
          </div>

          <div className="hive-status-list">
            {hives.map((hive) => (
              <button
                className={`hive-status-row ${selectedId === hive.id ? "selected" : ""}`}
                key={hive.id}
                onClick={() => setSelectedId(hive.id)}
              >
                <div className={`hex-status ${hive.tone}`}>⬡</div>
                <div className="hive-row-copy">
                  <strong>{hive.name} #{hive.id}</strong>
                  <span>{hive.location}</span>
                </div>
                <div className="hive-row-health">
                  <div className="health-bar">
                    <span style={{ width: `${hive.health}%` }} />
                  </div>
                  <strong>{hive.health}%</strong>
                </div>
                <div className={`status-text ${hive.tone}`}>{hive.status}</div>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>

          <div className="alert-summary">
            <div className="alert-summary-icon">
              <AlertTriangle size={17} />
            </div>
            <div>
              <strong>1 critical signal requires attention</strong>
              <span>Orchard Hive #04 reports heat stress at 39.1°C.</span>
            </div>
            <button onClick={onTestAlert}>Review</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SensorTile({ icon: Icon, label, value, status, tone }) {
  return (
    <div className={`sensor-tile ${tone}`}>
      <div className="sensor-icon">
        <Icon size={15} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{status}</small>
    </div>
  );
}

function MiniSignalChart({ danger = false }) {
  const points = Array.from(
    { length: 36 },
    (_, i) =>
      58 +
      Math.sin(i * 0.56) * 9 +
      Math.sin(i * 0.18) * 8 +
      (danger && i > 27 ? (i - 27) * 2.5 : 0)
  );
  const path = points
    .map(
      (v, i) =>
        `${i ? "L" : "M"} ${i * (100 / (points.length - 1))} ${80 - v * 0.6}`
    )
    .join(" ");

  return (
    <div className="signal-chart">
      <div className="chart-title-row">
        <span>WEIGHT SIGNAL · LAST 24H</span>
        <strong>{danger ? "ANOMALY" : "STABLE"}</strong>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {[22, 48, 74].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} />
        ))}
        <path className={`signal-line ${danger ? "danger" : ""}`} d={path} />
      </svg>
    </div>
  );
}

function MyHives({ activeSection, query, onSelectHive }) {
  const [mapSelected, setMapSelected] = useState(0);
  const filtered = hives.filter((h) =>
    `${h.name} ${h.location} ${h.id}`.toLowerCase().includes(query.toLowerCase())
  );

  const mapPoints = [
    { x: 26, y: 34, name: "Nashik", tone: "good", hive: "01" },
    { x: 51, y: 46, name: "Pune", tone: "good", hive: "02" },
    { x: 38, y: 67, name: "Satara", tone: "warn", hive: "03" },
    { x: 67, y: 72, name: "Kolhapur", tone: "danger", hive: "04" },
    { x: 75, y: 30, name: "Demo zone", tone: "info", hive: "—" },
  ];

  return (
    <section id="hives" className={`dashboard-section ${activeSection === "hives" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow="MY HIVES"
        title="See every colony at a glance."
        subtitle="Select a hive to inspect health, location and current operating conditions."
        action={
          <div className="section-tools">
            <span className="micro-tag"><Wifi size={12} /> 4 connected</span>
            <button className="ghost-button"><ListFilter size={14} /> Filter</button>
          </div>
        }
      />

      <div className="hives-layout">
        <div className="hive-grid">
          {filtered.map((hive) => (
            <button className="hive-card" key={hive.id} onClick={() => onSelectHive(hive.id)}>
              <div className="hive-card-glow" />
              <div className="hive-card-top">
                <div className={`big-hex ${hive.tone}`}>⬡</div>
                <div className={`status-pill ${hive.tone}`}>
                  <span />
                  {hive.status}
                </div>
              </div>
              <div className="hive-card-title">
                <strong>{hive.name} #{hive.id}</strong>
                <span>{hive.location}</span>
              </div>
              <div className="hive-health-number">
                <strong>{hive.health}%</strong>
                <span>health score</span>
              </div>
              <div className="mini-stat-grid">
                <div><span>Temp</span><strong>{hive.temp.toFixed(1)}°C</strong></div>
                <div><span>Humidity</span><strong>{hive.humidity}%</strong></div>
                <div><span>Activity</span><strong>{hive.activity}%</strong></div>
                <div><span>Battery</span><strong>{hive.battery}%</strong></div>
              </div>
              <div className="hive-card-footer">
                <span>{hive.condition}</span>
                <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>

        <div className="regional-map-card panel">
          <div className="card-header">
            <div>
              <span>REGIONAL HIVE MAP</span>
              <h3>Maharashtra demo network</h3>
            </div>
            <Map size={16} />
          </div>

          <div className="stylized-map">
            <div className="map-scanline" />
            <div className="map-outline" />
            {mapPoints.map((point, index) => (
              <button
                className={`map-pin ${point.tone} ${mapSelected === index ? "selected" : ""}`}
                key={point.name}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onClick={() => setMapSelected(index)}
                aria-label={`Select ${point.name}`}
              >
                <span />
                <small>{point.hive}</small>
              </button>
            ))}
            <div className="map-circuit circuit-1" />
            <div className="map-circuit circuit-2" />
            <div className="map-circuit circuit-3" />

            <div className="map-tooltip">
              <span>{mapPoints[mapSelected].name}</span>
              <strong>
                Hive #{mapPoints[mapSelected].hive}
              </strong>
              <small>Concept regional view</small>
            </div>
          </div>

          <div className="map-legend">
            <span><i className="good" />Healthy</span>
            <span><i className="warn" />Attention</span>
            <span><i className="danger" />Critical</span>
            <span><i className="info" />Concept</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Analytics({ data, activeSection, workspace }) {
  return (
    <section id="analytics" className={`dashboard-section ${activeSection === "analytics" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow={workspace === "agri" ? "AGRICULTURE COMMAND" : "ANALYTICS"}
        title={
          workspace === "agri"
            ? "Turn distributed hive signals into regional intelligence."
            : "See the patterns behind the hive."
        }
        subtitle="Compact trends for temperature, activity, weight and broader ecosystem signals. All figures are demonstration values."
      />

      <div className="analytics-layout">
        <div className="chart-card panel">
          <div className="chart-card-head">
            <div>
              <span>ACTIVITY INDEX</span>
              <h3>24-hour bee movement</h3>
            </div>
            <div className="chart-big-number">
              <strong>{data.activity.toFixed(0)}</strong>
              <small>/ 100</small>
            </div>
          </div>
          <TrendChart tone="lime" seed={2} />
        </div>

        <div className="chart-card panel">
          <div className="chart-card-head">
            <div>
              <span>ENVIRONMENT</span>
              <h3>Temperature trend</h3>
            </div>
            <div className="trend-pill">
              <TrendingUp size={12} /> +2.1%
            </div>
          </div>
          <TrendChart tone="cyan" seed={5} />
        </div>

        <div className="agri-command panel">
          <div className="card-header">
            <div>
              <span>AGRICULTURE INTELLIGENCE</span>
              <h3>Regional pulse</h3>
            </div>
            <Globe2 size={16} />
          </div>

          <div className="agri-summary">
            <div className="big-index">
              <strong>71</strong>
              <span>/ 100</span>
              <small>Pollination coverage</small>
            </div>
            <div className="agri-bars">
              <ProgressMetric label="Hive clusters" value="42" percent={68} tone="lime" />
              <ProgressMetric label="Stable zones" value="81%" percent={81} tone="cyan" />
              <ProgressMetric label="Alerts" value="03" percent={23} tone="amber" />
            </div>
          </div>

          <div className="agri-note">
            <MapPin size={14} />
            <span>Demo regional view. Not live government data.</span>
          </div>
        </div>
      </div>

      <div className="analytics-lower">
        <div className="metric-matrix panel">
          <div className="card-header">
            <div>
              <span>KEY SIGNALS</span>
              <h3>Current network metrics</h3>
            </div>
          </div>

          <div className="metric-matrix-grid">
            <MetricBox icon={Thermometer} label="Avg. temperature" value="34.8°C" trend="+0.4%" />
            <MetricBox icon={Droplets} label="Avg. humidity" value="64%" trend="-1.2%" down />
            <MetricBox icon={Weight} label="Avg. hive weight" value="41.9 kg" trend="+3.4%" />
            <MetricBox icon={Leaf} label="Pollination index" value={`${data.pollination.toFixed(0)}/100`} trend="+12%" />
          </div>
        </div>

        <div className="future-ai panel">
          <div className="future-ai-icon">
            <Bot size={18} />
          </div>
          <span>AI-READY LAYER</span>
          <h3>Built for future anomaly detection.</h3>
          <p>
            The UI is structured so future models can plug into temperature,
            swarm, disease-risk, honey-quality and pollination predictions.
          </p>
          <div className="future-tags">
            <span>ANOMALY</span>
            <span>SWARM RISK</span>
            <span>QUALITY</span>
            <span>POLLINATION</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendChart({ tone = "lime", seed = 0 }) {
  const points = Array.from(
    { length: 38 },
    (_, i) =>
      53 +
      Math.sin(i * 0.58 + seed) * 12 +
      Math.sin(i * 0.17) * 8 +
      (i > 28 ? (i - 28) * 0.9 : 0)
  );
  const path = points
    .map(
      (v, i) =>
        `${i ? "L" : "M"} ${i * (100 / (points.length - 1))} ${78 - v * 0.55}`
    )
    .join(" ");

  return (
    <svg className={`trend-chart ${tone}`} viewBox="0 0 100 100" preserveAspectRatio="none">
      {[20, 45, 70].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} />
      ))}
      <path className="trend-area" d={`${path} L 100 100 L 0 100 Z`} />
      <path className="trend-path" d={path} />
    </svg>
  );
}

function ProgressMetric({ label, value, percent, tone }) {
  return (
    <div className="progress-metric">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="progress-track">
        <i className={tone} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function MetricBox({ icon: Icon, label, value, trend, down }) {
  return (
    <div className="metric-box">
      <div className="metric-box-icon">
        <Icon size={15} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={down ? "down" : ""}>
        {down ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
        {trend}
      </small>
    </div>
  );
}

function Traceability({ activeSection }) {
  const [activeBatch, setActiveBatch] = useState(0);
  const batch = batches[activeBatch];

  const steps = [
    ["Hive", "Source linked", true],
    ["Collection", "Harvest recorded", true],
    ["Processing", "Batch prepared", true],
    ["Quality", "Verification stage", batch.status === "Verified"],
    ["Certificate", "Digital identity", batch.status === "Verified"],
    ["Retail", "Consumer ready", batch.status === "Verified"],
  ];

  return (
    <section id="traceability" className={`dashboard-section ${activeSection === "traceability" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow="TRACEABILITY"
        title="Make every jar tell its story."
        subtitle="Follow a honey batch from source hive to processing, quality and retail."
        action={<span className="micro-tag"><ShieldCheck size={12} /> Blockchain-ready UI</span>}
      />

      <div className="trace-layout">
        <div className="trace-main panel">
          <div className="batch-selector">
            {batches.map((item, index) => (
              <button
                key={item.id}
                className={activeBatch === index ? "active" : ""}
                onClick={() => setActiveBatch(index)}
              >
                <span>{item.id}</span>
                <small>{item.product}</small>
              </button>
            ))}
          </div>

          <div className="trace-hero">
            <div className="jar-visual">
              <div className="jar-lid" />
              <div className="jar-body">
                <span>HIVESENSE</span>
                <strong>{batch.product.replace(" Honey", "")}</strong>
                <small>HONEY</small>
                <b>{batch.quality} QUALITY</b>
              </div>
              <div className="jar-glow" />
            </div>

            <div className="batch-overview">
              <div className="batch-id-row">
                <div>
                  <span>BATCH ID</span>
                  <strong>{batch.id}</strong>
                </div>
                <div className={`verified-pill ${batch.tone}`}>
                  <CheckCircle2 size={13} />
                  {batch.status}
                </div>
              </div>

              <div className="batch-data-grid">
                <div><span>Source hive</span><strong>{batch.source}</strong></div>
                <div><span>Producer</span><strong>{batch.producer}</strong></div>
                <div><span>Collection</span><strong>{batch.date}</strong></div>
                <div><span>Quality</span><strong>{batch.quality}</strong></div>
              </div>

              <div className="certificate-box">
                <LockKeyhole size={14} />
                <div>
                  <strong>Verified batch identity</strong>
                  <span>Digital certificate / future blockchain connector</span>
                </div>
                <button>
                  View
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="trace-timeline">
            {steps.map(([title, sub, complete], index) => (
              <div className={`trace-step ${complete ? "complete" : ""}`} key={title}>
                <div className="trace-step-node">
                  {complete ? <Check size={13} /> : index + 1}
                </div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="trace-side">
          <div className="panel quality-card">
            <div className="card-header">
              <div>
                <span>HONEY QUALITY</span>
                <h3>{batch.quality}</h3>
              </div>
              <ShieldCheck size={17} />
            </div>
            <div className="quality-score">
              <strong>{batch.quality}</strong>
              <span>demo grade</span>
            </div>
            <div className="quality-list">
              <QualityRow label="Moisture" value="17.8%" status="Within target" />
              <QualityRow label="Source match" value="100%" status="Linked" />
              <QualityRow label="Batch data" value="Ready" status="Complete" />
            </div>
            <small className="muted-note">Sample values until lab integration is connected.</small>
          </div>

          <div className="panel certificate-card">
            <div className="certificate-visual">
              <div className="certificate-qr">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i} className={i % 3 === 0 || i % 7 === 0 ? "on" : ""} />
                ))}
              </div>
            </div>
            <div>
              <span>DIGITAL CERTIFICATE</span>
              <strong>HS-{batch.id.slice(-3)}-CERT</strong>
              <small>Blockchain-ready concept</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QualityRow({ label, value, status }) {
  return (
    <div className="quality-row">
      <div>
        <strong>{label}</strong>
        <span>{status}</span>
      </div>
      <b>{value}</b>
    </div>
  );
}

function Pollination({ data, activeSection }) {
  const zones = [
    { name: "Nashik Orchard", score: 91, activity: "High", tone: "good" },
    { name: "Pune Farms", score: 82, activity: "High", tone: "good" },
    { name: "Satara Belt", score: 68, activity: "Moderate", tone: "warn" },
    { name: "Kolhapur Zone", score: 54, activity: "Low", tone: "danger" },
  ];

  return (
    <section id="pollination" className={`dashboard-section ${activeSection === "pollination" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow="POLLINATION INTELLIGENCE"
        title="Healthy hives create a wider signal."
        subtitle="Use hive activity as an ecosystem indicator while keeping the metric clearly positioned as a project intelligence score."
      />

      <div className="pollination-layout">
        <div className="pollination-score panel">
          <div className="score-orbit orbit-one" />
          <div className="score-orbit orbit-two" />
          <div className="pollination-ring" style={{ "--progress": `${data.pollination}%` }}>
            <div>
              <strong>{data.pollination.toFixed(0)}</strong>
              <span>/100</span>
            </div>
          </div>
          <span className="pollination-label">POLLINATION INDEX</span>
          <p>Based on demo hive activity, health and environmental signals.</p>
          <div className="score-chip-row">
            <span><Activity size={12} /> Bee activity</span>
            <span><Sprout size={12} /> Crop zone</span>
            <span><Map size={12} /> Regional view</span>
          </div>
        </div>

        <div className="pollination-zones panel">
          <div className="card-header">
            <div>
              <span>ZONE SIGNALS</span>
              <h3>Current pollination picture</h3>
            </div>
            <MapPin size={16} />
          </div>

          <div className="zone-list">
            {zones.map((zone) => (
              <div className="zone-row" key={zone.name}>
                <div className={`zone-icon ${zone.tone}`}>
                  <Leaf size={15} />
                </div>
                <div className="zone-copy">
                  <strong>{zone.name}</strong>
                  <span>{zone.activity} activity</span>
                </div>
                <div className="zone-progress">
                  <span style={{ width: `${zone.score}%` }} />
                </div>
                <b>{zone.score}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="bee-quality panel">
          <div className="card-header">
            <div>
              <span>BEE QUALITY INDEX</span>
              <h3>82 / 100</h3>
            </div>
            <HeartPulse size={17} />
          </div>

          <div className="bee-index-grid">
            <QualitySignal label="Hive health" value={92} />
            <QualitySignal label="Activity" value={82} />
            <QualitySignal label="Environment" value={76} />
            <QualitySignal label="Food stability" value={79} />
          </div>

          <div className="intelligence-note">
            <Bot size={14} />
            <span>
              Demo metric — keep methodology transparent before using this in a
              scientific or government workflow.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function QualitySignal({ label, value }) {
  return (
    <div className="quality-signal">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="tiny-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function BMart({ activeSection, products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    name: "",
    type: "Raw honey",
    weight: "500 g",
    price: "",
    stock: "",
    source: "Green Valley #01",
    quality: "A+",
  });
  const [published, setPublished] = useState(false);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.type.toLowerCase().includes(filter.toLowerCase()));

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function publish(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;

    const newProduct = {
      id: `p-${Date.now()}`,
      name: form.name,
      type: form.type,
      weight: form.weight,
      price: Number(form.price),
      stock: Number(form.stock),
      quality: form.quality,
      source: form.source,
      verified: true,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setForm({
      name: "",
      type: "Raw honey",
      weight: "500 g",
      price: "",
      stock: "",
      source: "Green Valley #01",
      quality: "A+",
    });
    setPublished(true);
    setShowForm(false);
    window.setTimeout(() => setPublished(false), 2800);
  }

  return (
    <section id="bmart" className={`dashboard-section ${activeSection === "bmart" ? "focus-section" : ""}`}>
      <SectionHeading
        eyebrow="B-MART"
        title="Give every jar a digital storefront."
        subtitle="An integrated marketplace for beekeepers to list traceable honey without leaving HiveSense."
        action={
          <button className="primary-button" onClick={() => setShowForm(true)}>
            <Plus size={14} />
            Sell your honey
          </button>
        }
      />

      <div className="bmart-toolbar">
        <div className="bmart-pills">
          {["All", "Raw honey", "Premium", "Organic"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="bmart-summary">
          <span><Store size={13} /> {products.length} listings</span>
          <span><CheckCircle2 size={13} /> Verified storefront</span>
        </div>
      </div>

      {published && (
        <div className="publish-toast">
          <CheckCircle2 size={16} />
          Your honey has been listed on B-Mart.
        </div>
      )}

      <div className="bmart-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-visual">
              <div className="product-glow" />
              <div className="honey-jar">
                <div className="honey-lid" />
                <div className="honey-jar-body">
                  <span>HS</span>
                  <strong>{product.name.split(" ")[0]}</strong>
                  <small>HONEY</small>
                </div>
              </div>
              <div className="product-badges">
                <span><CheckCircle2 size={11} /> VERIFIED</span>
                <span>{product.quality} QUALITY</span>
              </div>
            </div>

            <div className="product-content">
              <div className="product-top">
                <div>
                  <span>{product.type.toUpperCase()}</span>
                  <h3>{product.name}</h3>
                  <p>{product.weight} • {product.source}</p>
                </div>
                <strong>₹{product.price}</strong>
              </div>

              <div className="product-meta">
                <span><Boxes size={12} /> {product.stock} in stock</span>
                <span><PackageCheck size={12} /> Traceable</span>
              </div>

              <button className="product-button" onClick={() => setSelectedProduct(product)}>
                View details
                <ArrowIcon />
              </button>
            </div>
          </article>
        ))}
      </div>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span>OWNER MARKETPLACE</span>
                <h3>Sell your honey</h3>
              </div>
              <button className="icon-button" onClick={() => setShowForm(false)}>
                <X size={17} />
              </button>
            </div>

            <form className="sell-form" onSubmit={publish}>
              <Field label="Product name">
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Himalayan Wildflower"
                />
              </Field>
              <Field label="Honey type">
                <select
                  value={form.type}
                  onChange={(e) => updateField("type", e.target.value)}
                >
                  <option>Raw honey</option>
                  <option>Premium honey</option>
                  <option>Organic honey</option>
                </select>
              </Field>
              <Field label="Pack size">
                <select
                  value={form.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                >
                  <option>250 g</option>
                  <option>500 g</option>
                  <option>1 kg</option>
                </select>
              </Field>
              <Field label="Price ₹">
                <input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="499"
                />
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  min="1"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                  placeholder="20"
                />
              </Field>
              <Field label="Source hive">
                <select
                  value={form.source}
                  onChange={(e) => updateField("source", e.target.value)}
                >
                  {hives.map((h) => (
                    <option key={h.id}>{h.name} #{h.id}</option>
                  ))}
                </select>
              </Field>
              <Field label="Quality">
                <select
                  value={form.quality}
                  onChange={(e) => updateField("quality", e.target.value)}
                >
                  <option>A+</option>
                  <option>A</option>
                  <option>B+</option>
                </select>
              </Field>

              <div className="form-note">
                <LockKeyhole size={13} />
                Certificate, lab data and payments are future integrations.
              </div>

              <button className="primary-button submit-listing" type="submit">
                <Check size={14} />
                Publish listing
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-card product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span>TRACEABLE PRODUCT</span>
                <h3>{selectedProduct.name}</h3>
              </div>
              <button className="icon-button" onClick={() => setSelectedProduct(null)}>
                <X size={17} />
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-hero-jar">
                <div className="honey-jar large">
                  <div className="honey-lid" />
                  <div className="honey-jar-body">
                    <span>HS</span>
                    <strong>{selectedProduct.name.split(" ")[0]}</strong>
                    <small>HONEY</small>
                  </div>
                </div>
              </div>

              <div className="detail-copy">
                <div className="price-row">
                  <strong>₹{selectedProduct.price}</strong>
                  <span>{selectedProduct.stock} in stock</span>
                </div>
                <div className="detail-badges">
                  <span><CheckCircle2 size={12} /> Verified</span>
                  <span><PackageCheck size={12} /> Traceable</span>
                  <span>{selectedProduct.quality} quality</span>
                </div>
                <p>
                  {selectedProduct.type} • {selectedProduct.weight}. Source hive:
                  {" "}{selectedProduct.source}.
                </p>
                <button className="secondary-button" onClick={() => setSelectedProduct(null)}>
                  Close details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ArrowIcon() {
  return <ChevronRight size={14} />;
}

function AlertStrip({ emergency, setEmergency }) {
  return (
    <section className={`alert-strip ${emergency ? "danger" : ""}`}>
      <div className="alert-strip-icon">
        {emergency ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
      </div>
      <div className="alert-strip-copy">
        <span>{emergency ? "CRITICAL SENSOR EVENT" : "SAFETY INTELLIGENCE"}</span>
        <strong>
          {emergency
            ? "Sudden weight change detected in Green Valley Hive #01. Inspect before the next handling cycle."
            : "All monitored conditions are within expected demo operating ranges."}
        </strong>
      </div>
      <button onClick={() => setEmergency((v) => !v)}>
        {emergency ? "Reset demo" : "Test emergency"}
        <Bell size={13} />
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <Logo compact />
        <div>
          <strong>HiveSense</strong>
          <span>Smart intelligence for the hive ecosystem.</span>
        </div>
      </div>
      <div className="footer-tech">
        <span>React + Vite</span>
        <span>ESP32-ready</span>
        <span>Firebase/AWS-ready</span>
        <span>Blockchain-ready</span>
      </div>
      <small>© 2026 HiveSense</small>
    </footer>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [workspace, setWorkspace] = useState("farm");
  const [emergency, setEmergency] = useState(false);
  const [products, setProducts] = useState(defaultProducts);

  const data = useLiveTelemetry(emergency);

  const pendingTarget = useRef(null);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0] && !pendingTarget.current) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector(".search-box input")?.focus();
      }

      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function navigate(id) {
    pendingTarget.current = id;
    setActiveSection(id);
    setMobileOpen(false);
    setNotificationsOpen(false);
    scrollToSection(id);

    window.setTimeout(() => {
      pendingTarget.current = null;
    }, 850);
  }

  function selectHive(id) {
    navigate("health");
    window.setTimeout(() => {
      const button = document.querySelector(`.hive-status-row[data-hive="${id}"]`);
      button?.click();
    }, 650);
  }

  return (
    <div className="app">
      <Sidebar
        open={mobileOpen}
        setOpen={setMobileOpen}
        activeSection={activeSection}
        onNavigate={navigate}
      />

      <div className="main">
        <Topbar
          setOpen={setMobileOpen}
          query={query}
          setQuery={setQuery}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          workspace={workspace}
          setWorkspace={setWorkspace}
        />

        <main>
          <HomeHero data={data} workspace={workspace} />

          <HiveHealth
            data={data}
            activeSection={activeSection}
            onTestAlert={() => {
              setEmergency((value) => !value);
              navigate("health");
            }}
          />

          <MyHives
            activeSection={activeSection}
            query={query}
            onSelectHive={selectHive}
          />

          <Analytics data={data} activeSection={activeSection} workspace={workspace} />

          <Traceability activeSection={activeSection} />

          <Pollination data={data} activeSection={activeSection} />

          <BMart
            activeSection={activeSection}
            products={products}
            setProducts={setProducts}
          />

          <AlertStrip emergency={emergency} setEmergency={setEmergency} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
