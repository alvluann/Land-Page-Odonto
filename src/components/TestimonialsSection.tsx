import { testimonials } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { ContinuousCarousel } from "./ContinuousCarousel";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="section testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="testimonials__intro">
          <Reveal className="testimonials__portrait" direction="left">
            <figure className="editorial-portrait testimonials__portrait-frame">
              <img
                src={assetUrl("editorial/dra-luara-retrato-02.webp")}
                alt="Dra. Luara Alves em um retrato espontâneo."
                width={720}
                height={1280}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 759px) min(82vw, 18.5rem), 34vw"
              />
              <figcaption>
                <span>Presença que acolhe</span>
                <small>Escuta e cuidado em cada etapa.</small>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="testimonials__intro-copy" direction="right" delay={90}>
            <SectionHeading
              id="testimonials-title"
              eyebrow="Palavras de quem passou por aqui"
              title={
                <>
                  Experiências que
                  <span className="title-accent">viraram confiança.</span>
                </>
              }
              description="Relatos apresentados com identificação abreviada para preservar a privacidade de cada paciente."
              compact
            />
          </Reveal>
        </div>

        <ContinuousCarousel
          className="testimonials__viewport"
          setClassName="testimonials__grid"
          ariaLabel="Relatos de pacientes em movimento contínuo"
          speed={24}
        >
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={90 + index * 50}>
              <article
                className="surface-card testimonial-card"
                role="group"
                aria-label={`${index + 1} de ${testimonials.length}`}
              >
                <span className="testimonial-card__quote" aria-hidden="true">“</span>
                <blockquote>{testimonial.text}</blockquote>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>Identificação abreviada</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </ContinuousCarousel>
      </div>
    </section>
  );
}
