import { brand, confidencePoints } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__media" direction="left">
          <img
            src={assetUrl("assets/dra-standing.jpeg")}
            srcSet={`${assetUrl("assets/dra-standing-480.webp")} 480w, ${assetUrl("assets/dra-standing-800.webp")} 800w, ${assetUrl("assets/dra-standing.jpeg")} 1066w`}
            sizes="(max-width: 759px) calc(100vw - 2rem), 40vw"
            alt="Dra. Luara Alves em pé no consultório."
            width={1066}
            height={1600}
            loading="lazy"
            decoding="async"
          />
          <p className="about__caption">
            <span>Dra. Luara Alves</span>
            Técnica, sensibilidade e presença em cada atendimento.
          </p>
        </Reveal>

        <Reveal className="about__content" delay={80} direction="right">
          <AnimatedIllustration
            src={assetUrl("assets/illustrations/illustration-02-care.png")}
            className="about__art"
            motion="sway"
          />
          <SectionHeading
            id="about-title"
            eyebrow="Antes de qualquer procedimento, existe escuta"
            title={
              <>
                Técnica para transformar.
                <span className="title-accent">Escuta para entender você.</span>
              </>
            }
            description={`${brand.name} atua com foco em estética dental e harmonização facial, unindo ciência, olhar artístico e uma experiência acolhedora do início ao fim.`}
            compact
          />
          <p>
            Cada plano é individualizado para respeitar suas proporções, sua
            identidade e o seu momento. O objetivo é realçar o que você tem de
            mais bonito, com leveza e segurança.
          </p>

          <p className="about__manifesto">
            O melhor resultado preserva sua expressão e devolve presença,
            confiança e liberdade para sorrir.
          </p>

          <ul className="about__points">
            {confidencePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="about__numbers">
            <article className="surface-card">
              <strong>Atendimento 1:1</strong>
              <span>Consulta com tempo e atenção real para você.</span>
            </article>
            <article className="surface-card">
              <strong>Planejamento completo</strong>
              <span>Estratégia clínica sob medida para cada rosto e sorriso.</span>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
