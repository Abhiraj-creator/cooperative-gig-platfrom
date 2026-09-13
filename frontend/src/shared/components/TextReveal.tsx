import { forwardRef, useImperativeHandle, useRef } from "react";
import type { TextRevealProps, TextRevealHandler } from "@/types/TextReveal.types";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/libs/gsap";

/**
 * TextReveal
 * ----------
 * Wraps any text content and reveals it via a `y: 110% → 0%` mask animation.
 * The parent div already has `overflow-hidden` so no extra wrapper is needed.
 *
 * Usage (scroll-triggered):
 * ```tsx
 * <TextReveal trigger="scroll" splitBy="words" stagger=".04">
 *   <h2>Transforming cooperative work.</h2>
 * </TextReveal>
 * ```
 *
 * Usage (imperative / manual):
 * ```tsx
 * const ref = useRef<TextRevealHandler>(null);
 * <TextReveal ref={ref} trigger="manual"><p>Reveal me later.</p></TextReveal>
 * <button onClick={() => ref.current?.play()}>Go</button>
 * ```
 */
const TextReveal = forwardRef<TextRevealHandler, TextRevealProps>(
  (
    {
      children,
      className = "",
      scrollStart,
      SCrollStart,
      trigger = "mount",
      duration = ".8",
      stagger = ".02",
      splitBy = "lines",
      delay = "0",
      ease = "power3.out",
    },
    ref,
  ) => {
    const WrapperRef = useRef<HTMLDivElement>(null);
    const SplitRef = useRef<SplitText | null>(null);
    const TlRef = useRef<gsap.core.Timeline | null>(null);

    useImperativeHandle(ref, () => ({
      play: () => TlRef.current?.play(),
      reverse: () => TlRef.current?.reverse(),
    }));

    useGSAP(
      () => {
        if (!WrapperRef.current) return;

        const split = new SplitText(WrapperRef.current, {
          type: splitBy,
          lineThreshold: 0.3,
        });
        SplitRef.current = split;

        const elements = split[splitBy];
        const staggerValue = Number(stagger);

        gsap.set(elements, { y: "110%" });

        TlRef.current = gsap.timeline({
          defaults: { delay },
          paused: true,
        });

        TlRef.current.to(elements, {
          y: "0%",
          duration,
          opacity: 1,
          stagger: { each: staggerValue },
          ease,
        });

        if (trigger === "mount") {
          TlRef.current.play();
        } else if (trigger === "scroll") {
          ScrollTrigger.create({
            trigger: WrapperRef.current,
            start: scrollStart ?? SCrollStart ?? "top 70%",
            once: true,
            onEnter: () => TlRef.current?.play(),
          });
        }
        // trigger === "manual" → consumer calls ref.current.play()

        return () => {
          TlRef.current?.kill();
          SplitRef.current?.revert();
        };
      },
      { scope: WrapperRef },
    );

    return (
      <div ref={WrapperRef} className={`overflow-hidden ${className}`}>
        {children}
      </div>
    );
  },
);

TextReveal.displayName = "TextReveal";
export default TextReveal;
