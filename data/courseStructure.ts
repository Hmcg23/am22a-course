import type { CourseStructure } from './types';
import chapter1 from './chapter1';
import chapter2 from './chapter2';
import chapter3 from './chapter3';
import chapter4 from './chapter4';

export const courseStructure: CourseStructure = {
  title: 'Linear Algebra',
  subtitle: 'An Interactive Journey from Equations to Structure',
  chapters: [chapter1, chapter2, chapter3, chapter4],
};

export { chapter1, chapter2, chapter3, chapter4 };

export function getSectionById(sectionId: string) {
  for (const chapter of courseStructure.chapters) {
    const section = chapter.sections.find(s => s.id === sectionId);
    if (section) return { section, chapter };
  }
  return null;
}

export function getChapterById(chapterId: string) {
  return courseStructure.chapters.find(c => c.id === chapterId) || null;
}

export function getAllSections() {
  return courseStructure.chapters.flatMap(c => c.sections);
}

export function getTotalSectionCount() {
  return courseStructure.chapters.reduce((sum, c) => sum + c.sections.length, 0);
}
