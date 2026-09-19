import React, { useEffect, useMemo, useState } from 'react';

const HIVES = [
  { id:'HIVE 01', location:'Borivali', health:96, temp:33.8, humidity:66, weight:46.2, activity:86, battery:96 },
  { id:'HIVE 02', location:'Panvel', health:92, temp:34.4, humidity:68, weight:41.7, activity:78, battery:91 },
  { id:'HIVE 03', location:'Karjat', health:94, temp:34.1, humidity:64, weight:43.8, activity:83, battery:94 },
  { id:'HIVE 04', location:'Nashik', health:89, temp:34.9, humidity:71, weight:39.9, activity:69, battery:88 },
  { id:'HIVE 07', location:'Alibag', health:95, temp:34.2, humidity:67, weight:42.8, activity:81, battery:94 },
];

const TRACE_RECORDS = [
  { hive:'HIVE 01', date:'18 Sep 2026', stage:4, batch:'HS-2026-011', origin:'Borivali', product:'Forest Reserve Honey', status:'In B-Mart', time:'15:40' },
  { hive:'HIVE 02', date:'17 Sep 2026', stage:3, batch:'HS-2026-012', origin:'Panvel', product:'Farm Apiary Honey', status:'Quality Check', time:'11:18' },
  { hive:'HIVE 03', date:'16 Sep 2026', stage:2, batch:'HS-2026-013', origin:'Karjat', product:'Wildflower Harvest', status:'Harvesting', time:'08:32' },
  { hive:'HIVE 04', date:'15 Sep 2026', stage:1, batch:'HS-2026-014', origin:'Nashik', product:'Citrus Bloom Honey', status:'Hive Monitoring', time:'09:05' },
  { hive:'HIVE 07', date:'18 Sep 2026', stage:5, batch:'HS-2026-001', origin:'Alibag', product:'Forest Reserve Honey', status:'Customer Ready', time:'17:22' },
];

const ZONES = [
  { name:'SGNP Forest Edge', aliases:['borivali','sanjay gandhi','sgnp','borivali west'], area:'Borivali', index:92, bloom:'Wildflower + native trees', distance:'2.4 km demo radius', lat:'19.2146° N', lon:'72.9106° E' },
  { name:'Panvel Farmland Belt', aliases:['panvel','new panvel','kalamboli'], area:'Panvel', index:88, bloom:'Mango + sunflower', distance:'4.1 km demo radius', lat:'18.9894° N', lon:'73.1175° E' },
  { name:'Karjat Orchard Corridor', aliases:['karjat','badlapur','nesh'], area:'Karjat', index:95, bloom:'Orchard + forest edge', distance:'1.8 km demo radius', lat:'18.9100° N', lon:'73.3230° E' },
  { name:'Nashik Vineyard Belt', aliases:['nashik','nasik','dindori'], area:'Nashik', index:84, bloom:'Grapevine + wildflower', distance:'5.6 km demo radius', lat:'20.0059° N', lon:'73.7846° E' },
  { name:'Alibag Coastal Grove', aliases:['alibag','alibaug','coast'], area:'Alibag', index:90, bloom:'Coconut + flowering scrub', distance:'3.2 km demo radius', lat:'18.6414° N', lon:'72.8722° E' },
  { name:'Lonavala Forest Corridor', aliases:['lonavala','khandala'], area:'Lonavala', index:94, bloom:'Forest bloom + meadow', distance:'3.7 km demo radius', lat:'18.7546° N', lon:'73.4062° E' },
];

const REGIONS = {
  Maharashtra:{ hives:'7,420', pollination:'88%', honey:'18.7 t', environment:'STABLE', alerts:8, trend:'+8.2%', note:'Strong activity across western and coastal clusters.' },
  'Western Ghats':{ hives:'3,180', pollination:'94%', honey:'9.4 t', environment:'HEALTHY', alerts:3, trend:'+12.4%', note:'Forest-edge colonies show strong flowering response.' },
  Konkan:{ hives:'1,940', pollination:'90%', honey:'6.1 t', environment:'GOOD', alerts:5, trend:'+6.8%', note:'Coastal flowering corridors remain highly active.' },
};

