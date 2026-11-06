import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePlaybackPreferences } from "../hooks/usePlaybackPreferences";
import { observeInView } from "../lib/inViewObserver";

type CarouselCopy = 0 | 1;

interface ContinuousCarouselProps {
  ariaLabel: string;
  className?: string;
  children: ReactNode | ((copy: CarouselCopy) => ReactNode);
  duplicateAriaHidden?: boolean;
  setClassName?: string;
  speed?: number;
}

export function ContinuousCarousel({
  ariaLabel,
  children,
  className = "",
  duplicateAriaHidden = true,
  setClassName = "",
  speed = 32,
}: ContinuousCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { isDocumentVisible, reducedMotion } = usePlaybackPreferences();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    return observeInView(
      viewport,
      (entry) => setIsInView(entry.isIntersecting),
      { rootMargin: "20% 0px", threshold: 0.01 },
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const itemSet = setRef.current;
    if (!track || !itemSet || reducedMotion) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = itemSet.getBoundingClientRect().width;
        if (width <= 0) return;
        track.style.setProperty("--continuous-offset", `${-width}px`);
        track.style.setProperty("--continuous-duration", `${Math.max(width / speed, 18).toFixed(2)}s`);
        track.classList.add("is-ready");
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(itemSet);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      track.classList.remove("is-ready");
    };
  }, [reducedMotion, speed]);

  const isPaused = !isInView || !isDocumentVisible;
  const renderChildren = (copy: CarouselCopy) =>
    typeof children === "function" ? children(copy) : children;

  return (
    <div
      ref={viewportRef}
      className={`continuous-carousel ${reducedMotion ? "is-static" : ""} ${isPaused ? "is-paused" : ""} ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <div ref={trackRef} className="continuous-carousel__track" aria-live="off">
        <div ref={setRef} className={`continuous-carousel__set ${setClassName}`.trim()}>
          {renderChildren(0)}
        </div>
        {!reducedMotion && (
          <div
            className={`continuous-carousel__set ${setClassName}`.trim()}
            aria-hidden={duplicateAriaHidden || undefined}
          >
            {renderChildren(1)}
          </div>
        )}
      </div>
    </div>
  );
}
