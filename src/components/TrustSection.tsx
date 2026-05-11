import { useEffect, useRef } from "react";
import { resultGallery } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SPEED = 0.45; // px per animation frame

function ResultsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

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
  }, []);

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
      className="results-scroll-carousel"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div ref={trackRef} className="results-scroll-carousel__track">
        {/* First set — measured for loop point */}
        <div ref={setRef} className="results-scroll-carousel__set">
          {items}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="results-scroll-carousel__set" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section id="resultados" className="section trust" aria-labelledby="trust-title">
      <div className="container trust__header">
        <Reveal>
          <SectionHeading
            id="trust-title"
            eyebrow="Confiança construída em cada detalhe"
            title="Resultados reais, cuidado personalizado e ambiente acolhedor."
            centered
            compact
          />
        </Reveal>
      </div>

      <ResultsCarousel />
    </section>
  );
}