const PRODUCTS = [
  { name:'Forest Reserve Honey', origin:'Maharashtra', hive:'HIVE 07', price:'₹720', weight:'500 g', harvest:'18 Sep 2026', batch:'HS-2026-001', nft:'HS-HONEY-001', tone:'amber' },
  { name:'Wildflower Harvest', origin:'Western Ghats', hive:'HIVE 03', price:'₹650', weight:'500 g', harvest:'16 Sep 2026', batch:'HS-2026-013', nft:'HS-HONEY-013', tone:'gold' },
  { name:'Farm Apiary Honey', origin:'Maharashtra', hive:'HIVE 02', price:'₹590', weight:'500 g', harvest:'17 Sep 2026', batch:'HS-2026-012', nft:'HS-HONEY-012', tone:'green' },
];

const METRICS = [
  ['temperature','Temperature','°C','33–36','#9C7C42'],
  ['humidity','Humidity','%','58–74','#4E9470'],
  ['weight','Weight','kg','38–48','#B68E3E'],
  ['activity','Bee Activity','%','65–95','#5D9A59'],
  ['battery','Battery','%','70–100','#738C52'],
];

const RANGE_LABELS = { '24H':'Today', '7D':'7 days', '30D':'30 days' };

function clamp(v,a,b){ return Math.min(b,Math.max(a,v)); }

function useTelemetry(base, alert){
  const [tick,setTick]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setTick(v=>v+1),1300);return()=>clearInterval(id)},[]);
  return useMemo(()=>{
    const wave=Math.sin(tick*.33), wave2=Math.sin(tick*.17+.8);
    return {
      temperature:base.temp+wave*.34+(alert?2.1:0),
      humidity:base.humidity+wave2*1.5+(alert?-5:0),
      weight:base.weight+Math.sin(tick*.07)*.12+(alert?-.8:0),
      activity:clamp(base.activity+Math.sin(tick*.22)*5+(alert?-30:0),0,100),
      battery:clamp(base.battery-(tick%34)*.03,0,100),
      health:clamp(base.health+Math.sin(tick*.1)*.8+(alert?-18:0),0,100)
    };
  },[base,tick,alert]);
}

function makeSeries(seed, spread, count=58){
  return Array.from({length:count},(_,i)=>{
    const wave=Math.sin(i*.42+seed)*spread*.42;
    const wave2=Math.sin(i*.15+1.2)*spread*.26;
    const trend=(i/(count-1)-.5)*spread*.18;
    return seed+wave+wave2+trend;
  });
}

function MiniSpark({data,color}){
  const min=Math.min(...data), max=Math.max(...data), range=max-min||1;
  const pts=data.map((v,i)=>[i/(data.length-1)*100,92-(v-min)/range*78]);
  const d=pts.map(([x,y],i)=>`${i?'L':'M'} ${x} ${y}`).join(' ');
  return <svg className="tiny-chart" viewBox="0 0 100 100" preserveAspectRatio="none"><path d={d} fill="none" stroke={color} strokeWidth="2.3" vectorEffect="non-scaling-stroke"/></svg>;
}

