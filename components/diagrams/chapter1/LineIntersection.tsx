'use client';
import { useState, useRef, useEffect } from 'react';
import type { LineIntersectionSystem } from '@/data/types';

interface LineIntersectionProps {
  systems: LineIntersectionSystem[];
}

export default function LineIntersection({ systems }: LineIntersectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const W = 380, H = 300;
  const CX = W / 2, CY = H / 2;
  const SCALE = 38;

  const active = systems[activeIdx];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let x = -5; x <= 5; x++) {
      ctx.beginPath(); ctx.moveTo(CX + x * SCALE, 0); ctx.lineTo(CX + x * SCALE, H); ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath(); ctx.moveTo(0, CY + y * SCALE); ctx.lineTo(W, CY + y * SCALE); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    const colors = ['#3B82F6', '#F43F5E'];

    const drawLine = (eq: [number, number, number], color: string) => {
      const [a, b, c] = eq;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      if (Math.abs(b) > 0.001) {
        const x1L = -6, x1R = 6;
        ctx.beginPath();
        ctx.moveTo(CX + x1L * SCALE, CY - ((c - a * x1L) / b) * SCALE);
        ctx.lineTo(CX + x1R * SCALE, CY - ((c - a * x1R) / b) * SCALE);
        ctx.stroke();
      } else {
        const x1 = c / a;
        ctx.beginPath();
        ctx.moveTo(CX + x1 * SCALE, 0);
        ctx.lineTo(CX + x1 * SCALE, H);
        ctx.stroke();
      }
    };

    if (active) {
      active.equations.forEach((eq, i) => drawLine(eq, colors[i]));

      // Draw intersection point for unique
      if (active.type === 'unique') {
        const [[a1, b1, c1], [a2, b2, c2]] = active.equations;
        const det = a1 * b2 - a2 * b1;
        if (Math.abs(det) > 0.001) {
          const x1 = (c1 * b2 - c2 * b1) / det;
          const x2 = (a1 * c2 - a2 * c1) / det;
          ctx.fillStyle = '#10B981';
          ctx.beginPath();
          ctx.arc(CX + x1 * SCALE, CY - x2 * SCALE, 6, 0, 2 * Math.PI);
          ctx.fill();
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Label
      const typeLabel: Record<string, string> = {
        unique: '1 solution',
        none: 'No solutions',
        infinite: '∞ solutions',
      };
      ctx.fillStyle = active.type === 'unique' ? '#10B981' : active.type === 'none' ? '#F43F5E' : '#8B5CF6';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(typeLabel[active.type], 10, 20);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, active]);

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="flex gap-2 justify-center flex-wrap">
        {systems.map((sys, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              i === activeIdx
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50'
            }`}
          >
            {sys.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Blue and red lines represent the two equations. Green dot = solution.
      </p>
    </div>
  );
}
