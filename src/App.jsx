import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Battery,
  Bell,
  CheckCircle2,
  Cloud,
  Droplets,
  Gauge,
  HeartPulse,
  MapPin,
  Radio,
  Scale,
  ShieldCheck,
  Thermometer,
  Wifi,
  Zap
} from "lucide-react";

import "./App.css";


const initialData = {
  temperature: 34.2,
  humidity: 67,
  weight: 42.8,
  health: 92,
  battery: 94,
  pollination: 87,
  beeActivity: 84
};


function App() {

  const [data, setData] = useState(initialData);

  const [history, setHistory] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      time: i,
      temperature: 33 + Math.random() * 2,
      humidity: 64 + Math.random() * 5,
      weight: 42 + Math.random() * 1.2
    }))
  );

  const [emergency, setEmergency] = useState(false);

  const [lastUpdate, setLastUpdate] = useState(
    new Date()
  );


  /*
   * DEMO LIVE SENSOR STREAM
   *
   * Later we will replace this section
   * with Firebase / ESP32 data.
   */

  useEffect(() => {

    const interval = setInterval(() => {

      if (emergency) return;

      setData(prev => {

        const temperature =
          +(prev.temperature + (Math.random() - 0.5) * 0.35)
            .toFixed(1);

        const humidity =
          +(prev.humidity + (Math.random() - 0.5) * 0.8)
            .toFixed(1);

        const weight =
          +(prev.weight + (Math.random() - 0.5) * 0.04)
            .toFixed(2);

        const health =
          Math.max(
            80,
            Math.min(
              99,
              +(prev.health + (Math.random() - 0.5) * 0.5)
                .toFixed(0)
            )
          );

        const pollination =
          Math.max(
            70,
            Math.min(
              99,
              +(prev.pollination + (Math.random() - 0.5) * 0.8)
                .toFixed(0)
            )
          );

        const beeActivity =
          Math.max(
            70,
            Math.min(
              99,
              +(prev.beeActivity + (Math.random() - 0.5) * 1)
                .toFixed(0)
            )
          );


        setHistory(oldHistory => [

          ...oldHistory.slice(1),

          {
            time: Date.now(),
            temperature,
            humidity,
            weight
          }

        ]);


        setLastUpdate(new Date());


        return {
          ...prev,
          temperature,
          humidity,
          weight,
          health,
          pollination,
          beeActivity
        };

      });

    }, 2000);


    return () => clearInterval(interval);

  }, [emergency]);


  /*
   * DEMO EMERGENCY
   *
   * Simulates a sudden hive-weight increase.
   */

  const triggerEmergency = () => {

    setEmergency(true);

    setData(prev => ({
      ...prev,
      weight: +(prev.weight + 7.8).toFixed(2),
      health: 61
    }));

    setLastUpdate(new Date());

  };


  const resetSystem = () => {

    setEmergency(false);

    setData(initialData);

    setLastUpdate(new Date());

  };


  const getSystemStatus = () => {

    if (emergency) {
      return {
        label: "EMERGENCY",
        className: "emergency"
      };
    }

    if (
      data.temperature > 37 ||
      data.humidity > 80
    ) {
      return {
        label: "WARNING",
        className: "warning"
      };
    }

    return {
      label: "NORMAL",
      className: "normal"
    };

  };


  const status = getSystemStatus();


  return (

    <div className={`app ${emergency ? "emergencyMode" : ""}`}>


      {/* EMERGENCY BANNER */}

      {emergency && (

        <div className="emergencyBanner">

          <AlertTriangle size={21} />

          <div>

            <strong>
              EMERGENCY CONDITION DETECTED
            </strong>

            <span>
              Sudden hive-weight increase detected.
              Immediate inspection recommended.
            </span>

          </div>

          <button onClick={resetSystem}>
            Reset Alert
          </button>

        </div>

      )}


      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">

          <div className="logoIcon">
            🐝
          </div>

          <div>

            <h2>
              HiveSense
            </h2>

            <span>
              Smart Hive Intelligence
            </span>

          </div>

        </div>


        <div className="navLinks">

          <a className="active">
            Dashboard
          </a>

          <a>
            Analytics
          </a>

          <a>
            Hive Profile
          </a>

          <a>
            Alerts
          </a>

        </div>


        <div className="liveConnection">

          <span
            className={`liveDot ${emergency ? "red" : ""}`}
          ></span>

          <span>
            {emergency ? "ALERT" : "LIVE"}
          </span>

        </div>

      </nav>


      {/* HERO */}

      <section className="hero">

        <div className="heroContent">

          <div className="liveBadge">

            <span></span>

            LIVE SENSOR MONITORING

          </div>


          <h1>

            Smarter monitoring.
            <br />

            <span>
              Healthier hives.
            </span>

          </h1>


          <p>

            Real-time environmental monitoring,
            colony activity analysis and intelligent
            emergency detection for modern beekeeping.

          </p>


          <div className="heroActions">

            <button
              className="primaryButton"
              onClick={() => {
                document
                  .getElementById("monitoring")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  });
              }}
            >

              <Activity size={18} />

              Open Live Monitoring

            </button>


            <button
              className="dangerButton"
              onClick={triggerEmergency}
            >

              <AlertTriangle size={18} />

              Test Emergency

            </button>

          </div>


          <div className="heroStats">

            <div>

              <strong>
                2 sec
              </strong>

              <span>
                Update interval
              </span>

            </div>


            <div>

              <strong>
                ESP32
              </strong>

              <span>
                Gateway
              </span>

            </div>


            <div>

              <strong>
                24/7
              </strong>

              <span>
                Monitoring
              </span>

            </div>

          </div>

        </div>


        {/* ANIMATED HIVE */}

        <div className="hiveVisual">

          <div className="hiveGlow"></div>

          <div className="hiveRadar">

            <div className="radarRing ring1"></div>

            <div className="radarRing ring2"></div>

            <div className="radarRing ring3"></div>

            <div className="hiveBee">
              🐝
            </div>

            <div className="orbit orbit1">
              <span>●</span>
            </div>

            <div className="orbit orbit2">
              <span>●</span>
            </div>

          </div>

        </div>

      </section>


      {/* SYSTEM STATUS */}

      <section className="systemBar">

        <div className="systemItem">

          <div className="systemIcon">
            <Wifi size={17} />
          </div>

          <div>
            <span>
              Gateway
            </span>

            <strong>
              ESP32 Connected
            </strong>
          </div>

        </div>


        <div className="systemItem">

          <div className="systemIcon">
            <Cloud size={17} />
          </div>

          <div>
            <span>
              Data Stream
            </span>

            <strong>
              Receiving
            </strong>
          </div>

        </div>


        <div className="systemItem">

          <div className="systemIcon">
            <MapPin size={17} />
          </div>

          <div>
            <span>
              Hive Location
            </span>

            <strong>
              VCET Research Hive
            </strong>
          </div>

        </div>


        <div className="systemItem">

          <div className="systemIcon">
            <ShieldCheck size={17} />
          </div>

          <div>
            <span>
              System Status
            </span>

            <strong className={status.className}>
              {status.label}
            </strong>
          </div>

        </div>

      </section>


      {/* MONITORING */}

      <main
        className="dashboard"
        id="monitoring"
      >


        <div className="sectionHeader">

          <div>

            <div className="sectionEyebrow">
              REAL-TIME INPUT
            </div>

            <h2>
              Hive Monitoring
            </h2>

            <p>
              Live sensor readings from the hive gateway
            </p>

          </div>


          <div className="lastReceived">

            <Radio size={15} />

            Last received:

            <strong>
              {lastUpdate.toLocaleTimeString()}
            </strong>

          </div>

        </div>


        {/* SENSOR CARDS */}

        <div className="sensorGrid">


          <SensorCard
            icon={<Thermometer />}
            title="Temperature"
            value={data.temperature}
            unit="°C"
            status={
              data.temperature > 37
                ? "High"
                : "Optimal"
            }
            description="Internal hive temperature"
          />


          <SensorCard
            icon={<Droplets />}
            title="Humidity"
            value={data.humidity}
            unit="%"
            status={
              data.humidity > 80
                ? "High"
                : "Optimal"
            }
            description="Relative humidity"
          />


          <SensorCard
            icon={<Scale />}
            title="Hive Weight"
            value={data.weight}
            unit="kg"
            status={
              emergency
                ? "SUDDEN INCREASE"
                : "Stable"
            }
            description={
              emergency
                ? "+7.8 kg detected"
                : "Current hive mass"
            }
            emergency={emergency}
          />


          <SensorCard
            icon={<HeartPulse />}
            title="Hive Health"
            value={data.health}
            unit="%"
            status={
              emergency
                ? "Critical"
                : "Healthy"
            }
            description="Overall colony health"
            emergency={emergency}
          />

        </div>


        {/* EMERGENCY ALERT CARD */}

        <section
          className={`alertCard ${
            emergency ? "alertActive" : ""
          }`}
        >

          <div className="alertIcon">

            {emergency
              ? <AlertTriangle />
              : <CheckCircle2 />
            }

          </div>


          <div className="alertContent">

            <span>
              SAFETY MONITOR
            </span>

            <h3>

              {emergency
                ? "Emergency condition requires attention"
                : "All hive parameters are within normal range"
              }

            </h3>


            <p>

              {emergency

                ? "A sudden increase in hive weight has been detected. This may indicate an abnormal event and the hive should be inspected."

                : "The monitoring system is continuously checking temperature, humidity, weight and colony health."

              }

            </p>

          </div>


          <div className="alertStatus">

            <Bell size={17} />

            {emergency
              ? "ACTION REQUIRED"
              : "SYSTEM CLEAR"
            }

          </div>

        </section>


        {/* CHART */}

        <section className="analyticsCard">

          <div className="analyticsHeader">

            <div>

              <div className="sectionEyebrow">
                LIVE TELEMETRY
              </div>

              <h2>
                Environmental & Weight Trends
              </h2>

            </div>


            <div className="chartLegend">

              <span>
                <i></i>
                Temperature
              </span>

              <span>
                <i></i>
                Weight
              </span>

            </div>

          </div>


          <LiveChart
            history={history}
            emergency={emergency}
          />

        </section>


        {/* INTELLIGENCE */}

        <section className="intelligenceGrid">


          <div className="intelligenceCard">

            <div className="cardHeader">

              <div>

                <span>
                  COLONY ACTIVITY
                </span>

                <h3>
                  Bee Activity Index
                </h3>

              </div>

              <Activity />

            </div>


            <div className="score">

              {data.beeActivity}

              <small>
                /100
              </small>

            </div>


            <div className="progressBar">

              <div
                style={{
                  width: `${data.beeActivity}%`
                }}
              ></div>

            </div>


            <p>
              Based on current environmental
              conditions and activity patterns.
            </p>

          </div>


          <div className="intelligenceCard">

            <div className="cardHeader">

              <div>

                <span>
                  POLLINATION
                </span>

                <h3>
                  Pollination Index
                </h3>

              </div>

              <Gauge />

            </div>


            <div className="score">

              {data.pollination}

              <small>
                /100
              </small>

            </div>


            <div className="progressBar">

              <div
                style={{
                  width: `${data.pollination}%`
                }}
              ></div>

            </div>


            <p>
              Estimated pollination potential
              from colony activity.
            </p>

          </div>


          <div className="intelligenceCard">

            <div className="cardHeader">

              <div>

                <span>
                  POWER SYSTEM
                </span>

                <h3>
                  Gateway Battery
                </h3>

              </div>

              <Battery />

            </div>


            <div className="score">

              {data.battery}

              <small>
                %
              </small>

            </div>


            <div className="progressBar">

              <div
                style={{
                  width: `${data.battery}%`
                }}
              ></div>

            </div>


            <p>
              ESP32 gateway battery level.
            </p>

          </div>


        </section>


        {/* DATA FLOW */}

        <section className="dataFlow">

          <div className="sectionEyebrow">
            DATA PIPELINE
          </div>

          <h2>
            From hive to dashboard
          </h2>


          <div className="flow">

            <FlowItem
              icon="🐝"
              title="Hive"
              text="Sensors collect data"
            />

            <div className="flowLine"></div>

            <FlowItem
              icon="📡"
              title="ESP32"
              text="Reads sensor input"
            />

            <div className="flowLine"></div>

            <FlowItem
              icon="☁️"
              title="Cloud"
              text="Stores telemetry"
            />

            <div className="flowLine"></div>

            <FlowItem
              icon="📊"
              title="Dashboard"
              text="Live visualization"
            />

          </div>

        </section>


      </main>


      {/* FOOTER */}

      <footer>

        <div className="footerLogo">
          🐝 HiveSense
        </div>

        <span>
          Intelligent Bee Hive Monitoring Platform
        </span>

        <span>
          Live System • HIVE-001
        </span>

      </footer>

    </div>

  );
}


