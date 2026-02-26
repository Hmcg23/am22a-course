'use client';
import dynamic from 'next/dynamic';
import type { DiagramConfig, DiagramPropsMap } from '@/data/types';

const LineSlider = dynamic(() => import('./chapter1/LineSlider'), { ssr: false });
const LineIntersection = dynamic(() => import('./chapter1/LineIntersection'), { ssr: false });
const PlaneVisualization3D = dynamic(() => import('./chapter1/PlaneVisualization3D'), { ssr: false });
const GaussianEliminationAnimator = dynamic(() => import('./chapter1/GaussianEliminationAnimator'), { ssr: false });
const BackSubstitutionAnimator = dynamic(() => import('./chapter1/BackSubstitutionAnimator'), { ssr: false });
const VectorAddition2D = dynamic(() => import('./chapter2/VectorAddition2D'), { ssr: false });
const SpanVisualizer2D = dynamic(() => import('./chapter2/SpanVisualizer2D'), { ssr: false });
const LinearDependenceChecker = dynamic(() => import('./chapter2/LinearDependenceChecker'), { ssr: false });
const MatrixVectorMultiplication = dynamic(() => import('./chapter3/MatrixVectorMultiplication'), { ssr: false });
const RankNullityVisualizer = dynamic(() => import('./chapter3/RankNullityVisualizer'), { ssr: false });
const TransformationGrid = dynamic(() => import('./chapter4/TransformationGrid'), { ssr: false });
const MatrixProductAnimator = dynamic(() => import('./chapter4/MatrixProductAnimator'), { ssr: false });
const InvertibleTheoremExplorer = dynamic(() => import('./chapter4/InvertibleTheoremExplorer'), { ssr: false });
const LUDecompositionAnimator = dynamic(() => import('./chapter4/LUDecompositionAnimator'), { ssr: false });
const TransformationComposition = dynamic(() => import('./chapter4/TransformationComposition'), { ssr: false });

function DiagramShell({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="diagram-container shadow-sm">
      {title && (
        <div className="px-4 py-2.5 border-b border-border bg-muted/30">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function DiagramRegistry({ config }: { config: DiagramConfig }) {
  if (!config) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapDiagram = (Component: React.ComponentType<any>, props: Record<string, unknown>, title?: string) => (
    <DiagramShell title={title || 'Interactive Diagram'}>
      <Component {...props} />
    </DiagramShell>
  );

  switch (config.type) {
    case 'LineSlider':
      return wrapDiagram(LineSlider, config.props, 'Interactive Line Explorer');
    case 'LineIntersection':
      return wrapDiagram(LineIntersection, config.props, 'Line Intersection Cases');
    case 'PlaneVisualization3D':
      return wrapDiagram(PlaneVisualization3D, config.props, (config.props as DiagramPropsMap['PlaneVisualization3D']).title || '3D Plane Visualization');
    case 'GaussianEliminationAnimator':
      return wrapDiagram(GaussianEliminationAnimator, config.props, 'Gaussian Elimination — Step by Step');
    case 'BackSubstitutionAnimator':
      return wrapDiagram(BackSubstitutionAnimator, config.props, 'Back Substitution Animator');
    case 'VectorAddition2D':
      return wrapDiagram(VectorAddition2D, config.props, 'Vector Addition');
    case 'SpanVisualizer2D':
      return wrapDiagram(SpanVisualizer2D, config.props, 'Span Visualizer');
    case 'LinearDependenceChecker':
      return wrapDiagram(LinearDependenceChecker, config.props, 'Linear Dependence Explorer');
    case 'MatrixVectorMultiplication':
      return wrapDiagram(MatrixVectorMultiplication, config.props, 'Matrix-Vector Multiplication');
    case 'RankNullityVisualizer':
      return wrapDiagram(RankNullityVisualizer, config.props, 'Rank-Nullity Theorem');
    case 'TransformationGrid':
      return wrapDiagram(TransformationGrid, config.props, 'Linear Transformation Visualizer');
    case 'MatrixProductAnimator':
      return wrapDiagram(MatrixProductAnimator, config.props, 'Matrix Product — Column Perspective');
    case 'InvertibleTheoremExplorer':
      return wrapDiagram(InvertibleTheoremExplorer, config.props, 'Invertible Matrix Theorem');
    case 'LUDecompositionAnimator':
      return wrapDiagram(LUDecompositionAnimator, config.props, 'LU Decomposition Animator');
    case 'TransformationComposition':
      return wrapDiagram(TransformationComposition, config.props, 'Composition: v → Bv → A(Bv)');
    default:
      return null;
  }
}
