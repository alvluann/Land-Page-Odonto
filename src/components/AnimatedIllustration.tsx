type IllustrationMotion = "float" | "drift" | "breathe" | "sway";

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
  return (
    <span
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
