'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { courseStructure } from '@/data/courseStructure';
import { useProgress } from '@/hooks/useProgress';
import type { ChapterMeta } from '@/data/types';

const chapterColors: Record<string, string> = {
  '1': 'text-blue-600 dark:text-blue-400',
  '2': 'text-emerald-600 dark:text-emerald-400',
  '3': 'text-violet-600 dark:text-violet-400',
  '4': 'text-rose-600 dark:text-rose-400',
  '5': 'text-amber-600 dark:text-amber-400',
  '6': 'text-cyan-600 dark:text-cyan-400',
};

const chapterBg: Record<string, string> = {
  '1': 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
  '2': 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
  '3': 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800',
  '4': 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
  '5': 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
  '6': 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800',
};

function ChapterSection({ chapter, isOpen, onToggle }: {
  chapter: ChapterMeta;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const { isSectionComplete, getChapterProgress } = useProgress();
  const { completed, total } = getChapterProgress(chapter.id, chapter.sections.length);

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-all duration-100',
          'hover:bg-[var(--bg-hover)] group',
          isOpen && chapterBg[chapter.id]
        )}
      >
        <span className="flex-1 min-w-0">
          <span className={cn('text-xs font-medium tracking-wide uppercase', chapterColors[chapter.id])}>
            Chapter {chapter.id}
          </span>
          <p className="text-sm font-normal text-foreground truncate mt-0.5 leading-tight">
            {chapter.title}
          </p>
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-muted-foreground">{completed}/{total}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-border pl-3">
          {chapter.sections.map((section) => {
            const isActive = pathname === `/chapter/${chapter.id}/${section.id}`;
            const isDone = isSectionComplete(section.id);

            return (
              <Link
                key={section.id}
                href={`/chapter/${chapter.id}/${section.id}`}
                className={cn(
                  'flex items-center gap-2 px-2 py-1 rounded text-sm transition-all duration-100',
                  'hover:bg-[var(--bg-hover)] group',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-primary' : 'text-muted-foreground/40')} />
                )}
                <span className="flex-1 min-w-0">
                  <span className="font-mono text-xs text-muted-foreground mr-1.5">{section.sectionNumber}</span>
                  <span className="truncate">{section.title}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const currentChapterId = pathname.split('/')[2];

  const [openChapters, setOpenChapters] = useState<Set<string>>(() => {
    return new Set(currentChapterId ? [currentChapterId] : ['1']);
  });

  const toggleChapter = (id: string) => {
    setOpenChapters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-sidebar flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="px-4 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-medium text-sm leading-tight">Linear Algebra</p>
            <p className="text-xs text-muted-foreground">Interactive Course</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-0.5">
          {courseStructure.chapters.map((chapter) => (
            <ChapterSection
              key={chapter.id}
              chapter={chapter}
              isOpen={openChapters.has(chapter.id)}
              onToggle={() => toggleChapter(chapter.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
