import type { ReactNode } from 'react';

export interface TextRollProps {
  /** Content shown in both the original and the rolling clone. */
  children: ReactNode;
  /**
   * How SplitText splits the text for the roll animation.
   * @default "chars"
   */
  splitBy?: 'chars' | 'words' | 'lines';
  /** GSAP tween duration (string seconds). @default ".4" */
  duration?: string;
  /** Manual hover state override. If provided, controls animation instead of hover. */
  active?: boolean;
  /** Additional CSS class names */
  className?: string;
}
