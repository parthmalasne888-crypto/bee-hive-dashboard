import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, CircleAlert, Clock3, Gauge, Leaf, MousePointer2, Pause, Play, Radio, Sparkles, Volume2, VolumeX, Waves, Zap } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HiveHealth from "./components/HiveHealth";
import BMart from "./components/BMart";
import ProductDetail from "./components/ProductDetail";
import Traceability from "./components/Traceability";
import Pollination from "./components/Pollination";
import { hives, products } from "./data/demoData";
import "./App.css";

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

export default function App() {
  const [selectedHive, setSelectedHive] = useState(hives[0]);
  const [liveHive, setLiveHive] = useState(hives[0]);
  const [product, setProduct] = useState(null);
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem("hivesense-sound") === "on");
  const [simulationAlert, setSimulationAlert] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setLiveHive(prev => {
        const seed = selectedHive.id.charCodeAt(0);
        const wave = Date.now() / 4200;
        const baseTemp = selectedHive.temperature + Math.sin(wave + seed) * .16;
        const baseHumidity = selectedHive.humidity + Math.sin(wave * .7 + seed) * 1.3;
        const baseActivity = selectedHive.activity + Math.sin(wave * 1.1 + seed) * 4;
        const baseWeight = selectedHive.weight + Math.sin(wave * .28 + seed) * .06;
        return { ...selectedHive, temperature: baseTemp, humidity: baseHumidity, activity: baseActivity, weight: baseWeight, health: simulationAlert ? clamp(selectedHive.health - 16, 45, 100) : selectedHive.health };
      });
    }, 1100);
    return () => clearInterval(id);
  }, [selectedHive, simulationAlert]);

  useEffect(() => {
    if (!audioRef.current || !soundOn) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const master = ctx.createGain(); master.gain.value = .025; master.connect(ctx.destination);
    const osc = ctx.createOscillator(); const lfo = ctx.createOscillator(); const lfoGain = ctx.createGain();
    osc.type = "sine"; osc.frequency.value = 96; lfo.frequency.value = .08; lfoGain.gain.value = 10;
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency); osc.connect(master); osc.start(); lfo.start();
    audioRef.current = { ctx, master, osc, lfo };
    setTimeout(() => { try { playSound("open"); } catch {} }, 120);
    return () => { try { osc.stop(); lfo.stop(); ctx.close(); } catch {} audioRef.current = null; };
  }, [soundOn]);

  const playSound = (type = "click") => {
    if (!soundOn) return;
    try {
      const ctx = audioRef.current?.ctx || new (window.AudioContext || window.webkitAudioContext)();
      const gain = ctx.createGain(); gain.connect(ctx.destination); gain.gain.value = 0;
      const osc = ctx.createOscillator(); osc.type = type === "alert" ? "sawtooth" : "sine";
      osc.frequency.value = type === "open" ? 540 : type === "alert" ? 180 : 280;
      osc.connect(gain); const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(type === "alert" ? .045 : .025, t + .015); gain.gain.exponentialRampToValueAtTime(.0001, t + (type === "alert" ? .35 : .14));
      osc.start(t); osc.stop(t + .4);
      if (!audioRef.current) audioRef.current = { ctx };
    } catch {}
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    localStorage.setItem("hivesense-sound", next ? "on" : "off");

  };

  const selectHive = (h) => { setSelectedHive(h); setLiveHive(h); setSimulationAlert(false); };
  const simulate = (state) => setSimulationAlert(state);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const heroHive = useMemo(() => ({...liveHive, health: simulationAlert ? clamp(liveHive.health - 16, 45, 100) : liveHive.health}), [liveHive, simulationAlert]);

  return <div className="app-shell" style={{ "--scroll-progress": scrollProgress }}>
    <Navbar soundOn={soundOn} setSoundOn={setSoundOn} onToggleSound={toggleSound}/>
    <div className="scroll-progress"><span/></div>
    <main>
      <Hero hive={heroHive} onEnter={go}/>

      <section className="bridge-band"><div className="page-shell"><div className="bridge-copy"><span><Radio size={14}/> DIGITAL SIGNAL</span><b>physical hive → live data → better decisions</b></div><div className="bridge-wave"><Waves size={20}/><i/><i/><i/><i/><i/></div></div></section>

      <HiveHealth hives={hives} selectedHive={selectedHive} setSelectedHive={selectHive} liveHive={liveHive} simulate={simulate} onSound={playSound}/>
      <BMart products={products} onProduct={(p) => { setProduct(p); playSound("open"); }} onSound={playSound} />
      <Traceability />
      <Pollination />

      <section className="closing-section page-section"><div className="closing-orbit"/><div className="page-shell closing-inner"><div className="eyebrow mint"><Sparkles size={14}/> THE HIVESENSE LOOP</div><h2>Healthy colonies. <span>Traceable harvests.</span> A market with context.</h2><div className="closing-actions"><button className="primary-cta" onClick={() => go("health")}>Back to live health <ArrowUpRight size={17}/></button><button className="ghost-light" onClick={() => go("market")}>Open B-Mart <ArrowUpRight size={17}/></button></div><div className="closing-foot"><span><CircleAlert size={13}/> DEMO PROTOTYPE</span><span><Clock3 size={13}/> 2026</span><span><Zap size={13}/> simulated telemetry</span></div></div></section>
    </main>
    <footer className="footer-new"><div className="page-shell footer-inner"><div><b>HIVESENSE</b><span>live apiary intelligence</span></div><div className="footer-right"><span>Built for farmers, future marketplaces, and data-led agriculture.</span><button onClick={() => go("top")}>Back to top ↑</button></div></div></footer>
    {product && <ProductDetail product={product} onClose={() => { setProduct(null); playSound("click"); }}/>} 
    <div className="floating-cursor" aria-hidden="true"><MousePointer2 size={14}/></div>
    <div className="accessibility-note"><span><Leaf size={12}/> Demo data</span><span>{soundOn ? <Volume2 size={12}/> : <VolumeX size={12}/> } sound {soundOn ? "on" : "off"}</span></div>
  </div>;
}
