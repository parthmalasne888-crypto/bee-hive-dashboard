import {
  Activity,
  Thermometer,
  Droplets,
  Scale,
  HeartPulse,
  Battery,
  Wifi,
  MapPin,
  Hexagon
} from "lucide-react";

import "./App.css";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <div className="logoIcon">🐝</div>

          <div>
            <h2>HiveSense</h2>
            <span>Smart Hive Intelligence</span>
          </div>
        </div>

        <div className="navLinks">
          <a className="active">Dashboard</a>
          <a>Analytics</a>
          <a>Hive Profile</a>
          <a>About</a>
        </div>

        <div className="connection">
          <span className="onlineDot"></span>
          Live
        </div>

      </nav>


      {/* HERO */}
      <section className="hero">

        <div className="heroText">

          <p className="eyebrow">
            <Activity size={16} />
            REAL-TIME HIVE MONITORING
          </p>

          <h1>
            Intelligent monitoring
            <br />
            for healthier <span>hives.</span>
          </h1>

          <p className="heroDescription">
            Monitor hive conditions, environmental parameters,
            colony health and sensor data in real time.
          </p>

          <div className="heroButtons">

            <button className="primaryButton">
              View Live Dashboard
              <Activity size={18} />
            </button>

            <button className="secondaryButton">
              Explore Analytics
            </button>

          </div>

        </div>


        <div className="hiveVisual">

          <div className="hiveCircle">

            <div className="bee">
              🐝
            </div>

            <div className="pulse"></div>

          </div>

        </div>

      </section>


      {/* STATUS BAR */}
      <section className="statusBar">

        <div>
          <span className="statusLabel">
            HIVE
          </span>

          <strong>
            HIVE-001
          </strong>
        </div>

        <div>
          <MapPin size={17} />
          <span>
            VCET Research Hive
          </span>
        </div>

        <div>
          <Wifi size={17} />
          <span>
            ESP32 Connected
          </span>
        </div>

        <div>
          <Battery size={17} />
          <span>
            94%
          </span>
        </div>

      </section>


      {/* DASHBOARD */}
      <main className="dashboard">

        <div className="sectionHeading">

          <div>

            <p className="eyebrow">
              LIVE DATA
            </p>

            <h2>
              Hive Health Overview
            </h2>

          </div>

          <div className="lastUpdated">
            ● Updated just now
          </div>

        </div>


        {/* SENSOR CARDS */}
        <div className="cards">

          <SensorCard
            icon={<Thermometer />}
            title="Temperature"
            value="34.2"
            unit="°C"
            status="Optimal"
            description="Hive internal temperature"
          />

          <SensorCard
            icon={<Droplets />}
            title="Humidity"
            value="67"
            unit="%"
            status="Optimal"
            description="Relative humidity"
          />

          <SensorCard
            icon={<Scale />}
            title="Hive Weight"
            value="42.8"
            unit="kg"
            status="Stable"
            description="Current hive weight"
          />

          <SensorCard
            icon={<HeartPulse />}
            title="Hive Health"
            value="92"
            unit="%"
            status="Healthy"
            description="Overall colony index"
          />

        </div>


        {/* ANALYTICS */}
        <section className="analytics">

          <div className="analyticsHeader">

            <div>

              <p className="eyebrow">
                SENSOR ANALYTICS
              </p>

              <h2>
                Environmental Trends
              </h2>

            </div>

            <select>

              <option>
                Last 24 hours
              </option>

              <option>
                Last 7 days
              </option>

              <option>
                Last 30 days
              </option>

            </select>

          </div>


          <div className="chart">

            <div className="chartLines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <svg
              viewBox="0 0 900 280"
              preserveAspectRatio="none"
              className="chartSvg"
            >

              <polyline
                points="0,190 80,170 160,180 240,120 320,145 400,100 480,130 560,80 640,110 720,65 800,90 900,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />

              <circle
                cx="900"
                cy="50"
                r="7"
                fill="currentColor"
              />

            </svg>


            <div className="chartLabels">

              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>Now</span>

            </div>

          </div>

        </section>


        {/* BOTTOM CARDS */}
        <section className="bottomGrid">


          <div className="infoCard">

            <div className="cardTitle">

              <Hexagon />

              <h3>
                Pollination Index
              </h3>

            </div>


            <div className="bigNumber">
              87<span>/100</span>
            </div>


            <p>
              Colony activity indicates strong
              pollination potential based on
              recent sensor patterns.
            </p>


            <div className="progress">
              <div style={{ width: "87%" }}></div>
            </div>

          </div>


          <div className="infoCard">

            <div className="cardTitle">

              <Activity />

              <h3>
                System Status
              </h3>

            </div>


            <div className="systemRow">
              <span>ESP32 Gateway</span>
              <strong className="good">
                Online
              </strong>
            </div>

            <div className="systemRow">
              <span>Temperature Sensor</span>
              <strong className="good">
                Normal
              </strong>
            </div>

            <div className="systemRow">
              <span>Humidity Sensor</span>
              <strong className="good">
                Normal
              </strong>
            </div>

            <div className="systemRow">
              <span>Cloud Sync</span>
              <strong className="good">
                Connected
              </strong>
            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}
      <footer>

        <div>
          🐝 HiveSense
        </div>

        <span>
          Smart Bee Hive Monitoring Platform
        </span>

      </footer>

    </div>
  );
}


function SensorCard({
  icon,
  title,
  value,
  unit,
  status,
  description
}) {

  return (

    <div className="sensorCard">

      <div className="sensorTop">

        <div className="sensorIcon">
          {icon}
        </div>

        <span className="status">
          ● {status}
        </span>

      </div>


      <p>
        {title}
      </p>


      <div className="sensorValue">

        {value}

        <span>
          {unit}
        </span>

      </div>


      <small>
        {description}
      </small>

    </div>

  );
}


export default App;