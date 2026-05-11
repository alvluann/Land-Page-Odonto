import { brand, confidencePoints } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__media">
          <img
            src="/assets/dra-standing.jpeg"
            alt="Dra. Luara Alves em pé no consultório."
            width={1066}
            height={1600}
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal className="about__content" delay={120}>
          <SectionHeading
            id="about-title"
            eyebrow="Quem é a Dra. Luara Alves"
            title="Excelência técnica com cuidado verdadeiramente humano."
            description={`${brand.name} atua com foco em estética dental e harmonização facial, unindo ciência, olhar artístico e uma experiência acolhedora do início ao fim.`}
            compact
          />
          <p>
            Cada plano é individualizado para respeitar suas proporções, sua
            identidade e o seu momento. O objetivo é realçar o que você tem de
            mais bonito, com leveza e segurança.
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
