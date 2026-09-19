import { ArrowUpRight, BadgeCheck, ShoppingBag, Sparkles } from "lucide-react";

export default function BMart({ products, onProduct, onPlayTone }) {
  return (
    <section className="market section" id="market">
      <div className="market-intro">
        <p className="kicker">B-MART <b>DEMO MARKETPLACE</b></p>
        <h2>From healthy hives<br/><em>to traceable honey.</em></h2>
        <p>HiveSense connects monitoring, harvesting and the market—so every jar can carry its origin with it.</p>
        <button className="button dark" onClick={() => onPlayTone?.("click")}><ShoppingBag size={17}/> Sell honey through B-Mart</button>

        <div className="market-pulse">
          <div><Sparkles size={15}/><span>18 active batches</span></div>
          <div><b>₹654</b><span>demo avg. jar price</span></div>
          <div><b>100%</b><span>traceability records</span></div>
        </div>
      </div>

      <div className="market-products-wrap">
        <div className="market-headline-row"><span>FEATURED DEMO PRODUCTS</span><small>BUY • SELL • TRACE</small></div>
        <div className="product-grid">
          {products.map(product => (
            <article className="product" key={product.id} onMouseEnter={() => onPlayTone?.("hover")}>
              <div className={`jar-area ${product.hue}`}>
                <span>DEMO PRODUCT</span>
                <div className="jar"><i/><b>HIVE<br/>SENSE</b></div>
                <div className="jar-glow"/>
              </div>
              <div className="product-body">
                <div><small>{product.type} · {product.weight}</small><h3>{product.name}</h3><p>{product.origin} · {product.seller}</p></div>
                <strong>{product.price}</strong>
              </div>
              <div className="trace-chip"><BadgeCheck size={15}/> Traceability record available</div>
              <div className="product-actions">
                <button onClick={() => { onPlayTone?.("click"); onProduct(product); }}>View product <ArrowUpRight size={16}/></button>
                <button className="buy" onClick={() => { onPlayTone?.("buy"); onProduct(product); }}>Buy demo</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
