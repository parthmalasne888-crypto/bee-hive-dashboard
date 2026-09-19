import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HiveHealth from "./components/HiveHealth";
import BMart from "./components/BMart";
import Traceability from "./components/Traceability";
import FarmerWorkspace from "./components/FarmerWorkspace";
import RegionalIntelligence from "./components/RegionalIntelligence";
import ProductDetail from "./components/ProductDetail";
import { hives, products, getHiveSeries, getHourlyLabels } from "./data/demoData";
import "./App.css";

export default function App() {
  const [selectedHive, setSelectedHive] = useState(hives[0]);
  const [product, setProduct] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const [tick, setTick] = useState(0);
  const audioRef = useRef({ ctx: null, master: null, nodes: [] });

  useEffect(() => {
    const timer = setInterval(() => setTick(v => v + 1), 1600);
    return () => clearInterval(timer);
  }, []);

  const ensureAudio = () => {
    if (!audioRef.current.ctx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.value = 0.045;
      master.connect(ctx.destination);
      audioRef.current = { ctx, master, nodes: [] };
    }
    if (audioRef.current.ctx.state === "suspended") audioRef.current.ctx.resume();
    return audioRef.current;
  };

  const stopAmbient = () => {
    const { ctx, master, nodes } = audioRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    nodes.forEach(node => {
      try { node.stop(ctx.currentTime + 0.32); } catch {}
    });
    audioRef.current.nodes = [];
  };

  const startAmbient = () => {
    const { ctx, master } = ensureAudio();
    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    oscA.type = "sine";
    oscB.type = "triangle";
    oscA.frequency.value = 72;
    oscB.frequency.value = 108;
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain).connect(master.gain);
    oscA.connect(master);
    oscB.connect(master);
    oscA.start();
    oscB.start();
    lfo.start();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.8);
    audioRef.current.nodes = [oscA, oscB, lfo];
  };

  const playTone = (type = "click") => {
    if (!soundOn && type !== "on") return;
    const { ctx, master } = ensureAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    const configs = {
      click: [330, 0.035, 0.05],
      hover: [520, 0.018, 0.045],
      tab: [410, 0.03, 0.07],
      buy: [640, 0.04, 0.11],
      on: [440, 0.05, 0.12],
      off: [260, 0.035, 0.08],
    };
    const [frequency, volume, duration] = configs[type] || configs.click;
    osc.type = type === "buy" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.35, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  useEffect(() => {
    localStorage.setItem("hiveSenseSound", String(soundOn));
    if (soundOn) startAmbient();
    else stopAmbient();
    return () => {};
  }, [soundOn]);

  useEffect(() => () => {
    stopAmbient();
    try { audioRef.current.ctx?.close(); } catch {}
  }, []);

  const liveHive = useMemo(() => ({
    ...selectedHive,
    temperature: selectedHive.temperature + Math.sin(tick * 0.34) * 0.16,
    humidity: selectedHive.humidity + Math.sin(tick * 0.22) * 0.75,
    weight: selectedHive.weight + Math.sin(tick * 0.12) * 0.05,
    activity: Math.round(Math.max(0, Math.min(100, selectedHive.activity + Math.sin(tick * 0.55) * 2.3))),
  }), [selectedHive, tick]);

  const liveSeries = useMemo(() => ({
    ...getHiveSeries(liveHive, tick),
    labels: getHourlyLabels(),
  }), [liveHive, tick]);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => playTone("click"), 180);
  };

  return (
    <>
      <Navbar navigate={navigate} soundOn={soundOn} setSoundOn={setSoundOn} playTone={playTone} />
      <main>
        <Hero hive={liveHive} navigate={navigate} />
        <FarmerWorkspace hives={hives} selectedHive={selectedHive} onSelect={(hive) => { setSelectedHive(hive); playTone("tab"); }} />
        <HiveHealth hive={liveHive} series={liveSeries} onPlayTone={playTone} />
        <BMart products={products} onProduct={(item) => { setProduct(item); playTone("buy"); }} onPlayTone={playTone} />
        <Traceability onPlayTone={playTone} />
        <RegionalIntelligence />
      </main>

      <footer>
        <strong>HiveSense</strong>
        <span>Demo prototype · simulated IoT data · 2026</span>
        <button onClick={() => navigate("top")}>Back to top ↑</button>
      </footer>

      {product && <ProductDetail product={product} onClose={() => setProduct(null)} onPlayTone={playTone} />}
    </>
  );
}
