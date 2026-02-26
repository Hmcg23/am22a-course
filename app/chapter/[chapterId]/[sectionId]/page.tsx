import { notFound } from 'next/navigation';
import { getSectionById, courseStructure } from '@/data/courseStructure';
import { SectionTemplate } from '@/components/section/SectionTemplate';
import type { Metadata } from 'next';
import type { SectionContent } from '@/data/types';

export async function generateStaticParams() {
  return courseStructure.chapters.flatMap(chapter =>
    chapter.sections.map(section => ({
      chapterId: chapter.id,
      sectionId: section.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { chapterId: string; sectionId: string };
}): Promise<Metadata> {
  const result = getSectionById(params.sectionId);
  if (!result) return {};
  const { section, chapter } = result;
  return {
    title: `${section.sectionNumber} ${section.title} — Chapter ${chapter.id}`,
    description: section.plainEnglish[0]?.slice(0, 160),
  };
}

export default function SectionPage({
  params,
}: {
  params: { chapterId: string; sectionId: string };
}) {
  const result = getSectionById(params.sectionId);
  if (!result) notFound();

  const { section, chapter } = result;

  // Find prev/next sections across all chapters
  const allSections: SectionContent[] = courseStructure.chapters.flatMap(c => c.sections);
  const idx = allSections.findIndex(s => s.id === section.id);
  const prevSection = idx > 0 ? allSections[idx - 1] : null;
  const nextSection = idx < allSections.length - 1 ? allSections[idx + 1] : null;

  return (
    <SectionTemplate
      section={section}
      chapter={chapter}
      prevSection={prevSection}
      nextSection={nextSection}
    />
  );
}
