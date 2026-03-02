'use client';
import { useState, useRef, useEffect } from 'react';

const W = 380, H = 320, CX = W / 2, CY = H / 2, SCALE = 52;

function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, dashed = false,
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 9;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;
  if (dashed) ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - 0.4), y2 - headLen * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - headLen * Math.cos(angle + 0.4), y2 - headLen * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  ctx.save();
  ctx.font = '13px ui-monospace, monospace';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

export default function OrthogonalProjection2D() {
  const [a, setA] = useState<[number, number]>([3, 1]);
  const [b, setB] = useState<[number, number]>([1, 3]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dotAB = a[0] * b[0] + a[1] * b[1];
  const dotAA = a[0] ** 2 + a[1] ** 2;
  const t = dotAA > 1e-9 ? dotAB / dotAA : 0;
  const proj: [number, number] = [t * a[0], t * a[1]];
  const z: [number, number] = [b[0] - proj[0], b[1] - proj[1]];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let x = -4; x <= 4; x++) {
      ctx.beginPath(); ctx.moveTo(CX + x * SCALE, 0); ctx.lineTo(CX + x * SCALE, H); ctx.stroke();
    }
    for (let y = -3; y <= 3; y++) {
      ctx.beginPath(); ctx.moveTo(0, CY + y * SCALE); ctx.lineTo(W, CY + y * SCALE); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    // Span of a — dashed line through origin
    const aLen = Math.sqrt(a[0] ** 2 + a[1] ** 2);
    if (aLen > 1e-9) {
      const ux = a[0] / aLen, uy = a[1] / aLen;
      ctx.save();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(CX - ux * 220, CY + uy * 220);
      ctx.lineTo(CX + ux * 220, CY - uy * 220);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    const footX = CX + proj[0] * SCALE;
    const footY = CY - proj[1] * SCALE;
    const bX = CX + b[0] * SCALE;
    const bY = CY - b[1] * SCALE;

    // Right-angle box at projection foot
    const zLen = Math.sqrt(z[0] ** 2 + z[1] ** 2);
    if (aLen > 1e-9 && zLen > 1e-9 && Math.abs(t) > 0.05) {
      const ux = a[0] / aLen, uy = a[1] / aLen;
      const zx = z[0] / zLen, zy = z[1] / zLen;
      const s = 9;
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(footX + ux * s, footY - uy * s);
      ctx.lineTo(footX + ux * s + zx * s, footY - uy * s - zy * s);
      ctx.lineTo(footX + zx * s, footY - zy * s);
      ctx.stroke();
      ctx.restore();
    }

    // z component — dashed from foot of projection to tip of b
    arrow(ctx, footX, footY, bX, bY, '#8B5CF6', true);
    label(ctx, 'z', (footX + bX) / 2 + 7, (footY + bY) / 2 - 3, '#8B5CF6');

    // proj vector from origin
    arrow(ctx, CX, CY, footX, footY, '#16a34a');
    label(ctx, 'proj', footX + 7, footY - 7, '#16a34a');

    // b vector from origin
    arrow(ctx, CX, CY, bX, bY, '#1e40af');
    label(ctx, 'b', bX + 7, bY - 4, '#1e40af');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b]);

  const fmt = (n: number) => n.toFixed(2);

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef} width={W} height={H}
        className="w-full max-w-md mx-auto block rounded-xl border border-border"
      />

      <div className="flex items-center justify-center gap-6 text-xs font-mono">
        <span className="text-green-700 dark:text-green-400">proj = ({fmt(proj[0])}, {fmt(proj[1])})</span>
        <span className="text-violet-600 dark:text-violet-400">z = ({fmt(z[0])}, {fmt(z[1])})</span>
        <span className="text-muted-foreground">z · a = {fmt(z[0] * a[0] + z[1] * a[1])}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="space-y-2">
          <p className="text-xs font-mono text-muted-foreground text-center">Direction a = ({a[0]}, {a[1]})</p>
          {([['a₁', 0], ['a₂', 1]] as [string, number][]).map(([lbl, i]) => (
            <div key={i} className="flex items-center gap-2">
              <label htmlFor={`a-${i}`} className="text-xs font-mono text-muted-foreground w-5">{lbl}</label>
              <input
                id={`a-${i}`} type="range" min={-3} max={3} step={0.5} value={a[i]}
                onChange={e => setA(i === 0 ? [+e.target.value, a[1]] : [a[0], +e.target.value])}
                className="flex-1 accent-slate-500"
              />
              <span className="text-xs font-mono w-6 text-right text-foreground">{a[i]}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-mono text-blue-700 dark:text-blue-400 text-center">Vector b = ({b[0]}, {b[1]})</p>
          {([['b₁', 0], ['b₂', 1]] as [string, number][]).map(([lbl, i]) => (
            <div key={i} className="flex items-center gap-2">
              <label htmlFor={`b-${i}`} className="text-xs font-mono text-muted-foreground w-5">{lbl}</label>
              <input
                id={`b-${i}`} type="range" min={-3} max={3} step={0.5} value={b[i]}
                onChange={e => setB(i === 0 ? [+e.target.value, b[1]] : [b[0], +e.target.value])}
                className="flex-1 accent-blue-500"
              />
              <span className="text-xs font-mono w-6 text-right text-foreground">{b[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
