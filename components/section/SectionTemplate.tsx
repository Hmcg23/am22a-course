import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import type { SectionContent, ChapterMeta } from '@/data/types';
import { PlainEnglishBlock } from './PlainEnglishBlock';
import { FormalViewBlock } from './FormalViewBlock';
import { WhyItMattersBlock } from './WhyItMattersBlock';
import { ResourceCards } from './ResourceCard';
import { CommonMistakesBlock } from './CommonMistakesBlock';
import { Quiz } from '@/components/quiz/Quiz';
import { DiagramRegistry } from '@/components/diagrams/DiagramRegistry';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { readingTime } from '@/lib/utils';

interface SectionTemplateProps {
  section: SectionContent;
  chapter: ChapterMeta;
  prevSection?: SectionContent | null;
  nextSection?: SectionContent | null;
}

export function SectionTemplate({ section, chapter, prevSection, nextSection }: SectionTemplateProps) {
  const chapterAccent: Record<string, string> = {
    '1': 'text-blue-600 dark:text-blue-400',
    '2': 'text-emerald-600 dark:text-emerald-400',
    '3': 'text-violet-600 dark:text-violet-400',
    '4': 'text-rose-600 dark:text-rose-400',
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: `Chapter ${chapter.id}: ${chapter.title}`, href: `/chapter/${chapter.id}` },
          { label: `${section.sectionNumber} ${section.title}` },
        ]}
      />

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold uppercase tracking-widest ${chapterAccent[chapter.id]}`}>
            {section.sectionNumber}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readingTime(section.estimatedMinutes)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          {section.title}
        </h1>
        <div className="h-1 w-16 rounded-full" style={{ backgroundColor: chapter.accentHex }} />
      </header>

      {/* Main content */}
      <div className="space-y-10">

        {/* 1. Plain English */}
        <section>
          <PlainEnglishBlock paragraphs={section.plainEnglish} />
        </section>

        {/* 2. Formal View */}
        {section.formalView && section.formalView.length > 0 && (
          <section>
            <FormalViewBlock blocks={section.formalView} />
          </section>
        )}

        {/* 3. Interactive Diagram */}
        {section.diagram && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-border" />
              Interactive Visualization
              <span className="h-px flex-1 bg-border" />
            </h3>
            <Suspense fallback={
              <div className="h-64 rounded-2xl bg-muted/40 border border-border flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading diagram...</span>
              </div>
            }>
              <DiagramRegistry config={section.diagram} />
            </Suspense>
          </section>
        )}

        {/* 4. Why It Matters */}
        {section.whyItMatters && (
          <section>
            <WhyItMattersBlock data={section.whyItMatters} />
          </section>
        )}

        {/* 5. Resources */}
        {section.resources && section.resources.length > 0 && (
          <section>
            <ResourceCards resources={section.resources} />
          </section>
        )}

        {/* 6. Quiz */}
        {section.quiz && section.quiz.length > 0 && (
          <section>
            <Quiz questions={section.quiz} sectionId={section.id} />
          </section>
        )}

        {/* 7. Common Mistakes */}
        {section.commonMistakes && section.commonMistakes.length > 0 && (
          <section>
            <CommonMistakesBlock mistakes={section.commonMistakes} />
          </section>
        )}

      </div>

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
        {prevSection ? (
          <Link
            href={`/chapter/${prevSection.chapterId}/${prevSection.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group max-w-xs"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
            <div className="text-right min-w-0">
              <p className="text-xs uppercase tracking-wide mb-0.5">Previous</p>
              <p className="font-medium truncate">{prevSection.title}</p>
            </div>
          </Link>
        ) : <div />}

        {nextSection ? (
          <Link
            href={`/chapter/${nextSection.chapterId}/${nextSection.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group max-w-xs"
          >
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide mb-0.5">Next</p>
              <p className="font-medium truncate">{nextSection.title}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
}
