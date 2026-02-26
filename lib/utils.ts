import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function readingTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min read`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m read` : `${hrs}h read`;
}

export function formatSectionId(chapterId: string, sectionNum: string): string {
  return `${chapterId}-${sectionNum.split('.')[1]}`;
}
