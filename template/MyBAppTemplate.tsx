'use client';

/**
 * MyBAppTemplate — rename this file and the component before submitting.
 *
 * This is the base template for building a BApp.
 *
 * A BApp is a React component that:
 *   1. Receives { onOutput } as its only prop
 *   2. Calls onOutput(output) whenever its generated content changes
 *   3. Calls onOutput(null) when there's nothing valid to inscribe yet
 *
 * The platform runtime wraps your component with:
 *   - A live content preview (auto-renders SVG, HTML, JSON, images)
 *   - Advanced inscription options (parent, delegate, metadata, encoding)
 *   - The Inscribe button that sends to the Oodinals pipeline
 *
 * You only build the creative part. Keep it focused and fun.
 */

import { useState, useEffect } from 'react';
import type { BAppProps } from '../types/bapp';

export default function MyBAppTemplate({ onOutput }: BAppProps) {
  const [text, setText] = useState('Hello, Bitcoin!');

  // Call onOutput every time your content changes.
  // Use useEffect with all the values your output depends on.
  useEffect(() => {
    // Call onOutput(null) when there's nothing to inscribe yet
    if (!text.trim()) {
      onOutput(null);
      return;
    }

    // Build your content — a string or a Blob
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <rect width="800" height="400" fill="#0b0b0b"/>
  <text
    x="400" y="200"
    font-family="monospace"
    font-size="48"
    fill="#f7931a"
    text-anchor="middle"
    dominant-baseline="middle"
  >${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
</svg>`;

    onOutput({
      content: svgContent,
      contentType: 'image/svg+xml', // or 'text/html;charset=utf-8', 'image/png', etc.
      fileName: 'my-bapp-output.svg',
      title: text.slice(0, 40),     // shown in the platform UI
    });
  }, [text, onOutput]);

  return (
    <div className="space-y-4">
      {/*
       * Build your controls here.
       * Use `input-base` for all inputs/selects to match the dark platform theme.
       * Wrap labels as: <label className="block"><span className="text-xs font-mono
       *   uppercase tracking-wide text-text-dim">Label</span> <input .../></label>
       */}
      <label className="block">
        <span className="text-xs font-mono uppercase tracking-wide text-text-dim">
          Your text
        </span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Hello, Bitcoin!"
          className="input-base w-full mt-1"
        />
      </label>

      {/* Add more controls here: selects, range sliders, color pickers, buttons... */}
    </div>
  );
}
