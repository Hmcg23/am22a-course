'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface GaussianEliminationAnimatorProps {
  matrix: number[][];
  rhs: number[];
}

interface Step {
  label: string;
  matrix: number[][];
  rhs: number[];
  pivotRow?: number;
  pivotCol?: number;
  eliminateRow?: number;
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, '');
}

function generateSteps(initMatrix: number[][], initRhs: number[]): Step[] {
  const steps: Step[] = [];
  const rows = initMatrix.length;
  const cols = initMatrix[0]?.length ?? 0;

  const mat = initMatrix.map(r => [...r]);
  const rhs = [...initRhs];

  steps.push({ label: 'Initial augmented matrix', matrix: mat.map(r => [...r]), rhs: [...rhs] });

  for (let col = 0; col < cols; col++) {
    // Find pivot
    let pivotRow = -1;
    for (let row = col; row < rows; row++) {
      if (Math.abs(mat[row][col]) > 1e-10) { pivotRow = row; break; }
    }
    if (pivotRow === -1) continue;

    // Swap if needed
    if (pivotRow !== col) {
      [mat[col], mat[pivotRow]] = [mat[pivotRow], mat[col]];
      [rhs[col], rhs[pivotRow]] = [rhs[pivotRow], rhs[col]];
      steps.push({
        label: `Swap R${col + 1} ↔ R${pivotRow + 1}`,
        matrix: mat.map(r => [...r]),
        rhs: [...rhs],
        pivotRow: col,
      });
    }

    // Eliminate below
    for (let row = col + 1; row < rows; row++) {
      if (Math.abs(mat[row][col]) < 1e-10) continue;
      const factor = mat[row][col] / mat[col][col];
      const factorStr = formatNum(factor);
      for (let c = 0; c < cols; c++) {
        mat[row][c] -= factor * mat[col][c];
      }
      rhs[row] -= factor * rhs[col];
      steps.push({
        label: `R${row + 1} ← R${row + 1} − ${factorStr}·R${col + 1}`,
        matrix: mat.map(r => [...r]),
        rhs: [...rhs],
        pivotRow: col,
        pivotCol: col,
        eliminateRow: row,
      });
    }
  }

  steps.push({ label: 'Row echelon form achieved', matrix: mat.map(r => [...r]), rhs: [...rhs] });
  return steps;
}

export default function GaussianEliminationAnimator({ matrix, rhs }: GaussianEliminationAnimatorProps) {
  const steps = generateSteps(matrix, rhs);
  const [stepIdx, setStepIdx] = useState(0);

  const step = steps[stepIdx];
  const rows = step.matrix.length;
  const cols = step.matrix[0]?.length ?? 0;

  return (
    <div className="space-y-4">
      {/* Step label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full">
          Step {stepIdx + 1} of {steps.length}
        </span>
        <span className="text-xs text-muted-foreground font-medium">{step.label}</span>
        <button
          onClick={() => setStepIdx(0)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Augmented matrix */}
      <div className="overflow-x-auto">
        <div className="inline-block border border-border rounded-xl overflow-hidden font-mono text-sm">
          <table className="border-collapse">
            <tbody>
              {step.matrix.map((row, r) => (
                <tr key={r}>
                  {row.map((val, c) => (
                    <td
                      key={c}
                      className={`px-4 py-2.5 text-center min-w-[60px] border-border ${
                        r === step.eliminateRow ? 'bg-red-50 dark:bg-red-950/20' :
                        r === step.pivotRow ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''
                      } ${c < cols - 1 ? 'border-r' : ''} ${r < rows - 1 ? 'border-b' : ''}`}
                    >
                      {r === step.eliminateRow && c === step.pivotCol
                        ? <span className="text-red-600 dark:text-red-400 font-bold">{formatNum(val)}</span>
                        : r === step.pivotRow && c === step.pivotCol
                        ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatNum(val)}</span>
                        : formatNum(val)}
                    </td>
                  ))}
                  {/* Separator */}
                  <td className={`px-2 text-muted-foreground border-r border-l border-border ${r < rows - 1 ? 'border-b' : ''}`}>│</td>
                  {/* RHS */}
                  <td className={`px-4 py-2.5 text-center min-w-[60px] ${
                    r === step.eliminateRow ? 'bg-red-50 dark:bg-red-950/20' :
                    r === step.pivotRow ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''
                  } ${r < rows - 1 ? 'border-b border-border' : ''}`}>
                    {formatNum(step.rhs[r])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          aria-label="Previous step"
          onClick={() => setStepIdx(s => Math.max(0, s - 1))}
          disabled={stepIdx === 0}
          className="p-2 rounded-lg border border-border hover:bg-muted/60 disabled:opacity-40 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to step ${i + 1}`}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === stepIdx ? 'bg-primary w-4' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
        <button
          aria-label="Next step"
          onClick={() => setStepIdx(s => Math.min(steps.length - 1, s + 1))}
          disabled={stepIdx === steps.length - 1}
          className="p-2 rounded-lg border border-border hover:bg-muted/60 disabled:opacity-40 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Green row = pivot row · Red row = row being eliminated
      </p>
    </div>
  );
}
