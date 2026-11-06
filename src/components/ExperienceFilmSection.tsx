import { useEffect, useRef, useState } from "react";
import { MessageCircle, Volume2, VolumeX } from "lucide-react";
import { experienceMedia } from "../data/content";
import { usePlaybackPreferences } from "../hooks/usePlaybackPreferences";
import { assetUrl } from "../lib/assetUrl";
import { trackConversion } from "../lib/analytics";
import { ContinuousCarousel } from "./ContinuousCarousel";
import { Reveal } from "./Reveal";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function ExperienceFilmSection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [soundEnabledKey, setSoundEnabledKey] = useState<string | null>(null);
  const { isDocumentVisible, reducedMotion } = usePlaybackPreferences();

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const videos = Array.from(gallery.querySelectorAll<HTMLVideoElement>("video[data-video-key]"));
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLVideoElement).dataset.videoKey;
          if (key) visibility.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextKey: string | null = null;
        let highestRatio = 0.32;
        visibility.forEach((ratio, key) => {
          if (ratio <= highestRatio) return;
          highestRatio = ratio;
          nextKey = key;
        });
        setActiveVideoKey((current) => current === nextKey ? current : nextKey);
      },
      { threshold: [0, .25, .4, .55, .7, .85, 1] },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion]);

  useEffect(() => {
    setSoundEnabledKey((current) => current === activeVideoKey ? current : null);
  }, [activeVideoKey]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let cancelled = false;
    const videos = gallery.querySelectorAll<HTMLVideoElement>("video[data-video-key]");

    videos.forEach((video) => {
      const key = video.dataset.videoKey ?? "";
      const shouldPlay = key === activeVideoKey && isDocumentVisible && !reducedMotion;
      video.muted = soundEnabledKey !== key;

      if (!shouldPlay) {
        video.pause();
        if (key !== activeVideoKey) video.muted = true;
        return;
      }

      void video.play().catch(() => {
        if (cancelled) return;
        video.muted = true;
        setSoundEnabledKey(null);
        void video.play().catch(() => undefined);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [activeVideoKey, isDocumentVisible, reducedMotion, soundEnabledKey]);

  const handleVideoPlay = (currentVideo: HTMLVideoElement) => {
    galleryRef.current?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
      if (video !== currentVideo) video.pause();
    });
  };

  const toggleSound = (key: string, index: number) => {
    const video = galleryRef.current?.querySelector<HTMLVideoElement>(`video[data-video-key="${key}"]`);
    if (!video || key !== activeVideoKey) return;

    const shouldEnableSound = soundEnabledKey !== key;
    video.muted = !shouldEnableSound;
    setSoundEnabledKey(shouldEnableSound ? key : null);
    if (video.paused) void video.play().catch(() => undefined);
    trackConversion("experience_video_play", `experience_film_${index + 1}_sound`);
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
          <div ref={galleryRef}>
            <div className="experience-film__gallery-header">
              <p>
                <span>{experienceMedia.length} registros</span>
                Reprodução automática sem som
              </p>
            </div>

            <ContinuousCarousel
              className="experience-film__rail"
              setClassName="experience-film__rail-track"
              ariaLabel="Registros da experiência de atendimento em movimento contínuo"
              duplicateAriaHidden={false}
              speed={18}
            >
              {(copy) => experienceMedia.map((item, index) => {
                  const videoKey = `${copy}-${index}`;
                  const soundEnabled = soundEnabledKey === videoKey;
                  const isActive = activeVideoKey === videoKey;

                  return (
                    <article
                      className={`experience-film__card ${isActive ? "is-active" : ""}`.trim()}
                      key={videoKey}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${index + 1} de ${experienceMedia.length}`}
                    >
                      <div className="experience-film__frame">
                        <video
                          data-video-key={videoKey}
                          controls={reducedMotion}
                          playsInline
                          muted={!soundEnabled}
                          autoPlay={isActive && isDocumentVisible && !reducedMotion}
                          loop
                          preload={copy === 0 ? "metadata" : "none"}
                          poster={assetUrl(item.poster)}
                          width={576}
                          height={1024}
                          aria-label={item.ariaLabel}
                          onPlay={(event) => handleVideoPlay(event.currentTarget)}
                          onPointerDown={() => {
                            trackConversion("experience_video_play", `experience_film_${index + 1}`);
                          }}
                        >
                          <source src={assetUrl(item.src)} type="video/mp4" />
                          Seu navegador não consegue reproduzir este vídeo.
                        </video>
                        <span className="experience-film__index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          className="experience-film__sound"
                          disabled={!isActive}
                          onClick={() => toggleSound(videoKey, index)}
                          aria-label={soundEnabled ? "Silenciar vídeo" : "Ativar som do vídeo"}
                          aria-pressed={soundEnabled}
                        >
                          {soundEnabled
                            ? <Volume2 size={17} aria-hidden="true" />
                            : <VolumeX size={17} aria-hidden="true" />}
                        </button>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  );
                })}
            </ContinuousCarousel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
