'use client';
import { useState, useRef, useEffect } from 'react';

interface MatrixVectorMultiplicationProps {
  matrix: number[][];
  vector?: number[];
}

const W = 380, H = 300, CX = W / 2, CY = H / 2, SCALE = 38;

function drawArrow(ctx: CanvasRenderingContext2D, tx: number, ty: number, color: string, label?: string) {
  const len = Math.sqrt(tx * tx + ty * ty);
  if (len < 1) return;
  const ux = tx / len, uy = ty / len;
  const headLen = 9;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + tx, CY + ty); ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(CX + tx, CY + ty);
  ctx.lineTo(CX + tx - headLen * ux + headLen * 0.5 * uy, CY + ty - headLen * uy - headLen * 0.5 * ux);
  ctx.lineTo(CX + tx - headLen * ux - headLen * 0.5 * uy, CY + ty - headLen * uy + headLen * 0.5 * ux);
  ctx.closePath(); ctx.fill();
  if (label) {
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = color;
    ctx.fillText(label, CX + tx + 6, CY + ty - 4);
  }
}

export default function MatrixVectorMultiplication({ matrix, vector = [1, 1] }: MatrixVectorMultiplicationProps) {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const [mat, setMat] = useState(matrix);
  const [vec, setVec] = useState(vector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const result = mat.map(row => row.reduce((sum, val, j) => sum + val * (vec[j] ?? 0), 0));

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

    if (cols === 2 && rows === 2) {
      drawArrow(ctx, vec[0] * SCALE, -vec[1] * SCALE, '#3B82F6', `x=(${vec[0]},${vec[1]})`);
      drawArrow(ctx, result[0] * SCALE, -result[1] * SCALE, '#F43F5E', `Ax=(${result[0].toFixed(1)},${result[1].toFixed(1)})`);
    }
  }, [mat, vec, result, cols, rows]);

  const formatNum = (n: number) => Number.isInteger(n) ? String(n) : n.toFixed(1);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />

      {/* Matrix and vector display */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="space-y-1">
          <p className="text-xs text-center text-muted-foreground font-mono">Matrix A</p>
          <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
            {mat.map((row, r) => (
              <div key={r} className="flex">
                {row.map((val, c) => (
                  <input
                    key={c}
                    type="number"
                    aria-label={`A row ${r + 1} col ${c + 1}`}
                    value={val}
                    onChange={e => {
                      const nm = mat.map(r => [...r]);
                      nm[r][c] = Number(e.target.value);
                      setMat(nm);
                    }}
                    className="w-12 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5 text-sm"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <span className="text-xl text-muted-foreground font-mono">·</span>

        <div className="space-y-1">
          <p className="text-xs text-center text-blue-600 font-mono">Vector x</p>
          <div className="border border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden font-mono text-sm">
            {vec.map((val, i) => (
              <input
                key={i}
                type="number"
                aria-label={`x component ${i + 1}`}
                value={val}
                onChange={e => { const nv = [...vec]; nv[i] = Number(e.target.value); setVec(nv); }}
                className="block w-12 text-center py-1.5 border-b last:border-b-0 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 focus:outline-none text-sm"
              />
            ))}
          </div>
        </div>

        <span className="text-xl text-muted-foreground font-mono">=</span>

        <div className="space-y-1">
          <p className="text-xs text-center text-red-600 font-mono">Ax</p>
          <div className="border border-red-200 dark:border-red-800 rounded-lg overflow-hidden font-mono text-sm bg-red-50/50 dark:bg-red-950/20">
            {result.map((val, i) => (
              <div key={i} className="w-16 text-center py-1.5 border-b last:border-b-0 border-red-200 dark:border-red-800 font-semibold text-red-700 dark:text-red-300">
                {formatNum(val)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Blue = input vector x · Red = output vector Ax · Edit matrix entries directly
      </p>
    </div>
  );
}
