import { testimonials } from "../data/content";
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
        <Reveal>
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

        <p className="mobile-scroll-hint testimonials__mobile-hint" aria-hidden="true">
          Deslize para ler outros relatos
        </p>
        <div
          className="testimonials__grid"
          role="region"
          aria-label="Relatos de pacientes; deslize horizontalmente para navegar"
          tabIndex={0}
        >
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={90 + index * 50}>
              <article className="surface-card testimonial-card">
                <span className="testimonial-card__quote" aria-hidden="true">“</span>
                <blockquote>{testimonial.text}</blockquote>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>Identificação abreviada</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
