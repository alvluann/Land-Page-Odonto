import { brand } from "../data/content";
import { MessageCircle } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";
import { AnimatedIllustration } from "./AnimatedIllustration";
import { Reveal } from "./Reveal";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function FinalCtaSection() {
  return (
    <section className="section final-cta" aria-labelledby="final-cta-title">
      <div className="container">
        <Reveal>
          <article className="final-cta__panel">
            <AnimatedIllustration
              src={assetUrl("assets/illustrations/illustration-12-cta.png")}
              className="final-cta__art"
              motion="sway"
              shimmer
              interactive
            />
            <figure className="final-cta__portrait">
              <img
                src={assetUrl("assets/dra-hero.jpeg")}
                srcSet={`${assetUrl("assets/dra-hero-640.webp")} 640w, ${assetUrl("assets/dra-hero-960.webp")} 960w, ${assetUrl("assets/dra-hero.jpeg")} 1600w`}
                sizes="(max-width: 759px) calc(100vw - 2rem), 38vw"
                alt="Dra. Luara Alves em seu ambiente de atendimento."
                width={1600}
                height={1066}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <p className="eyebrow">Pode começar com uma conversa</p>
            <h2 id="final-cta-title">
              Vamos conversar sobre o sorriso que faz sentido para você?
            </h2>
            <p>
              Conte à equipe da {brand.name} o que você deseja e entenda, sem
              pressa, qual caminho realmente faz sentido para você.
            </p>
            <div className="final-cta__actions">
              <TrackedWhatsAppLink className="btn btn--primary btn--large" placement="final_cta">
                <MessageCircle className="btn__icon" size={19} aria-hidden="true" />
                Quero agendar no WhatsApp
              </TrackedWhatsAppLink>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
