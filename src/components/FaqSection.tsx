import { ChevronDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

interface FaqItemProps {
  index: number;
  isOpen: boolean;
  item: (typeof faqs)[number];
  onToggle: (index: number) => void;
}

function FaqItem({ index, isOpen, item, onToggle }: FaqItemProps) {
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <article className={`faq__item ${isOpen ? "is-open" : ""}`.trim()}>
      <button
        id={questionId}
        type="button"
        className="faq__question"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => onToggle(index)}
      >
        <span>{item.question}</span>
        <ChevronDown size={20} aria-hidden="true" />
      </button>
      <div
        id={answerId}
        className="faq__answer"
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!isOpen}
      >
        <div className="faq__answer-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

export function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const toggleItem = (index: number) => {
    setOpenItems((currentItems) => {
      const nextItems = new Set(currentItems);

      if (nextItems.has(index)) {
        nextItems.delete(index);
      } else {
        nextItems.add(index);
      }

      return nextItems;
    });
  };

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
          {faqs.map((item, index) => {
            const isOpen = openItems.has(index);

            return (
              <FaqItem
                key={item.question}
                index={index}
                isOpen={isOpen}
                item={item}
                onToggle={toggleItem}
              />
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
