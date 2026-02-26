'use client';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export function PlainEnglishBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <div key={i} className="text-base leading-relaxed text-foreground/90">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              p: ({ children }) => <p className="leading-relaxed">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
              code: ({ children }) => (
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">{children}</code>
              ),
            }}
          >
            {para}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