function MainChart({data,color,unit,isAlert}){
  const min=Math.min(...data), max=Math.max(...data), range=max-min||1;
  const pts=data.map((v,i)=>[45+i*(695/(data.length-1)),246-(v-min)/range*170]);
  const d=pts.map(([x,y],i)=>`${i?'L':'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area=`${d} L 740 286 L 45 286 Z`;
  const avg=data.reduce((a,b)=>a+b,0)/data.length;
  const last=pts.at(-1);
  return <div className="chart-wrap">
    <div className="chart-ylabels"><span>{max.toFixed(unit==='kg'||unit==='°C'?1:0)}{unit}</span><span>{avg.toFixed(unit==='kg'||unit==='°C'?1:0)}{unit}</span><span>{min.toFixed(unit==='kg'||unit==='°C'?1:0)}{unit}</span></div>
    <svg viewBox="0 0 790 330" className="main-chart">
      <defs><linearGradient id="fillA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".22"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <line x1="45" y1="75" x2="740" y2="75" stroke="rgba(27,65,39,.10)"/><line x1="45" y1="162" x2="740" y2="162" stroke="rgba(27,65,39,.08)"/><line x1="45" y1="246" x2="740" y2="246" stroke="rgba(27,65,39,.14)"/>
      <rect x="45" y="107" width="695" height="88" rx="13" fill="#8FA26C" opacity=".08"/>
      {isAlert && <rect x="45" y="48" width="695" height="35" rx="12" fill="#C64C45" opacity=".12"/>}
      <path d={area} fill="url(#fillA)"/><path d={d} fill="none" stroke={color} strokeWidth="4" vectorEffect="non-scaling-stroke"/>
      <circle cx={last[0]} cy={last[1]} r="6" fill={isAlert?'#C64C45':color}/><circle cx={last[0]} cy={last[1]} r="13" fill="none" stroke={isAlert?'#C64C45':color} strokeOpacity=".23"/>
      {['06:00','09:00','12:00','15:00','NOW'].map((t,i)=> <text key={t} x={45+i*173.75} y="312" fill="#6B786B" fontSize="11" textAnchor={i===0?'start':i===4?'end':'middle'}>{t}</text>)}
    </svg>
  </div>
}

function HomeScene({onOpen}){
  return <div className="photo-home">
    <img className="hero-photo" src="/media/hivesense-apiary.jpg" alt="Realistic beekeeping farm in a mountain agricultural landscape" />
    <div className="photo-shade"/>
    <div className="photo-vignette"/>
    <div className="photo-grain"/>
    <div className="photo-copy">
      <span className="scene-overline">HIVESENSE · LIVING APIARY INTELLIGENCE</span>
      <h1>SEE THE <em>LIVING HIVE.</em></h1>
      <p>Choose a place in the landscape to enter the system. The apiary is your navigation.</p>
    </div>

    <button className="photo-hotspot ph-health" onClick={()=>onOpen('health')} aria-label="Open live hive health">
      <i/><span><b>01 · LIVE HIVE HEALTH</b><small>hive sensors · colony · alerts</small></span><strong>↗</strong>
    </button>

    <button className="photo-hotspot ph-market" onClick={()=>onOpen('market')} aria-label="Open B-Mart">
      <i/><span><b>02 · B-MART</b><small>farm shop · harvest · provenance</small></span><strong>↗</strong>
    </button>

    <button className="photo-hotspot ph-poll" onClick={()=>onOpen('pollination')} aria-label="Open pollination">
      <i/><span><b>03 · POLLINATION</b><small>flower fields · index · locality</small></span><strong>↗</strong>
    </button>

    <button className="photo-hotspot ph-region" onClick={()=>onOpen('regional')} aria-label="Open regional intelligence">
      <i/><span><b>04 · REGIONAL INTELLIGENCE</b><small>environment · clusters · trends</small></span><strong>↗</strong>
    </button>

    <div className="photo-landmark-label label-hives">APIARY / HIVES</div>
    <div className="photo-landmark-label label-market">FARM SHOP / B-MART</div>
    <div className="photo-landmark-label label-poll">FLOWER / POLLINATION</div>
    <div className="photo-landmark-label label-region">REGIONAL SENSOR</div>

    <div className="photo-footer"><span>PHOTO-LED APIARY MAP · DEMONSTRATION ENVIRONMENT</span><span>CLICK A LANDMARK TO ENTER</span></div>
  </div>;
}

function App(){
  const [view,setView]=useState('home');
  const [hive,setHive]=useState(HIVES[4]);
  const [alert,setAlert]=useState(false);
  const [alertsArmed,setAlertsArmed]=useState(true);
  const [range,setRange]=useState('24H');
  const [metric,setMetric]=useState('temperature');
  const [traceHive,setTraceHive]=useState('HIVE 07');
  const [traceDate,setTraceDate]=useState('18 Sep 2026');
  const [pollSearch,setPollSearch]=useState('');
  const [pollZone,setPollZone]=useState(null);
  const [region,setRegion]=useState('Maharashtra');
  const [productOpen,setProductOpen]=useState(PRODUCTS[0]);
  const [clock,setClock]=useState(new Date());

  const telem=useTelemetry(hive,alert);
  useEffect(()=>{const id=setInterval(()=>setClock(new Date()),1000);return()=>clearInterval(id)},[]);

  const cfg=METRICS.find(x=>x[0]===metric);
  const val={temperature:telem.temperature,humidity:telem.humidity,weight:telem.weight,activity:telem.activity,battery:telem.battery}[metric];
  const series=useMemo(()=>{
    const spread={temperature:.9,humidity:3.2,weight:.25,activity:11,battery:2.2}[metric];
    const rangeBoost=range==='24H'?0:range==='7D'?1.35:1.85;
    return makeSeries(val,spread+rangeBoost,range==='24H'?58:range==='7D'?52:45);
  },[val,metric,range]);
  const current=`${metric==='temperature'||metric==='weight'?val.toFixed(1):Math.round(val)}${cfg[2]}`;

  const trace=TRACE_RECORDS.find(r=>r.hive===traceHive && r.date===traceDate)
    || TRACE_RECORDS.find(r=>r.hive===traceHive) || TRACE_RECORDS[0];

  function nav(v){setView(v);setAlert(false)}
  function emergencyTone(){
    if(!alertsArmed)return;
    try{
      const A=window.AudioContext||window.webkitAudioContext; if(!A)return;
      const ctx=new A(),gain=ctx.createGain();gain.gain.value=.08;gain.connect(ctx.destination);
      [880,660,880,660].forEach((f,i)=>{const o=ctx.createOscillator();o.frequency.value=f;o.type='sine';o.connect(gain);const t=ctx.currentTime+i*.18;o.start(t);o.stop(t+.11)});
    }catch{}
  }
  function simulateAlert(){setAlert(v=>{if(!v)setTimeout(emergencyTone,15);return !v})}
  function findPoll(){
    const q=pollSearch.trim().toLowerCase();
    const exact=ZONES.find(z=>z.aliases.some(a=>q.includes(a)||a.includes(q)));
    setPollZone(exact||null);
  }
  return <div className="app">
    <header className="bar">
      <button className="brand" onClick={()=>nav('home')}><span className="brand-symbol">HS</span> HIVESENSE</button>
      <span className="bar-title">{view==='home'?'LIVING APIARY / SELECT A SYSTEM':view.replace('-',' ').toUpperCase()}</span>
      <div className="bar-right">
        <span className="bar-time">{clock.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>
        <button className={`alert-arm ${alertsArmed?'armed':''}`} onClick={()=>setAlertsArmed(v=>!v)}>{alertsArmed?'ALERT SOUND ON':'ALERT SOUND OFF'}</button>
        {view!=='home' && <button className="back" onClick={()=>nav('home')}>← APIARY</button>}
      </div>
    </header>

    {view==='home' && <HomeScene onOpen={nav}/>}

    {view==='health' && <main className="page health-page">
      <div className="page-head"><div><span className="kicker">01 · LIVE HIVE HEALTH</span><h1>THE HIVE, <em>IN VIEW.</em></h1><p>{hive.id} · {hive.location} · 6 sensor nodes connected</p></div>
        <div className="hive-pills">{HIVES.map(h=><button key={h.id} className={h.id===hive.id?'active':''} onClick={()=>{setHive(h);setAlert(false)}}>{h.id}</button>)}</div>
      </div>
      <section className="health-grid">
        <div className="health-orchard">
          <div className="health-core"><span>HIVE HEALTH</span><strong>{Math.round(telem.health)}<small>%</small></strong><b className={alert?'bad':''}>{alert?'ATTENTION':'STABLE'}</b></div>
          <div className="health-chip hc1"><small>TEMPERATURE</small><b>{telem.temperature.toFixed(1)}°C</b></div>
          <div className="health-chip hc2"><small>HUMIDITY</small><b>{Math.round(telem.humidity)}%</b></div>
          <div className="health-chip hc3"><small>WEIGHT</small><b>{telem.weight.toFixed(1)} kg</b></div>
          <div className="health-chip hc4"><small>BEE ACTIVITY</small><b>{Math.round(telem.activity)}%</b></div>
          <div className="health-chip hc5"><small>BATTERY</small><b>{Math.round(telem.battery)}%</b></div>
          <div className="orchard-note">LIVE READING · {hive.location}</div>
        </div>

        <div className="health-work">
          <div className="metric-strip">{METRICS.map(([key,label,unit,band,color])=>{
            const v={temperature:telem.temperature,humidity:telem.humidity,weight:telem.weight,activity:telem.activity,battery:telem.battery}[key];
            const formatted=key==='temperature'||key==='weight'?`${v.toFixed(1)}${unit}`:`${Math.round(v)}${unit}`;
            return <button key={key} className={`metric-tile ${metric===key?'selected':''}`} onClick={()=>setMetric(key)}><div><span>{label}</span><small>{alert&&key!=='battery'?'ATTENTION':'within band'}</small></div><strong>{formatted}</strong><MiniSpark data={makeSeries(v,Math.max(.2,Math.abs(v)*.018),16)} color={color}/><em>NORMAL {band}</em></button>
          })}</div>

          <div className="graph-panel">
            <div className="graph-toolbar">
              <div><span className="kicker">HIVE PROFILE · {RANGE_LABELS[range].toUpperCase()}</span><h2>{cfg[1]} <small>· {cfg[2]}</small></h2></div>
              <div className="range-buttons">{['24H','7D','30D'].map(r=><button key={r} className={range===r?'active':''} onClick={()=>setRange(r)}>{r}</button>)}</div>
            </div>
            <div className="graph-callout"><b>{current}</b><span>latest reading</span><span className={alert?'down':'up'}>{alert?'−':'+'}{range==='24H'?'2.4':'6.8'}% vs prior period</span></div>
            <MainChart data={series} color={cfg[4]} unit={cfg[2]} isAlert={alert}/>
            <div className="graph-summary">
              <div><span>MIN</span><b>{Math.min(...series).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
              <div><span>AVERAGE</span><b>{(series.reduce((a,b)=>a+b,0)/series.length).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
              <div><span>MAX</span><b>{Math.max(...series).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
              <div><span>TREND</span><b className={alert?'down':'up'}>{alert?'Declining':'Increasing'}</b></div>
            </div>
          </div>

          <div className={`health-insight ${alert?'critical':''}`}>
            <div><span>HIVE INSIGHT</span><strong>{alert?'Anomaly needs attention':'Stable operating pattern'}</strong><small>{alert?'Weight and activity moved away from the recent baseline.':'The current curve stays inside the normal operating band and activity is rising through the afternoon.'}</small></div>
            <button onClick={simulateAlert}>⚠ {alert?'RESET ALERT':'SIMULATE ALERT'} <small>{alertsArmed?'sound armed':'muted'}</small></button>
          </div>
        </div>
      </section>
    </main>}

    {view==='market' && <main className="page market-page">
      <div className="page-head"><div><span className="kicker amber">02 · B-MART</span><h1>TRACEABLE HONEY, <em>DOWN TO THE HIVE.</em></h1><p>Every demo product below carries source, harvest, batch and digital asset information for the buyer.</p></div><div className="demo-pill">DEMO MARKETPLACE · NO REAL COMMERCE</div></div>
      <div className="market-layout">
        <div className="product-list">{PRODUCTS.map((p,i)=><button key={p.batch} className={`market-card ${productOpen.batch===p.batch?'active':''}`} onClick={()=>setProductOpen(p)}>
          <span className="product-no">0{i+1}</span>
          <div className={`honey-jar-display ${p.tone}`}><div className="jar-cap"/><div className="jar-neck"/><div className="jar-body"><div className="jar-honey"/><div className="jar-paper"><span>HIVESENSE</span><strong>RAW HONEY</strong><small>{p.origin}</small><b>TRACEABLE</b></div></div><div className="jar-wax">HS</div></div>
          <div className="market-card-copy"><span>{p.origin} · {p.hive}</span><h2>{p.name}</h2><strong>{p.price}</strong><small>{p.weight} · harvested {p.harvest}</small></div>
        </button>)}</div>

        <section className="product-detail">
          <div className="detail-hero"><span className="kicker amber">PRODUCT DETAIL · DEMO</span><h2>{productOpen.name}</h2><p>{productOpen.weight} · {productOpen.origin} · {productOpen.hive}</p><strong>{productOpen.price}</strong></div>
          <div className="detail-blocks">
            <div className="detail-block"><span>TRACEABILITY</span><b>HIVE → HARVEST → QUALITY → BATCH → B-MART</b><small>Every stage is linked to the demo batch record.</small></div>
            <div className="detail-block"><span>NFT DIGITAL ASSET</span><b>{productOpen.nft}</b><small>Demonstration token / provenance reference. No real blockchain transaction is implied.</small></div>
            <div className="detail-block"><span>SOURCE</span><b>{productOpen.hive} · {productOpen.origin}</b><small>Harvest record dated {productOpen.harvest} at 08:32–17:22 demo window.</small></div>
            <div className="detail-block"><span>BATCH</span><b>{productOpen.batch}</b><small>Quality record A+ · moisture check passed · demo record linked.</small></div>
          </div>
          <div className="timeline-detail">
            {[
              ['HIVE','18 Sep 2026 · 06:40','Sensor data recorded'],
              ['HARVEST','18 Sep 2026 · 10:15','Lot collected'],
              ['QUALITY','18 Sep 2026 · 12:10','Quality record created'],
              ['BATCH','18 Sep 2026 · 14:20','Batch sealed'],
              ['B-MART','18 Sep 2026 · 17:22','Listing ready']
            ].map(([a,b,c],i)=><div key={a}><span>{String(i+1).padStart(2,'0')}</span><b>{a}</b><small>{b}</small><em>{c}</em></div>)}
          </div>
          <div className="buy-row"><span>DEMO PRICE</span><strong>{productOpen.price}</strong><button>BUY DEMO PRODUCT →</button></div>
        </section>
      </div>
    </main>}

    {view==='trace' && <main className="page trace-page">
      <div className="page-head"><div><span className="kicker">03 · TRACEABILITY</span><h1>FOLLOW EVERY <em>STAGE.</em></h1><p>Choose a hive and date to see which process the batch is currently going through.</p></div>
        <div className="trace-selects"><select value={traceHive} onChange={e=>setTraceHive(e.target.value)}>{HIVES.map(h=><option key={h.id}>{h.id}</option>)}</select><select value={traceDate} onChange={e=>setTraceDate(e.target.value)}>{[...new Set(TRACE_RECORDS.map(r=>r.date))].map(d=><option key={d}>{d}</option>)}</select></div></div>
      <div className="trace-layout-full"><section className="trace-main-card"><div className="trace-top"><span>{trace.batch}</span><b>{trace.status}</b></div><h2>{trace.product}</h2><p>{trace.hive} · {trace.origin} · {trace.date} · {trace.time}</p><div className="trace-steps">{['HIVE','HARVEST','QUALITY','BATCH','B-MART'].map((s,i)=><div className={`trace-step2 ${i<trace.stage?'done':''} ${i===trace.stage-1?'current':''}`} key={s}><span>{i+1}</span><b>{s}</b><small>{i<trace.stage?'COMPLETE':i===trace.stage-1?'CURRENT':'NEXT'}</small></div>)}</div></section><aside className="trace-records"><span className="kicker">ACTIVE RECORDS</span>{TRACE_RECORDS.map(r=><button key={r.batch} className={r.batch===trace.batch?'active':''} onClick={()=>{setTraceHive(r.hive);setTraceDate(r.date)}}><b>{r.hive}</b><span>{r.date}</span><strong>{r.status}</strong><small>Stage {r.stage}/5</small></button>)}</aside></div>
    </main>}

    {view==='pollination' && <main className="page poll-page">
      <div className="page-head"><div><span className="kicker green">04 · POLLINATION NETWORK</span><h1>FIND THE <em>BEST BLOOM ZONE.</em></h1><p>Enter a locality and select a mapped zone to inspect its demo pollination index.</p></div><div className="poll-search"><input value={pollSearch} onChange={e=>setPollSearch(e.target.value)} placeholder="Enter locality · Borivali, Karjat…"/><button onClick={findPoll}>FIND LOCATION →</button></div></div>
      <div className="poll-layout-full"><section className="poll-map-large"><div className="map-tile"/><div className="topo-lines tl1"/><div className="topo-lines tl2"/><div className="topo-lines tl3"/>
        {ZONES.map((z,i)=><button className={`zone-pin zp${i+1}`} key={z.name} onClick={()=>setPollZone(z)}><span/><b>{z.area}</b></button>)}
        <div className="compass"><span>N</span><i/><b>↑</b></div><div className="scale">0&nbsp;&nbsp; 2&nbsp;&nbsp; 5 km</div><div className="map-coordinates">REGIONAL DEMO MAP · WESTERN INDIA</div></section>
        <aside className="poll-panel">{!pollZone?<div className="poll-empty"><strong>⌖</strong><h2>CHOOSE A LOCALITY</h2><p>Type an area above or click a zone marker.</p></div>:<><span className="kicker green">NEAREST DEMO ZONE</span><h2>{pollZone.name}</h2><div className="poll-score"><strong>{pollZone.index}</strong><span>/100</span><small>POLLINATION INDEX</small></div><div className="poll-detail-row"><span>AREA</span><b>{pollZone.area}</b></div><div className="poll-detail-row"><span>BLOOM</span><b>{pollZone.bloom}</b></div><div className="poll-detail-row"><span>COORDINATES</span><b>{pollZone.lat} · {pollZone.lon}</b></div><div className="poll-detail-row"><span>DEMO RANGE</span><b>{pollZone.distance}</b></div><div className="poll-explain"><span>WHY THIS LOCATION</span><p>High bee activity and flowering coverage combine to produce a strong index in the demonstration model.</p></div></>}</aside></div>
    </main>}

    {view==='regional' && <main className="page regional-page">
      <div className="page-head"><div><span className="kicker">05 · REGIONAL INTELLIGENCE</span><h1>THE SYSTEM <em>AT LANDSCAPE SCALE.</em></h1><p>Compare hive activity, pollination, environment, honey output and alerts by region.</p></div><div className="region-tabs">{Object.keys(REGIONS).map(r=><button key={r} className={region===r?'active':''} onClick={()=>setRegion(r)}>{r}</button>)}</div></div>
      <div className="regional-layout-full"><section className="regional-map-large"><div className="land-shape"/><div className="regional-cluster rc1"/><div className="regional-cluster rc2"/><div className="regional-cluster rc3"/><div className="regional-cluster rc4"/><div className="regional-cluster rc5"/><div className="region-center"><span>{region.toUpperCase()}</span><strong>{REGIONS[region].pollination}</strong><small>POLLINATION INDEX</small></div><div className="regional-compass"><b>N</b><span>↑</span></div><div className="regional-map-caption">DEMO CLUSTERS · WESTERN INDIA</div></section>
        <aside className="regional-data"><div className="regional-big"><span>REGIONAL READ</span><p>{REGIONS[region].note}</p></div>{[['ACTIVE HIVES',REGIONS[region].hives,REGIONS[region].trend],['POLLINATION',REGIONS[region].pollination,'coverage'],['HONEY OUTPUT',REGIONS[region].honey,'demo estimate'],['ENVIRONMENT',REGIONS[region].environment,'baseline'],['ALERTS',String(REGIONS[region].alerts),'review']].map(([a,b,c])=><div className="regional-stat" key={a}><span>{a}</span><strong>{b}</strong><small>{c}</small></div>)}</aside></div>
    </main>}

    {view==='home' && <div className="home-bottom"><span>Click the hive · market · crop field · or regional station</span><span>HIVESENSE · 2026 DEMO</span></div>}
  </div>;
}
export default App;
