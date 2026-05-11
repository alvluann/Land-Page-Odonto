import type { ServiceIcon } from "../data/content";
import { services } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ServiceIconGraphic({ name }: { name: ServiceIcon }) {
  const paths: Record<ServiceIcon, string> = {
    cleaning: "M12 3v18M5 8h14M7 14h10",
    whitening: "M12 2l2.4 5.2L20 8l-4 4 .9 6L12 15.6 7.1 18 8 12 4 8l5.6-.8L12 2Z",
    botox:
      "M4 12c2.7-.5 4.5-2.3 5-5 1 .8 2 .8 3 0 .5 2.7 2.3 4.5 5 5-2.7.5-4.5 2.3-5 5-1-.8-2-.8-3 0-.5-2.7-2.3-4.5-5-5Z",
    harmonization: "M12 3c2.5 2.6 5 4.8 5 8.1A5 5 0 1 1 7 11.1C7 7.8 9.5 5.6 12 3Z",
    evaluation: "M4 6h16M4 12h16M4 18h10",
    aesthetics: "M12 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 3v4l3 2",
    prevention: "M12 2 4 6v6c0 5 3.2 8.6 8 10 4.8-1.4 8-5 8-10V6l-8-4Z",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <section id="servicos" className="section services" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="Especialidades e serviços"
            title="Tratamentos pensados para unir saúde, estética e naturalidade."
            description="Protocolos personalizados para respeitar sua anatomia, suas expectativas e o seu estilo de vida."
            compact
          />
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={80 + index * 45}>
              <article className="surface-card service-card">
                <span className="service-card__icon">
                  <ServiceIconGraphic name={service.icon} />
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
