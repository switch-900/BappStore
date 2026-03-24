'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BAppProps } from '../types/bapp';

const BG_PRESETS = [
  { label: 'Bitcoin', bg: '#0b0b0b', accent: '#f7931a', text: '#f5f5f5' },
  { label: 'Cyber', bg: '#0d0d1a', accent: '#00ffe1', text: '#00ffe1' },
  { label: 'Purple', bg: '#1a0a2e', accent: '#b04bff', text: '#e9d5ff' },
  { label: 'Green', bg: '#0a1a0f', accent: '#22c55e', text: '#d4f7e3' },
  { label: 'White', bg: '#ffffff', accent: '#111111', text: '#111111' },
  { label: 'Ocean', bg: '#03111f', accent: '#0ea5e9', text: '#e0f2fe' },
];

/** Build a minimal but polished on-chain HTML card. */
function buildCard(
  title: string,
  body: string,
  footer: string,
  bg: string,
  accent: string,
  textColor: string,
): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;background:${bg};display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
.card{background:${bg};border:1px solid ${accent}33;border-radius:16px;padding:2.5rem 2rem;max-width:480px;width:90%;text-align:center;box-shadow:0 0 40px ${accent}22}
h1{font-size:2rem;font-weight:800;color:${accent};margin-bottom:1rem;line-height:1.2;letter-spacing:-0.02em}
p{font-size:1rem;color:${textColor};opacity:0.85;line-height:1.7;margin-bottom:1.5rem}
footer{font-size:0.75rem;color:${textColor};opacity:0.4;font-family:monospace;letter-spacing:0.05em}
.dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:${accent};margin-bottom:1.5rem}
</style>
</head>
<body>
<div class="card">
  <div class="dot"></div>
  <h1>${esc(title)}</h1>
  ${body ? `<p>${esc(body)}</p>` : ''}
  ${footer ? `<footer>${esc(footer)}</footer>` : ''}
</div>
</body>
</html>`;
}

/**
 * HtmlCardApp
 * Produces a minimal on-chain HTML card inscription.
 */
export default function HtmlCardApp({ onOutput }: BAppProps) {
  const [title, setTitle] = useState('Bitcoin is forever.');
  const [body, setBody] = useState('Permanently etched on the timechain.');
  const [footer, setFooter] = useState('');
  const [preset, setPreset] = useState(0);

  const { bg, accent, text: textColor } = BG_PRESETS[preset];

  const update = useCallback(() => {
    if (!title.trim()) {
      onOutput(null);
      return;
    }
    const html = buildCard(title, body, footer, bg, accent, textColor);
    onOutput({
      content: html,
      contentType: 'text/html;charset=utf-8',
      fileName: 'card.html',
      title: title.slice(0, 40),
    });
  }, [title, body, footer, bg, accent, textColor, onOutput]);

  useEffect(() => {
    update();
  }, [update]);

  const previewHtml = buildCard(title, body, footer, bg, accent, textColor);

  return (
    <div className="space-y-5">
      {/* Live preview */}
      <div className="w-full rounded-xl overflow-hidden border border-border" style={{ aspectRatio: '4/3' }}>
        <iframe
          srcDoc={previewHtml}
          sandbox="allow-scripts"
          className="w-full h-full"
          title="HTML card preview"
        />
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="Bitcoin is forever."
            className="input-base w-full mt-1"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Body (optional)</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Permanently etched on the timechain."
            className="input-base w-full mt-1 resize-none"
          />
        </label>

        <label className="block">
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim">Footer (optional)</span>
          <input
            type="text"
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            maxLength={80}
            placeholder="Satoshi Nakamoto · 2009"
            className="input-base w-full mt-1"
          />
        </label>

        <div>
          <span className="text-xs font-mono uppercase tracking-wide text-text-dim block mb-2">
            Color preset
          </span>
          <div className="flex flex-wrap gap-2">
            {BG_PRESETS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPreset(i)}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
                  preset === i
                    ? 'border-punk text-punk bg-punk/10'
                    : 'border-border text-text-dim hover:border-border-light'
                }`}
                style={{ borderColor: preset === i ? p.accent : undefined }}
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle"
                  style={{ background: p.accent }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
