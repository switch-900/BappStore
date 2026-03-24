'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BAppProps } from '../types/bapp';

type Shape = 'circle' | 'hexagon' | 'triangle' | 'square' | 'diamond';
type PatternType = 'grid' | 'radial' | 'diagonal';

const SHAPES: Shape[] = ['circle', 'hexagon', 'triangle', 'square', 'diamond'];
const PATTERNS: PatternType[] = ['grid', 'radial', 'diagonal'];

/** Produce a single shape SVG element string at (x, y) with half-size s. */
function shapeEl(
  shape: Shape,
  cx: number,
  cy: number,
  s: number,
  fill: string,
  stroke: string,
  sw: number,
  opacity: number,
): string {
  const f = `fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"`;
  switch (shape) {
    case 'circle':
      return `<circle cx="${cx}" cy="${cy}" r="${s}" ${f}/>`;
    case 'square':
      return `<rect x="${cx - s}" y="${cy - s}" width="${s * 2}" height="${s * 2}" ${f}/>`;
    case 'diamond':
      return `<polygon points="${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}" ${f}/>`;
    case 'triangle':
      return `<polygon points="${cx},${cy - s} ${cx + s},${cy + s} ${cx - s},${cy + s}" ${f}/>`;
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`;
      }).join(' ');
      return `<polygon points="${pts}" ${f}/>`;
    }
  }
}

function buildPatternSvg(
  shape: Shape,
  pattern: PatternType,
  cols: number,
  rows: number,
  bg: string,
  fill: string,
  stroke: string,
  sw: number,
  sz: number,
  gap: number,
): string {
  const W = 800;
  const H = 600;
  const cell = sz * 2 + gap;
  const elements: string[] = [];

  if (pattern === 'grid') {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = cell / 2 + c * cell;
        const cy = cell / 2 + r * cell;
        elements.push(shapeEl(shape, cx, cy, sz, fill, stroke, sw, 1));
      }
    }
  } else if (pattern === 'diagonal') {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offX = r % 2 === 0 ? 0 : cell / 2;
        const cx = offX + cell / 2 + c * cell;
        const cy = cell / 2 + r * cell;
        elements.push(shapeEl(shape, cx, cy, sz, fill, stroke, sw, 1));
      }
    }
  } else {
    // radial — two rings + center
    const cx = W / 2;
    const cy = H / 2;
    // center
    elements.push(shapeEl(shape, cx, cy, sz * 1.4, fill, stroke, sw, 1));
    // ring 1
    const r1 = Math.min(W, H) * 0.22;
    const n1 = cols;
    for (let i = 0; i < n1; i++) {
      const a = (Math.PI * 2 * i) / n1;
      elements.push(shapeEl(shape, cx + r1 * Math.cos(a), cy + r1 * Math.sin(a), sz, fill, stroke, sw, 0.9));
    }
    // ring 2
    const r2 = Math.min(W, H) * 0.42;
    const n2 = cols * 2;
    for (let i = 0; i < n2; i++) {
      const a = (Math.PI * 2 * i) / n2;
      elements.push(shapeEl(shape, cx + r2 * Math.cos(a), cy + r2 * Math.sin(a), sz * 0.75, stroke, fill, sw, 0.7));
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  ${elements.join('\n  ')}
</svg>`;
}

/**
 * SvgPatternApp
 * Generates geometric SVG patterns with configurable shape, layout, and colors.
 */
export default function SvgPatternApp({ onOutput }: BAppProps) {
  const [shape, setShape] = useState<Shape>('hexagon');
  const [pattern, setPattern] = useState<PatternType>('grid');
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(8);
  const [bg, setBg] = useState('#0b0b0b');
  const [fill, setFill] = useState('#f7931a');
  const [stroke, setStroke] = useState('#f7931a');
  const [sw, setSw] = useState(1);
  const [sz, setSz] = useState(22);
  const [gap, setGap] = useState(8);

  const update = useCallback(() => {
    const svg = buildPatternSvg(shape, pattern, cols, rows, bg, fill, stroke, sw, sz, gap);
    onOutput({
      content: svg,
      contentType: 'image/svg+xml',
      fileName: `pattern-${shape}-${pattern}.svg`,
      title: `${shape} ${pattern} pattern`,
    });
  }, [shape, pattern, cols, rows, bg, fill, stroke, sw, sz, gap, onOutput]);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <div className="space-y-5">
      {/* Live preview */}
      <div
        className="w-full rounded-xl overflow-hidden border border-border"
        style={{ background: bg, aspectRatio: '4 / 3' }}
        dangerouslySetInnerHTML={{
          __html: buildPatternSvg(shape, pattern, cols, rows, bg, fill, stroke, sw, sz, gap),
        }}
      />

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <label className="col-span-full block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Shape</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {SHAPES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  shape === s
                    ? 'border-punk text-punk bg-punk/10'
                    : 'border-border text-text-dim hover:border-border-light'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </label>

        <label className="col-span-full block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Layout</span>
          <div className="flex gap-2 mt-2">
            {PATTERNS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPattern(p)}
                className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  pattern === p
                    ? 'border-punk text-punk bg-punk/10'
                    : 'border-border text-text-dim hover:border-border-light'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Columns ({cols})
          </span>
          <input
            type="range"
            min={3}
            max={20}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Rows ({rows})
          </span>
          <input
            type="range"
            min={3}
            max={16}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Size ({sz}px)
          </span>
          <input
            type="range"
            min={6}
            max={60}
            value={sz}
            onChange={(e) => setSz(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Gap ({gap}px)
          </span>
          <input
            type="range"
            min={0}
            max={30}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Stroke width ({sw}px)
          </span>
          <input
            type="range"
            min={0}
            max={4}
            step={0.5}
            value={sw}
            onChange={(e) => setSw(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Background</span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="mt-1 h-8 w-full rounded border border-border bg-input cursor-pointer"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Fill</span>
          <input
            type="color"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
            className="mt-1 h-8 w-full rounded border border-border bg-input cursor-pointer"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Stroke</span>
          <input
            type="color"
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
            className="mt-1 h-8 w-full rounded border border-border bg-input cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
