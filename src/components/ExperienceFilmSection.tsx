import { useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { experienceMedia } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { trackConversion } from "../lib/analytics";
import { Reveal } from "./Reveal";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function ExperienceFilmSection() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    loop: true,
    slidesToScroll: 1,
  });

  const setRailRef = useCallback(
    (node: HTMLDivElement | null) => {
      railRef.current = node;
      emblaRef(node);
    },
    [emblaRef],
  );

  const scrollRail = (direction: -1 | 1) => {
    if (!emblaApi) return;
    if (direction === -1) emblaApi.scrollPrev();
    else emblaApi.scrollNext();
  };

  const handleVideoPlay = (currentVideo: HTMLVideoElement, index: number) => {
    railRef.current?.querySelectorAll("video").forEach((video) => {
      if (video !== currentVideo) video.pause();
    });
    trackConversion("experience_video_play", `experience_film_${index + 1}`);
  };

  return (
    <section id="experiencia" className="section experience-film" aria-labelledby="experience-film-title">
      <div className="container experience-film__panel">
        <Reveal className="experience-film__copy" direction="left">
          <p className="eyebrow">Por dentro do cuidado</p>
          <h2 id="experience-film-title">
            Presença em cada detalhe.
            <span>Cuidado em cada escolha.</span>
          </h2>
          <p>
            Histórias, procedimentos e resultados registrados de perto. Uma visão real
            do cuidado que existe antes, durante e depois de cada escolha.
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

        <Reveal className="experience-film__gallery" delay={100} direction="right">
          <div className="experience-film__gallery-header">
            <p>
              <span>{experienceMedia.length} registros</span>
            </p>
            <div className="experience-film__controls" aria-label="Controles da galeria">
              <button
                type="button"
                aria-label="Ver registros anteriores"
                onClick={() => scrollRail(-1)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Ver próximos registros"
                onClick={() => scrollRail(1)}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={setRailRef}
            className="experience-film__rail"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Registros da experiência de atendimento"
          >
            <div className="experience-film__rail-track">
              {experienceMedia.map((item, index) => (
                <article
                  className="experience-film__card"
                  key={item.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${experienceMedia.length}`}
                >
                  <div className="experience-film__frame">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={assetUrl(item.poster)}
                      width={576}
                      height={1024}
                      aria-label={item.ariaLabel}
                      onPlay={(event) => handleVideoPlay(event.currentTarget, index)}
                    >
                      <source src={assetUrl(item.src)} type="video/mp4" />
                      Seu navegador não consegue reproduzir este vídeo.
                    </video>
                    <span className="experience-film__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
