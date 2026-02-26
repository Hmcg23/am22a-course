'use client';
import { useState } from 'react';

interface RankNullityVisualizerProps {
  initialMatrix?: number[][];
}

function computeRref(mat: number[][]): { rref: number[][]; rank: number } {
  const m = mat.map(r => [...r]);
  const rows = m.length;
  const cols = m[0]?.length ?? 0;
  let pivotRow = 0;

  for (let col = 0; col < cols && pivotRow < rows; col++) {
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[maxRow][col])) maxRow = r;
    }
    if (Math.abs(m[maxRow][col]) < 1e-10) continue;
    [m[pivotRow], m[maxRow]] = [m[maxRow], m[pivotRow]];
    const scale = m[pivotRow][col];
    for (let c = 0; c < cols; c++) m[pivotRow][c] /= scale;
    for (let r = 0; r < rows; r++) {
      if (r !== pivotRow && Math.abs(m[r][col]) > 1e-10) {
        const f = m[r][col];
        for (let c = 0; c < cols; c++) m[r][c] -= f * m[pivotRow][c];
      }
    }
    pivotRow++;
  }
  return { rref: m, rank: pivotRow };
}

function formatNum(n: number) {
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
}

export default function RankNullityVisualizer({ initialMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] }: RankNullityVisualizerProps) {
  const [mat, setMat] = useState(initialMatrix);

  const cols = mat[0]?.length ?? 0;
  const { rref, rank } = computeRref(mat);
  const nullity = cols - rank;

  const pivotCols = rref.reduce<number[]>((acc, row) => {
    const pivot = row.findIndex(v => Math.abs(v - 1) < 0.01 && row.filter(x => Math.abs(x) > 0.01).length > 0);
    if (pivot >= 0 && !acc.includes(pivot)) acc.push(pivot);
    return acc;
  }, []);

  const freeCols = Array.from({ length: cols }, (_, i) => i).filter(i => !pivotCols.includes(i));

  return (
    <div className="space-y-4">
      {/* Editable matrix */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-mono text-center">Matrix A — click to edit</p>
        <div className="border border-border rounded-xl overflow-hidden font-mono text-sm mx-auto" style={{ width: 'fit-content' }}>
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
                  className="w-14 text-center py-2 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Rank-Nullity bar */}
      <div className="max-w-sm mx-auto space-y-2">
        <p className="text-xs text-muted-foreground text-center font-mono">
          rank + nullity = {rank} + {nullity} = {cols} (= # columns)
        </p>
        <div className="flex h-8 rounded-xl overflow-hidden border border-border">
          {rank > 0 && (
            <div
              className="flex items-center justify-center text-xs font-bold text-white bg-violet-500 transition-all"
              style={{ width: `${(rank / cols) * 100}%` }}
            >
              rank = {rank}
            </div>
          )}
          {nullity > 0 && (
            <div
              className="flex items-center justify-center text-xs font-bold text-white bg-amber-500 transition-all"
              style={{ width: `${(nullity / cols) * 100}%` }}
            >
              nullity = {nullity}
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-center text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" />
            Rank (dim of column space)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
            Nullity (dim of null space)
          </span>
        </div>
      </div>

      {/* RREF display */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-mono text-center">Row-reduced echelon form (RREF)</p>
        <div className="border border-border rounded-xl overflow-hidden font-mono text-xs mx-auto" style={{ width: 'fit-content' }}>
          {rref.map((row, r) => (
            <div key={r} className="flex">
              {row.map((val, c) => (
                <div
                  key={c}
                  className={`w-14 text-center py-2 border-r border-b last:border-r-0 border-border ${
                    pivotCols.includes(c) ? 'bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300 font-bold' :
                    freeCols.includes(c) ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300' : ''
                  }`}
                >
                  {formatNum(val)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-4 justify-center text-xs mt-1">
          <span className="flex items-center gap-1 text-violet-600 dark:text-violet-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block opacity-50" /> Pivot columns
          </span>
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block opacity-50" /> Free columns
          </span>
        </div>
      </div>
    </div>
  );
}
