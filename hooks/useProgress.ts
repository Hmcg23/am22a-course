'use client';
import { useState, useEffect, useCallback } from 'react';
import type { CourseProgress, QuizAttempt } from '@/data/types';

const STORAGE_KEY = 'linear-algebra-course-progress';

const defaultProgress: CourseProgress = {
  completedSections: [],
  quizResults: {},
  lastVisited: '',
  bookmarkedSections: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<CourseProgress>(defaultProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const save = useCallback((updated: CourseProgress) => {
    setProgress(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, []);

  const markSectionComplete = useCallback((sectionId: string) => {
    setProgress(prev => {
      if (prev.completedSections.includes(sectionId)) return prev;
      const updated = {
        ...prev,
        completedSections: [...prev.completedSections, sectionId],
        lastVisited: sectionId,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const saveQuizResult = useCallback((sectionId: string, questionId: string, attempt: QuizAttempt) => {
    setProgress(prev => {
      const updated: CourseProgress = {
        ...prev,
        quizResults: {
          ...prev.quizResults,
          [sectionId]: {
            ...(prev.quizResults[sectionId] || {}),
            [questionId]: attempt,
          },
        },
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const setLastVisited = useCallback((sectionId: string) => {
    setProgress(prev => {
      const updated = { ...prev, lastVisited: sectionId };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const toggleBookmark = useCallback((sectionId: string) => {
    setProgress(prev => {
      const bookmarked = prev.bookmarkedSections.includes(sectionId)
        ? prev.bookmarkedSections.filter(id => id !== sectionId)
        : [...prev.bookmarkedSections, sectionId];
      const updated = { ...prev, bookmarkedSections: bookmarked };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const isSectionComplete = useCallback((sectionId: string) => {
    return progress.completedSections.includes(sectionId);
  }, [progress.completedSections]);

  const getSectionQuizResults = useCallback((sectionId: string) => {
    return progress.quizResults[sectionId] || {};
  }, [progress.quizResults]);

  const getChapterProgress = useCallback((chapterId: string, totalSections: number) => {
    const completed = progress.completedSections.filter(id => id.startsWith(`${chapterId}-`)).length;
    return { completed, total: totalSections, percent: totalSections > 0 ? (completed / totalSections) * 100 : 0 };
  }, [progress.completedSections]);

  const getTotalProgress = useCallback((totalSections: number) => {
    return {
      completed: progress.completedSections.length,
      total: totalSections,
      percent: totalSections > 0 ? (progress.completedSections.length / totalSections) * 100 : 0,
    };
  }, [progress.completedSections]);

  return {
    progress,
    loaded,
    markSectionComplete,
    saveQuizResult,
    setLastVisited,
    toggleBookmark,
    isSectionComplete,
    getSectionQuizResults,
    getChapterProgress,
    getTotalProgress,
  };
}
