import { Sparkles } from 'lucide-react';
import type { WhyItMattersBlock as WhyItMattersType } from '@/data/types';

export function WhyItMattersBlock({ data }: { data: WhyItMattersType }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-primary">Why This Matters</h3>
      </div>
      <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{data.context}</p>
      <ul className="space-y-2">
        {data.applications.map((app, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
            {app}
          </li>
        ))}
      </ul>
    </div>
  );
}
