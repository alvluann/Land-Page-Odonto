import { memo, useEffect, useRef, useState } from "react";
import { resultGallery } from "../data/content";
import type { ResultGalleryItem } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { trackConversion } from "../lib/analytics";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SPEED = 28;
const FIRST_ROW_ITEMS = resultGallery.filter((_, index) => index % 2 === 0);
const SECOND_ROW_ITEMS = resultGallery.filter((_, index) => index % 2 !== 0);

type MarqueeDirection = "left" | "right";

interface ResultsMarqueeRowProps {
  direction: MarqueeDirection;
  items: ResultGalleryItem[];
  reducedMotion: boolean;
}

const ResultsMarqueeRow = memo(function ResultsMarqueeRow({
  direction,
  items: rowItems,
  reducedMotion,
}: ResultsMarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    if (reducedMotion) {
      track.classList.remove("is-ready");
      track.style.removeProperty("--marquee-duration");
      track.style.removeProperty("--marquee-offset");
      return;
    }

    let measureFrame = 0;

    const measure = () => {
      if (measureFrame) cancelAnimationFrame(measureFrame);

      measureFrame = requestAnimationFrame(() => {
        const loopWidth = set.getBoundingClientRect().width;
        if (loopWidth <= 0) return;

        track.style.setProperty("--marquee-offset", `${-loopWidth}px`);
        track.style.setProperty(
          "--marquee-duration",
          `${Math.max(loopWidth / SPEED, 20).toFixed(2)}s`,
        );
        track.classList.add("is-ready");
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(set);

    return () => {
      if (measureFrame) cancelAnimationFrame(measureFrame);
      resizeObserver.disconnect();
      track.classList.remove("is-ready");
    };
  }, [reducedMotion]);

  const orderedItems = direction === "left" ? rowItems : [...rowItems].reverse();
  const cards = orderedItems.map((item) => (
    <div key={item.src} className="results-scroll-carousel__item">
      <figure className={`result-card ${item.format === "portrait" ? "result-card--portrait" : ""}`.trim()}>
        <img
          src={assetUrl(item.src)}
          alt={item.alt}
          width={item.format === "portrait" ? 720 : 1170}
          height={item.format === "portrait" ? 1280 : 1170}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 759px) 33vw, (max-width: 1199px) 28vw, 23rem"
        />
        <figcaption>
          <small>{item.category}</small>
          <span>{item.label}</span>
        </figcaption>
      </figure>
    </div>
  ));

  return (
    <div className={`results-scroll-carousel__row results-scroll-carousel__row--${direction}`}>
      <div ref={trackRef} className="results-scroll-carousel__track" aria-live="off">
        <div ref={setRef} className="results-scroll-carousel__set">
          {cards}
        </div>
        {!reducedMotion && (
          <div className="results-scroll-carousel__set" aria-hidden="true">
            {cards}
          </div>
        )}
      </div>
    </div>
  );
});

function ResultsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasTrackedEngagementRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 759px)").matches : false,
  );
  const [isInView, setIsInView] = useState(false);
  const [interactionPaused, setIsInteractionPaused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() =>
    typeof document !== "undefined" ? !document.hidden : true,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 759px)");
    const handleMotionChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    const handleMobileChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    motionQuery.addEventListener("change", handleMotionChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "20% 0px", threshold: 0.01 },
    );

    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const updateInteractionPause = (paused: boolean) => {
    setIsInteractionPaused(paused);
  };

  const registerEngagement = () => {
    if (hasTrackedEngagementRef.current) return;
    hasTrackedEngagementRef.current = true;
    trackConversion("results_gallery_engaged", "results_gallery");
  };

  const isPaused = reducedMotion || !isInView || interactionPaused || !isDocumentVisible;

  return (
    <div
      ref={carouselRef}
      className={`results-scroll-carousel ${reducedMotion ? "is-static" : ""} ${isPaused ? "is-paused" : ""}`.trim()}
      role="region"
      aria-label="Galeria de resultados clínicos; a animação pausa ao receber foco"
      tabIndex={0}
      onMouseEnter={() => updateInteractionPause(true)}
      onMouseLeave={() => updateInteractionPause(false)}
      onFocusCapture={() => {
        updateInteractionPause(true);
        registerEngagement();
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          updateInteractionPause(false);
        }
      }}
      onPointerDown={() => {
        updateInteractionPause(true);
        registerEngagement();
      }}
      onPointerUp={() => updateInteractionPause(false)}
      onPointerCancel={() => updateInteractionPause(false)}
    >
      <div className="results-scroll-carousel__rows">
        {isMobile ? (
          <>
            <ResultsMarqueeRow
              direction="right"
              items={FIRST_ROW_ITEMS}
              reducedMotion={reducedMotion}
            />
            <ResultsMarqueeRow
              direction="left"
              items={SECOND_ROW_ITEMS}
              reducedMotion={reducedMotion}
            />
          </>
        ) : (
          <ResultsMarqueeRow
            direction="left"
            items={resultGallery}
            reducedMotion={reducedMotion}
          />
        )}
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section id="resultados" className="section trust" aria-labelledby="trust-title">
      <div className="container trust__header">
        <Reveal className="trust__portrait" direction="left">
          <figure className="editorial-portrait trust__portrait-frame">
            <img
              src={assetUrl("editorial/dra-luara-retrato-01.webp")}
              alt="Dra. Luara Alves em retrato profissional."
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 759px) min(82vw, 18.5rem), 32vw"
            />
            <figcaption>
              <span>Olhar clínico e individual</span>
              <small>Resultados que preservam identidade.</small>
            </figcaption>
          </figure>
        </Reveal>

        <AnimatedIllustration
          src={assetUrl("assets/illustrations/illustration-11-results.png")}
          className="trust__art"
          motion="none"
          interactive
        />
        <span className="trust__cinematic-line" aria-hidden="true" />
        <Reveal className="trust__intro-copy" direction="right" delay={90}>
          <SectionHeading
            id="trust-title"
            eyebrow="Casos reais, escolhas individuais"
            title={
              <>
                Resultados reais.
                <span className="title-accent">Identidade preservada.</span>
              </>
            }
            description="Cada caso começa com uma avaliação individual e escolhas que respeitam traços, expressão e momento."
            compact
          />
        </Reveal>
      </div>

      <ResultsCarousel />
      <p className="container trust__disclosure">
        Cada imagem apresenta um caso individual. Resultados podem variar conforme anatomia,
        condições clínicas e resposta de cada pessoa.
      </p>
    </section>
  );
}
