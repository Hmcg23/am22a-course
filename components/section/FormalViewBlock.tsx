'use client';
import { InlineMath, BlockMath } from 'react-katex';
import { BookMarked, Lightbulb, FlaskConical, ChevronRight } from 'lucide-react';
import type { FormalBlock, FormalBlockType } from '@/data/types';
import { cn } from '@/lib/utils';

const typeConfig: Record<FormalBlockType, {
  label: string;
  icon: React.ElementType;
  bg: string;
  border: string;
  labelColor: string;
}> = {
  definition: {
    label: 'Definition',
    icon: BookMarked,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    labelColor: 'text-blue-700 dark:text-blue-300',
  },
  theorem: {
    label: 'Theorem',
    icon: Lightbulb,
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    labelColor: 'text-amber-700 dark:text-amber-300',
  },
  lemma: {
    label: 'Lemma',
    icon: ChevronRight,
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-200 dark:border-violet-800',
    labelColor: 'text-violet-700 dark:text-violet-300',
  },
  example: {
    label: 'Example',
    icon: FlaskConical,
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    labelColor: 'text-emerald-700 dark:text-emerald-300',
  },
  corollary: {
    label: 'Corollary',
    icon: ChevronRight,
    bg: 'bg-sky-50 dark:bg-sky-950/30',
    border: 'border-sky-200 dark:border-sky-800',
    labelColor: 'text-sky-700 dark:text-sky-300',
  },
  remark: {
    label: 'Remark',
    icon: Lightbulb,
    bg: 'bg-slate-50 dark:bg-slate-900/50',
    border: 'border-slate-200 dark:border-slate-700',
    labelColor: 'text-slate-600 dark:text-slate-400',
  },
};

function renderMathContent(content: string) {
  // Split on $$ ... $$ for block math, $ ... $ for inline
  const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2).trim();
      return <BlockMath key={i} math={math} />;
    }
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const math = part.slice(1, -1);
      return <InlineMath key={i} math={math} />;
    }
    // Render bold **...** within text
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {boldParts.map((bp, j) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return <strong key={j} className="font-semibold">{bp.slice(2, -2)}</strong>;
          }
          return <span key={j}>{bp}</span>;
        })}
      </span>
    );
  });
}

function FormalBlockCard({ block }: { block: FormalBlock }) {
  const config = typeConfig[block.type] || typeConfig.remark;
  const Icon = config.icon;

  return (
    <div className={cn('rounded-2xl border p-5', config.bg, config.border)}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn('h-4 w-4', config.labelColor)} />
        <span className={cn('text-xs font-semibold uppercase tracking-wider', config.labelColor)}>
          {block.label}
          {block.title && ` — ${block.title}`}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-foreground space-y-1 font-mono">
        {renderMathContent(block.content)}
      </div>
      {block.note && (
        <p className="mt-3 text-xs text-muted-foreground italic border-t border-current/10 pt-3">
          {block.note}
        </p>
      )}
    </div>
  );
}

export function FormalViewBlock({ blocks }: { blocks: FormalBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
        <span className="h-px flex-1 bg-border" />
        Formal View
        <span className="h-px flex-1 bg-border" />
      </h3>
      <div className="space-y-3">
        {blocks.map((block, i) => (
          <FormalBlockCard key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
