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
            />
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
