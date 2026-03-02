'use client';
import { useState, useRef, useEffect } from 'react';

const W = 380, H = 300, CX = W / 2, CY = H / 2, SCALE = 50;

function drawArrow(
  ctx: CanvasRenderingContext2D,
  ex: number, ey: number,
  color: string,
  label: string,
) {
  const angle = Math.atan2(ey - CY, ex - CX);
  const headLen = 10;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(CX, CY);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(ex, ey);
  ctx.lineTo(ex - headLen * Math.cos(angle - 0.4), ey - headLen * Math.sin(angle - 0.4));
  ctx.lineTo(ex - headLen * Math.cos(angle + 0.4), ey - headLen * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.font = 'bold 13px ui-monospace, monospace';
  ctx.fillStyle = color;
  ctx.fillText(label, ex + 8, ey - 4);
}

export default function DotProductAngle() {
  const [u, setU] = useState<[number, number]>([2, 1]);
  const [v, setV] = useState<[number, number]>([0, 2]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dot = u[0] * v[0] + u[1] * v[1];
  const lenU = Math.sqrt(u[0] ** 2 + u[1] ** 2);
  const lenV = Math.sqrt(v[0] ** 2 + v[1] ** 2);
  const cosAngle = lenU > 0 && lenV > 0 ? dot / (lenU * lenV) : 0;
  const angleDeg = Math.round(Math.acos(Math.max(-1, Math.min(1, cosAngle))) * 180 / Math.PI);

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

    // Angle arc
    if (lenU > 0 && lenV > 0) {
      const aU = Math.atan2(-u[1], u[0]);
      const aV = Math.atan2(-v[1], v[0]);
      const arcColor = dot > 0.01 ? 'rgba(34,197,94,0.35)' : dot < -0.01 ? 'rgba(244,63,94,0.35)' : 'rgba(245,158,11,0.5)';
      ctx.strokeStyle = arcColor;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const start = Math.min(aU, aV);
      const end = Math.max(aU, aV);
      const span = end - start;
      if (span < Math.PI) {
        ctx.arc(CX, CY, 28, start, end);
      } else {
        ctx.arc(CX, CY, 28, end, start + 2 * Math.PI);
      }
      ctx.stroke();
      ctx.lineCap = 'butt';
    }

    // Vectors
    drawArrow(ctx, CX + u[0] * SCALE, CY - u[1] * SCALE, '#3B82F6', 'u');
    drawArrow(ctx, CX + v[0] * SCALE, CY - v[1] * SCALE, '#F43F5E', 'v');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, v]);

  const dotColor = dot > 0.01 ? 'text-emerald-600 dark:text-emerald-400' : dot < -0.01 ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400';
  const dotLabel = dot > 0.01 ? 'acute' : dot < -0.01 ? 'obtuse' : 'orthogonal';

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef} width={W} height={H}
        className="w-full max-w-md mx-auto block rounded-xl border border-border"
      />

      <div className="flex items-center justify-center gap-6 text-sm font-mono">
        <span>
          <span className="text-muted-foreground">u · v = </span>
          <span className={`font-medium ${dotColor}`}>{dot.toFixed(2)}</span>
        </span>
        <span>
          <span className="text-muted-foreground">θ = </span>
          <span className="font-medium text-foreground">{angleDeg}°</span>
          <span className={`ml-1.5 text-xs ${dotColor}`}>({dotLabel})</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="space-y-2">
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 text-center">u = ({u[0]}, {u[1]})</p>
          {(['u₁', 'u₂'] as const).map((lbl, i) => (
            <div key={i} className="flex items-center gap-2">
              <label htmlFor={`u-${i}`} className="text-xs font-mono text-muted-foreground w-5">{lbl}</label>
              <input
                id={`u-${i}`} type="range" min={-3} max={3} step={0.5}
                value={u[i]}
                onChange={e => setU(i === 0 ? [+e.target.value, u[1]] : [u[0], +e.target.value])}
                className="flex-1 accent-blue-500"
              />
              <span className="text-xs font-mono w-6 text-right text-foreground">{u[i]}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-mono text-rose-600 dark:text-rose-400 text-center">v = ({v[0]}, {v[1]})</p>
          {(['v₁', 'v₂'] as const).map((lbl, i) => (
            <div key={i} className="flex items-center gap-2">
              <label htmlFor={`v-${i}`} className="text-xs font-mono text-muted-foreground w-5">{lbl}</label>
              <input
                id={`v-${i}`} type="range" min={-3} max={3} step={0.5}
                value={v[i]}
                onChange={e => setV(i === 0 ? [+e.target.value, v[1]] : [v[0], +e.target.value])}
                className="flex-1 accent-rose-500"
              />
              <span className="text-xs font-mono w-6 text-right text-foreground">{v[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
