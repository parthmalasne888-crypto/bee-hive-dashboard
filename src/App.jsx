import React, { useEffect, useMemo, useRef, useState } from 'react';

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

const INDIA_STATES_GEOJSON_URL = 'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson';
const ESRI_IMAGERY_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const ESRI_LABEL_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

const REGIONAL_STATE_SCORES = {
  Gujarat: 66,
  'Madhya Pradesh': 78,
  Maharashtra: 91,
  Goa: 86,
  Karnataka: 89,
  Telangana: 73,
  Chhattisgarh: 61,
  Odisha: 57,
};

const MAP_REGIONS = Object.entries(REGIONAL_STATE_SCORES)
  .map(([name,value])=>({name,value}))
  .sort((a,b)=>b.value-a.value);

const REGIONAL_DETAILS = {
  Maharashtra: { hives:'7,420', pollination:'88%', honey:'18.7 t', environment:'STABLE', alerts:8, trend:'+8.2%' },
};

function normalizeStateName(name=''){
  const value=String(name).trim().toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ');
  const aliases={
    'orissa':'Odisha',
    'uttaranchal':'Uttarakhand',
    'nct of delhi':'Delhi',
    'the dadra and nagar haveli and daman and diu':'Dadra and Nagar Haveli and Daman and Diu',
    'dadra and nagar haveli and daman and diu':'Dadra and Nagar Haveli and Daman and Diu',
  };
  if(aliases[value]) return aliases[value];
  const found=Object.keys(REGIONAL_STATE_SCORES).find(k=>k.toLowerCase()===value);
  return found || String(name).trim();
}

function geostateName(feature){
  const p=feature?.properties||{};
  return normalizeStateName(p.ST_NM||p.st_nm||p.NAME_1||p.name||p.state_name||p.STNAME||p.state||'');
}

function scoreColor(value){
  if(value==null) return '#AAB5A3';
  if(value>=85) return '#4E8B56';
  if(value>=70) return '#D1A13B';
  return '#C85A46';
}

function scoreLabel(value){
  if(value==null) return 'No demo telemetry';
  if(value>=85) return 'High';
  if(value>=70) return 'Moderate';
  return 'Low';
}

