import { ExternalLink, Youtube, Clock } from 'lucide-react';
import type { ResourceCard as ResourceCardType } from '@/data/types';

function ResourceCardItem({ resource }: { resource: ResourceCardType }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
        <Youtube className="h-5 w-5 text-red-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight mb-0.5">
          {resource.title}
        </p>
        <p className="text-xs text-muted-foreground mb-1">{resource.channel}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {resource.durationMinutes} min
        </div>
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 mt-0.5 transition-colors" />
    </a>
  );
}

export function ResourceCards({ resources }: { resources: ResourceCardType[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
        <span className="h-px flex-1 bg-border" />
        Learning Resources
        <span className="h-px flex-1 bg-border" />
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {resources.map((r, i) => (
          <ResourceCardItem key={i} resource={r} />
        ))}
      </div>
    </div>
  );
}
