'use client';
import { useState, useRef, useEffect } from 'react';

interface VectorAddition2DProps {
  vectorA: [number, number];
  vectorB: [number, number];
}

const W = 380, H = 320, CX = W / 2, CY = H / 2, SCALE = 40;

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, width = 2.5
) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const ux = dx / len, uy = dy / len;
  const headLen = 10;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * ux + headLen * 0.5 * uy, y2 - headLen * uy - headLen * 0.5 * ux);
  ctx.lineTo(x2 - headLen * ux - headLen * 0.5 * uy, y2 - headLen * uy + headLen * 0.5 * ux);
  ctx.closePath();
  ctx.fill();
}

export default function VectorAddition2D({ vectorA, vectorB }: VectorAddition2DProps) {
  const [a, setA] = useState<[number, number]>(vectorA);
  const [b, setB] = useState<[number, number]>(vectorB);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(CX + x * SCALE, 0); ctx.lineTo(CX + x * SCALE, H); ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath(); ctx.moveTo(0, CY + y * SCALE); ctx.lineTo(W, CY + y * SCALE); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    const sum: [number, number] = [a[0] + b[0], a[1] + b[1]];

    // Parallelogram dashes
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1.5;
    // a + b -> a + b (from tip of a)
    ctx.beginPath();
    ctx.moveTo(CX + a[0] * SCALE, CY - a[1] * SCALE);
    ctx.lineTo(CX + sum[0] * SCALE, CY - sum[1] * SCALE);
    ctx.stroke();
    // b + a -> a + b (from tip of b)
    ctx.beginPath();
    ctx.moveTo(CX + b[0] * SCALE, CY - b[1] * SCALE);
    ctx.lineTo(CX + sum[0] * SCALE, CY - sum[1] * SCALE);
    ctx.stroke();
    ctx.setLineDash([]);

    // Vectors
    drawArrow(ctx, CX, CY, CX + a[0] * SCALE, CY - a[1] * SCALE, '#3B82F6');
    drawArrow(ctx, CX, CY, CX + b[0] * SCALE, CY - b[1] * SCALE, '#F43F5E');
    drawArrow(ctx, CX, CY, CX + sum[0] * SCALE, CY - sum[1] * SCALE, '#10B981', 3);

    // Labels
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#3B82F6';
    ctx.fillText(`u=(${a[0]},${a[1]})`, CX + a[0] * SCALE + 8, CY - a[1] * SCALE);
    ctx.fillStyle = '#F43F5E';
    ctx.fillText(`v=(${b[0]},${b[1]})`, CX + b[0] * SCALE + 8, CY - b[1] * SCALE);
    ctx.fillStyle = '#10B981';
    ctx.fillText(`u+v=(${sum[0]},${sum[1]})`, CX + sum[0] * SCALE + 8, CY - sum[1] * SCALE);
  }, [a, b]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="space-y-1">
          <p className="text-xs font-semibold" style={{color:'#3B82F6'}}>Vector u (blue)</p>
          {['x', 'y'].map((comp, ci) => {
            const id = `vecadd-u-${comp}`;
            return (
              <div key={comp} className="flex items-center gap-2">
                <label htmlFor={id} className="text-xs font-mono w-3">{comp}:</label>
                <input id={id} type="range" min={-4} max={4} step={0.5} value={a[ci]}
                  onChange={e => { const nv: [number, number] = [...a] as [number, number]; nv[ci] = Number(e.target.value); setA(nv); }}
                  className="flex-1 accent-blue-500" />
                <span className="text-xs font-mono w-6 text-right">{a[ci]}</span>
              </div>
            );
          })}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold" style={{color:'#F43F5E'}}>Vector v (red)</p>
          {['x', 'y'].map((comp, ci) => {
            const id = `vecadd-v-${comp}`;
            return (
              <div key={comp} className="flex items-center gap-2">
                <label htmlFor={id} className="text-xs font-mono w-3">{comp}:</label>
                <input id={id} type="range" min={-4} max={4} step={0.5} value={b[ci]}
                  onChange={e => { const nv: [number, number] = [...b] as [number, number]; nv[ci] = Number(e.target.value); setB(nv); }}
                  className="flex-1 accent-red-500" />
                <span className="text-xs font-mono w-6 text-right">{b[ci]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Green = u + v (parallelogram law) · Dashed lines show the parallelogram
      </p>
    </div>
  );
}
