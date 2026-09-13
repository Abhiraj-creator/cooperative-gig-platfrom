import type { ReactNode } from 'react';

export interface TextRevealProps {
  /** Content to reveal. Should be plain text or inline elements. */
  children: ReactNode;
  /** Extra CSS class(es) applied to the wrapper div. */
  className?: string;
  /**
   * ScrollTrigger start value used when trigger="scroll".
   * @default "top 70%"
   */
  scrollStart?: string;
  /** @deprecated Use scrollStart. Kept so older calls do not break. */
  SCrollStart?: string;
  /**
   * "mount"  → play immediately after mount.
   * "scroll" → play when the element enters the viewport.
   * "manual" → only playable via the imperative ref handle.
   * @default "mount"
   */
  trigger?: 'mount' | 'scroll' | 'manual';
  /** GSAP tween duration (string seconds). @default ".8" */
  duration?: string;
  /** Stagger between each split element. @default ".02" */
  stagger?: string;
  /**
   * How SplitText splits the content.
   * @default "lines"
   */
  splitBy?: 'lines' | 'words' | 'chars';
  /** GSAP tween delay (string seconds). @default "0" */
  delay?: string;
  /** GSAP ease string. @default "power3.out" */
  ease?: string;
}

/** Imperative handle exposed via forwardRef. */
export interface TextRevealHandler {
  play: () => void;
  reverse: () => void;
}
