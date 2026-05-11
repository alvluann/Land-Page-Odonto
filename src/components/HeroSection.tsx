import { brand, heroHighlights, whatsappHref } from "../data/content";
import { Reveal } from "./Reveal";

export function HeroSection() {
  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <Reveal className="hero__content">
          <p className="eyebrow">Odontologia estética e harmonização facial</p>
          <h1 id="hero-title">
            Sofisticação, saúde e{" "}
            <span className="text-accent">naturalidade</span>{" "}
            para valorizar o seu sorriso.
          </h1>
          <p className="hero__lead">
            Na clínica da {brand.name}, cada atendimento é desenhado com técnica,
            sensibilidade e foco total no seu bem-estar.
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary" href={whatsappHref} target="_blank" rel="noreferrer">
              Agendar avaliação no WhatsApp
            </a>
            <a className="btn btn--ghost" href="#servicos">
              Conhecer tratamentos
            </a>
          </div>

          <ul className="hero__list">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hero__visual" delay={120}>
          <div className="hero-card">
            <img
              src="/assets/dra-hero.jpeg"
              alt="Dra. Luara Alves em ambiente clínico elegante."
              width={1600}
              height={1066}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="floating-tag floating-tag--brand" aria-hidden="true">
            <img
              src="/assets/logo-full.jpeg"
              alt=""
              width={420}
              height={420}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="floating-tag floating-tag--cro">
            <p>{brand.cro}</p>
            <span>Avaliação personalizada</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
