'use client';
import { useState, useRef, useEffect } from 'react';

interface TransformationGridProps {
  initialMatrix?: [[number, number], [number, number]];
}

const W = 380, H = 320, CX = W / 2, CY = H / 2, SCALE = 36;

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const ux = dx / len, uy = dy / len;
  const head = 8;
  ctx.strokeStyle = color; ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * ux + head * 0.5 * uy, y2 - head * uy - head * 0.5 * ux);
  ctx.lineTo(x2 - head * ux - head * 0.5 * uy, y2 - head * uy + head * 0.5 * ux);
  ctx.closePath(); ctx.fill();
}

export default function TransformationGrid({ initialMatrix = [[1, 0], [0, 1]] }: TransformationGridProps) {
  const [mat, setMat] = useState<[[number, number], [number, number]]>(initialMatrix);
  const [showOriginal, setShowOriginal] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [[a, b], [c, d]] = mat;
  const det = a * d - b * c;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    const transform = (x: number, y: number): [number, number] => [a * x + b * y, c * x + d * y];

    // Original grid (light)
    if (showOriginal) {
      ctx.strokeStyle = 'rgba(59,130,246,0.15)';
      ctx.lineWidth = 1;
      for (let x = -5; x <= 5; x++) {
        const [tx1, ty1] = transform(x, -5);
        const [tx2, ty2] = transform(x, 5);
        ctx.beginPath();
        ctx.moveTo(CX + tx1 * SCALE, CY - ty1 * SCALE);
        ctx.lineTo(CX + tx2 * SCALE, CY - ty2 * SCALE);
        ctx.stroke();
      }
      for (let y = -5; y <= 5; y++) {
        const [tx1, ty1] = transform(-5, y);
        const [tx2, ty2] = transform(5, y);
        ctx.beginPath();
        ctx.moveTo(CX + tx1 * SCALE, CY - ty1 * SCALE);
        ctx.lineTo(CX + tx2 * SCALE, CY - ty2 * SCALE);
        ctx.stroke();
      }
    }

    // Reference axes (gray)
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    // Transformed basis vectors
    const [e1x, e1y] = transform(1, 0);
    const [e2x, e2y] = transform(0, 1);
    drawArrow(ctx, CX, CY, CX + e1x * SCALE, CY - e1y * SCALE, '#F43F5E', 3);
    drawArrow(ctx, CX, CY, CX + e2x * SCALE, CY - e2y * SCALE, '#10B981', 3);

    // Labels
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#F43F5E';
    ctx.fillText(`Ae₁=(${e1x.toFixed(1)},${e1y.toFixed(1)})`, CX + e1x * SCALE + 6, CY - e1y * SCALE);
    ctx.fillStyle = '#10B981';
    ctx.fillText(`Ae₂=(${e2x.toFixed(1)},${e2y.toFixed(1)})`, CX + e2x * SCALE + 6, CY - e2y * SCALE);

    // Det label
    ctx.fillStyle = Math.abs(det) < 0.01 ? '#F59E0B' : '#9ca3af';
    ctx.font = '11px monospace';
    ctx.fillText(`det = ${det.toFixed(2)}`, 8, H - 10);
  }, [a, b, c, d, det, showOriginal]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />

      {/* Matrix editor */}
      <div className="flex items-center justify-center gap-4">
        <div>
          <p className="text-xs text-center text-muted-foreground font-mono mb-1">A</p>
          <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
            {mat.map((row, r) => (
              <div key={r} className="flex">
                {row.map((val, c) => (
                  <input
                    key={c}
                    type="number"
                    aria-label={`A row ${r + 1} col ${c + 1}`}
                    step={0.5}
                    value={val}
                    onChange={e => {
                      const nm: [[number,number],[number,number]] = [
                        [...mat[0]] as [number,number],
                        [...mat[1]] as [number,number],
                      ];
                      nm[r][c] = Number(e.target.value);
                      setMat(nm);
                    }}
                    className="w-14 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={showOriginal} onChange={e => setShowOriginal(e.target.checked)} className="rounded" />
            Show transformed grid
          </label>
          <div className={`text-xs px-2 py-1 rounded ${Math.abs(det) < 0.01 ? 'bg-amber-100 dark:bg-amber-950/20 text-amber-700' : 'bg-muted/40 text-muted-foreground'}`}>
            det(A) = {det.toFixed(2)}
            {Math.abs(det) < 0.01 && ' (singular!)'}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Red = transformed e₁ · Green = transformed e₂ · Grid shows where the plane gets mapped
      </p>
    </div>
  );
}
