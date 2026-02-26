import { DarkModeToggle } from '@/components/layout/DarkModeToggle';
import { Sidebar } from '@/components/layout/Sidebar';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-3.5 w-3.5" />
            Linear Algebra
          </Link>
          <DarkModeToggle />
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
