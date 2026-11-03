import type { ServiceIcon } from "../data/content";
import { services } from "../data/content";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const serviceArtwork: Record<ServiceIcon, string> = {
  cleaning: "/assets/illustrations/illustration-03-cleaning.png",
  whitening: "/assets/illustrations/illustration-04-whitening.png",
  botox: "/assets/illustrations/illustration-05-botox.png",
  harmonization: "/assets/illustrations/illustration-06-harmonization.png",
  evaluation: "/assets/illustrations/illustration-07-evaluation.png",
  aesthetics: "/assets/illustrations/illustration-08-aesthetics.png",
  prevention: "/assets/illustrations/illustration-09-prevention.png",
};

const serviceMotion = ["float", "breathe", "sway", "drift"] as const;

export function ServicesSection() {
  return (
    <section id="servicos" className="section services" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="Possibilidades de cuidado para o seu momento"
            title={
              <>
                Cada sorriso pede
                <span className="title-accent">um cuidado diferente.</span>
              </>
            }
            description="Protocolos personalizados para respeitar sua anatomia, suas expectativas e o seu estilo de vida."
            compact
          />
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={80 + index * 45}>
              <article className="surface-card service-card">
                <span className="service-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <AnimatedIllustration
                  src={serviceArtwork[service.icon]}
                  className={`service-card__art service-card__art--${service.icon}`}
                  motion={serviceMotion[index % serviceMotion.length]}
                  shimmer={service.icon === "whitening"}
                />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
