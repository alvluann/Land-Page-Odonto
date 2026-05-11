import { resultGallery } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TrustSection() {
  return (
    <section id="resultados" className="section trust" aria-labelledby="trust-title">
      <div className="container trust__layout">
        <Reveal className="trust__content">
          <SectionHeading
            id="trust-title"
            eyebrow="Confiança construída em cada detalhe"
            title="Resultados reais, cuidado personalizado e ambiente acolhedor."
            compact
          />

          <p>
            A proposta da clínica é oferecer evolução estética com respeito às
            suas características naturais. O resultado precisa ser bonito, sim,
            mas também leve, harmônico e duradouro.
          </p>
          <p>
            Da primeira consulta ao acompanhamento final, você recebe um plano
            claro, confortável e totalmente orientado para a sua segurança.
          </p>

          <figure className="trust__quote-visual">
            <img
              src="/assets/quote-visual.jpeg"
              alt="Mensagem motivacional sobre autocuidado com o sorriso."
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </Reveal>

        <div className="results-grid">
          {resultGallery.map((item, index) => (
            <Reveal key={item.src} delay={100 + index * 35}>
              <figure
                className={`result-card ${index === 0 ? "result-card--tall" : ""}`.trim()}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={1170}
                  height={1170}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{item.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
