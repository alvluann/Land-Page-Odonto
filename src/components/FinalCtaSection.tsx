import { brand, whatsappHref } from "../data/content";
import { Reveal } from "./Reveal";

export function FinalCtaSection() {
  return (
    <section className="section final-cta" aria-labelledby="final-cta-title">
      <div className="container">
        <Reveal>
          <article className="final-cta__panel">
            <p className="eyebrow">Pronta para transformar seu sorriso?</p>
            <h2 id="final-cta-title">
              Agende sua avaliação personalizada e viva essa experiência premium.
            </h2>
            <p>
              Fale diretamente com a equipe da {brand.name} e receba orientação
              para o melhor tratamento para o seu momento.
            </p>
            <div className="final-cta__actions">
              <a className="btn btn--primary btn--large" href={whatsappHref} target="_blank" rel="noreferrer">
                Quero agendar no WhatsApp
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
