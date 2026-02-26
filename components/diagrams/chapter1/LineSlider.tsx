'use client';
import { useState, useRef, useEffect } from 'react';

interface LineSliderProps {
  defaultA?: number;
  defaultB?: number;
  defaultC?: number;
}

export default function LineSlider({ defaultA = 1, defaultB = 1, defaultC = 2 }: LineSliderProps) {
  const [a, setA] = useState(defaultA);
  const [b, setB] = useState(defaultB);
  const [c, setC] = useState(defaultC);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const W = 400, H = 320;
  const CX = W / 2, CY = H / 2;
  const SCALE = 40;

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
      ctx.beginPath();
      ctx.moveTo(CX + x * SCALE, 0);
      ctx.lineTo(CX + x * SCALE, H);
      ctx.stroke();
    }
    for (let y = -4; y <= 4; y++) {
      ctx.beginPath();
      ctx.moveTo(0, CY + y * SCALE);
      ctx.lineTo(W, CY + y * SCALE);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(CX, 0); ctx.lineTo(CX, H); ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px monospace';
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      ctx.fillText(String(i), CX + i * SCALE - 5, CY + 14);
      ctx.fillText(String(-i), CX + 3, CY + i * SCALE + 4);
    }
    ctx.fillText('x₁', W - 18, CY - 8);
    ctx.fillText('x₂', CX + 8, 14);

    // Line: a*x1 + b*x2 = c → x2 = (c - a*x1) / b
    if (Math.abs(b) > 0.001) {
      const x1L = -6, x1R = 6;
      const x2L = (c - a * x1L) / b;
      const x2R = (c - a * x1R) / b;
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(CX + x1L * SCALE, CY - x2L * SCALE);
      ctx.lineTo(CX + x1R * SCALE, CY - x2R * SCALE);
      ctx.stroke();
    } else if (Math.abs(a) > 0.001) {
      // Vertical line: x1 = c/a
      const x1 = c / a;
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(CX + x1 * SCALE, 0);
      ctx.lineTo(CX + x1 * SCALE, H);
      ctx.stroke();
    }

    // Equation label
    ctx.fillStyle = '#1d4ed8';
    ctx.font = 'bold 13px monospace';
    const eq = `${a}x₁ + ${b}x₂ = ${c}`;
    ctx.fillText(eq, 10, 20);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a, b, c]);

  const slider = (label: string, val: number, set: (v: number) => void) => {
    const id = `lineslider-${label}`;
    return (
      <div className="flex items-center gap-3">
        <label htmlFor={id} className="text-xs font-mono text-muted-foreground w-6">{label}</label>
        <input
          id={id}
          type="range" min={-5} max={5} step={0.5} value={val}
          onChange={e => set(Number(e.target.value))}
          className="flex-1 accent-blue-500"
        />
        <span className="text-xs font-mono w-8 text-right text-foreground">{val}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} width={W} height={H} className="w-full max-w-md mx-auto block rounded-xl border border-border" />
      <div className="space-y-2 max-w-md mx-auto">
        {slider('a', a, setA)}
        {slider('b', b, setB)}
        {slider('c', c, setC)}
        <p className="text-xs text-muted-foreground text-center pt-1">
          Drag sliders to change the line <span className="font-mono">ax₁ + bx₂ = c</span>
        </p>
      </div>
    </div>
  );
}
