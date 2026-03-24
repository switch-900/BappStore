/**
 * BApp Type Definitions
 *
 * Import these in your BApp component:
 *
 *   import type { BAppProps, BAppOutput } from '../types/bapp';
 *
 * Your component signature must be:
 *
 *   export default function MyBApp({ onOutput }: BAppProps) { ... }
 */

/** Output that a BApp hands to the platform wrapper. */
export interface BAppOutput {
  /**
   * The generated content.
   * - Use a `string` for text, HTML, SVG, or JSON.
   * - Use a `Blob` for binary formats (PNG, WebP, GLB, etc.)
   */
  content: string | Blob;

  /**
   * MIME type of the content.
   * Examples: 'image/svg+xml', 'text/html;charset=utf-8', 'image/png'
   */
  contentType: string;

  /** Suggested filename for the inscription (e.g. 'my-art.svg') */
  fileName?: string;

  /** Short human-readable title shown in the platform UI */
  title?: string;

  /**
   * Optional quick-preview URL (data URI or object URL).
   * Only needed for binary content — the platform auto-previews text/HTML/SVG.
   */
  preview?: string;

  /** Optional metadata to embed in the inscription (Ordinals tag 5, CBOR). */
  metadata?: Record<string, unknown>;

  /**
   * Optional developer fee — taken at inscription time.
   * Configure this in manifest.json instead of hardcoding here.
   */
  developerFee?: {
    enabled: boolean;
    mode?: 'transaction' | 'item';
    address: string;
    amountSats: number;
    description?: string;
  };

  /**
   * Optional inscription defaults your BApp wants pre-filled.
   * Users can still override these in the Advanced Options panel.
   */
  inscriptionDefaults?: {
    parentIds?: string[];
    delegateId?: string;
    metaprotocol?: string;
    postage?: number;
    contentEncoding?: 'br' | 'gzip' | 'deflate' | 'identity';
    compressBeforeInscribe?: boolean;
  };
}

/**
 * Props passed to every BApp component by the platform runtime.
 *
 * - Call `onOutput(output)` whenever your content changes.
 * - Call `onOutput(null)` when there's nothing valid to inscribe yet
 *   (e.g. the user hasn't entered any text yet).
 */
export interface BAppProps {
  onOutput: (output: BAppOutput | null) => void;
}

/**
 * Category taxonomy used in manifest.json
 *
 * Art        — generative SVGs, patterns, visual artwork
 * HTML & Web — HTML inscriptions, interactive web pages
 * Image      — pixel art, image manipulation, avatar editors
 * 3D         — 3D models, printing tools, viewers
 * Utility    — QR codes, utilities, developer tools
 * Community  — social tools, collections, public goods
 * Game       — games and interactive inscriptions
 */
export type BAppCategory =
  | 'Art'
  | 'HTML & Web'
  | 'Image'
  | '3D'
  | 'Utility'
  | 'Community'
  | 'Game';
