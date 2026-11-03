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
            compact
          />
        </Reveal>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={90 + index * 50}>
              <article className="surface-card testimonial-card">
                <span className="testimonial-card__index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="testimonial-card__stars" aria-label="5 de 5 estrelas">
                  ★★★★★
                </div>
                <p>{testimonial.text}</p>
                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>Paciente da clínica</span>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
