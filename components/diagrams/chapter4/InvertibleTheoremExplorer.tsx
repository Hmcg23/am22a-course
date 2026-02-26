'use client';
import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface InvertibleTheoremExplorerProps {
  matrixSize?: 2 | 3;
}

const PROPERTIES = [
  { id: 'invertible', label: 'A is invertible', desc: 'There exists A⁻¹ such that AA⁻¹ = A⁻¹A = I' },
  { id: 'det', label: 'det(A) ≠ 0', desc: 'The determinant is nonzero' },
  { id: 'rank', label: 'rank(A) = n', desc: 'A has full rank (all columns are pivot columns)' },
  { id: 'nullspace', label: 'Null(A) = {0}', desc: 'The null space contains only the zero vector' },
  { id: 'cols_indep', label: 'Columns are linearly independent', desc: 'No column is a linear combination of others' },
  { id: 'cols_span', label: 'Columns span ℝⁿ', desc: 'Every b has at least one solution to Ax = b' },
  { id: 'bijective', label: 'T(x) = Ax is bijective', desc: 'The linear map is both injective and surjective' },
  { id: 'unique_sol', label: 'Ax = b has a unique solution', desc: 'For every b, there is exactly one solution' },
  { id: 'rref', label: 'RREF(A) = I', desc: 'Row-reducing A gives the identity matrix' },
  { id: 'rows_indep', label: 'Rows are linearly independent', desc: 'The rows also form a basis for ℝⁿ' },
];

export default function InvertibleTheoremExplorer({ matrixSize = 2 }: InvertibleTheoremExplorerProps) {
  const [mat, setMat] = useState<number[][]>(
    matrixSize === 2
      ? [[2, 1], [1, 3]]
      : [[1, 0, 0], [0, 2, 0], [0, 0, 3]]
  );

  // Compute determinant
  const det2 = (m: number[][]) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const det3 = (m: number[][]) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

  const detVal = matrixSize === 2 ? det2(mat) : det3(mat);
  const matIsInvertible = Math.abs(detVal) > 0.01;
  const shown = matIsInvertible;

  return (
    <div className="space-y-4">
      {/* Matrix editor */}
      <div className="flex items-start gap-6 justify-center flex-wrap">
        <div>
          <p className="text-xs text-center font-mono text-muted-foreground mb-1">Matrix A ({matrixSize}×{matrixSize})</p>
          <div className="border border-border rounded-lg overflow-hidden font-mono text-sm">
            {mat.map((row, r) => (
              <div key={r} className="flex">
                {row.map((val, c) => (
                  <input key={c} type="number" aria-label={`A row ${r + 1} col ${c + 1}`} value={val}
                    onChange={e => {
                      const nm = mat.map(r => [...r]);
                      nm[r][c] = Number(e.target.value);
                      setMat(nm);
                    }}
                    className="w-14 text-center py-1.5 border-r border-b last:border-r-0 border-border bg-background focus:outline-none focus:bg-primary/5"
                  />
                ))}
              </div>
            ))}
          </div>
          <p className="text-xs font-mono mt-1 text-center">
            det = <span className={Math.abs(detVal) < 0.01 ? 'text-red-500' : 'text-emerald-600'}>{detVal.toFixed(2)}</span>
          </p>
        </div>

        <div className={`mt-5 px-4 py-3 rounded-xl border-2 text-sm font-semibold ${
          shown
            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
            : 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
        }`}>
          {shown ? '✓ Invertible' : '✗ Singular (not invertible)'}
        </div>
      </div>

      {/* Properties grid */}
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground text-center font-semibold uppercase tracking-wide mb-2">
          Invertible Matrix Theorem — all 10 properties are equivalent
        </p>
        <div className="grid gap-1.5">
          {PROPERTIES.map(p => (
            <div
              key={p.id}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-all ${
                shown
                  ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10'
                  : 'border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10'
              }`}
            >
              {shown
                ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                : <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              }
              <div>
                <p className="text-xs font-semibold">{p.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Edit the matrix — when det ≠ 0, all 10 properties hold simultaneously
      </p>
    </div>
  );
}
