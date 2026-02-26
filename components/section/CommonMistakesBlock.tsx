import { AlertTriangle } from 'lucide-react';

export function CommonMistakesBlock({ mistakes }: { mistakes: string[] }) {
  return (
    <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-300">Common Mistakes</h3>
      </div>
      <ul className="space-y-2">
        {mistakes.map((mistake, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
            {mistake}
          </li>
        ))}
      </ul>
    </div>
  );
}
