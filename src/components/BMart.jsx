import { useState } from "react";
import { ArrowUpRight, BadgeCheck, ChevronRight, MapPin, PackageCheck, ShoppingBag, Star } from "lucide-react";

export default function BMart({ products, onProduct, onSound }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Forest", "Wildflower", "Farm"];
  const visible = filter === "All" ? products : products.filter(p => p.type.toLowerCase().includes(filter.toLowerCase()) || p.name.toLowerCase().includes(filter.toLowerCase()));
  return <section className="market-section page-section" id="market">
    <div className="market-aura"/><div className="market-grid"/>
    <div className="page-shell">
      <div className="market-head split"><div><div className="eyebrow orange"><span className="pulse-dot"/> B-MART / DEMO MARKETPLACE</div><h2>The hive meets <span>the market.</span></h2></div><p>Traceable honey, presented with the story of the hive that produced it. Browse demo products, inspect their origin, and follow every batch back to its source.</p></div>
      <div className="market-storyline"><span>HEALTHY HIVE</span><i>→</i><span>HARVEST</span><i>→</i><span>TRACEABLE BATCH</span><i>→</i><strong>B-MART</strong></div>
      <div className="market-toolbar"><div className="filter-tabs">{filters.map(f => <button key={f} className={filter === f ? "active" : ""} onClick={() => { setFilter(f); onSound("click"); }}>{f}</button>)}</div><span><ShoppingBag size={15}/> {visible.length} demo products</span></div>
      <div className="product-grid-new">{visible.map((p, idx) => <article className="product-card" key={p.id} style={{ "--delay": `${idx * 70}ms` }} onClick={() => { onProduct(p); onSound("open"); }}>
        <div className={`product-visual ${p.hue}`}><div className="product-orb"/><div className="jar-3d"><div className="lid"/><div className="label"><small>HIVESENSE</small><b>{p.name.split(" ")[0]}</b><em>{p.type}</em></div></div><span className="visual-tag">TRACEABLE</span><span className="visual-code">{p.batch}</span></div>
        <div className="product-copy"><div className="product-meta"><span><MapPin size={12}/>{p.origin}</span><span><Star size={12}/>{p.rating}</span></div><h3>{p.name}</h3><p>{p.seller}</p><div className="product-bottom"><div><b>{p.price}</b><small>{p.weight}</small></div><button>View product <ArrowUpRight size={15}/></button></div><div className="trace-chip"><BadgeCheck size={12}/> Origin + harvest record available</div></div>
      </article>)}</div>

      <div className="market-bottom"><div className="market-metric"><small>DEMO MARKETPLACE VOLUME</small><b>₹1.96L</b><span>sample catalog value</span></div><div className="market-metric"><small>TRACEABILITY RECORDS</small><b>100%</b><span>shown in this prototype</span></div><div className="market-metric"><small>ACTIVE SELLERS</small><b>18</b><span>simulated apiary profiles</span></div><button className="outline-light" onClick={() => { document.getElementById("traceability")?.scrollIntoView({behavior:"smooth"}); onSound("click"); }}>Explore traceability <ChevronRight size={17}/></button></div>
    </div>
  </section>;
}
