// Utility functions for mathematical computations used in interactive diagrams

export interface EliminationStep {
  description: string;
  matrix: number[][];
  highlightRow?: number;
  pivotRow?: number;
  pivotCol?: number;
}

export function gaussianElimination(matrix: number[][], rhs: number[]): EliminationStep[] {
  const n = matrix.length;
  const m = matrix[0].length;
  // Build augmented matrix
  const aug: number[][] = matrix.map((row, i) => [...row, rhs[i]]);
  const steps: EliminationStep[] = [];

  steps.push({
    description: 'Initial augmented matrix',
    matrix: aug.map(r => [...r]),
  });

  let pivotRow = 0;
  for (let col = 0; col < m && pivotRow < n; col++) {
    // Find pivot
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < n; r++) {
      if (Math.abs(aug[r][col]) > Math.abs(aug[maxRow][col])) maxRow = r;
    }
    if (Math.abs(aug[maxRow][col]) < 1e-10) continue;

    if (maxRow !== pivotRow) {
      [aug[pivotRow], aug[maxRow]] = [aug[maxRow], aug[pivotRow]];
      steps.push({
        description: `Swap row ${pivotRow + 1} and row ${maxRow + 1}`,
        matrix: aug.map(r => [...r]),
        highlightRow: pivotRow,
        pivotRow,
        pivotCol: col,
      });
    }

    for (let r = pivotRow + 1; r < n; r++) {
      if (Math.abs(aug[r][col]) < 1e-10) continue;
      const factor = aug[r][col] / aug[pivotRow][col];
      const factorStr = factor % 1 === 0 ? factor.toString() : factor.toFixed(2);
      for (let c = col; c <= m; c++) {
        aug[r][c] -= factor * aug[pivotRow][c];
        if (Math.abs(aug[r][c]) < 1e-10) aug[r][c] = 0;
      }
      steps.push({
        description: `R${r + 1} ← R${r + 1} − (${factorStr})·R${pivotRow + 1}`,
        matrix: aug.map(row => [...row]),
        highlightRow: r,
        pivotRow,
        pivotCol: col,
      });
    }
    pivotRow++;
  }

  return steps;
}

export function roundMatrix(matrix: number[][], decimals = 4): number[][] {
  const factor = Math.pow(10, decimals);
  return matrix.map(row => row.map(v => Math.round(v * factor) / factor));
}

export function matMul(A: number[][], B: number[][]): number[][] {
  const m = A.length, n = B[0].length;
  return Array.from({ length: m }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      A[i].reduce((sum, _, l) => sum + A[i][l] * B[l][j], 0)
    )
  );
}

export function matVec(A: number[][], x: number[]): number[] {
  return A.map(row => row.reduce((sum, aij, j) => sum + aij * x[j], 0));
}

export function computeRank(matrix: number[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const mat = matrix.map(r => [...r]);
  let rank = 0;
  const rowUsed = new Array(rows).fill(false);

  for (let col = 0; col < cols; col++) {
    let pivotRow = -1;
    for (let row = 0; row < rows; row++) {
      if (!rowUsed[row] && Math.abs(mat[row][col]) > 1e-10) {
        pivotRow = row;
        break;
      }
    }
    if (pivotRow === -1) continue;
    rank++;
    rowUsed[pivotRow] = true;
    for (let row = 0; row < rows; row++) {
      if (row !== pivotRow && Math.abs(mat[row][col]) > 1e-10) {
        const factor = mat[row][col] / mat[pivotRow][col];
        for (let c = col; c < cols; c++) {
          mat[row][c] -= factor * mat[pivotRow][c];
          if (Math.abs(mat[row][c]) < 1e-10) mat[row][c] = 0;
        }
      }
    }
  }
  return rank;
}

export function det2x2(m: [[number,number],[number,number]]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function inverse2x2(m: [[number,number],[number,number]]): [[number,number],[number,number]] | null {
  const d = det2x2(m);
  if (Math.abs(d) < 1e-10) return null;
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d],
  ];
}
