'use client';
import { useState } from 'react';

interface TransposeVisualizerProps {
  initialMatrix?: number[][];
}

const PAIR_COLORS = [
  { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300' },
  { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-300' },
  { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300' },
  { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300' },
  { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300' },
  { bg: 'bg-cyan-100 dark:bg-cyan-900/40', text: 'text-cyan-700 dark:text-cyan-300' },
];

const DIAG_COLOR = { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-300' };


function cellColor(r: number, c: number) {
  if (r === c) return DIAG_COLOR;
  const [lo, hi] = r < c ? [r, c] : [c, r];
  let idx = 0;
  const n = Math.max(r, c) + 1;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (i === lo && j === hi) return PAIR_COLORS[idx % PAIR_COLORS.length];
    idx++;
  }
  return PAIR_COLORS[0];
}

export default function TransposeVisualizer({ initialMatrix = [[1, 2, 3], [4, 5, 6]] }: TransposeVisualizerProps) {
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix.map(r => [...r]));

  const rows = matrix.length;
  const cols = matrix[0].length;
  const transpose = Array.from({ length: cols }, (_, j) => matrix.map(row => row[j]));

  function updateCell(r: number, c: number, val: string) {
    const n = Number(val);
    if (isNaN(n)) return;
    setMatrix(prev => prev.map((row, ri) => row.map((v, ci) => ri === r && ci === c ? n : v)));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Matrix A */}
        <div>
          <p className="text-xs font-mono text-muted-foreground text-center mb-2">Matrix A  ({rows}×{cols})</p>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {matrix.map((row, r) =>
              row.map((val, c) => {
                const col = cellColor(r, c);
                return (
                  <input
                    key={`${r}-${c}`}
                    type="number"
                    value={val}
                    aria-label={`A row ${r + 1} col ${c + 1}`}
                    onChange={e => updateCell(r, c, e.target.value)}
                    className={`w-12 h-10 text-center text-sm font-mono rounded border border-border ${col.bg} ${col.text} focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-2xl text-muted-foreground font-mono select-none">⟶</div>

        {/* Transpose */}
        <div>
          <p className="text-xs font-mono text-muted-foreground text-center mb-2">Transpose Aᵀ  ({cols}×{rows})</p>
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))` }}
          >
            {transpose.map((row, r) =>
              row.map((val, c) => {
                const col = cellColor(c, r); // swapped indices
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-12 h-10 flex items-center justify-center text-sm font-mono rounded border border-border ${col.bg} ${col.text}`}
                  >
                    {val}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Matching colors show paired entries: A[i][j] ↔ Aᵀ[j][i]. Diagonal entries (grey) stay fixed.
      </p>
    </div>
  );
}
