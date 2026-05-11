import { differentials } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="section differentials"
      aria-labelledby="differentials-title"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            id="differentials-title"
            eyebrow="Diferenciais"
            title="Uma experiência premium, segura e desenhada para você."
            description="Da escuta inicial ao pós-tratamento, cada etapa é pensada para gerar confiança e conforto."
            compact
          />
        </Reveal>

        <div className="differentials__grid">
          {differentials.map((item, index) => (
            <Reveal key={item.title} delay={80 + index * 45}>
              <article className="differential-card">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
