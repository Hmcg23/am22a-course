'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface BackSubstitutionAnimatorProps {
  augmentedMatrix: number[][];
  basicVars: number[];
  freeVars: number[];
  solution?: string[];
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, '');
}

export default function BackSubstitutionAnimator({
  augmentedMatrix,
  basicVars,
  freeVars,
  solution,
}: BackSubstitutionAnimatorProps) {
  const rows = augmentedMatrix.length;
  const cols = augmentedMatrix[0]?.length ?? 0;
  const numVars = cols - 1;

  const steps = [
    {
      label: 'Row echelon form — identify pivot positions',
      highlightRow: -1,
      solvedVars: [] as number[],
    },
    ...basicVars.map((_, i) => ({
      label: `Back-substitute: solve for x${basicVars[basicVars.length - 1 - i] + 1}`,
      highlightRow: basicVars.length - 1 - i,
      solvedVars: basicVars.slice(basicVars.length - i),
    })),
    {
      label: solution ? 'Solution found!' : 'General solution expressed',
      highlightRow: -1,
      solvedVars: [...basicVars],
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  const step = steps[stepIdx];

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

      {/* Variable classification */}
      <div className="flex gap-3 text-xs font-mono">
        <div className="flex gap-1 flex-wrap">
          <span className="text-muted-foreground">Basic:</span>
          {basicVars.map(v => (
            <span key={v} className={`px-2 py-0.5 rounded-md font-bold ${
              step.solvedVars.includes(v)
                ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
            }`}>x{v + 1}</span>
          ))}
        </div>
        {freeVars.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-muted-foreground">Free:</span>
            {freeVars.map(v => (
              <span key={v} className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-bold">x{v + 1}</span>
            ))}
          </div>
        )}
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <div className="inline-block border border-border rounded-xl overflow-hidden font-mono text-sm">
          <table className="border-collapse">
            <thead>
              <tr className="bg-muted/40">
                {Array.from({ length: numVars }).map((_, c) => (
                  <th key={c} className={`px-4 py-1.5 text-center text-xs font-semibold border-r border-border ${
                    basicVars.includes(c) ? 'text-blue-600 dark:text-blue-400' :
                    freeVars.includes(c) ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'
                  }`}>
                    x{c + 1}
                  </th>
                ))}
                <th className="px-2 border-r border-l border-border text-muted-foreground">│</th>
                <th className="px-4 py-1.5 text-xs font-semibold text-muted-foreground">b</th>
              </tr>
            </thead>
            <tbody>
              {augmentedMatrix.map((row, r) => (
                <tr key={r} className={r === step.highlightRow ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}>
                  {row.slice(0, -1).map((val, c) => (
                    <td key={c} className={`px-4 py-2.5 text-center border-r border-border ${r < rows - 1 ? 'border-b' : ''}`}>
                      {formatNum(val)}
                    </td>
                  ))}
                  <td className={`px-2 text-muted-foreground border-r border-l border-border ${r < rows - 1 ? 'border-b' : ''}`}>│</td>
                  <td className={`px-4 py-2.5 text-center ${r < rows - 1 ? 'border-b border-border' : ''}`}>
                    {formatNum(row[row.length - 1])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solution display */}
      {stepIdx === steps.length - 1 && solution && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Solution:</p>
          <div className="space-y-1">
            {solution.map((s, i) => (
              <p key={i} className="text-sm font-mono text-emerald-800 dark:text-emerald-200">{s}</p>
            ))}
          </div>
        </div>
      )}

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
            <button key={i} aria-label={`Go to step ${i + 1}`} onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === stepIdx ? 'bg-primary w-4' : 'bg-muted-foreground/30'}`} />
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
    </div>
  );
}
