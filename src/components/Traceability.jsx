import { ArrowDown, BadgeCheck, Boxes, Droplets, Factory, MapPin } from "lucide-react";

export default function Traceability() {
  const steps = [
    { n:"01", title:"Hive", desc:"HIVE 07 · Nashik", icon: Boxes },
    { n:"02", title:"Harvest", desc:"18 Sep 2026", icon: Droplets },
    { n:"03", title:"Batch", desc:"HS-2026-001", icon: Factory },
    { n:"04", title:"Market", desc:"B-MART", icon: MapPin },
  ];
  return <section className="trace-section page-section" id="traceability">
    <div className="page-shell">
      <div className="section-intro split"><div><div className="eyebrow mint"><span className="pulse-dot"/> TRACEABILITY LAYER</div><h2>Every jar has a <span>starting point.</span></h2></div><p>Turn sensor-backed hive records into a clear chain of provenance that a beekeeper, buyer, or future marketplace partner can understand.</p></div>
      <div className="trace-stage">
        <div className="trace-line"><span/></div>
        {steps.map((s,i) => { const Icon = s.icon; return <div className={`trace-node node-${i}`} key={s.n}><div className="node-bubble"><Icon size={20}/></div><small>{s.n}</small><b>{s.title}</b><p>{s.desc}</p></div>; })}
      </div>
      <div className="trace-proof"><div><small>BATCH</small><b>HS-2026-001</b><span><BadgeCheck size={14}/> record complete</span></div><div><small>ORIGIN</small><b>Nashik, Maharashtra</b><span><MapPin size={14}/> apiary region</span></div><div><small>FLOW</small><b>Hive → Market</b><span><ArrowDown size={14}/> demonstration chain</span></div></div>
    </div>
  </section>;
}
