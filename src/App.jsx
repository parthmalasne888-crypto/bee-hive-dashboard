import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bell,
  Beaker,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Cpu,
  Database,
  Droplets,
  Factory,
  Gauge,
  Globe2,
  Hexagon,
  Leaf,
  LineChart,
  Map,
  Menu,
  Network,
  PackageCheck,
  Radio,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Thermometer,
  TrendingUp,
  Users,
  Weight,
  Wifi,
  X,
  Zap,
} from "lucide-react";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [sensor, setSensor] = useState({
    temperature: 34.2,
    humidity: 67,
    weight: 42.8,
    health: 92,
    pollination: 87,
    beeActivity: 76,
  });

  const [emergency, setEmergency] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const previousWeight = useRef(42.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensor((prev) => {
        const next = {
          temperature: Number(
            (prev.temperature + (Math.random() - 0.5) * 0.3).toFixed(1)
          ),
          humidity: Math.max(
            50,
            Math.min(
              85,
              Math.round(prev.humidity + (Math.random() - 0.5) * 2)
            )
          ),
          weight: Number(
            (prev.weight + (Math.random() - 0.5) * 0.08).toFixed(2)
          ),
          health: Math.max(
            75,
            Math.min(
              98,
              Math.round(prev.health + (Math.random() - 0.5) * 2)
            )
          ),
          pollination: Math.max(
            60,
            Math.min(
              98,
              Math.round(prev.pollination + (Math.random() - 0.5) * 2)
            )
          ),
          beeActivity: Math.max(
            50,
            Math.min(
              95,
              Math.round(prev.beeActivity + (Math.random() - 0.5) * 3)
            )
          ),
        };

        if (
          Math.abs(next.weight - previousWeight.current) > 2 &&
          !emergency
        ) {
          setEmergency(true);
        }

        previousWeight.current = next.weight;
        return next;
      });

      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, [emergency]);

  const triggerEmergency = () => {
    previousWeight.current = sensor.weight;

    setSensor((prev) => ({
      ...prev,
      weight: Number((prev.weight + 7.8).toFixed(2)),
      health: 61,
      beeActivity: 42,
    }));

    setEmergency(true);
    setLastUpdate(new Date());
  };

  const resetEmergency = () => {
    const normalWeight = 42.8;

    previousWeight.current = normalWeight;

    setSensor({
      temperature: 34.2,
      humidity: 67,
      weight: normalWeight,
      health: 92,
      pollination: 87,
      beeActivity: 76,
    });

    setEmergency(false);
    setLastUpdate(new Date());
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="app">
      <div className="ambient-glow glow-one"></div>
      <div className="ambient-glow glow-two"></div>

      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <main>
        <Hero sensor={sensor} scrollTo={scrollTo} />

        <NetworkSection />

        <LiveMonitoring
          sensor={sensor}
          emergency={emergency}
          lastUpdate={lastUpdate}
          triggerEmergency={triggerEmergency}
          resetEmergency={resetEmergency}
        />

        <FarmerSection sensor={sensor} />

        <PollinationSection sensor={sensor} />

        <GovernmentSection />

        <TraceabilitySection />

        <EcosystemSection />

        <TechnologySection />

        <FinalCTA scrollTo={scrollTo} />
      </main>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar({ menuOpen, setMenuOpen, scrollTo }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => scrollTo("home")}>
          <div className="brand-icon">
            <Hexagon size={25} strokeWidth={1.7} />
            <span className="brand-bee">✦</span>
          </div>

          <div>
            <strong>HiveSense</strong>
            <span>SMART BEE INTELLIGENCE</span>
          </div>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("platform")}>Platform</button>
          <button onClick={() => scrollTo("live")}>Live Hive</button>
          <button onClick={() => scrollTo("pollination")}>
            Pollination
          </button>
          <button onClick={() => scrollTo("agriculture")}>
            Agriculture
          </button>
          <button onClick={() => scrollTo("traceability")}>
            Traceability
          </button>

          <button
            className="nav-cta"
            onClick={() => scrollTo("live")}
          >
            View Live Hive
            <ArrowRight size={15} />
          </button>
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero({ sensor, scrollTo }) {
  return (
    <section className="hero section" id="home">
      <div className="hero-grid"></div>

      <div className="floating-particle particle-one"></div>
      <div className="floating-particle particle-two"></div>
      <div className="floating-particle particle-three"></div>
      <div className="floating-particle particle-four"></div>

      <div className="hero-inner">
        <div className="hero-copy reveal visible">
          <div className="eyebrow">
            <span className="live-dot"></span>
            LIVE HIVE INTELLIGENCE
          </div>

          <h1>
            Turn every hive
            <br />
            into a <span>smart hive.</span>
          </h1>

          <p className="hero-description">
            Real-time intelligence for bees, farmers, agriculture
            and the honey ecosystem — from the hive to the market.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => scrollTo("live")}
            >
              Explore Live Hive
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              onClick={() => scrollTo("platform")}
            >
              Discover Platform
              <ChevronDown size={17} />
            </button>
          </div>

          <div className="hero-trust">
            <div>
              <strong>24/7</strong>
              <span>Monitoring</span>
            </div>

            <div className="trust-line"></div>

            <div>
              <strong>LIVE</strong>
              <span>Sensor Data</span>
            </div>

            <div className="trust-line"></div>

            <div>
              <strong>360°</strong>
              <span>Hive Intelligence</span>
            </div>
          </div>
        </div>

        <HeroHive sensor={sensor} />
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

/* =========================================================
   HERO HIVE VISUAL
========================================================= */

function HeroHive({ sensor }) {
  return (
    <div className="hero-visual reveal visible">
      <div className="visual-orbit orbit-one"></div>
      <div className="visual-orbit orbit-two"></div>

      <div className="hive-core">
        <div className="hive-glow"></div>

        <div className="hive-shape">
          <div className="hive-layer layer-one"></div>
          <div className="hive-layer layer-two"></div>
          <div className="hive-layer layer-three"></div>
          <div className="hive-layer layer-four"></div>
          <div className="hive-entrance"></div>
        </div>

        <div className="bee bee-one">●</div>
        <div className="bee bee-two">●</div>
        <div className="bee bee-three">●</div>
      </div>

      <div className="sensor-node node-temp">
        <Thermometer size={15} />
        <div>
          <span>Temperature</span>
          <strong>{sensor.temperature}°C</strong>
        </div>
      </div>

      <div className="sensor-node node-humidity">
        <Droplets size={15} />
        <div>
          <span>Humidity</span>
          <strong>{sensor.humidity}%</strong>
        </div>
      </div>

      <div className="sensor-node node-weight">
        <Weight size={15} />
        <div>
          <span>Hive Weight</span>
          <strong>{sensor.weight} kg</strong>
        </div>
      </div>

      <div className="sensor-node node-health">
        <Activity size={15} />
        <div>
          <span>Hive Health</span>
          <strong>{sensor.health}%</strong>
        </div>
      </div>

      <div className="data-pulse pulse-one"></div>
      <div className="data-pulse pulse-two"></div>
      <div className="data-pulse pulse-three"></div>
    </div>
  );
}

/* =========================================================
   NETWORK
========================================================= */

function NetworkSection() {
  return (
    <section className="section network-section" id="platform">
      <SectionHeader
        number="01"
        eyebrow="THE PLATFORM"
        title={
          <>
            One hive.
            <br />
            <span>One intelligent ecosystem.</span>
          </>
        }
        description="HiveSense connects the physical hive to the digital world, transforming sensor data into useful intelligence for every part of the beekeeping ecosystem."
      />

      <div className="network-flow reveal">
        <FlowNode
          icon={<Hexagon />}
          title="THE HIVE"
          description="Bees & environment"
        />

        <FlowConnector />

        <FlowNode
          icon={<Radio />}
          title="SMART SENSORS"
          description="Real-time telemetry"
        />

        <FlowConnector />

        <FlowNode
          icon={<BrainCircuit />}
          title="HIVESENSE"
          description="Intelligence layer"
          active
        />

        <FlowConnector />

        <div className="flow-destinations">
          <FlowDestination
            icon={<Users />}
            title="FARMER"
          />

          <FlowDestination
            icon={<Globe2 />}
            title="AGRICULTURE"
          />

          <FlowDestination
            icon={<ShoppingBag />}
            title="MARKET"
          />
        </div>
      </div>

      <div className="platform-stats reveal">
        <PlatformStat
          icon={<Activity />}
          value="LIVE"
          label="Hive monitoring"
        />

        <PlatformStat
          icon={<Bell />}
          value="24/7"
          label="Alert intelligence"
        />

        <PlatformStat
          icon={<BarChart3 />}
          value="360°"
          label="Data visibility"
        />

        <PlatformStat
          icon={<ShieldCheck />}
          value="TRACE"
          label="Hive-to-market data"
        />
      </div>
    </section>
  );
}

function FlowNode({ icon, title, description, active }) {
  return (
    <div className={`flow-node ${active ? "active" : ""}`}>
      <div className="flow-icon">{icon}</div>
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}

function FlowDestination({ icon, title }) {
  return (
    <div className="flow-destination">
      <div>{icon}</div>
      <span>{title}</span>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flow-connector">
      <div className="connector-line"></div>
      <ArrowRight size={17} />
    </div>
  );
}

function PlatformStat({ icon, value, label }) {
  return (
    <div className="platform-stat">
      <div className="platform-stat-icon">{icon}</div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

/* =========================================================
   LIVE MONITORING
========================================================= */

function LiveMonitoring({
  sensor,
  emergency,
  lastUpdate,
  triggerEmergency,
  resetEmergency,
}) {
  return (
    <section className="section live-section" id="live">
      <div className="live-header reveal">
        <div>
          <div className="eyebrow">
            <span className="live-dot"></span>
            LIVE MONITORING
          </div>

          <h2>
            Inside the hive.
            <br />
            <span>Right now.</span>
          </h2>
        </div>

        <div className="live-meta">
          <div className="connection-status">
            <span></span>
            ESP32 CONNECTED
          </div>

          <small>
            Updated{" "}
            {lastUpdate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </small>
        </div>
      </div>

      {emergency && (
        <div className="emergency-banner">
          <div className="emergency-icon">
            <Bell size={21} />
          </div>

          <div className="emergency-text">
            <strong>EMERGENCY — SUDDEN WEIGHT CHANGE DETECTED</strong>
            <span>
              Hive weight increased unexpectedly. Inspect the hive immediately.
            </span>
          </div>

          <button onClick={resetEmergency}>
            <RefreshCw size={15} />
            Reset
          </button>
        </div>
      )}

      <div className="monitor-layout reveal">
        <div className="monitor-main-card">
          <div className="card-topline">
            <div>
              <span className="card-label">HIVE #01</span>
              <h3>Primary Production Hive</h3>
            </div>

            <div className={`health-pill ${emergency ? "danger" : ""}`}>
              <span></span>
              {emergency ? "ATTENTION" : "HEALTHY"}
            </div>
          </div>

          <div className="main-telemetry">
            <Telemetry
              icon={<Thermometer />}
              label="Temperature"
              value={sensor.temperature}
              unit="°C"
              status="Stable"
            />

            <Telemetry
              icon={<Droplets />}
              label="Humidity"
              value={sensor.humidity}
              unit="%"
              status="Normal"
            />

            <Telemetry
              icon={<Weight />}
              label="Hive Weight"
              value={sensor.weight}
              unit="kg"
              status={emergency ? "Sudden Change" : "Stable"}
              danger={emergency}
            />

            <Telemetry
              icon={<Activity />}
              label="Hive Health"
              value={sensor.health}
              unit="%"
              status={emergency ? "Attention" : "Excellent"}
              danger={emergency}
            />
          </div>

          <div className="chart-container">
            <div className="chart-title">
              <div>
                <span>LIVE WEIGHT SIGNAL</span>
                <strong>{sensor.weight} kg</strong>
              </div>

              <TrendingUp size={18} />
            </div>

            <WeightChart emergency={emergency} />
          </div>
        </div>

        <div className="monitor-side">
          <div className="activity-card">
            <div className="side-card-header">
              <span>BEES ACTIVITY</span>
              <Radio size={16} />
            </div>

            <div className="activity-ring">
              <div>
                <strong>{sensor.beeActivity}</strong>
                <span>%</span>
              </div>
            </div>

            <p>
              Current bee activity is being monitored continuously through
              environmental and hive signals.
            </p>
          </div>

          <div className="pollination-mini">
            <div>
              <span>POLLINATION INDEX</span>
              <strong>{sensor.pollination}/100</strong>
            </div>

            <div className="mini-progress">
              <span
                style={{
                  width: `${sensor.pollination}%`,
                }}
              ></span>
            </div>

            <small>Regional activity indicator</small>
          </div>

          <button
            className="emergency-test"
            onClick={emergency ? resetEmergency : triggerEmergency}
          >
            <Zap size={17} />
            {emergency ? "RESET DEMO ALERT" : "TEST EMERGENCY ALERT"}
          </button>
        </div>
      </div>

      <div className="demo-notice">
        <span>DEMO DATA</span>
        This dashboard currently uses simulated sensor values. ESP32/Firebase
        integration can be connected next.
      </div>
    </section>
  );
}

function Telemetry({
  icon,
  label,
  value,
  unit,
  status,
  danger,
}) {
  return (
    <div className={`telemetry ${danger ? "danger" : ""}`}>
      <div className="telemetry-icon">{icon}</div>

      <span>{label}</span>

      <div className="telemetry-value">
        <strong>{value}</strong>
        <small>{unit}</small>
      </div>

      <div className="telemetry-status">
        <span></span>
        {status}
      </div>
    </div>
  );
}

function WeightChart({ emergency }) {
  const points = emergency
    ? "0,108 35,104 70,106 105,98 140,101 175,91 210,96 245,79 280,83 315,69 350,76 385,58 420,68 455,21 490,11"
    : "0,102 35,98 70,101 105,94 140,97 175,90 210,94 245,87 280,91 315,84 350,88 385,80 420,85 455,76 490,81";

  return (
    <svg
      className={`weight-chart ${emergency ? "chart-danger" : ""}`}
      viewBox="0 0 490 120"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopOpacity="0.28" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1="0" y1="25" x2="490" y2="25" className="chart-grid" />
      <line x1="0" y1="60" x2="490" y2="60" className="chart-grid" />
      <line x1="0" y1="95" x2="490" y2="95" className="chart-grid" />

      <polygon
        points={`0,120 ${points} 490,120`}
        fill="url(#chartFill)"
      />

      <polyline
        points={points}
        fill="none"
        strokeWidth="3"
        className="chart-line"
      />

      {emergency && (
        <circle
          cx="455"
          cy="21"
          r="6"
          className="chart-alert-dot"
        />
      )}
    </svg>
  );
}

/* =========================================================
   FARMER
========================================================= */

function FarmerSection({ sensor }) {
  return (
    <section className="section farmer-section">
      <SectionHeader
        number="02"
        eyebrow="FOR BEEKEEPERS"
        title={
          <>
            Technology that
            <br />
            <span>speaks farmer.</span>
          </>
        }
        description="No complicated dashboards. HiveSense turns technical sensor data into clear actions that help a beekeeper understand what is happening inside the hive."
      />

      <div className="farmer-grid reveal">
        <div className="farmer-copy-card">
          <div className="farmer-number">01</div>

          <h3>Know without opening.</h3>

          <p>
            Monitor hive conditions remotely and reduce unnecessary hive
            disturbance.
          </p>

          <div className="simple-status">
            <CheckCircle2 size={17} />
            <span>
              Hive conditions are currently stable.
            </span>
          </div>

          <div className="farmer-metrics">
            <div>
              <strong>{sensor.temperature}°C</strong>
              <span>Temperature</span>
            </div>

            <div>
              <strong>{sensor.humidity}%</strong>
              <span>Humidity</span>
            </div>

            <div>
              <strong>{sensor.weight} kg</strong>
              <span>Weight</span>
            </div>
          </div>
        </div>

        <div className="farmer-feature-card">
          <div className="feature-icon">
            <Bell />
          </div>

          <h3>Get alerted when something changes.</h3>

          <p>
            Sudden changes in hive weight, temperature or other monitored
            conditions can trigger an immediate alert.
          </p>

          <div className="alert-demo">
            <div className="alert-demo-top">
              <span className="alert-live"></span>
              LIVE ALERT ENGINE
            </div>

            <div className="alert-demo-body">
              <div className="alert-demo-icon">
                <Weight />
              </div>

              <div>
                <strong>Weight anomaly</strong>
                <span>Change detected in Hive #04</span>
              </div>

              <ArrowRight size={17} />
            </div>
          </div>
        </div>

        <div className="farmer-feature-card dark">
          <div className="feature-icon">
            <Boxes />
          </div>

          <h3>Manage many hives.</h3>

          <p>
            A single platform for multiple hives, health states, alerts and
            production information.
          </p>

          <div className="hive-stack">
            <HiveMini id="01" health={92} />
            <HiveMini id="02" health={88} />
            <HiveMini id="03" health={96} />
            <HiveMini id="04" health={74} warning />
          </div>
        </div>
      </div>
    </section>
  );
}

function HiveMini({ id, health, warning }) {
  return (
    <div className="hive-mini">
      <div className="mini-hive-icon">
        <Hexagon size={18} />
      </div>

      <span>Hive #{id}</span>

      <div className={`mini-health ${warning ? "warning" : ""}`}>
        <span style={{ width: `${health}%` }}></span>
      </div>

      <strong>{health}%</strong>
    </div>
  );
}

/* =========================================================
   POLLINATION
========================================================= */

function PollinationSection({ sensor }) {
  return (
    <section className="section pollination-section" id="pollination">
      <div className="split-heading reveal">
        <div>
          <div className="eyebrow">BEYOND THE HIVE</div>

          <h2>
            Bees don't just
            <br />
            <span>make honey.</span>
          </h2>
        </div>

        <p>
          Bee activity is directly connected to pollination. HiveSense can
          transform hive-level observations into a broader agricultural
          intelligence layer.
        </p>
      </div>

      <div className="pollination-visual reveal">
        <div className="pollination-grid"></div>

        <div className="pollination-bee bee-center">✦</div>

        <div className="pollination-node node-a">
          <Sprout />
          <span>CROPS</span>
        </div>

        <div className="pollination-node node-b">
          <Activity />
          <span>BEE ACTIVITY</span>
        </div>

        <div className="pollination-node node-c">
          <BarChart3 />
          <span>INDEX</span>
        </div>

        <div className="pollination-node node-d">
          <Map />
          <span>REGION</span>
        </div>

        <div className="pollination-connection connection-a"></div>
        <div className="pollination-connection connection-b"></div>
        <div className="pollination-connection connection-c"></div>
        <div className="pollination-connection connection-d"></div>

        <div className="pollination-center-card">
          <span>CURRENT POLLINATION INDEX</span>

          <strong>{sensor.pollination}</strong>

          <div className="pollination-bar">
            <span
              style={{
                width: `${sensor.pollination}%`,
              }}
            ></span>
          </div>

          <small>Based on monitored hive activity</small>
        </div>
      </div>

      <div className="pollination-benefits reveal">
        <Benefit
          icon={<Activity />}
          title="Bee Activity"
          text="Understand activity patterns over time."
        />

        <Benefit
          icon={<Sprout />}
          title="Crop Intelligence"
          text="Connect pollinator activity with agricultural zones."
        />

        <Benefit
          icon={<Map />}
          title="Regional Insights"
          text="Create broader environmental and pollination datasets."
        />
      </div>
    </section>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="benefit">
      <div>{icon}</div>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

/* =========================================================
   GOVERNMENT
========================================================= */

function GovernmentSection() {
  return (
    <section className="section government-section" id="agriculture">
      <div className="government-layout">
        <div className="government-copy reveal">
          <div className="eyebrow">AGRICULTURE INTELLIGENCE</div>

          <h2>
            From individual
            <br />
            <span>hives to regions.</span>
          </h2>

          <p>
            Aggregated hive intelligence can become a powerful information
            layer for agricultural planning, environmental monitoring and
            pollination research.
          </p>

          <div className="government-points">
            <Point
              icon={<Map />}
              title="Regional Hive Mapping"
              text="Visualize participating hive networks across regions."
            />

            <Point
              icon={<TrendingUp />}
              title="Trend Monitoring"
              text="Track environmental and hive activity trends."
            />

            <Point
              icon={<Database />}
              title="Data Intelligence"
              text="Convert distributed sensor observations into useful datasets."
            />
          </div>
        </div>

        <div className="regional-dashboard reveal">
          <div className="regional-header">
            <div>
              <span>REGIONAL INTELLIGENCE</span>
              <strong>Maharashtra — Demo View</strong>
            </div>

            <Map size={19} />
          </div>

          <div className="fake-map">
            <div className="map-grid"></div>

            <div className="map-shape">
              <span className="map-point point-1"></span>
              <span className="map-point point-2"></span>
              <span className="map-point point-3"></span>
              <span className="map-point point-4"></span>
              <span className="map-point point-5"></span>
              <span className="map-point point-6"></span>
            </div>

            <div className="map-tooltip">
              <span>ACTIVE NETWORK</span>
              <strong>Regional Hive Data</strong>
              <small>Concept visualization</small>
            </div>
          </div>

          <div className="regional-metrics">
            <RegionalMetric value="LIVE" label="Sensor network" />
            <RegionalMetric value="24/7" label="Monitoring" />
            <RegionalMetric value="DATA" label="Aggregation" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Point({ icon, title, text }) {
  return (
    <div className="government-point">
      <div>{icon}</div>

      <section>
        <strong>{title}</strong>
        <p>{text}</p>
      </section>
    </div>
  );
}

function RegionalMetric({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

/* =========================================================
   TRACEABILITY
========================================================= */

function TraceabilitySection() {
  return (
    <section className="section traceability-section" id="traceability">
      <SectionHeader
        number="03"
        eyebrow="HIVE TO MARKET"
        title={
          <>
            Make every jar
            <br />
            <span>tell its story.</span>
          </>
        }
        description="HiveSense can connect hive data, harvesting information and product identity into a traceable honey ecosystem."
      />

      <div className="trace-flow reveal">
        <TraceStep
          number="01"
          icon={<Hexagon />}
          title="HIVE"
          text="Origin & hive identity"
        />

        <TraceArrow />

        <TraceStep
          number="02"
          icon={<PackageCheck />}
          title="HARVEST"
          text="Collection information"
        />

        <TraceArrow />

        <TraceStep
          number="03"
          icon={<Beaker />}
          title="QUALITY"
          text="Quality information"
        />

        <TraceArrow />

        <TraceStep
          number="04"
          icon={<ShieldCheck />}
          title="CERTIFICATE"
          text="Digital product identity"
        />

        <TraceArrow />

        <TraceStep
          number="05"
          icon={<ShoppingBag />}
          title="RETAIL"
          text="Consumer transparency"
        />
      </div>

      <div className="trace-card reveal">
        <div className="trace-qr">
          <div className="qr-pattern">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="trace-info">
          <span>DIGITAL HONEY ID</span>
          <h3>HIVE-2026-001</h3>
          <p>
            A concept digital identity connecting the honey product back to
            its origin and available quality information.
          </p>

          <div className="trace-tags">
            <span>ORIGIN</span>
            <span>HARVEST</span>
            <span>QUALITY</span>
            <span>TRACEABLE</span>
          </div>
        </div>

        <div className="trace-status">
          <CheckCircle2 size={19} />
          <strong>TRACEABILITY READY</strong>
          <span>Concept demonstration</span>
        </div>
      </div>
    </section>
  );
}

function TraceStep({ number, icon, title, text }) {
  return (
    <div className="trace-step">
      <span>{number}</span>

      <div className="trace-icon">{icon}</div>

      <strong>{title}</strong>
      <small>{text}</small>
    </div>
  );
}

function TraceArrow() {
  return (
    <div className="trace-arrow">
      <ArrowRight size={18} />
    </div>
  );
}

/* =========================================================
   ECOSYSTEM
========================================================= */

function EcosystemSection() {
  return (
    <section className="section ecosystem-section">
      <div className="ecosystem-heading reveal">
        <div className="eyebrow">ONE ECOSYSTEM</div>

        <h2>
          One platform.
          <br />
          <span>Different perspectives.</span>
        </h2>
      </div>

      <div className="ecosystem-grid reveal">
        <PerspectiveCard
          icon={<Users />}
          label="FARMER"
          title="Know your hives."
          items={[
            "Live hive conditions",
            "Emergency alerts",
            "Multi-hive monitoring",
            "Production insights",
          ]}
        />

        <PerspectiveCard
          icon={<Globe2 />}
          label="AGRICULTURE"
          title="Understand regions."
          items={[
            "Regional hive intelligence",
            "Pollination insights",
            "Environmental trends",
            "Aggregated datasets",
          ]}
          highlighted
        />

        <PerspectiveCard
          icon={<ShoppingBag />}
          label="RETAIL"
          title="Show the story."
          items={[
            "Honey traceability",
            "Product identity",
            "Quality information",
            "Consumer transparency",
          ]}
        />
      </div>
    </section>
  );
}

function PerspectiveCard({
  icon,
  label,
  title,
  items,
  highlighted,
}) {
  return (
    <div className={`perspective-card ${highlighted ? "highlighted" : ""}`}>
      <div className="perspective-icon">{icon}</div>

      <span>{label}</span>

      <h3>{title}</h3>

      <ul>
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={15} />
            {item}
          </li>
        ))}
      </ul>

      <ArrowDown className="perspective-arrow" size={18} />
    </div>
  );
}

/* =========================================================
   TECHNOLOGY
========================================================= */

function TechnologySection() {
  return (
    <section className="section technology-section">
      <div className="technology-layout">
        <div className="technology-copy reveal">
          <div className="eyebrow">UNDER THE HOOD</div>

          <h2>
            Hardware meets
            <br />
            <span>intelligence.</span>
          </h2>

          <p>
            The farmer sees simple information. Underneath it is a connected
            hardware and software architecture designed for continuous
            monitoring.
          </p>

          <div className="technology-stack">
            <TechItem icon={<Radio />} title="IoT Sensors" />
            <TechItem icon={<Cpu />} title="ESP32 Edge Device" />
            <TechItem icon={<Wifi />} title="Wireless Connectivity" />
            <TechItem icon={<Cloud />} title="Cloud Platform" />
            <TechItem icon={<LineChart />} title="Data Intelligence" />
          </div>
        </div>

        <div className="architecture reveal">
          <ArchitectureNode
            icon={<Thermometer />}
            label="SENSORS"
            sub="Hive environment"
          />

          <div className="architecture-line">
            <div></div>
          </div>

          <ArchitectureNode
            icon={<Cpu />}
            label="ESP32"
            sub="Edge processing"
          />

          <div className="architecture-line">
            <div></div>
          </div>

          <ArchitectureNode
            icon={<Cloud />}
            label="CLOUD"
            sub="Data platform"
          />

          <div className="architecture-line">
            <div></div>
          </div>

          <ArchitectureNode
            icon={<BrainCircuit />}
            label="HIVESENSE"
            sub="Intelligence"
            active
          />
        </div>
      </div>
    </section>
  );
}

function TechItem({ icon, title }) {
  return (
    <div className="tech-item">
      <div>{icon}</div>
      <span>{title}</span>
      <ArrowRight size={14} />
    </div>
  );
}

function ArchitectureNode({ icon, label, sub, active }) {
  return (
    <div className={`architecture-node ${active ? "active" : ""}`}>
      <div>{icon}</div>
      <section>
        <strong>{label}</strong>
        <span>{sub}</span>
      </section>
    </div>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA({ scrollTo }) {
  return (
    <section className="final-section section">
      <div className="final-honeycomb"></div>

      <div className="final-content reveal">
        <div className="eyebrow">
          <span className="live-dot"></span>
          THE FUTURE OF BEEKEEPING
        </div>

        <h2>
          The hive is alive.
          <br />
          <span>Now make it visible.</span>
        </h2>

        <p>
          From one smart hive to an intelligent agricultural ecosystem.
        </p>

        <button
          className="primary-button large"
          onClick={() => scrollTo("live")}
        >
          Enter HiveSense
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-icon">
            <Hexagon size={24} />
            <span className="brand-bee">✦</span>
          </div>

          <div>
            <strong>HiveSense</strong>
            <span>SMART BEE INTELLIGENCE</span>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => scrollTo("platform")}>
            Platform
          </button>

          <button onClick={() => scrollTo("live")}>
            Live Hive
          </button>

          <button onClick={() => scrollTo("pollination")}>
            Pollination
          </button>

          <button onClick={() => scrollTo("traceability")}>
            Traceability
          </button>
        </div>

        <div className="footer-copy">
          <span>HiveSense © 2026</span>
          <span>Smart intelligence for the hive ecosystem.</span>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function SectionHeader({
  number,
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="section-header reveal">
      <div className="section-number">{number}</div>

      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>

      <p>{description}</p>
    </div>
  );
}

/* =========================================================
   SCROLL REVEAL
========================================================= */

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export default function AppWithReveal() {
  useReveal();

  return <App />;
}