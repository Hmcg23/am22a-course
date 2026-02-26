import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { getChapterById, courseStructure } from '@/data/courseStructure';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return courseStructure.chapters.map(c => ({ chapterId: c.id }));
}

export async function generateMetadata({ params }: { params: { chapterId: string } }): Promise<Metadata> {
  const chapter = getChapterById(params.chapterId);
  if (!chapter) return {};
  return {
    title: `Chapter ${chapter.id}: ${chapter.title}`,
    description: chapter.description,
  };
}

const chapterColors: Record<string, { text: string; bg: string; border: string; accent: string }> = {
  '1': { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-200 dark:border-blue-800', accent: '#3B82F6' },
  '2': { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-800', accent: '#10B981' },
  '3': { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-200 dark:border-violet-800', accent: '#8B5CF6' },
  '4': { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-200 dark:border-rose-800', accent: '#F43F5E' },
};

export default function ChapterPage({ params }: { params: { chapterId: string } }) {
  const chapter = getChapterById(params.chapterId);
  if (!chapter) notFound();

  const colors = chapterColors[chapter.id];
  const totalMinutes = chapter.sections.reduce((s, sec) => s + sec.estimatedMinutes, 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Chapter header */}
      <div className="mb-10">
        <span className={`text-xs font-semibold uppercase tracking-widest ${colors.text} mb-2 block`}>
          Chapter {chapter.id}
        </span>
        <h1 className="text-4xl font-bold tracking-tight mb-2">{chapter.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{chapter.subtitle}</p>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">{chapter.description}</p>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border ${colors.text} font-medium`}>
            {chapter.sections.length} sections
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            ~{totalMinutes} minutes
          </span>
        </div>
      </div>

      {/* Section list */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Sections</h2>
        {chapter.sections.map((section, i) => (
          <Link
            key={section.id}
            href={`/chapter/${chapter.id}/${section.id}`}
            className={`group flex items-center gap-4 p-4 rounded-2xl border ${colors.border} bg-card hover:bg-muted/40 transition-all`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: chapter.accentHex }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs text-muted-foreground">{section.sectionNumber}</span>
              </div>
              <p className="font-semibold text-sm truncate">{section.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {section.estimatedMinutes} min · {section.quiz.length} quiz {section.quiz.length === 1 ? 'question' : 'questions'}
                {section.diagram && ' · Interactive diagram'}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>

      {/* Start button */}
      <div className="mt-10 text-center">
        <Link
          href={`/chapter/${chapter.id}/${chapter.sections[0].id}`}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Start Chapter {chapter.id}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
