import { useEffect, useState } from "react";
import { Bell, Menu, Search, Volume2, VolumeX, X } from "lucide-react";

export default function Navbar({ navigate, soundOn, setSoundOn, playTone }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    navigate(id);
    setMobileOpen(false);
  };

  const links = [["Health","health"],["Market","market"],["Pollination","pollination"],["About","workspace"]];

  return (
    <header id="top" className={scrolled ? "is-scrolled" : ""}>
      <button className="brand" onClick={() => go("home")} aria-label="Go to HiveSense home">
        <i>H</i>
        <span>HiveSense<small>LIVE APIARY INTELLIGENCE</small></span>
      </button>

      <nav className="desktop-nav" aria-label="Primary">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => go(id)}>{label}</button>
        ))}
      </nav>

      <div className="nav-actions">
        <button aria-label="Search" className="icon-action"><Search size={17}/></button>
        <button aria-label="Notifications" className="notice icon-action"><Bell size={17}/><i/></button>
        <button
          className={`sound ${soundOn ? "active" : ""}`}
          onClick={() => {
            setSoundOn(!soundOn);
            playTone(soundOn ? "off" : "on");
          }}
          aria-pressed={soundOn}
          title={soundOn ? "Turn ambient sound off" : "Turn ambient sound on"}
        >
          {soundOn ? <Volume2 size={16}/> : <VolumeX size={16}/>} Sound {soundOn ? "on" : "off"}
        </button>
        <button className="workspace" onClick={() => go("workspace")}>Workspace</button>
        <button className="mobile-toggle" onClick={() => { setMobileOpen(v => !v); playTone("click"); }} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={19}/> : <Menu size={19}/>}
        </button>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav top-mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        </nav>
      )}
    </header>
  );
}
