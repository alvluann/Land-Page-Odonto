import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { resultGallery } from "../data/content";
import type { ResultGalleryItem } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { trackConversion } from "../lib/analytics";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SPEED = 28;

type MarqueeDirection = "left" | "right";

interface ResultsMarqueeRowProps {
  direction: MarqueeDirection;
  items: ResultGalleryItem[];
  pausedRef: MutableRefObject<boolean>;
  reducedMotion: boolean;
}

function ResultsMarqueeRow({ direction, items: rowItems, pausedRef, reducedMotion }: ResultsMarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    if (reducedMotion) {
      progressRef.current = 0;
      track.style.transform = "";
      return;
    }

    let raf = 0;
    let loopAt = 0;

    const measure = () => {
      loopAt = set.offsetWidth;
    };

    const step = (time: number) => {
      const previousTime = lastTimeRef.current ?? time;
      const deltaSeconds = Math.min(time - previousTime, 64) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current && loopAt > 0) {
        progressRef.current += SPEED * deltaSeconds;
        if (progressRef.current >= loopAt) {
          progressRef.current -= loopAt;
        }

        const offset = direction === "left" ? -progressRef.current : progressRef.current - loopAt;
        track.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(() => {
      measure();
      raf = requestAnimationFrame(step);
    });

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(set);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      lastTimeRef.current = null;
    };
  }, [direction, pausedRef, reducedMotion]);

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
}

function ResultsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const hasTrackedEngagementRef = useRef(false);
  const pausedRef = useRef(false);
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

  useEffect(() => {
    pausedRef.current = reducedMotion || !isInView || interactionPaused || !isDocumentVisible;
  }, [interactionPaused, isDocumentVisible, isInView, reducedMotion]);

  const updateInteractionPause = (paused: boolean) => {
    setIsInteractionPaused(paused);
  };

  const registerEngagement = () => {
    if (hasTrackedEngagementRef.current) return;
    hasTrackedEngagementRef.current = true;
    trackConversion("results_gallery_engaged", "results_gallery");
  };

  const firstRowItems = resultGallery.filter((_, index) => index % 2 === 0);
  const secondRowItems = resultGallery.filter((_, index) => index % 2 !== 0);

  return (
    <div
      ref={carouselRef}
      className={`results-scroll-carousel ${reducedMotion ? "is-static" : ""}`.trim()}
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
              items={firstRowItems}
              pausedRef={pausedRef}
              reducedMotion={reducedMotion}
            />
            <ResultsMarqueeRow
              direction="left"
              items={secondRowItems}
              pausedRef={pausedRef}
              reducedMotion={reducedMotion}
            />
          </>
        ) : (
          <ResultsMarqueeRow
            direction="left"
            items={resultGallery}
            pausedRef={pausedRef}
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
        <AnimatedIllustration
          src={assetUrl("assets/illustrations/illustration-11-results.png")}
          className="trust__art"
          motion="none"
          interactive
        />
        <span className="trust__cinematic-line" aria-hidden="true" />
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
