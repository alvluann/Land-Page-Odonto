import { differentials } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
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
        <AnimatedIllustration
          src={assetUrl("assets/illustrations/illustration-10-differentials.png")}
          className="differentials__art"
          motion="drift"
          shimmer
        />
        <Reveal>
          <SectionHeading
            id="differentials-title"
            eyebrow="O jeito Luara de cuidar"
            title={
              <>
                Por que o cuidado aqui
                <span className="title-accent">é diferente.</span>
              </>
            }
            description="Da primeira conversa ao acompanhamento, cada decisão tem um motivo e cada etapa respeita o seu tempo."
            compact
          />
        </Reveal>

        <div className="differentials__grid">
          {differentials.map((item, index) => (
            <Reveal key={item.title} delay={80 + index * 45}>
              <article className="differential-card">
                <span className="differential-card__mark" aria-hidden="true" />
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
