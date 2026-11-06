import { useEffect, useRef } from "react";
import { observeInView } from "../lib/inViewObserver";

type IllustrationMotion = "float" | "drift" | "breathe" | "sway" | "none";

interface AnimatedIllustrationProps {
  src: string;
  className?: string;
  motion?: IllustrationMotion;
  shimmer?: boolean;
  eager?: boolean;
  interactive?: boolean;
}

export function AnimatedIllustration({
  src,
  className = "",
  motion = "float",
  shimmer = false,
  eager = false,
  interactive = false,
}: AnimatedIllustrationProps) {
  const artworkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;

    if (!artwork) {
      return;
    }

    return observeInView(
      artwork,
      (entry) => artwork.classList.toggle("is-in-view", entry.isIntersecting),
      { rootMargin: "12% 0px", threshold: 0.01 },
    );
  }, []);

  return (
    <span
      ref={artworkRef}
      className={`artwork artwork--${motion} ${className}`.trim()}
      data-pointer-artwork={interactive ? "" : undefined}
      aria-hidden="true"
    >
      <span className="artwork__pointer">
        <span className="artwork__motion">
          <img
            className="artwork__image"
            src={src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />
          {shimmer && (
            <img
              className="artwork__shine"
              src={src}
              alt=""
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              draggable="false"
            />
          )}
        </span>
      </span>
    </span>
  );
}