/* SENSOR CARD */

function SensorCard({
  icon,
  title,
  value,
  unit,
  status,
  description,
  emergency
}) {

  return (

    <div
      className={`sensorCard ${
        emergency ? "sensorEmergency" : ""
      }`}
    >

      <div className="sensorTop">

        <div className="sensorIcon">
          {icon}
        </div>

        <span className="sensorStatus">

          <i></i>

          {status}

        </span>

      </div>


      <div className="sensorTitle">
        {title}
      </div>


      <div className="sensorValue">

        {value}

        <small>
          {unit}
        </small>

      </div>


      <div className="sensorDescription">

        {description}

      </div>


      <div className="liveReading">

        <Zap size={12} />

        LIVE INPUT

      </div>

    </div>

  );
}


/* LIVE CHART */

function LiveChart({
  history,
  emergency
}) {

  const width = 900;
  const height = 280;

  const tempPoints = history
    .map((item, index) => {

      const x =
        (index / (history.length - 1))
        * width;

      const normalized =
        (item.temperature - 31) / 8;

      const y =
        height -
        Math.max(0, Math.min(1, normalized))
        * 220 -
        20;

      return `${x},${y}`;

    })
    .join(" ");


  const weightPoints = history
    .map((item, index) => {

      const x =
        (index / (history.length - 1))
        * width;

      const normalized =
        (item.weight - 40) / 12;

      const y =
        height -
        Math.max(0, Math.min(1, normalized))
        * 220 -
        20;

      return `${x},${y}`;

    })
    .join(" ");


  return (

    <div
      className={`liveChart ${
        emergency ? "chartEmergency" : ""
      }`}
    >

      <div className="chartGrid">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>


      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >

        <polyline
          points={tempPoints}
          className="temperatureLine"
        />

        <polyline
          points={weightPoints}
          className="weightLine"
        />

      </svg>


      <div className="chartTime">

        <span>
          -60 min
        </span>

        <span>
          -45 min
        </span>

        <span>
          -30 min
        </span>

        <span>
          -15 min
        </span>

        <span>
          NOW
        </span>

      </div>


      {emergency && (

        <div className="chartAlert">

          <AlertTriangle size={15} />

          Weight increase detected

        </div>

      )}

    </div>

  );
}


/* FLOW */

function FlowItem({
  icon,
  title,
  text
}) {

  return (

    <div className="flowItem">

      <div className="flowIcon">
        {icon}
      </div>

      <strong>
        {title}
      </strong>

      <span>
        {text}
      </span>

    </div>

  );

}


export default App;