import { useEffect, useRef } from "react";
import { resultGallery } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const SPEED = 0.45;

function ResultsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

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
              src={assetUrl(item.src)}
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
        <div ref={setRef} className="results-scroll-carousel__set">
          {items}
        </div>
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
