import { Leaf, MapPin, Radio, Sprout, TrendingUp } from "lucide-react";

export default function Pollination() {
  const points = Array.from({length: 22}, (_,i) => ({ left: `${12 + (i*17)%74}%`, top: `${19 + (i*29)%60}%`, delay: `${(i%6)*.35}s` }));
  return <section className="pollination-section page-section" id="pollination">
    <div className="pollination-bg"/><div className="page-shell">
      <div className="section-intro split"><div><div className="eyebrow mint"><span className="pulse-dot"/> POLLINATION INTELLIGENCE</div><h2>Let hive signals <span>move beyond the box.</span></h2></div><p>Translate colony activity into a regional picture of pollination and agricultural coverage. This panel uses demonstration data only.</p></div>
      <div className="landscape-card">
        <div className="topographic"/>
        {points.map((p,i)=><span key={i} className="field-dot" style={p}><i/></span>)}
        <div className="flight-path path-1"/><div className="flight-path path-2"/><div className="flight-path path-3"/>
        <div className="landscape-label ll-1"><Radio size={14}/><div><b>12</b><small>active hives</small></div></div>
        <div className="landscape-label ll-2"><Leaf size={14}/><div><b>87</b><small>pollination index</small></div></div>
        <div className="landscape-label ll-3"><Sprout size={14}/><div><b>63%</b><small>coverage</small></div></div>
        <div className="map-legend"><span><i className="teal"/> healthy</span><span><i className="orange"/> attention</span><span><i className="violet"/> activity route</span></div>
      </div>
      <div className="regional-kpis"><article><TrendingUp size={17}/><b>+12%</b><span>simulated activity vs. last cycle</span></article><article><MapPin size={17}/><b>3</b><span>active regional zones</span></article><article><Radio size={17}/><b>98.1%</b><span>network heartbeat</span></article></div>
    </div>
  </section>;
}
