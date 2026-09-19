import { ArrowUpRight, BadgeCheck, MapPin, X } from "lucide-react";
export default function ProductDetail({ product, onClose }) {
  return <div className="modal-layer" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <article className="product-modal-new">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
      <div className={`modal-visual ${product.hue}`}><div className="modal-scan"/><div className="jar-3d huge"><div className="lid"/><div className="label"><small>HIVESENSE</small><b>{product.name.split(" ")[0]}</b><em>{product.type}</em></div></div><span className="visual-tag">DEMO PRODUCT</span></div>
      <div className="modal-content"><div className="eyebrow orange">B-MART / PRODUCT RECORD</div><h2>{product.name}</h2><p className="modal-lede">A demonstration marketplace record linking the product to its hive, harvest and batch origin.</p><div className="modal-price"><b>{product.price}</b><span>{product.weight}</span></div><div className="detail-grid-new"><div><small>ORIGIN</small><b>{product.origin}</b></div><div><small>HIVE</small><b>{product.hive}</b></div><div><small>HARVEST</small><b>{product.harvest}</b></div><div><small>BATCH</small><b>{product.batch}</b></div></div><div className="verification"><BadgeCheck size={15}/><div><b>Traceability record available</b><span>Demonstration data · not a live transaction</span></div></div><div className="modal-actions"><button className="primary-cta">Buy demo product <ArrowUpRight size={16}/></button><button className="ghost-btn" onClick={onClose}>Back to market</button></div><div className="modal-origin"><MapPin size={14}/>{product.seller} · {product.availability}</div></div>
    </article>
  </div>;
}
