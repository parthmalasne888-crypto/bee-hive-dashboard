import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X, Search } from "lucide-react";
import LogoMark from "./LogoMark";

const links = [
  ["health", "Live Health"],
  ["market", "B-Mart"],
  ["traceability", "Traceability"],
  ["pollination", "Pollination"],
];

export default function Navbar({ soundOn, setSoundOn, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("health");

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 22);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => { window.removeEventListener("scroll", handle); observer.disconnect(); };
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
    <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="HiveSense home">
      <LogoMark />
      <span className="brand-text"><b>HIVESENSE</b><small>LIVE APIARY INTELLIGENCE</small></span>
    </button>

    <nav className="desktop-nav" aria-label="Primary navigation">
      {links.map(([id, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
    </nav>

    <div className="nav-right">
      <button className="icon-btn desktop-only" aria-label="Search"><Search size={16}/></button>
      <button className="sound-toggle" onClick={onToggleSound} aria-label={soundOn ? "Turn sound off" : "Turn sound on"}>
        {soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{soundOn ? "SOUND ON" : "SOUND"}</span>
      </button>
      <button className="workspace-btn desktop-only" onClick={() => go("health")}>Open workspace</button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </div>

    {open && <div className="mobile-panel">
      {links.map(([id, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
      <button onClick={onToggleSound}>{soundOn ? "Turn sound off" : "Turn sound on"}</button>
    </div>}
  </header>;
}
