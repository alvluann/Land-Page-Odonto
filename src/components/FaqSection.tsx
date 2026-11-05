import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { faqs } from "../data/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

const FAQ_ANIMATION_DURATION = 360;
const FAQ_ANIMATION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

interface FaqItemProps {
  index: number;
  isOpen: boolean;
  item: (typeof faqs)[number];
  onToggle: (index: number) => void;
}

function FaqItem({ index, isOpen, item, onToggle }: FaqItemProps) {
  const answerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const isFirstRenderRef = useRef(true);

  useLayoutEffect(() => {
    const answer = answerRef.current;

    if (!answer) return;

    const runningAnimation = animationRef.current;

    if (runningAnimation) {
      try {
        runningAnimation.commitStyles();
      } catch {
        // Preserva o estado visual quando commitStyles não está disponível.
      }

      runningAnimation.cancel();
      animationRef.current = null;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isFirstRenderRef.current || prefersReducedMotion) {
      answer.style.height = isOpen ? "auto" : "0px";
      answer.style.opacity = isOpen ? "1" : "0";
      answer.style.willChange = "auto";
      isFirstRenderRef.current = false;
      return;
    }

    const startHeight = answer.getBoundingClientRect().height;
    const endHeight = isOpen ? answer.scrollHeight : 0;
    const computedOpacity = Number.parseFloat(getComputedStyle(answer).opacity);
    const startOpacity = Number.isFinite(computedOpacity)
      ? String(computedOpacity)
      : isOpen
        ? "0"
        : "1";

    answer.style.height = `${startHeight}px`;
    answer.style.opacity = startOpacity;
    answer.style.willChange = "height, opacity";

    const animation = answer.animate(
      [
        { height: `${startHeight}px`, opacity: startOpacity },
        { height: `${endHeight}px`, opacity: isOpen ? "1" : "0" },
      ],
      {
        duration: FAQ_ANIMATION_DURATION,
        easing: FAQ_ANIMATION_EASING,
        fill: "forwards",
      },
    );

    animationRef.current = animation;

    animation.onfinish = () => {
      if (animationRef.current !== animation) return;

      answer.style.height = isOpen ? "auto" : "0px";
      answer.style.opacity = isOpen ? "1" : "0";
      answer.style.willChange = "auto";
      animation.cancel();
      animationRef.current = null;
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      animationRef.current?.cancel();
    },
    [],
  );

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
        ref={answerRef}
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
