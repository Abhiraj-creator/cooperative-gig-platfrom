import { gsap, SplitText, useGSAP } from "@/libs/gsap";
import React, { useEffect, useRef } from "react";
import type { TextRollProps } from "@/types/TextRoll.types";

/**
 * TextRoll
 * --------
 * Hover-activated rolling text animation. Renders text twice (original + hidden clone)
 * and rolls both simultaneously on hover.
 *
 * Automatically binds to its outer interactive parent element (<a>, <button>, .nav-link, etc.)
 * so hovering anywhere on the parent container triggers both the background color change
 * and the TextRoll animation together!
 */
const TextRoll = ({
  duration = ".4",
  children,
  splitBy = "chars",
  active,
  className = "",
}: TextRollProps) => {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const SplitOriginalRef = useRef<SplitText | null>(null);
  const SplitCloneRef = useRef<SplitText | null>(null);

  const getElements = (ref: React.RefObject<SplitText | null>) =>
    ref.current?.[splitBy as "chars" | "words" | "lines"];

  useGSAP(
    () => {
      if (!WrapperRef.current) return;

      const originalEl = WrapperRef.current.querySelector(".text-roll-original");
      const cloneEl = WrapperRef.current.querySelector(".text-roll-clone");
      const opts = { type: splitBy, lineThreshold: 0.3 };

      if (originalEl) SplitOriginalRef.current = new SplitText(originalEl, opts);
      if (cloneEl) SplitCloneRef.current = new SplitText(cloneEl, opts);

      const origElements = getElements(SplitOriginalRef);
      const cloneElements = getElements(SplitCloneRef);

      if (origElements) gsap.set(origElements, { yPercent: 0 });
      if (cloneElements) gsap.set(cloneElements, { yPercent: 100 });

      return () => {
        SplitOriginalRef.current?.revert();
        SplitCloneRef.current?.revert();
      };
    },
    { scope: WrapperRef, dependencies: [splitBy] },
  );

  const { contextSafe } = useGSAP({ scope: WrapperRef });

  const handleHover = contextSafe((entering: boolean) => {
    const origElements = getElements(SplitOriginalRef);
    const cloneElements = getElements(SplitCloneRef);
    if (!origElements || !cloneElements) return;

    gsap.killTweensOf([origElements, cloneElements]);

    const staggerVal = entering ? 0.015 : -0.01;

    gsap.to(origElements, {
      yPercent: entering ? -100 : 0,
      duration,
      stagger: staggerVal,
      ease: "power2.out",
    });
    gsap.to(cloneElements, {
      yPercent: entering ? 0 : 100,
      duration,
      stagger: staggerVal,
      ease: "power2.out",
    });
  });

  // Attach event listeners to closest interactive parent element
  useEffect(() => {
    if (active !== undefined) {
      handleHover(active);
      return;
    }

    const wrapper = WrapperRef.current;
    if (!wrapper) return;

    const parentInteractive = wrapper.closest<HTMLElement>(
      'a, button, [role="button"], .nav-link, .nav-cta, .nav-menu, .secondary-action, .primary-action, .final-cta a, .service-tile a'
    ) || wrapper;

    const onEnter = () => handleHover(true);
    const onLeave = () => handleHover(false);

    parentInteractive.addEventListener("mouseenter", onEnter);
    parentInteractive.addEventListener("mouseleave", onLeave);

    return () => {
      parentInteractive.removeEventListener("mouseenter", onEnter);
      parentInteractive.removeEventListener("mouseleave", onLeave);
    };
  }, [active, handleHover]);

  return (
    <div
      ref={WrapperRef}
      className={`text-roll-wrapper overflow-hidden relative inline-block whitespace-nowrap align-middle ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Original — visible at rest, rolls out on hover */}
      <div className="text-roll-original whitespace-nowrap" style={{ display: 'block', whiteSpace: 'nowrap' }}>
        {children}
      </div>

      {/* Clone — hidden below at rest, rolls in on hover */}
      <div
        className="text-roll-clone absolute top-0 left-0 w-full h-full pointer-events-none whitespace-nowrap"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TextRoll;
