import type { ServiceIcon } from "../data/content";
import { services } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const serviceArtwork: Record<ServiceIcon, string> = {
  cleaning: assetUrl("assets/illustrations/illustration-03-cleaning.png"),
  whitening: assetUrl("assets/illustrations/illustration-04-whitening.png"),
  botox: assetUrl("assets/illustrations/illustration-05-botox.png"),
  harmonization: assetUrl("assets/illustrations/illustration-06-harmonization.png"),
  evaluation: assetUrl("assets/illustrations/illustration-07-evaluation.png"),
  aesthetics: assetUrl("assets/illustrations/illustration-08-aesthetics.png"),
  prevention: assetUrl("assets/illustrations/illustration-09-prevention.png"),
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

        <p className="mobile-scroll-hint services__mobile-hint" aria-hidden="true">
          Deslize para conhecer os cuidados
        </p>
        <div
          className="services__grid"
          role="region"
          aria-label="Tratamentos disponíveis; deslize horizontalmente para navegar"
          tabIndex={0}
        >
          {services.map((service, index) => (
            <Reveal key={service.title} delay={80 + index * 45}>
              <article className="surface-card service-card">
                <AnimatedIllustration
                  src={serviceArtwork[service.icon]}
                  className={`service-card__art service-card__art--${service.icon}`}
                  motion={serviceMotion[index % serviceMotion.length]}
                  shimmer={service.icon === "whitening"}
                />
                <span className="service-card__category" aria-hidden="true">
                  Cuidado individual
                </span>
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
