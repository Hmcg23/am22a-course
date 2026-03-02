# Linear Algebra Interactive Course — Project Guide

## Quick Reference

- **Framework**: Next.js 14, App Router, static export
- **React**: 18 (NOT 19 — `@react-three/fiber@8` requires it)
- **Install**: always `npm install --legacy-peer-deps`
- **Build**: `npx next build` — must exit 0 with 70+ static pages
- **Fonts**: Newsreader (primary body serif), DM Serif Text (headings h1-h3), Inter (UI/fallback sans), JetBrains Mono (code/math)
- **Colors**: Deep forest green primary, lime accent, Notion warm white background (see `globals.css`)

## UI Design System (Notion-inspired)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background` | `0 0% 100%` (#FFFFFF) | `0 0% 10%` (#191919) | Page background |
| `--sidebar` | `60 40% 98%` (#FBFBFA) | `0 0% 13%` (#202020) | Sidebar background |
| `--foreground` | `45 8% 20%` (#37352F) | `0 0% 83%` (#D4D4D4) | Body text |
| `--muted-foreground` | `45 2% 46%` (#787774) | `0 0% 61%` (#9B9B9B) | Secondary text |
| `--border` | `45 10% 92%` (#EDECE9) | `0 0% 18%` (#2F2F2F) | Dividers, card borders |
| `--primary` | `150 42% 18%` (forest green) | `76 65% 55%` (lime) | Buttons, active links |
| `--accent` | `76 65% 57%` (lime) | `76 65% 55%` (lime) | Highlights |
| `--radius` | `0.5rem` (8px) | same | All border-radius |
| `--bg-hover` | `rgba(55,53,47,0.08)` | `rgba(255,255,255,0.055)` | Hover overlay |
| `--shadow-el1` | Notion elevation 1 | Notion dark el1 | Cards, dropdowns |
| `--shadow-el2` | Notion elevation 2 | Notion dark el2 | Modals, popovers |

### Layout Measurements
- **Sidebar width**: `w-60` (240px)
- **Top bar height**: `h-[45px]`
- **Content max-width**: `max-w-[900px]`
- **Sidebar item padding**: `px-2 py-1.5` (chapter headers), `px-2 py-1` (section links)
- **Transition duration**: `duration-100` (Notion-like snappy feel)

### Border Radius Convention
- Sidebar items, buttons, section cards: `rounded` (4px = var(--radius)/2 approx) or `rounded-lg` (8px)
- Content panels (formal blocks, common mistakes, why it matters): `rounded-lg`
- Inline badges/pills: `rounded-full`
- **Avoid**: `rounded-2xl`, `rounded-3xl` — not part of the Notion design language

### Shadows
- Use `shadow-el1` on hover for chapter cards (replaces `hover:shadow-md`)
- Do not add shadows to flat panels; Notion relies on borders + color contrast

---

## How to Add a New Chapter

Adding a chapter requires changes to exactly 5 areas. Follow this template precisely.

### Step 1: Create the Chapter Data File

Create `data/chapter{N}.ts`. This is the largest file — it contains ALL content for the chapter.

```typescript
// data/chapter5.ts
import type { ChapterMeta } from './types';

const chapter5: ChapterMeta = {
  id: '5',
  title: 'Chapter Title',
  subtitle: 'A Short Subtitle',
  description: 'One or two sentences describing the chapter.',
  color: 'amber',           // Tailwind color name for chapter accent
  accentHex: '#F59E0B',     // Hex value of that color (used for inline styles)
  sections: [
    // Each section follows this exact shape:
    {
      id: '5-1',                    // Format: "{chapterId}-{sectionIndex}"
      chapterId: '5',
      sectionNumber: '5.1',
      title: 'Section Title',
      estimatedMinutes: 10,

      // 1. Plain English explanation (markdown + $LaTeX$ supported)
      plainEnglish: [
        'First paragraph. Use **bold** for key terms. Use $a_1 x_1 + a_2 x_2 = b$ for inline math.',
        'Second paragraph. Use $$...notation...$$ for display math.',
      ],

      // 2. Formal definitions/theorems (rendered in styled panels)
      formalView: [
        {
          type: 'definition',   // 'definition' | 'theorem' | 'lemma' | 'example' | 'corollary' | 'remark'
          label: 'Definition 5.1',
          title: 'Optional Title',
          content: 'Content with $LaTeX$ and **markdown**.',
          note: 'Optional footnote text.',
        },
      ],

      // 3. Interactive diagram (OPTIONAL — omit if section has none)
      diagram: {
        type: 'DiagramTypeName',     // Must match a DiagramType in types.ts
        props: { /* props matching DiagramPropsMap[DiagramTypeName] */ },
      },

      // 4. Why it matters
      whyItMatters: {
        context: 'One sentence of context.',
        applications: [
          'Real-world application 1',
          'Real-world application 2',
          'Real-world application 3',
        ],
      },

      // 5. YouTube resources (2-3 per section)
      resources: [
        {
          title: 'Video Title',
          channel: 'Channel Name',
          url: 'https://www.youtube.com/watch?v=...',
          durationMinutes: 10,
          description: 'One sentence describing the video.',
        },
      ],

      // 6. Quiz questions (1-3 per section)
      quiz: [
        {
          id: '5-1-q1',             // Format: "{sectionId}-q{index}"
          type: 'multiple-choice',   // 'multiple-choice' | 'true-false' | 'short-answer'
          question: 'Question text with $LaTeX$?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 1,          // 0-indexed for multiple-choice, boolean for true-false, string for short-answer
          explanation: 'Explanation shown after answering.',
        },
      ],

      // 7. Common mistakes (2-4 bullets)
      commonMistakes: [
        'Mistake description 1.',
        'Mistake description 2.',
      ],
    },
    // ... more sections
  ],
};

export default chapter5;
```

### Step 2: Register the Chapter in courseStructure.ts

```typescript
// data/courseStructure.ts — add two lines:
import chapter5 from './chapter5';                                    // ADD import
// ...
export const courseStructure: CourseStructure = {
  title: 'Linear Algebra',
  subtitle: 'An Interactive Journey from Equations to Structure',
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5],       // ADD to array
};
// ...
export { chapter1, chapter2, chapter3, chapter4, chapter5 };          // ADD to re-export
```

### Step 3: Add Chapter Colors to UI Components

Three files have hardcoded per-chapter color mappings. Add an entry for the new chapter ID in each:

**`components/layout/Sidebar.tsx`** — two maps:
```typescript
const chapterColors: Record<string, string> = {
  // ...existing...
  '5': 'text-amber-600 dark:text-amber-400',
};

const chapterBg: Record<string, string> = {
  // ...existing...
  '5': 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
};
```

**`components/section/SectionTemplate.tsx`** — one map:
```typescript
const chapterAccent: Record<string, string> = {
  // ...existing...
  '5': 'text-amber-600 dark:text-amber-400',
};
```

**`app/chapter/[chapterId]/page.tsx`** — one map:
```typescript
const chapterColors: Record<string, { text: string; bg: string; border: string; accent: string }> = {
  // ...existing...
  '5': { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-200 dark:border-amber-800', accent: '#F59E0B' },
};
```

**`app/page.tsx`** — three maps:
```typescript
const chapterGradients: Record<string, string> = {
  // ...existing...
  '5': 'from-amber-500/10 to-amber-600/5 border-amber-200 dark:border-amber-800',
};

const chapterAccent: Record<string, string> = {
  // ...existing...
  '5': 'bg-amber-500',
};

const chapterText: Record<string, string> = {
  // ...existing...
  '5': 'text-amber-600 dark:text-amber-400',
};
```

### Step 4: Create Diagram Components (if any)

If the chapter has interactive diagrams:

1. **Create the component** at `components/diagrams/chapter{N}/{DiagramName}.tsx`
   - Must be a `'use client'` component
   - Must `export default function DiagramName(props) { ... }`
   - Use HTML Canvas 2D for 2D visualizations, `@react-three/fiber` for 3D
   - All inputs need `aria-label` (matrix cells) or `<label htmlFor>` (sliders)
   - All icon-only buttons need `aria-label`

2. **Add the diagram type** to `data/types.ts`:
   ```typescript
   // Add to DiagramType union:
   export type DiagramType = /* ...existing... */ | 'NewDiagramName';

   // Add to DiagramPropsMap:
   export interface DiagramPropsMap {
     // ...existing...
     NewDiagramName: { prop1: type1; prop2?: type2 };
   }
   ```

3. **Register in DiagramRegistry** at `components/diagrams/DiagramRegistry.tsx`:
   ```typescript
   // Add dynamic import at top:
   const NewDiagramName = dynamic(() => import('./chapter5/NewDiagramName'), { ssr: false });

   // Add case in switch:
   case 'NewDiagramName':
     return wrapDiagram(NewDiagramName, config.props, 'Diagram Display Title');
   ```

### Step 5: Verify

```bash
npx next build    # Must exit 0, page count should increase
```

---

## Existing Chapter Summary

| Ch | Title | Sections | Color | Diagrams |
|----|-------|----------|-------|----------|
| 1 | Linear Systems | 14 (1.1–1.14) | blue | LineSlider, LineIntersection, PlaneVisualization3D, GaussianEliminationAnimator, BackSubstitutionAnimator |
| 2 | Vectors, Span, and the Language of LA | 17 (2.1–2.17) | emerald | VectorAddition2D, SpanVisualizer2D, LinearDependenceChecker |
| 3 | Matrices, Linear Maps, Rank, Nullity | 17 (3.1–3.17) | violet | MatrixVectorMultiplication, RankNullityVisualizer |
| 4 | Matrix Algebra, Invertibility, LU | 13 (4.1–4.13) | rose | TransformationGrid, MatrixProductAnimator, InvertibleTheoremExplorer, LUDecompositionAnimator, TransformationComposition |

## Section Data Shape (SectionContent)

Every section requires ALL of these fields (diagram is optional):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `string` | yes | Format `"{chapterId}-{n}"`, e.g. `"3-7"` |
| `chapterId` | `string` | yes | Must match parent chapter |
| `sectionNumber` | `string` | yes | Format `"{chapterId}.{n}"`, e.g. `"3.7"` |
| `title` | `string` | yes | Section heading |
| `estimatedMinutes` | `number` | yes | Reading time estimate |
| `plainEnglish` | `string[]` | yes | Paragraphs (markdown + $LaTeX$) |
| `formalView` | `FormalBlock[]` | yes | At least one definition/theorem |
| `diagram` | `DiagramConfig` | no | Omit entirely if no diagram |
| `whyItMatters` | `WhyItMattersBlock` | yes | Context + 3-4 applications |
| `resources` | `ResourceCard[]` | yes | 2-3 YouTube links |
| `quiz` | `QuizQuestion[]` | yes | 1-3 questions |
| `commonMistakes` | `string[]` | yes | 2-4 bullet points |

## Quiz Question Types

```typescript
// Multiple choice (most common):
{ id: '5-1-q1', type: 'multiple-choice', question: '...', options: ['A','B','C','D'], correctAnswer: 2, explanation: '...' }

// True/false:
{ id: '5-1-q2', type: 'true-false', question: '...', correctAnswer: true, explanation: '...' }

// Short answer:
{ id: '5-1-q3', type: 'short-answer', question: '...', correctAnswer: '42', acceptableAnswers: ['42', 'forty-two'], explanation: '...' }
```

## Diagram Component Template

```typescript
// components/diagrams/chapter5/MyDiagram.tsx
'use client';
import { useState, useRef, useEffect } from 'react';

interface MyDiagramProps {
  initialValue?: number;
}

const W = 380, H = 320, CX = W / 2, CY = H / 2, SCALE = 40;

export default function MyDiagram({ initialValue = 1 }: MyDiagramProps) {
  const [value, setValue] = useState(initialValue);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(CX + x * SCALE, 0); ctx.lineTo(CX + x * SCALE, H); ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath(); ctx.moveTo(0, CY + y * SCALE); ctx.lineTo(W, CY + y * SCALE); ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    // Custom drawing here...

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const sliderId = 'mydiagram-value';

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H}
        className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="flex items-center gap-3 max-w-md mx-auto">
        <label htmlFor={sliderId} className="text-xs font-mono text-muted-foreground w-6">val</label>
        <input id={sliderId} type="range" min={-5} max={5} step={0.5} value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="flex-1 accent-blue-500" />
        <span className="text-xs font-mono w-8 text-right text-foreground">{value}</span>
      </div>
    </div>
  );
}
```

Key conventions for diagram components:
- Range slider inputs: use `<label htmlFor={id}>` + `id` on the input
- Matrix number inputs: use `aria-label={`A row ${r+1} col ${c+1}`}`
- Icon-only buttons: use `aria-label="Previous step"` etc.
- Module-level constants (W, H, CX, CY, SCALE) are NOT react state — add eslint-disable for useEffect deps if needed
- Use `drawArrow()` helper for vector arrows (copy pattern from existing diagrams)

## File Rendering Pipeline

```
data/chapter{N}.ts
  → data/courseStructure.ts (combines all chapters)
  → app/chapter/[chapterId]/[sectionId]/page.tsx (loads section via getSectionById)
  → components/section/SectionTemplate.tsx (renders all 7 blocks in order)
    → PlainEnglishBlock (markdown + LaTeX)
    → FormalViewBlock (definition/theorem panels)
    → DiagramRegistry (dynamic import → specific diagram component)
    → WhyItMattersBlock
    → ResourceCards
    → Quiz (with localStorage persistence via useProgress hook)
    → CommonMistakesBlock
```

## ESLint / TypeScript Gotchas

- `react-katex` has no @types — custom declaration at `types/react-katex.d.ts`
- `next-themes` ThemeProviderProps: use `ComponentProps<typeof NextThemesProvider>`
- `@react-three/drei` v10 requires React 19 — use v9 with `--legacy-peer-deps`
- Canvas constants (W, H, CX, CY, SCALE) are module-level, not deps — use `eslint-disable-next-line react-hooks/exhaustive-deps`
- LU decomposition L matrix: explicitly type as `const L: number[][] = ...` to avoid `(0|1)[][]` inference
