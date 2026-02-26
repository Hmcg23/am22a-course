'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import type { QuizQuestion, MultipleChoiceQuestion, TrueFalseQuestion, ShortAnswerQuestion } from '@/data/types';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { InlineMath } from 'react-katex';

function renderWithMath(text: string) {
  const parts = text.split(/(\$[^$\n]+?\$)/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });
}

function MCQuestion({
  question,
  onAnswer,
  savedResult,
}: {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean, answer: number) => void;
  savedResult?: { answer: string | number | boolean; correct: boolean };
}) {
  const [selected, setSelected] = useState<number | null>(
    savedResult !== undefined ? savedResult.answer as number : null
  );
  const [revealed, setRevealed] = useState(savedResult !== undefined);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    onAnswer(idx === question.correctAnswer, idx);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-relaxed">{renderWithMath(question.question)}</p>
      <div className="space-y-2">
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.correctAnswer;
          const isSelected = selected === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                !revealed && 'hover:bg-muted/60 hover:border-primary/30',
                !revealed && 'bg-card border-border',
                revealed && isCorrect && 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-800 dark:text-emerald-200',
                revealed && isSelected && !isCorrect && 'bg-red-50 dark:bg-red-950/30 border-red-400 text-red-800 dark:text-red-200',
                revealed && !isSelected && !isCorrect && 'opacity-50 bg-muted/30 border-border'
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0',
                  !revealed && 'border-border',
                  revealed && isCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                  revealed && isSelected && !isCorrect && 'border-red-500 bg-red-500 text-white',
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {renderWithMath(option)}
              </span>
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              'rounded-xl p-3 text-sm border',
              selected === question.correctAnswer
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            )}
          >
            <p className="font-medium mb-1">{selected === question.correctAnswer ? '✓ Correct!' : '✗ Not quite.'}</p>
            <p className="text-xs leading-relaxed opacity-90">{renderWithMath(question.explanation)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TFQuestion({
  question,
  onAnswer,
  savedResult,
}: {
  question: TrueFalseQuestion;
  onAnswer: (correct: boolean, answer: boolean) => void;
  savedResult?: { answer: string | number | boolean; correct: boolean };
}) {
  const [selected, setSelected] = useState<boolean | null>(
    savedResult !== undefined ? savedResult.answer as boolean : null
  );
  const [revealed, setRevealed] = useState(savedResult !== undefined);

  const handleSelect = (val: boolean) => {
    if (revealed) return;
    setSelected(val);
    setRevealed(true);
    onAnswer(val === question.correctAnswer, val);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-relaxed">{renderWithMath(question.question)}</p>
      <div className="flex gap-3">
        {[true, false].map((val) => {
          const label = val ? 'True' : 'False';
          const isCorrect = val === question.correctAnswer;
          const isSelected = selected === val;
          return (
            <button
              key={label}
              onClick={() => handleSelect(val)}
              disabled={revealed}
              className={cn(
                'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                !revealed && 'hover:bg-muted/60 bg-card border-border',
                revealed && isCorrect && 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-700 dark:text-emerald-300',
                revealed && isSelected && !isCorrect && 'bg-red-50 dark:bg-red-950/30 border-red-400 text-red-700 dark:text-red-300',
                revealed && !isSelected && !isCorrect && 'opacity-50 border-border',
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'rounded-xl p-3 text-sm border',
              selected === question.correctAnswer
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            )}
          >
            <p className="font-medium mb-1">{selected === question.correctAnswer ? '✓ Correct!' : '✗ Not quite.'}</p>
            <p className="text-xs leading-relaxed opacity-90">{renderWithMath(question.explanation)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SAQuestion({
  question,
  onAnswer,
  savedResult,
}: {
  question: ShortAnswerQuestion;
  onAnswer: (correct: boolean, answer: string) => void;
  savedResult?: { answer: string | number | boolean; correct: boolean };
}) {
  const [value, setValue] = useState(savedResult ? String(savedResult.answer) : '');
  const [revealed, setRevealed] = useState(savedResult !== undefined);
  const [correct, setCorrect] = useState(savedResult?.correct ?? false);

  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');

  const handleSubmit = () => {
    if (!value.trim() || revealed) return;
    const norm = normalize(value);
    const isCorrect =
      norm === normalize(question.correctAnswer) ||
      (question.acceptableAnswers || []).some(a => norm === normalize(a));
    setRevealed(true);
    setCorrect(isCorrect);
    onAnswer(isCorrect, value);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium leading-relaxed">{renderWithMath(question.question)}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          disabled={revealed}
          placeholder="Your answer..."
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={handleSubmit}
          disabled={revealed || !value.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-40 transition-colors"
        >
          Check
        </button>
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'rounded-xl p-3 text-sm border',
              correct
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            )}
          >
            <p className="font-medium mb-1">{correct ? '✓ Correct!' : `✗ The answer is: ${question.correctAnswer}`}</p>
            <p className="text-xs leading-relaxed opacity-90">{renderWithMath(question.explanation)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Quiz({ questions, sectionId }: { questions: QuizQuestion[]; sectionId: string }) {
  const { saveQuizResult, getSectionQuizResults, markSectionComplete } = useProgress();
  const savedResults = getSectionQuizResults(sectionId);
  const completedCount = Object.values(savedResults).filter(r => r.correct).length;
  const allCorrect = completedCount === questions.length && questions.length > 0;

  const handleAnswer = (questionId: string, correct: boolean, answer: string | number | boolean) => {
    saveQuizResult(sectionId, questionId, {
      answer,
      correct,
      attemptedAt: new Date().toISOString(),
    });
    if (correct && Object.values({ ...savedResults, [questionId]: { correct: true } }).filter(r => r.correct).length === questions.length) {
      markSectionComplete(sectionId);
    }
  };

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
        <span className="h-px flex-1 bg-border" />
        <span className="flex items-center gap-1.5">
          {allCorrect && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
          {allCorrect ? 'Quiz Complete' : 'Quiz'}
        </span>
        <span className="h-px flex-1 bg-border" />
      </h3>
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="h-4 w-4 text-primary/60" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Question {i + 1}
              </span>
              {savedResults[q.id]?.correct && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 ml-auto" />
              )}
            </div>
            {q.type === 'multiple-choice' && (
              <MCQuestion
                question={q as MultipleChoiceQuestion}
                onAnswer={(correct, ans) => handleAnswer(q.id, correct, ans)}
                savedResult={savedResults[q.id]}
              />
            )}
            {q.type === 'true-false' && (
              <TFQuestion
                question={q as TrueFalseQuestion}
                onAnswer={(correct, ans) => handleAnswer(q.id, correct, ans)}
                savedResult={savedResults[q.id]}
              />
            )}
            {q.type === 'short-answer' && (
              <SAQuestion
                question={q as ShortAnswerQuestion}
                onAnswer={(correct, ans) => handleAnswer(q.id, correct, ans)}
                savedResult={savedResults[q.id]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
