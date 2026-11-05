import { MessageCircle } from "lucide-react";
import { assetUrl } from "../lib/assetUrl";
import { trackConversion } from "../lib/analytics";
import { Reveal } from "./Reveal";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function ExperienceFilmSection() {
  return (
    <section className="section experience-film" aria-labelledby="experience-film-title">
      <div className="container experience-film__panel">
        <Reveal className="experience-film__copy" direction="left">
          <p className="eyebrow">Por dentro do cuidado</p>
          <h2 id="experience-film-title">
            Presença em cada detalhe.
            <span>Cuidado em cada escolha.</span>
          </h2>
          <p>
            Uma experiência clínica também é feita de escuta, clareza e tempo.
            Este registro mostra um pouco do cuidado pensado para cada etapa.
          </p>
          <TrackedWhatsAppLink className="btn experience-film__cta" placement="experience_film">
            <MessageCircle className="btn__icon" size={18} aria-hidden="true" />
            Conversar com a equipe
          </TrackedWhatsAppLink>
          <div className="experience-film__note" aria-hidden="true">
            <span>Escuta</span>
            <span>Clareza</span>
            <span>Tempo</span>
          </div>
        </Reveal>

        <Reveal className="experience-film__media" delay={100} direction="scale">
          <div className="experience-film__frame">
            <video
              controls
              playsInline
              preload="metadata"
              poster={assetUrl("assets/video/dra-luara-experiencia-poster.webp")}
              width={540}
              height={960}
              aria-label="Vídeo sobre a experiência de atendimento na clínica da Dra. Luara Alves"
              onPlay={() => trackConversion("experience_video_play", "experience_film")}
            >
              <source src={assetUrl("assets/video/dra-luara-experiencia.mp4")} type="video/mp4" />
              Seu navegador não consegue reproduzir este vídeo.
            </video>
          </div>
          <p>Vídeo vertical · pressione play para assistir com áudio</p>
        </Reveal>
      </div>
    </section>
  );
}
