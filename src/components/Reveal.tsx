import { PropsWithChildren, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { observeInView } from "../lib/inViewObserver";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

function prefersReducedMotion() {
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const revealFallback = window.setTimeout(() => setIsVisible(true), 1600);
    let stopObserving: () => void = () => {};

    stopObserving = observeInView(
      element,
      (entry) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        window.clearTimeout(revealFallback);
        stopObserving();
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    return () => {
      window.clearTimeout(revealFallback);
      stopObserving();
    };
  }, []);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      data-reveal={direction}
      style={style}
    >
      {children}
    </div>
  );
}
