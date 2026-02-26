'use client';
import { useState, useRef, useEffect } from 'react';

interface LinearDependenceCheckerProps {
  initialVectors?: Array<[number, number]>;
}

const W = 380, H = 300, CX = W / 2, CY = H / 2, SCALE = 38;

function drawArrow(ctx: CanvasRenderingContext2D, x2: number, y2: number, color: string) {
  const len = Math.sqrt(x2 * x2 + y2 * y2);
  if (len < 1) return;
  const ux = x2 / len, uy = y2 / len;
  const headLen = 9;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + x2, CY + y2); ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(CX + x2, CY + y2);
  ctx.lineTo(CX + x2 - headLen * ux + headLen * 0.5 * uy, CY + y2 - headLen * uy - headLen * 0.5 * ux);
  ctx.lineTo(CX + x2 - headLen * ux - headLen * 0.5 * uy, CY + y2 - headLen * uy + headLen * 0.5 * ux);
  ctx.closePath(); ctx.fill();
}

export default function LinearDependenceChecker({ initialVectors = [[2, 1], [1, 3]] }: LinearDependenceCheckerProps) {
  const [vectors, setVectors] = useState<Array<[number, number]>>(initialVectors);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const det = vectors.length >= 2
    ? vectors[0][0] * vectors[1][1] - vectors[0][1] * vectors[1][0]
    : 1;
  const isDependent = Math.abs(det) < 0.01;

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
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    const colors = ['#3B82F6', '#F43F5E'];
    vectors.forEach((v, i) => {
      const color = isDependent ? '#F59E0B' : colors[i % 2];
      drawArrow(ctx, v[0] * SCALE, -v[1] * SCALE, color);
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = color;
      ctx.fillText(`v${i+1}=(${v[0]},${v[1]})`, CX + v[0] * SCALE + 6, CY - v[1] * SCALE - 4);
    });

    // Det value display
    ctx.fillStyle = isDependent ? '#F59E0B' : '#10B981';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`det = ${det.toFixed(2)}`, 10, H - 10);
  }, [vectors, det, isDependent]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {vectors.map((v, i) => (
          <div key={i} className="space-y-1">
            <p className="text-xs font-semibold" style={{ color: isDependent ? '#F59E0B' : ['#3B82F6','#F43F5E'][i] }}>
              v{i+1}
            </p>
            {['x', 'y'].map((comp, ci) => {
              const id = `depcheck-v${i + 1}-${comp}`;
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
                    className="flex-1" />
                  <span className="text-xs font-mono w-6 text-right">{v[ci]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={`max-w-md mx-auto rounded-xl p-3 text-sm border ${
        isDependent
          ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
          : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
      }`}>
        <p className="font-semibold">{isDependent ? '⚠ Linearly Dependent' : '✓ Linearly Independent'}</p>
        <p className="text-xs mt-1 opacity-80">
          {isDependent
            ? `det = ${det.toFixed(2)} ≈ 0. One vector is a scalar multiple of the other.`
            : `det = ${det.toFixed(2)} ≠ 0. No vector is a multiple of the other.`}
        </p>
      </div>
    </div>
  );
}
