import { brand, heroHighlights } from "../data/content";
import { ArrowRight, MessageCircle } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function HeroSection() {
  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow" data-hero-reveal>
            Odontologia estética · Harmonização facial
          </p>
          <h1 id="hero-title" aria-label="Cuidar do seu sorriso sem mudar quem você é.">
            <span className="hero-title__line" aria-hidden="true">
              <span className="hero-title__main" data-hero-line>
                Cuidar do seu sorriso
              </span>
            </span>
            <span className="hero-title__line" aria-hidden="true">
              <span className="text-accent" data-hero-line>
                sem mudar quem você é.
              </span>
            </span>
          </h1>
          <p className="hero__lead" data-hero-reveal>
            Técnica, escuta e senso estético para criar resultados naturais,
            seguros e verdadeiramente seus.
          </p>

          <div className="hero__cta" data-hero-reveal>
            <TrackedWhatsAppLink className="btn btn--primary" placement="hero">
              <MessageCircle className="btn__icon" size={18} aria-hidden="true" />
              Agendar avaliação no WhatsApp
            </TrackedWhatsAppLink>
            <a className="btn btn--ghost" href="#servicos">
              Conhecer tratamentos
              <ArrowRight className="btn__icon" size={18} aria-hidden="true" />
            </a>
          </div>

          <ul className="hero__list" data-hero-reveal>
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero__signature" data-hero-reveal aria-label="Identificação profissional">
            <span>{brand.cro}</span>
            <span>{brand.role}</span>
          </div>
        </div>

        <div className="hero__visual" data-hero-visual>
          <AnimatedIllustration
            src={assetUrl("assets/illustrations/illustration-01-hero.png")}
            className="hero__art"
            motion="drift"
            shimmer
            eager
          />
          <div className="hero-card" data-hero-parallax>
            <img
              src={assetUrl("assets/dra-hero.jpeg")}
              srcSet={`${assetUrl("assets/dra-hero-640.webp")} 640w, ${assetUrl("assets/dra-hero-960.webp")} 960w, ${assetUrl("assets/dra-hero.jpeg")} 1600w`}
              sizes="(max-width: 759px) calc(100vw - 2rem), (max-width: 979px) 82vw, 46vw"
              alt="Dra. Luara Alves em ambiente clínico elegante."
              width={1600}
              height={1066}
              fetchPriority="high"
              decoding="async"
              data-hero-image
            />
            <div className="hero-card__caption" aria-hidden="true">
              <span>LA</span>
              <p>Naturalidade como<br />ponto de partida.</p>
            </div>
          </div>

          <div className="floating-tag floating-tag--cro">
            <p>Consulta individual</p>
            <span>Planejamento com tempo e clareza</span>
          </div>
        </div>
      </div>
    </section>
  );
}
