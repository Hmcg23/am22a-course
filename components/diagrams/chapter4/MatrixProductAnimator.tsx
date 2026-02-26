'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MatrixProductAnimatorProps {
  matrixA?: number[][];
  matrixB?: number[][];
}

function formatNum(n: number) {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

export default function MatrixProductAnimator({
  matrixA = [[1, 2], [3, 4]],
  matrixB = [[5, 6], [7, 8]],
}: MatrixProductAnimatorProps) {
  const [A, setA] = useState(matrixA);
  const [B, setB] = useState(matrixB);
  const [activeCol, setActiveCol] = useState(0);

  const rowsA = A.length;
  const colsB = B[0]?.length ?? 0;

  // Compute product
  const AB: number[][] = Array.from({ length: rowsA }, (_, r) =>
    Array.from({ length: colsB }, (_, c) =>
      A[r].reduce((sum, _, k) => sum + (A[r][k] ?? 0) * (B[k]?.[c] ?? 0), 0)
    )
  );

  // Column perspective: AB[:,j] = A * B[:,j]
  const colB = B.map(row => row[activeCol] ?? 0);
  const colAB = A.map(row => row.reduce((sum, val, k) => sum + val * (colB[k] ?? 0), 0));

  return (
    <div className="space-y-4">
      {/* Column selector */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Column perspective: AB[:,{activeCol + 1}] = A · B[:,{activeCol + 1}]
        </span>
        <div className="flex items-center gap-2">
          <button aria-label="Previous column" onClick={() => setActiveCol(c => Math.max(0, c - 1))} disabled={activeCol === 0}
            className="p-1 rounded border border-border hover:bg-muted/60 disabled:opacity-40">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <span className="text-xs font-mono">col {activeCol + 1}</span>
          <button aria-label="Next column" onClick={() => setActiveCol(c => Math.min(colsB - 1, c + 1))} disabled={activeCol === colsB - 1}
            className="p-1 rounded border border-border hover:bg-muted/60 disabled:opacity-40">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Matrices display */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-3 justify-center flex-wrap min-w-0">
          {/* Matrix A */}
          <div>
            <p className="text-xs text-center font-mono text-muted-foreground mb-1">A</p>
            <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
              {A.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((val, c) => (
                    <input key={c} type="number" aria-label={`A row ${r + 1} col ${c + 1}`} value={val}
                      onChange={e => { const nm = A.map(r => [...r]); nm[r][c] = Number(e.target.value); setA(nm); }}
                      className="w-12 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5 text-xs"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <span className="text-lg font-mono text-muted-foreground">·</span>

          {/* Matrix B */}
          <div>
            <p className="text-xs text-center font-mono text-muted-foreground mb-1">B</p>
            <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
              {B.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((val, c) => (
                    <div key={c}
                      className={`w-12 text-center py-1.5 border-r border-b last:border-r-0 border-border text-xs ${
                        c === activeCol ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 font-bold' : ''
                      }`}
                    >
                      <input type="number" aria-label={`B row ${r + 1} col ${c + 1}`} value={val}
                        onChange={e => { const nm = B.map(r => [...r]); nm[r][c] = Number(e.target.value); setB(nm); }}
                        className="w-full text-center bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <span className="text-lg font-mono text-muted-foreground">=</span>

          {/* Product AB */}
          <div>
            <p className="text-xs text-center font-mono text-muted-foreground mb-1">AB</p>
            <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
              {AB.map((row, r) => (
                <div key={r} className="flex">
                  {row.map((val, c) => (
                    <div key={c}
                      className={`w-14 text-center py-1.5 border-r border-b last:border-r-0 border-border text-xs ${
                        c === activeCol ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-muted-foreground'
                      }`}
                    >
                      {formatNum(val)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Column perspective explanation */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Column {activeCol + 1} perspective: A · b_{activeCol + 1}
        </p>
        <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
          <div className="space-y-0.5">
            {colB.map((v, i) => (
              <div key={i} className="text-blue-700 dark:text-blue-300">{formatNum(v)}</div>
            ))}
          </div>
          <span className="text-muted-foreground">→ linear combination of columns of A =</span>
          <div className="space-y-0.5">
            {colAB.map((v, i) => (
              <div key={i} className="text-emerald-700 dark:text-emerald-300 font-bold">{formatNum(v)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
