type Point = { value: number; measuredAt: string };

export function WeightTrendChart({ points }: { points: Point[] }) {
  if (!points.length) return null;

  const width = 720;
  const height = 190;
  const padX = 18;
  const padY = 22;
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 0.5);
  const x = (index: number) =>
    points.length === 1
      ? width / 2
      : padX + (index / (points.length - 1)) * (width - padX * 2);
  const y = (value: number) =>
    height - padY - ((value - min) / range) * (height - padY * 2);
  const coords = points.map((point, index) => [x(index), y(point.value)] as const);
  const polyline = coords.map(([px, py]) => `${px},${py}`).join(" ");
  const area = `${padX},${height - padY} ${polyline} ${width - padX},${height - padY}`;

  return (
    <div aria-label="Tendência visual de peso">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Linha de tendência recente de peso">
        <defs>
          <linearGradient id="weightArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff641a" stopOpacity=".28" />
            <stop offset="100%" stopColor="#ff641a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line key={ratio} x1={padX} x2={width-padX} y1={height*ratio} y2={height*ratio} stroke="#ffffff10" strokeWidth="1" />
        ))}
        <polygon points={area} fill="url(#weightArea)" />
        <polyline points={polyline} fill="none" stroke="#ff641a" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        {coords.map(([px, py], index) => (
          <g key={points[index].measuredAt}>
            <circle cx={px} cy={py} r="6" fill="#0b1014" stroke="#ff8a35" strokeWidth="3" />
            <title>{`${points[index].value.toFixed(1)} kg — ${points[index].measuredAt.slice(0,10)}`}</title>
          </g>
        ))}
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,color:"#74827b",fontSize:10}}>
        <span>{points[0]?.measuredAt.slice(0,10)}</span>
        <span>{points[points.length-1]?.measuredAt.slice(0,10)}</span>
      </div>
    </div>
  );
}
