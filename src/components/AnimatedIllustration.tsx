import { useEffect, useRef } from "react";

type IllustrationMotion = "float" | "drift" | "breathe" | "sway" | "none";

interface AnimatedIllustrationProps {
  src: string;
  className?: string;
  motion?: IllustrationMotion;
  shimmer?: boolean;
  eager?: boolean;
}

export function AnimatedIllustration({
  src,
  className = "",
  motion = "float",
  shimmer = false,
  eager = false,
}: AnimatedIllustrationProps) {
  const artworkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const artwork = artworkRef.current;

    if (!artwork) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        artwork.classList.toggle("is-in-view", entry.isIntersecting);
      },
      { rootMargin: "12% 0px", threshold: 0.01 },
    );

    observer.observe(artwork);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={artworkRef}
      className={`artwork artwork--${motion} ${className}`.trim()}
      aria-hidden="true"
    >
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
  );
}
