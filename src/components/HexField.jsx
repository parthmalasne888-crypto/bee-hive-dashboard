const cells = Array.from({ length: 42 }, (_, i) => i);
export default function HexField({ strength = 1 }) {
  return <div className="hex-field" aria-hidden="true">
    {cells.map(i => <span key={i} className="hex-cell" style={{ "--i": i, "--s": strength }} />)}
  </div>;
}
