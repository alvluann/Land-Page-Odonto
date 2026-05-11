import { PropsWithChildren, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
