'use client';
import { useState, useRef, useEffect } from 'react';

interface SpanVisualizer2DProps {
  initialVectors?: Array<[number, number]>;
}

const W = 380, H = 320, CX = W / 2, CY = H / 2, SCALE = 40;

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const ux = dx / len, uy = dy / len;
  const headLen = 9;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * ux + headLen * 0.5 * uy, y2 - headLen * uy - headLen * 0.5 * ux);
  ctx.lineTo(x2 - headLen * ux - headLen * 0.5 * uy, y2 - headLen * uy + headLen * 0.5 * ux);
  ctx.closePath(); ctx.fill();
}

export default function SpanVisualizer2D({ initialVectors = [[2, 1], [-1, 2]] }: SpanVisualizer2DProps) {
  const [vectors, setVectors] = useState<Array<[number, number]>>(initialVectors);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDependent = vectors.length >= 2
    ? Math.abs(vectors[0][0] * vectors[1][1] - vectors[0][1] * vectors[1][0]) < 0.001
    : false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    const dep = isDependent;

    // Fill span
    if (vectors.length === 1 || dep) {
      // Span is a line through origin
      const v = vectors[0];
      if (v[0] !== 0 || v[1] !== 0) {
        const len = Math.sqrt(v[0] ** 2 + v[1] ** 2);
        const ux = v[0] / len, uy = v[1] / len;
        ctx.strokeStyle = 'rgba(139,92,246,0.3)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(CX - ux * W, CY + uy * W);
        ctx.lineTo(CX + ux * W, CY - uy * W);
        ctx.stroke();
      }
    } else {
      // Span is all of R2
      ctx.fillStyle = 'rgba(139,92,246,0.08)';
      ctx.fillRect(0, 0, W, H);
    }

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

    // Vectors
    const colors = ['#3B82F6', '#F43F5E'];
    vectors.forEach((v, i) => {
      drawArrow(ctx, CX, CY, CX + v[0] * SCALE, CY - v[1] * SCALE, colors[i % colors.length]);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(`v${i + 1}=(${v[0]},${v[1]})`, CX + v[0] * SCALE + 6, CY - v[1] * SCALE - 4);
    });

    // Span label
    ctx.fillStyle = '#8B5CF6';
    ctx.font = 'bold 12px sans-serif';
    const spanLabel = vectors.length === 0 ? 'span = {0}' :
      dep ? 'span = line through origin' : 'span = all of ℝ²';
    ctx.fillText(spanLabel, 10, H - 10);
  }, [vectors, isDependent]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="space-y-3 max-w-md mx-auto">
        {vectors.map((v, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs font-semibold" style={{ color: ['#3B82F6','#F43F5E'][i] }}>v{i+1}</p>
            {['x', 'y'].map((comp, ci) => {
              const id = `span-v${i + 1}-${comp}`;
              return (
                <div key={comp} className="flex items-center gap-2">
                  <label htmlFor={id} className="text-xs font-mono w-3">{comp}:</label>
                  <input id={id} type="range" min={-4} max={4} step={0.5} value={v[ci]}
                    onChange={e => {
                      const nv = [...vectors] as Array<[number, number]>;
                      nv[i] = [...v] as [number, number];
                      nv[i][ci] = Number(e.target.value);
                      setVectors(nv);
                    }}
                    className="flex-1 accent-violet-500" />
                  <span className="text-xs font-mono w-6 text-right">{v[ci]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={`max-w-md mx-auto text-xs px-3 py-2 rounded-lg ${
        isDependent
          ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
          : 'bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300'
      }`}>
        {isDependent
          ? '⚠ Vectors are linearly dependent — span is a line (not all of ℝ²)'
          : '✓ Vectors span all of ℝ² — every point is reachable as a linear combination'}
      </div>
    </div>
  );
}
