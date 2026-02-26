// ============================================================
// DIAGRAM SYSTEM
// ============================================================

export type DiagramType =
  | 'LineSlider'
  | 'LineIntersection'
  | 'PlaneVisualization3D'
  | 'GaussianEliminationAnimator'
  | 'BackSubstitutionAnimator'
  | 'VectorAddition2D'
  | 'SpanVisualizer2D'
  | 'LinearDependenceChecker'
  | 'MatrixVectorMultiplication'
  | 'RankNullityVisualizer'
  | 'TransformationGrid'
  | 'MatrixProductAnimator'
  | 'InvertibleTheoremExplorer'
  | 'LUDecompositionAnimator'
  | 'TransformationComposition';

export interface LineIntersectionSystem {
  label: string;
  equations: [[number, number, number], [number, number, number]];
  type: 'unique' | 'none' | 'infinite';
}

export interface DiagramPropsMap {
  LineSlider: { defaultA?: number; defaultB?: number; defaultC?: number };
  LineIntersection: { systems: LineIntersectionSystem[] };
  PlaneVisualization3D: {
    planes: Array<{ normal: [number, number, number]; constant: number; color: string; label: string }>;
    title?: string;
  };
  GaussianEliminationAnimator: {
    matrix: number[][];
    rhs: number[];
  };
  BackSubstitutionAnimator: {
    augmentedMatrix: number[][];
    basicVars: number[];
    freeVars: number[];
    solution?: string[];
  };
  VectorAddition2D: { vectorA: [number, number]; vectorB: [number, number] };
  SpanVisualizer2D: {
    initialVectors?: Array<[number, number]>;
  };
  LinearDependenceChecker: { initialVectors?: Array<[number, number]> };
  MatrixVectorMultiplication: { matrix: number[][]; vector?: number[] };
  RankNullityVisualizer: { initialMatrix?: number[][] };
  TransformationGrid: { initialMatrix?: [[number, number], [number, number]] };
  MatrixProductAnimator: { matrixA?: number[][]; matrixB?: number[][] };
  InvertibleTheoremExplorer: { matrixSize?: 2 | 3 };
  LUDecompositionAnimator: { matrix?: number[][] };
  TransformationComposition: { matrixA?: number[][]; matrixB?: number[][] };
}

export type DiagramConfig = {
  [K in DiagramType]: { type: K; props: DiagramPropsMap[K] };
}[DiagramType];

// ============================================================
// CONTENT BLOCKS
// ============================================================

export type FormalBlockType = 'definition' | 'theorem' | 'lemma' | 'example' | 'corollary' | 'remark';

export interface FormalBlock {
  type: FormalBlockType;
  label: string;
  title?: string;
  content: string;
  note?: string;
}

export interface WhyItMattersBlock {
  context: string;
  applications: string[];
}

export interface ResourceCard {
  title: string;
  channel: string;
  url: string;
  durationMinutes: number;
  description: string;
}

// ============================================================
// QUIZ SYSTEM
// ============================================================

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // 0-indexed
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswer: string;
  acceptableAnswers?: string[];
}

export type QuizQuestion = MultipleChoiceQuestion | TrueFalseQuestion | ShortAnswerQuestion;

// ============================================================
// SECTION
// ============================================================

export interface SectionContent {
  id: string;           // e.g. "1-2"
  chapterId: string;    // "1"
  sectionNumber: string; // "1.2"
  title: string;
  estimatedMinutes: number;
  plainEnglish: string[];   // Paragraphs with markdown + $LaTeX$
  formalView: FormalBlock[];
  diagram?: DiagramConfig;
  whyItMatters: WhyItMattersBlock;
  resources: ResourceCard[];
  quiz: QuizQuestion[];
  commonMistakes: string[];
}

// ============================================================
// CHAPTER
// ============================================================

export interface ChapterMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;   // Tailwind color class e.g. "blue"
  accentHex: string;
  sections: SectionContent[];
}

// ============================================================
// COURSE
// ============================================================

export interface CourseStructure {
  title: string;
  subtitle: string;
  chapters: ChapterMeta[];
}

// ============================================================
// PROGRESS (localStorage)
// ============================================================

export interface QuizAttempt {
  answer: string | number | boolean;
  correct: boolean;
  attemptedAt: string;
}

export interface CourseProgress {
  completedSections: string[];
  quizResults: {
    [sectionId: string]: {
      [questionId: string]: QuizAttempt;
    };
  };
  lastVisited: string;
  bookmarkedSections: string[];
}
