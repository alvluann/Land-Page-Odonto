import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function FaqSection() {
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <Reveal className="faq__intro" direction="left">
          <SectionHeading
            id="faq-title"
            eyebrow="Antes de decidir, entenda o caminho"
            title={
              <>
                Respostas claras.
                <span className="title-accent">Escolhas conscientes.</span>
              </>
            }
            description="Informações gerais para você chegar à avaliação sabendo o que esperar. A indicação clínica é sempre individual."
            compact
          />
          <TrackedWhatsAppLink
            className="btn btn--ghost faq__cta"
            placement="faq"
            aria-label="Falar com a equipe da Dra. Luara pelo WhatsApp"
          >
            <MessageCircle className="btn__icon" size={18} aria-hidden="true" />
            Falar com a equipe
          </TrackedWhatsAppLink>
        </Reveal>

        <Reveal className="faq__list" direction="right" delay={80}>
          {faqs.map((item, index) => (
            <details key={item.question} className="faq__item" open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </summary>
              <div className="faq__answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
