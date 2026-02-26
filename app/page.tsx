import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle, Layers, Sigma } from 'lucide-react';
import { courseStructure } from '@/data/courseStructure';
import { DarkModeToggle } from '@/components/layout/DarkModeToggle';

const chapterGradients: Record<string, string> = {
  '1': 'from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800',
  '2': 'from-emerald-500/10 to-emerald-600/5 border-emerald-200 dark:border-emerald-800',
  '3': 'from-violet-500/10 to-violet-600/5 border-violet-200 dark:border-violet-800',
  '4': 'from-rose-500/10 to-rose-600/5 border-rose-200 dark:border-rose-800',
};

const chapterAccent: Record<string, string> = {
  '1': 'bg-blue-500',
  '2': 'bg-emerald-500',
  '3': 'bg-violet-500',
  '4': 'bg-rose-500',
};

const chapterText: Record<string, string> = {
  '1': 'text-blue-600 dark:text-blue-400',
  '2': 'text-emerald-600 dark:text-emerald-400',
  '3': 'text-violet-600 dark:text-violet-400',
  '4': 'text-rose-600 dark:text-rose-400',
};

export default function HomePage() {
  const totalSections = courseStructure.chapters.reduce((s, c) => s + c.sections.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">Linear Algebra</span>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sigma className="h-4 w-4" />
          {totalSections} Interactive Sections · 4 Chapters
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">
          Linear Algebra
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
          {courseStructure.subtitle}
        </p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10">
          Interactive diagrams. Step-by-step algorithms. Conceptual quizzes.
          Everything you need to deeply understand linear algebra — not just compute it.
        </p>
        <Link
          href={`/chapter/1/${courseStructure.chapters[0].sections[0].id}`}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-base hover:bg-primary/90 transition-colors"
        >
          Start Learning
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Feature pills */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: Layers, label: 'Interactive Diagrams', desc: '14 live visualizations' },
            { icon: CheckCircle, label: 'Quizzes', desc: 'Instant feedback' },
            { icon: Sigma, label: 'Formal Definitions', desc: 'Mathematically precise' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-4 rounded-2xl bg-muted/40 border border-border">
              <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8">Course Chapters</h2>
        <div className="grid gap-5">
          {courseStructure.chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapter/${chapter.id}`}
              className={`group block p-6 rounded-2xl border bg-gradient-to-br ${chapterGradients[chapter.id]} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${chapterAccent[chapter.id]} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {chapter.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold uppercase tracking-wide ${chapterText[chapter.id]} mb-1`}>
                    Chapter {chapter.id}
                  </p>
                  <h3 className="text-lg font-bold text-foreground mb-1">{chapter.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{chapter.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{chapter.description}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xs text-muted-foreground bg-background/60 px-2.5 py-1 rounded-full border border-border">
                      {chapter.sections.length} sections
                    </span>
                    <span className="text-xs text-muted-foreground bg-background/60 px-2.5 py-1 rounded-full border border-border">
                      ~{chapter.sections.reduce((s, sec) => s + sec.estimatedMinutes, 0)} min
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
