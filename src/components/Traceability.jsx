import { BadgeCheck, CheckCircle2 } from "lucide-react";
export default function Traceability({ onPlayTone }) {
  const steps=["Hive","Harvest","Quality record","Batch","Product"];
  return (
    <section id="traceability" className="trace section">
      <div>
        <p className="kicker">TRACEABILITY <b>DEMONSTRATION DATA</b></p>
        <h2>One jar.<br/><em>A visible story.</em></h2>
        <p>Trace health and harvest records from the hive to the product shelf.</p>
        <div className="trace-proof">
          <CheckCircle2 size={17}/>
          <span>Every stage can carry a timestamped record.</span>
        </div>
      </div>

      <div className="trace-card">
        <div className="batch">
          <span>BATCH</span>
          <strong>HS-2026-001</strong>
          <p>Maharashtra · HIVE 07<br/>Harvested 18 September 2026</p>
          <b><BadgeCheck size={15}/> Record available</b>
        </div>
        <ol>
          {steps.map((step,i)=>
            <li key={step} onMouseEnter={() => onPlayTone?.("hover")}>
              <i>{String(i+1).padStart(2,"0")}</i>
              <span>{step}</span>
              <em><BadgeCheck size={14}/></em>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