function popupStyle(){
  return { maxWidth: 250, className: 'hs-leaflet-popup' };
}
function MapPanel({type='pollination', onZoneSelect, selectedZone, region}){
  const isPoll=type==='pollination';
  const hostRef=useRef(null);
  const mapRef=useRef(null);

  useEffect(()=>{
    const L=window.L;
    if(!L || !hostRef.current || mapRef.current) return;

    const map=L.map(hostRef.current, {
      zoomControl:false,
      attributionControl:true,
      scrollWheelZoom:true,
      dragging:true,
      doubleClickZoom:true,
      touchZoom:true,
      minZoom:isPoll?7:4,
      maxZoom:isPoll?13:9,
      preferCanvas:true,
    });

    mapRef.current=map;

    const imagery=L.tileLayer(ESRI_IMAGERY_TILES, {
      maxZoom:19,
      attribution:'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    }).addTo(map);

    L.tileLayer(ESRI_LABEL_TILES, {
      maxZoom:19,
      opacity:.82,
      attribution:'Labels © Esri',
      pane:'overlayPane',
    }).addTo(map);

    L.control.zoom({position:'topright'}).addTo(map);
    L.control.scale({imperial:false,position:'bottomright',maxWidth:110}).addTo(map);

    if(isPoll){
      map.setView([19.12,73.18],8.25);

      ZONES.forEach((z)=>{
        const value=z.index;
        const color=value>=90?'#4E8B56':value>=80?'#D1A13B':'#C85A46';
        const radius=7500 + Math.max(0,value-70)*900;

        const heat=L.circle([Number(z.lat.replace('° N','')),Number(z.lon.replace('° E',''))], {
          radius,
          color,
          weight:1.15,
          opacity:.72,
          fillColor:color,
          fillOpacity:.21,
          bubblingMouseEvents:true,
        }).addTo(map);

        heat.bindPopup(`
          <div class="hs-popup">
            <div class="hs-popup-kicker">POLLINATION ZONE</div>
            <strong>${z.name}</strong>
            <div class="hs-popup-row"><span>Pollination index</span><b style="color:${color}">${value}%</b></div>
            <div class="hs-popup-row"><span>Area</span><b>${z.area}</b></div>
            <div class="hs-popup-row"><span>Bloom</span><b>${z.bloom}</b></div>
            <small>Demonstration telemetry from the existing HiveSense dataset.</small>
          </div>
        `,popupStyle());

        heat.on('click',()=>onZoneSelect?.(z));
        heat.on('mouseover',()=>heat.setStyle({weight:2.6,fillOpacity:.29}));
        heat.on('mouseout',()=>heat.setStyle({weight:1.15,fillOpacity:.21}));

        const dot=L.circleMarker([Number(z.lat.replace('° N','')),Number(z.lon.replace('° E',''))], {
          radius:5.5,
          color:'#F8F4E9',
          weight:2,
          fillColor:color,
          fillOpacity:1,
        }).addTo(map);

        dot.bindTooltip(`${z.area} · ${value}%`, {direction:'top',offset:[0,-6],opacity:.95});
        dot.on('click',()=>onZoneSelect?.(z));
      });

      fetch(INDIA_STATES_GEOJSON_URL)
        .then(r=>r.ok?r.json():Promise.reject(new Error('Unable to load India boundaries')))
        .then(data=>{
          if(!mapRef.current) return;
          L.geoJSON(data, {
            filter:(feature)=>geostateName(feature)==='Maharashtra',
            style:()=>({color:'#EAF4E6',weight:2.1,opacity:.9,fill:false,dashArray:'5 4'}),
          }).addTo(map);
        })
        .catch(()=>{});
    }else{
      const viewByRegion={
        Maharashtra:[19.45,75.3,6.05],
        'Western Ghats':[16.8,74.8,6.25],
        Konkan:[18.85,73.05,6.65],
      };
      const [lat,lng,zoom]=viewByRegion[region]||viewByRegion.Maharashtra;
      map.setView([lat,lng],zoom);

      fetch(INDIA_STATES_GEOJSON_URL)
        .then(r=>r.ok?r.json():Promise.reject(new Error('Unable to load India boundaries')))
        .then(data=>{
          if(!mapRef.current) return;
          const layer=L.geoJSON(data, {
            style:(feature)=>{
              const name=geostateName(feature);
              const score=REGIONAL_STATE_SCORES[name];
              const isSelected = region==='Maharashtra' ? name==='Maharashtra'
                : region==='Konkan' ? ['Maharashtra','Goa'].includes(name)
                : region==='Western Ghats' ? ['Maharashtra','Goa','Karnataka','Kerala','Tamil Nadu'].includes(name)
                : false;
              return {
                color:isSelected?'#F4F0DD':'#FFFFFF',
                weight:isSelected?2.2:.8,
                opacity:.95,
                fillColor:scoreColor(score),
                fillOpacity:score==null?.22:.74,
              };
            },
            onEachFeature:(feature,shape)=>{
              const name=geostateName(feature);
              const score=REGIONAL_STATE_SCORES[name];
              const details=REGIONAL_DETAILS[name];
              shape.bindPopup(`
                <div class="hs-popup">
                  <div class="hs-popup-kicker">REGIONAL INTELLIGENCE</div>
                  <strong>${name||'Region'}</strong>
                  <div class="hs-popup-row"><span>Intelligence score</span><b style="color:${scoreColor(score)}">${score ?? '—'}</b></div>
                  <div class="hs-popup-row"><span>Status</span><b>${scoreLabel(score)}</b></div>
                  ${details?`<div class="hs-popup-mini"><span>Pollination ${details.pollination}</span><span>Hives ${details.hives}</span><span>Honey ${details.honey}</span><span>Alerts ${details.alerts}</span></div>`:''}
                  <small>${score==null?'No regional demo telemetry is currently attached to this state.':'Existing HiveSense demonstration data visualized on actual state geometry.'}</small>
                </div>
              `,popupStyle());

              shape.on({
                mouseover:()=>{
                  shape.setStyle({weight:score!=null?2.2:1.4,fillOpacity:score==null?.32:.86});
                  shape.bringToFront();
                },
                mouseout:()=>{
                  layer.resetStyle(shape);
                },
              });
            },
          }).addTo(map);
        })
        .catch(()=>{});
    }

    return ()=>{
      map.remove();
      mapRef.current=null;
    };
  },[isPoll,region,onZoneSelect]);

  return <div className={`geo-map ${isPoll?'geo-map-poll':'geo-map-region'}`}>
    <div className="real-leaflet-host" ref={hostRef} aria-label={isPoll?'Real geographic pollination map':'Real India regional intelligence map'} />
    <div className="geo-map-head"><div><b>{isPoll?'WESTERN INDIA · POLLINATION MAP':'INDIA · REGIONAL INTELLIGENCE'}</b><small>{isPoll?'Real satellite basemap · georeferenced pollination zones':'Real state boundaries · demonstration intelligence data'}</small></div><span>{isPoll?'LIVE INDEX':region.toUpperCase()}</span></div>

    {!isPoll && <div className="region-live-values">
      <div className="live-title">ECOSYSTEM HEALTH</div>
      {MAP_REGIONS.slice(0,5).map(r=><div key={r.name}><span className="status-dot" style={{background:scoreColor(r.value)}}/>{r.name}<b>{r.value}</b></div>)}
    </div>}

    <div className="geo-map-legend"><span><i className="g"/>{isPoll?'High':'Excellent'}</span><span><i className="y"/>{isPoll?'Medium':'Good / Moderate'}</span><span><i className="r"/>{isPoll?'Low':'Low'}</span></div>
    <div className="geo-map-scale">REAL MAP · WGS84 · DEMO DATA</div>
  </div>;
}

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
  const [pollZone,setPollZone]=useState(ZONES[2]);
  const [region,setRegion]=useState('Maharashtra');
  const [productOpen,setProductOpen]=useState(PRODUCTS[0]);
  const [clock,setClock]=useState(new Date());
  const [marketNotice,setMarketNotice]=useState('');

  const telem=useTelemetry(hive,alert);

  useEffect(()=>{
    const id=setInterval(()=>setClock(new Date()),1000);
    return()=>clearInterval(id);
  },[]);

  const cfg=METRICS.find(x=>x[0]===metric);
  const val={
    temperature:telem.temperature,
    humidity:telem.humidity,
    weight:telem.weight,
    activity:telem.activity,
    battery:telem.battery
  }[metric];

  const series=useMemo(()=>{
    const spread={temperature:.9,humidity:3.2,weight:.25,activity:11,battery:2.2}[metric];
    const rangeBoost=range==='24H'?0:range==='7D'?1.35:1.85;
    return makeSeries(val,spread+rangeBoost,range==='24H'?58:range==='7D'?52:45);
  },[val,metric,range]);

  const current=`${metric==='temperature'||metric==='weight'?val.toFixed(1):Math.round(val)}${cfg[2]}`;

  const trace=TRACE_RECORDS.find(r=>r.hive===traceHive && r.date===traceDate)
    || TRACE_RECORDS.find(r=>r.hive===traceHive) || TRACE_RECORDS[0];

  const regional=REGIONS[region];
  const regionSeries=useMemo(()=>makeSeries(
    region==='Western Ghats'?89:region==='Konkan'?84:82,
    7,
    12
  ),[region]);

  function nav(v){setView(v);setAlert(false);setMarketNotice('');}
  function emergencyTone(){
    if(!alertsArmed)return;
    try{
      const A=window.AudioContext||window.webkitAudioContext;
      if(!A)return;
      const ctx=new A(),gain=ctx.createGain();
      gain.gain.value=.075;gain.connect(ctx.destination);
      [880,660,880,660].forEach((f,i)=>{
        const o=ctx.createOscillator();
        o.frequency.value=f;o.type='sine';o.connect(gain);
        const t=ctx.currentTime+i*.18;o.start(t);o.stop(t+.11);
      });
    }catch{}
  }

  useEffect(()=>{
    if(!alert || !alertsArmed) return;
    emergencyTone();
    const id=setInterval(emergencyTone, 1150);
    return()=>clearInterval(id);
  },[alert,alertsArmed]);

  function simulateAlert(){
    setAlert(v=>!v);
  }
  function findPoll(){
    const q=pollSearch.trim().toLowerCase();
    const exact=ZONES.find(z=>z.aliases.some(a=>q.includes(a)||a.includes(q)));
    if(exact)setPollZone(exact);
  }

  const uiDate=clock.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});

  return <div className="app">
    <header className="ref-topbar">
      <button className="ref-brand" onClick={()=>nav('home')}>
        <span className="ref-brand-mark">HS</span>
        <span>HIVESENSE</span>
      </button>
      <div className="ref-page-title">
        {view==='home'?'LIVING APIARY':view==='health'?'HEALTH':view==='market'?'B-MART':view==='pollination'?'POLLINATION':'REGIONAL'}
      </div>
      <div className="ref-top-actions">
        <span className="ref-date">{uiDate}</span>
        <button className={`ref-alert ${alertsArmed?'on':''}`} onClick={()=>setAlertsArmed(v=>!v)}>
          {alertsArmed?'ALERT SOUND ON':'ALERT SOUND OFF'}
        </button>
        {view!=='home' && <button className="ref-back" onClick={()=>nav('home')}>← APIARY</button>}
      </div>
    </header>

    {view==='home' && <HomeScene onOpen={nav}/>}

    {view==='health' && <main className="ref-page health-ref">
      <div className="ref-hero-copy">
        <span className="ref-kicker">01 · LIVE HIVE HEALTH</span>
        <h1>The Hive, In <em>View.</em></h1>
        <p>Real-time hive health, environmental conditions, and colony activity — all in one place.</p>
      </div>

      <div className="health-hive-switch">
        {HIVES.map(h=>
          <button key={h.id} className={h.id===hive.id?'active':''} onClick={()=>{setHive(h);setAlert(false)}}>
            {h.id}
          </button>
        )}
      </div>

      <div className="ref-health-grid">
        <div className="ref-stat-card"><span>♨ TEMPERATURE</span><strong>{telem.temperature.toFixed(1)}°C</strong><small>Normal range<br/>33° — 36°C</small><MiniSpark data={makeSeries(telem.temperature,.6,18)} color="#9C7C42"/></div>
        <div className="ref-stat-card"><span>◌ HUMIDITY</span><strong>{Math.round(telem.humidity)}%</strong><small>Normal range<br/>58% — 74%</small><MiniSpark data={makeSeries(telem.humidity,2.5,18)} color="#4E9470"/></div>
        <div className="ref-stat-card"><span>◫ HIVE WEIGHT</span><strong>{telem.weight.toFixed(1)} kg</strong><small>Normal range<br/>38 — 48 kg</small><MiniSpark data={makeSeries(telem.weight,.18,18)} color="#B68E3E"/></div>
        <div className="ref-stat-card"><span>♧ BEE ACTIVITY</span><strong>{Math.round(telem.activity)}%</strong><small>Normal range<br/>65 — 95%</small><MiniSpark data={makeSeries(telem.activity,8,18)} color="#5D9A59"/></div>
      </div>

      <div className="ref-health-main">
        <section className="ref-chart-card">
          <div className="ref-card-head">
            <div>
              <span className="ref-card-kicker">HIVE ACTIVITY TREND</span>
              <h2>{cfg[1]} <small>· {RANGE_LABELS[range]}</small></h2>
            </div>
            <div className="ref-range">
              {['24H','7D','30D'].map(r=><button key={r} className={range===r?'active':''} onClick={()=>setRange(r)}>{r.toLowerCase()}</button>)}
            </div>
          </div>
          <div className="ref-chart-metrics">
            <b>{current}</b><span>latest reading</span>
            <span className={alert?'ref-down':'ref-up'}>{alert?'−':'+'}{range==='24H'?'2.4':'6.8'}% vs prior period</span>
          </div>
          <MainChart data={series} color={cfg[4]} unit={cfg[2]} isAlert={alert}/>
          <div className="ref-summary-row">
            <div><span>MIN</span><b>{Math.min(...series).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
            <div><span>AVERAGE</span><b>{(series.reduce((a,b)=>a+b,0)/series.length).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
            <div><span>MAX</span><b>{Math.max(...series).toFixed(cfg[2]==='kg'||cfg[2]==='°C'?1:0)}{cfg[2]}</b></div>
            <div><span>TREND</span><b className={alert?'ref-down':'ref-up'}>{alert?'Declining':'Increasing'}</b></div>
          </div>
        </section>

        <aside className={`ref-insights ${alert?'critical':''}`}>
          <div className="ref-card-head single">
            <div>
              <span className="ref-card-kicker">HEALTH INSIGHTS</span>
              <h2>{alert?'ATTENTION':'STABLE'}</h2>
            </div>
            <span className={`health-badge ${alert?'bad':''}`}>{Math.round(telem.health)}%</span>
          </div>
          <div className="insight-list">
            {alert ? <>
              <p>● Unusual weight movement detected.</p>
              <p>● Bee activity is below the recent baseline.</p>
              <p>● Temperature is moving above the normal band.</p>
            </> : <>
              <p>● Hive activity is normal.</p>
              <p>● Temperature is stable.</p>
              <p>● No unusual fluctuations in weight.</p>
            </>}
          </div>
          <div className="battery-row">
            <div><span>BATTERY</span><b>{Math.round(telem.battery)}%</b></div>
            <div className="battery-bar"><i style={{width:`${Math.round(telem.battery)}%`}}/></div>
          </div>
          <button className="report-link" onClick={()=>setMetric('activity')}>View detailed report →</button>
          <button className={`ref-alert-action ${alert?'active':''}`} onClick={simulateAlert}>⚠ {alert?'Reset simulated alert':'Simulate alert'} <small>{alertsArmed?'sound armed':'muted'}</small></button>
        </aside>
      </div>
    </main>}

    {view==='market' && <main className="ref-page market-ref">
      <div className="ref-hero-copy">
        <span className="ref-kicker amber">02 · B-MART</span>
        <h1>Traceable Honey,<br/><em>Down to the Hive.</em></h1>
        <p>Every jar tells a story — from the flower to your table.</p>
      </div>

      <div className="market-kpis">
        <div><span>▣ TOTAL PRODUCTS</span><strong>12</strong><small>+2 new</small></div>
        <div><span>▤ ACTIVE ORDERS</span><strong>48</strong><small>+12%</small></div>
        <div><span>₹ TOTAL REVENUE</span><strong>₹18,420</strong><small>+24%</small></div>
        <div><span>★ AVG. RATING</span><strong>4.8</strong><small>(532 reviews)</small></div>
      </div>

      <div className="market-content-grid">
        <section className="featured-card">
          <div className="featured-head"><span className="ref-card-kicker">FEATURED PRODUCTS</span><button onClick={()=>setProductOpen(PRODUCTS[0])}>View All →</button></div>
          <div className="featured-products">
            {PRODUCTS.map((p)=><button key={p.batch} className={`featured-product ${productOpen.batch===p.batch?'selected':''}`} onClick={()=>setProductOpen(p)}>
              <div className={`featured-jar ${p.tone}`} style={{backgroundImage:'url("/media/internal-bg/market-bg.jpg")'}} aria-label={p.name}></div>
              <span>{p.name}</span>
              <b>{p.price}</b>
              <small>{p.weight} · {p.origin}</small>
            </button>)}
          </div>
          <div className="featured-detail">
            <div><span>{productOpen.hive} · {productOpen.origin}</span><h3>{productOpen.name}</h3><small>Harvested {productOpen.harvest} · Batch {productOpen.batch}</small></div>
            <strong>{productOpen.price}</strong>
          </div>
        </section>

        <aside className="market-trace-card">
          <span className="ref-card-kicker">TRACEABILITY</span>
          <p>Scan the QR code on your jar to explore its journey from hive to home.</p>
          <div className="trace-photo-mini" style={{backgroundImage:'url("/media/internal-bg/market-bg.jpg")'}} aria-hidden="true"/>
          <div className="trace-mini"><span>HIVE</span><b>{productOpen.hive}</b></div>
          <div className="trace-mini"><span>BATCH</span><b>{productOpen.batch}</b></div>
          <div className="trace-mini"><span>NFT ASSET</span><b>{productOpen.nft}</b></div>
          <button onClick={()=>setMarketNotice(`Demo provenance opened for ${productOpen.batch}.`)}>View Provenance →</button>
          {marketNotice && <small className="market-notice">{marketNotice}</small>}
        </aside>
      </div>

      <section className="market-detail-strip">
        <div><span>PRODUCT</span><b>{productOpen.name}</b></div>
        <div><span>SOURCE</span><b>{productOpen.hive} · {productOpen.origin}</b></div>
        <div><span>HARVEST</span><b>{productOpen.harvest}</b></div>
        <div><span>NFT / PROVENANCE</span><b>{productOpen.nft}</b></div>
        <div><span>PRICE</span><b>{productOpen.price}</b></div>
      </section>
    </main>}

    {view==='trace' && <main className="ref-page trace-ref">
      <div className="ref-hero-copy">
        <span className="ref-kicker">03 · TRACEABILITY</span>
        <h1>Follow Every <em>Stage.</em></h1>
        <p>Choose a hive and date to see exactly which process the batch is currently going through.</p>
      </div>
      <div className="trace-toolbar">
        <select value={traceHive} onChange={e=>setTraceHive(e.target.value)}>{HIVES.map(h=><option key={h.id}>{h.id}</option>)}</select>
        <select value={traceDate} onChange={e=>setTraceDate(e.target.value)}>{[...new Set(TRACE_RECORDS.map(r=>r.date))].map(d=><option key={d}>{d}</option>)}</select>
      </div>
      <div className="trace-ref-grid">
        <section className="trace-main-ref">
          <div className="featured-head"><span className="ref-card-kicker">ACTIVE TRACE RECORD</span><b>{trace.status}</b></div>
          <h2>{trace.product}</h2>
          <p>{trace.hive} · {trace.origin} · {trace.date} · {trace.time}</p>
          <div className="trace-progress">{['HIVE','HARVEST','QUALITY','BATCH','B-MART'].map((s,i)=><div key={s} className={`trace-progress-step ${i<trace.stage?'done':''} ${i===trace.stage-1?'current':''}`}><span>{i+1}</span><b>{s}</b><small>{i<trace.stage?'COMPLETE':i===trace.stage-1?'CURRENT':'NEXT'}</small></div>)}</div>
        </section>
        <aside className="trace-record-list">
          <span className="ref-card-kicker">ACTIVE RECORDS</span>
          {TRACE_RECORDS.map(r=><button key={r.batch} className={r.batch===trace.batch?'active':''} onClick={()=>{setTraceHive(r.hive);setTraceDate(r.date)}}><b>{r.hive}</b><span>{r.date}</span><strong>{r.status}</strong><small>Stage {r.stage}/5</small></button>)}
        </aside>
      </div>
    </main>}

    {view==='pollination' && <main className="ref-page poll-ref">
      <div className="ref-hero-copy">
        <span className="ref-kicker green">04 · POLLINATION NETWORK</span>
        <h1>Find the Best <em>Bloom Zone.</em></h1>
        <p>Explore pollen zones, crop health, and pollination activity across the region.</p>
      </div>
      <div className="poll-toolbar">
        <select><option>Select Crop — Multiflora</option><option>Mango</option><option>Mustard</option><option>Sunflower</option></select>
        <input value={pollSearch} onChange={e=>setPollSearch(e.target.value)} placeholder="Enter locality"/>
        <button onClick={findPoll}>Find Zones →</button>
      </div>
      <div className="poll-ref-grid">
        <section className="poll-map-ref">
          <MapPanel type="pollination" selectedZone={pollZone} onZoneSelect={setPollZone}/>
        </section>
        <aside className="bloom-zones-card">
          <span className="ref-card-kicker">TOP BLOOM ZONES</span>
          {ZONES.slice().sort((a,b)=>b.index-a.index).slice(0,4).map((z,i)=><button key={z.name} className={pollZone?.name===z.name?'active':''} onClick={()=>setPollZone(z)}><strong>{i+1}</strong><span><b>{z.area}</b><small>{z.index>=90?'High':'Medium'} potential</small></span><em>({z.index}%)</em></button>)}
        </aside>
      </div>
      <div className="poll-bottom-grid">
        <section className="flower-calendar"><span className="ref-card-kicker">FLOWERING CALENDAR</span><div className="months">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m=><span key={m}>{m}</span>)}</div><div className="flower-bars"><i/><i/><i/></div><div className="flower-key"><span><i/> Mustard</span><span><i/> Sunflower</span><span><i/> Wildflower</span></div></section>
        <section className="poll-selection-card">
          {pollZone ? <><span className="ref-card-kicker green">SELECTED ZONE</span><h3>{pollZone.name}</h3><strong>{pollZone.index}%</strong><p>{pollZone.bloom}</p><small>{pollZone.lat} · {pollZone.lon}</small></> : <><span className="ref-card-kicker">SELECT A ZONE</span><h3>More blooms.<br/>A healthier tomorrow.</h3><p>Pick a locality or map marker to inspect the demonstration pollination index.</p></>}
        </section>
      </div>
    </main>}

    {view==='regional' && <main className="ref-page regional-ref">
      <div className="ref-hero-copy">
        <span className="ref-kicker">05 · REGIONAL INTELLIGENCE</span>
        <h1>The System at <em>Landscape Scale.</em></h1>
        <p>Understand regional patterns, ecosystem health, and resource distribution.</p>
      </div>
      <div className="region-toolbar">
        {Object.keys(REGIONS).map(r=><button key={r} className={region===r?'active':''} onClick={()=>setRegion(r)}>{r}</button>)}
      </div>
      <div className="regional-ref-grid">
        <section className="regional-map-ref">
          <MapPanel type="regional" region={region}/>
        </section>
        <aside className="key-insights-card">
          <span className="ref-card-kicker">KEY INSIGHTS</span>
          <p>☘ Higher pollination activity<br/><small>in Western Ghats region</small></p>
          <p>◌ Crop health stable<br/><small>across major districts</small></p>
          <p>♢ Ideal climate conditions<br/><small>for honey production</small></p>
          <p>♧ Conservation areas identified<br/><small>near forest belts</small></p>
        </aside>
      </div>
      <div className="regional-bottom-grid">
        <section className="regional-trends">
          <div className="featured-head"><span className="ref-card-kicker">REGIONAL TRENDS</span><div className="trend-tabs"><button className="active">Temperature</button><button>Vegetation</button><button>Pollination</button></div></div>
          <MainChart data={regionSeries} color="#4F7751" unit="%" isAlert={false}/>
        </section>
        <section className="regional-photo-card"><span>Healthy landscapes<br/>support thriving hives.</span></section>
      </div>
      <div className="regional-kpis">
        <div><span>ACTIVE HIVES</span><b>{regional.hives}</b></div>
        <div><span>POLLINATION</span><b>{regional.pollination}</b></div>
        <div><span>HONEY OUTPUT</span><b>{regional.honey}</b></div>
        <div><span>ENVIRONMENT</span><b>{regional.environment}</b></div>
        <div><span>ALERTS</span><b>{regional.alerts}</b></div>
      </div>
    </main>}

    {view==='home' && <div className="home-bottom"><span>Click the hive · market · crop field · or regional station</span><span>HIVESENSE · 2026 DEMO</span></div>}
  </div>;
}

export default App;
