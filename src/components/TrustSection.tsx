import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { resultGallery } from "../data/content";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SPEED = 0.45; // px per animation frame

function ResultsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    pausedRef.current = manualPaused || reducedMotion;
  }, [manualPaused, reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    if (reducedMotion) {
      progressRef.current = 0;
      track.style.transform = "";
      return;
    }

    // Measure after paint so layout is settled
    let raf: number;
    let loopAt = 0;

    const measure = () => {
      loopAt = set.offsetWidth;
    };

    const step = () => {
      if (!pausedRef.current && loopAt > 0) {
        progressRef.current += SPEED;
        if (progressRef.current >= loopAt) {
          progressRef.current -= loopAt;
        }
        track.style.transform = `translateX(${-progressRef.current}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    // Defer first measure until after browser paint
    raf = requestAnimationFrame(() => {
      measure();
      raf = requestAnimationFrame(step);
    });

    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  const setInteractionPaused = (paused: boolean) => {
    pausedRef.current = manualPaused || paused || reducedMotion;
  };

  const items = (
    <>
      {resultGallery.map((item) => (
        <div key={item.src} className="results-scroll-carousel__item">
          <figure className="result-card">
            <img
              src={item.src}
              alt={item.alt}
              width={1170}
              height={1170}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        </div>
      ))}
    </>
  );

  return (
    <div
      className={`results-scroll-carousel ${reducedMotion ? "is-static" : ""}`.trim()}
      role="region"
      aria-label="Galeria de resultados clínicos"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteractionPaused(false);
        }
      }}
      onPointerDown={() => setInteractionPaused(true)}
      onPointerUp={() => setInteractionPaused(false)}
      onPointerCancel={() => setInteractionPaused(false)}
    >
      {!reducedMotion && (
        <button
          type="button"
          className="results-scroll-carousel__control"
          aria-pressed={manualPaused}
          onClick={() => setManualPaused((paused) => !paused)}
        >
          {manualPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          <span>{manualPaused ? "Continuar" : "Pausar"}</span>
        </button>
      )}

      <div ref={trackRef} className="results-scroll-carousel__track" aria-live="off">
        {/* First set — measured for loop point */}
        <div ref={setRef} className="results-scroll-carousel__set">
          {items}
        </div>
        {!reducedMotion && (
          <div className="results-scroll-carousel__set" aria-hidden="true">
            {items}
          </div>
        )}
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section id="resultados" className="section trust" aria-labelledby="trust-title">
      <div className="container trust__header">
        <AnimatedIllustration
          src="/assets/illustrations/illustration-11-results.png"
          className="trust__art"
          motion="breathe"
          shimmer
        />
        <Reveal>
          <SectionHeading
            id="trust-title"
            eyebrow="Casos reais, escolhas individuais"
            title={
              <>
                Resultados reais.
                <span className="title-accent">Identidade preservada.</span>
              </>
            }
            compact
          />
        </Reveal>
      </div>

      <ResultsCarousel />
    </section>
  );
}
