import { BadgeCheck, X, ArrowRight } from "lucide-react";

export default function ProductDetail({ product, onClose, onPlayTone }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Product detail">
      <article className="product-modal">
        <button className="close" onClick={() => { onPlayTone?.("click"); onClose(); }} aria-label="Close product"><X/></button>
        <div className={`modal-jar ${product.hue}`}>
          <div className="jar"><i/><b>HIVE<br/>SENSE</b></div>
          <span className="modal-demo-pill">DEMO MARKETPLACE</span>
        </div>

        <div className="modal-copy">
          <p className="kicker">B-MART PRODUCT <b>DEMO DATA</b></p>
          <h2>{product.name}</h2>
          <p>{product.type} honey from {product.origin}. Harvested by {product.seller}.</p>

          <div className="detail-grid">
            <span>Origin <b>{product.origin}</b></span>
            <span>Harvest date <b>{product.harvest}</b></span>
            <span>Hive source <b>{product.hive}</b></span>
            <span>Batch number <b>{product.batch}</b></span>
            <span>Net weight <b>{product.weight}</b></span>
            <span>Seller <b>{product.seller}</b></span>
          </div>

          <div className="provenance-mini">
            <span>HIVE</span><ArrowRight size={14}/><span>HARVEST</span><ArrowRight size={14}/><span>BATCH</span><ArrowRight size={14}/><span>PRODUCT</span>
          </div>

          <div className="modal-bottom">
            <strong>{product.price}</strong>
            <button className="button orange" onClick={() => { onPlayTone?.("buy"); onClose(); }}>Buy demo product</button>
          </div>

          <p className="verified"><BadgeCheck size={16}/> Traceability record available</p>
        </div>
      </article>
    </div>
  );
}
