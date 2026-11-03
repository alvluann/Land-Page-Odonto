import { brand, heroHighlights, whatsappHref } from "../data/content";
import { ArrowRight, MessageCircle } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";

export function HeroSection() {
  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <Reveal className="hero__content">
          <p className="eyebrow hero-motion hero-motion--1">Um cuidado pensado para continuar sendo você</p>
          <h1 id="hero-title" className="hero-motion hero-motion--2">
            <span className="hero-title__main">Cuidar do seu sorriso</span>
            <span className="text-accent">sem mudar quem você é.</span>
          </h1>
          <p className="hero__lead hero-motion hero-motion--3">
            Na clínica da {brand.name}, técnica e sensibilidade caminham juntas
            para criar resultados leves, seguros e verdadeiramente seus.
          </p>

          <div className="hero__cta hero-motion hero-motion--4">
            <a className="btn btn--primary" href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="btn__icon" size={18} aria-hidden="true" />
              Agendar avaliação no WhatsApp
            </a>
            <a className="btn btn--ghost" href="#servicos">
              Conhecer tratamentos
              <ArrowRight className="btn__icon" size={18} aria-hidden="true" />
            </a>
          </div>

          <ul className="hero__list hero-motion hero-motion--5">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hero__visual" delay={100} direction="scale">
          <AnimatedIllustration
            src={assetUrl("assets/illustrations/illustration-01-hero.png")}
            className="hero__art"
            motion="drift"
            shimmer
            eager
          />
          <div className="hero-card">
            <img
              src={assetUrl("assets/dra-hero.jpeg")}
              alt="Dra. Luara Alves em ambiente clínico elegante."
              width={1600}
              height={1066}
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-card__caption" aria-hidden="true">
              <span>LA</span>
              <p>Beleza natural,<br />cuidado individual.</p>
            </div>
          </div>

          <div className="floating-tag floating-tag--cro">
            <p>{brand.cro}</p>
            <span>Cirurgiã-dentista</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
