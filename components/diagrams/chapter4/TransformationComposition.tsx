'use client';
import React, { useState, useRef, useEffect } from 'react';

interface TransformationCompositionProps {
  matrixA?: number[][];
  matrixB?: number[][];
}

const W = 380, H = 300, CX = W / 2, CY = H / 2, SCALE = 38;

function mulMV(m: number[][], v: number[]): number[] {
  return m.map(row => row.reduce((sum, val, j) => sum + val * v[j], 0));
}


function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, label?: string, dashed?: boolean) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return;
  const ux = dx / len, uy = dy / len;
  const head = 9;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  if (dashed) ctx.setLineDash([5, 3]);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * ux + head * 0.5 * uy, y2 - head * uy - head * 0.5 * ux);
  ctx.lineTo(x2 - head * ux - head * 0.5 * uy, y2 - head * uy + head * 0.5 * ux);
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = color;
    ctx.fillText(label, x2 + 6, y2 - 4);
  }
  ctx.restore();
}

export default function TransformationComposition({
  matrixA = [[0, -1], [1, 0]],
  matrixB = [[2, 0], [0, 0.5]],
}: TransformationCompositionProps) {
  const [A, setA] = useState(matrixA);
  const [B, setB] = useState(matrixB);
  const [v, setV] = useState([1.5, 1]);
  const [stage, setStage] = useState(2); // 0 = v, 1 = Bv, 2 = ABv
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const Bv = mulMV(B, v);
  const ABv = mulMV(A, Bv);

  const stages = [
    { label: 'Input: v', vector: v, color: '#3B82F6' },
    { label: 'After B: Bv', vector: Bv, color: '#F59E0B' },
    { label: 'After A∘B: ABv', vector: ABv, color: '#10B981' },
  ];

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

    // Draw arrows up to current stage
    const colors = ['#3B82F6', '#F59E0B', '#10B981'];
    const labels = ['v', 'Bv', 'ABv'];
    const vecs = [v, Bv, ABv];
    for (let i = 0; i <= stage; i++) {
      drawArrow(
        ctx, CX, CY,
        CX + vecs[i][0] * SCALE, CY - vecs[i][1] * SCALE,
        colors[i],
        `${labels[i]}=(${vecs[i][0].toFixed(1)},${vecs[i][1].toFixed(1)})`,
        i < stage
      );
    }
  }, [v, A, B, stage, Bv, ABv]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />

      {/* Stage selector */}
      <div className="flex items-center justify-center gap-2">
        {stages.map((s, i) => (
          <button key={i} onClick={() => setStage(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              i <= stage ? 'border-transparent text-white' : 'border-border text-muted-foreground'
            }`}
            style={i <= stage ? { backgroundColor: s.color } : {}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Matrix editors */}
      <div className="flex gap-4 justify-center flex-wrap">
        {([['B', B, setB], ['A', A, setA]] as [string, number[][], React.Dispatch<React.SetStateAction<number[][]>>][]).map(([label, matVal, setMatFn]) => (
          <div key={label}>
            <p className="text-xs text-center font-mono text-muted-foreground mb-1">Matrix {label}</p>
            <div className="border border-border rounded-lg overflow-hidden font-mono text-xs">
              {matVal.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((val: number, c: number) => (
                    <input key={c} type="number" step={0.5} aria-label={`${label} row ${r + 1} col ${c + 1}`} value={val}
                      onChange={e => {
                        const nm = matVal.map((rr: number[]) => [...rr]);
                        nm[r][c] = Number(e.target.value);
                        setMatFn(nm);
                      }}
                      className="w-12 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none text-xs"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Input vector */}
        <div>
          <p className="text-xs text-center font-mono text-blue-600 mb-1">Input v</p>
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden font-mono text-xs">
            {v.map((val, i) => (
              <input key={i} type="number" step={0.5} aria-label={`v component ${i + 1}`} value={val}
                onChange={e => { const nv = [...v]; nv[i] = Number(e.target.value); setV(nv); }}
                className="block w-12 text-center py-1.5 border-b last:border-b-0 border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20 focus:outline-none text-xs"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Click stages to animate: v → Bv → A(Bv) = (AB)v
      </p>
    </div>
  );
}
