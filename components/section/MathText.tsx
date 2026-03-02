'use client';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Process inline formatting: $math$, $$math$$, \textbf{...}, **bold**
 */
function processInline(text: string, baseKey: number): React.ReactNode[] {
  const pattern = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\textbf\{[^}]*\}|\*\*[^*]+\*\*)/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const k = baseKey + i;
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return <BlockMath key={k} math={part.slice(2, -2).trim()} />;
    }
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      return <InlineMath key={k} math={part.slice(1, -1)} />;
    }
    if (part.startsWith('\\textbf{') && part.endsWith('}')) {
      return <strong key={k} className="font-medium">{part.slice(8, -1)}</strong>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={k} className="font-medium">{part.slice(2, -2)}</strong>;
    }
    return <span key={k}>{part}</span>;
  });
}

/**
 * Renders a plain string that may contain:
 *  - $inline$ or $$block$$ LaTeX
 *  - \begin{itemize}...\end{itemize} or \begin{enumerate}...\end{enumerate}
 *  - \begin{align*}...\end{align*} (display math)
 *  - \textbf{...} and **bold** markdown
 *
 * Used by CommonMistakesBlock, WhyItMattersBlock, FormalViewBlock,
 * and any other block that renders raw content strings.
 */
export function renderMathText(content: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = content;
  let key = 0;

  // Environments that should be rendered as HTML lists
  const listEnvs = ['itemize', 'enumerate'];
  // Environments that should be rendered as display math
  const mathEnvs = ['align\\*', 'align', 'equation\\*', 'equation'];
  const allEnvPattern = new RegExp(
    `\\\\begin\\{(${[...listEnvs, ...mathEnvs].join('|')})\\}`
  );

  while (remaining.length > 0) {
    const envMatch = allEnvPattern.exec(remaining);

    if (!envMatch) {
      result.push(...processInline(remaining, key));
      break;
    }

    const envName = envMatch[1];
    // The literal end tag (un-escaped for indexOf)
    const endTag = `\\end{${envName}}`;
    const startIdx = envMatch.index;
    const endIdx = remaining.indexOf(endTag, startIdx + envMatch[0].length);

    if (endIdx === -1) {
      // No matching end tag — treat the rest as inline text
      result.push(...processInline(remaining, key));
      break;
    }

    // Text before the environment
    if (startIdx > 0) {
      result.push(...processInline(remaining.slice(0, startIdx), key));
      key += 1000;
    }

    const innerContent = remaining.slice(startIdx + envMatch[0].length, endIdx);

    if (envName === 'itemize' || envName === 'enumerate') {
      const Tag = envName === 'enumerate' ? 'ol' : 'ul';
      const listClass =
        envName === 'enumerate'
          ? 'list-decimal list-outside space-y-1 pl-5 my-2'
          : 'list-disc list-outside space-y-1 pl-5 my-2';
      const items = innerContent.split('\\item').filter((s) => s.trim().length > 0);
      result.push(
        <Tag key={key++} className={listClass}>
          {items.map((item, i) => (
            <li key={i}>{processInline(item.trim(), i * 100)}</li>
          ))}
        </Tag>
      );
    } else {
      // Math environment — wrap back in $$ ... $$
      result.push(
        <BlockMath
          key={key++}
          math={`\\begin{${envName}}${innerContent}\\end{${envName}}`}
        />
      );
    }

    remaining = remaining.slice(endIdx + endTag.length);
  }

  return result;
}

export function MathText({ children }: { children: string }) {
  return <>{renderMathText(children)}</>;
}
