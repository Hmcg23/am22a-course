'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface LUDecompositionAnimatorProps {
  matrix?: number[][];
}

function formatNum(n: number) {
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
}

interface LUResult {
  L: number[][];
  U: number[][];
  steps: { label: string; U: number[][]; L: number[][] }[];
}

function luDecompose(mat: number[][]): LUResult {
  const n = mat.length;
  const U = mat.map(r => [...r]);
  const L: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j): number => (i === j ? 1 : 0)));
  const steps = [{ label: 'Initial matrix A = U, L = I', U: U.map(r => [...r]), L: L.map(r => [...r]) }];

  for (let col = 0; col < n; col++) {
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(U[col][col]) < 1e-10) continue;
      const factor = U[row][col] / U[col][col];
      L[row][col] = factor;
      for (let c = 0; c < n; c++) U[row][c] -= factor * U[col][c];
      steps.push({
        label: `Eliminate col ${col + 1}, row ${row + 1}: L[${row+1},${col+1}] = ${formatNum(factor)}`,
        U: U.map(r => [...r]),
        L: L.map(r => [...r]),
      });
    }
  }
  steps.push({ label: 'LU decomposition complete: A = L·U', U: U.map(r => [...r]), L: L.map(r => [...r]) });
  return { L, U, steps };
}

function MatrixDisplay({ m, label, highlightLower }: { m: number[][]; label: string; highlightLower?: boolean }) {
  return (
    <div>
      <p className="text-xs text-center font-mono text-muted-foreground mb-1">{label}</p>
      <div className="border border-border rounded-lg overflow-hidden font-mono text-xs">
        {m.map((row, r) => (
          <div key={r} className="flex">
            {row.map((val, c) => (
              <div
                key={c}
                className={`w-14 text-center py-1.5 border-r border-b last:border-r-0 border-border ${
                  highlightLower && r > c && Math.abs(val) > 0.001
                    ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 font-bold'
                    : !highlightLower && r <= c && Math.abs(val) > 0.001
                    ? 'bg-violet-50 dark:bg-violet-950/20 text-violet-700 dark:text-violet-300 font-bold'
                    : 'text-muted-foreground'
                }`}
              >
                {formatNum(val)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LUDecompositionAnimator({ matrix = [[2, 1, 1], [4, 3, 3], [8, 7, 9]] }: LUDecompositionAnimatorProps) {
  const [mat, setMat] = useState(matrix);
  const [stepIdx, setStepIdx] = useState(0);

  const { steps } = luDecompose(mat);
  const step = steps[Math.min(stepIdx, steps.length - 1)];
  const safeIdx = Math.min(stepIdx, steps.length - 1);

  return (
    <div className="space-y-4">
      {/* Matrix editor */}
      <div>
        <p className="text-xs text-center font-mono text-muted-foreground mb-1">Matrix A (edit to try your own)</p>
        <div className="border border-border rounded-lg overflow-hidden font-mono text-sm mx-auto" style={{ width: 'fit-content' }}>
          {mat.map((row, r) => (
            <div key={r} className="flex">
              {row.map((val, c) => (
                <input key={c} type="number" aria-label={`A row ${r + 1} col ${c + 1}`} value={val}
                  onChange={e => {
                    const nm = mat.map(r => [...r]);
                    nm[r][c] = Number(e.target.value);
                    setMat(nm);
                    setStepIdx(0);
                  }}
                  className="w-14 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Step label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
          Step {safeIdx + 1}/{steps.length}
        </span>
        <span className="text-xs text-muted-foreground">{step.label}</span>
        <button onClick={() => setStepIdx(0)}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* L and U */}
      <div className="flex gap-6 justify-center flex-wrap">
        <MatrixDisplay m={step.L} label="L (lower triangular)" highlightLower />
        <MatrixDisplay m={step.U} label="U (upper triangular)" />
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-3">
        <button aria-label="Previous step" onClick={() => setStepIdx(s => Math.max(0, s - 1))} disabled={safeIdx === 0}
          className="p-2 rounded-lg border border-border hover:bg-muted/60 disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button key={i} aria-label={`Go to step ${i + 1}`} onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === safeIdx ? 'bg-primary w-4' : 'bg-muted-foreground/30'}`} />
          ))}
        </div>
        <button aria-label="Next step" onClick={() => setStepIdx(s => Math.min(steps.length - 1, s + 1))} disabled={safeIdx === steps.length - 1}
          className="p-2 rounded-lg border border-border hover:bg-muted/60 disabled:opacity-40">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Blue = L entries (multipliers) · Purple = U entries (upper triangular) · A = L·U
      </p>
    </div>
  );
}
