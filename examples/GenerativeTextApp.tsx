'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BAppProps } from '../types/bapp';

const FONTS = ['monospace', 'serif', 'sans-serif', 'cursive', 'fantasy'];

const PRESETS = [
  { bg1: '#0b0b0b', bg2: '#1a1a1a', fg: '#f7931a' },
  { bg1: '#0d0d1a', bg2: '#1a1a2e', fg: '#00ffe1' },
  { bg1: '#1a0a2e', bg2: '#2d1b4e', fg: '#b04bff' },
  { bg1: '#0a1a0f', bg2: '#0f2a18', fg: '#22c55e' },
  { bg1: '#03111f', bg2: '#062233', fg: '#0ea5e9' },
  { bg1: '#ffffff', bg2: '#f0f4f8', fg: '#111111' },
];

/**
 * GenerativeTextApp
 * Produces inscription-ready SVG with custom text, colors, and typography.
 */
export default function GenerativeTextApp({ onOutput }: BAppProps) {
  const [text, setText] = useState('Bitcoin is forever.');
  const [sub, setSub] = useState('');
  const [preset, setPreset] = useState(0);
  const [font, setFont] = useState('monospace');
  const [fontSize, setFontSize] = useState(48);
  const [align, setAlign] = useState<'start' | 'middle' | 'end'>('middle');

  const buildSvg = useCallback(() => {
    const { bg1, bg2, fg } = PRESETS[preset];
    const ax = align === 'start' ? 40 : align === 'end' ? 760 : 400;
    const textAnchor = align;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#bg)"/>
  <text
    x="${ax}" y="${sub ? 175 : 210}"
    font-family="${font}"
    font-size="${fontSize}"
    fill="${fg}"
    text-anchor="${textAnchor}"
    dominant-baseline="middle"
  >${escapeXml(text)}</text>
  ${sub ? `<text
    x="${ax}" y="245"
    font-family="${font}"
    font-size="${Math.round(fontSize * 0.42)}"
    fill="${fg}"
    opacity="0.6"
    text-anchor="${textAnchor}"
    dominant-baseline="middle"
  >${escapeXml(sub)}</text>` : ''}
</svg>`;
  }, [text, sub, preset, font, fontSize, align]);

  useEffect(() => {
    if (!text.trim()) {
      onOutput(null);
      return;
    }
    const svg = buildSvg();
    onOutput({
      content: svg,
      contentType: 'image/svg+xml',
      fileName: 'text-inscription.svg',
      title: text.slice(0, 40),
    });
  }, [text, sub, preset, font, fontSize, align, buildSvg, onOutput]);

  const { bg1, bg2, fg } = PRESETS[preset];

  return (
    <div className="space-y-5">
      {/* Live preview */}
      <div
        className="w-full rounded-xl overflow-hidden border border-border"
        style={{
          background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
          aspectRatio: '2 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: '5%',
        }}
      >
        <p
          style={{
            fontFamily: font,
            fontSize: `${fontSize / 16}rem`,
            color: fg,
            textAlign: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
            lineHeight: 1.2,
            margin: 0,
            wordBreak: 'break-word',
          }}
        >
          {text || <span style={{ opacity: 0.3 }}>start typing…</span>}
        </p>
        {sub && (
          <p
            style={{
              fontFamily: font,
              fontSize: `${(fontSize * 0.42) / 16}rem`,
              color: fg,
              opacity: 0.6,
              textAlign: align === 'start' ? 'left' : align === 'end' ? 'right' : 'center',
              marginTop: '0.5rem',
              wordBreak: 'break-word',
            }}
          >
            {sub}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="col-span-full block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Main text</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            placeholder="Bitcoin is forever."
            className="input-base w-full mt-1"
          />
        </label>

        <label className="col-span-full block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Subtitle (optional)
          </span>
          <input
            type="text"
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            maxLength={120}
            placeholder="Satoshi Nakamoto, 2009"
            className="input-base w-full mt-1"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Font</span>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="input-base w-full mt-1"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
            Font size ({fontSize}px)
          </span>
          <input
            type="range"
            min={20}
            max={96}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full mt-2 accent-punk"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Color preset</span>
          <div className="flex gap-2 mt-2">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPreset(i)}
                title={`Preset ${i + 1}`}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  preset === i ? 'border-punk scale-110' : 'border-transparent'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${p.bg1}, ${p.bg2})`,
                  boxShadow: preset === i ? `0 0 0 3px ${p.fg}44` : undefined,
                }}
              />
            ))}
          </div>
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Alignment</span>
          <div className="flex gap-2 mt-2">
            {(['start', 'middle', 'end'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlign(a)}
                className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                  align === a
                    ? 'border-punk text-punk bg-punk/10'
                    : 'border-border text-text-dim hover:border-border-light'
                }`}
              >
                {a === 'start' ? '⇤ left' : a === 'middle' ? '↔ center' : 'right ⇥'}
              </button>
            ))}
          </div>
        </label>
      </div>
    </div>
  );
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
