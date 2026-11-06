import { ArrowLeft, Check, MapPin, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { brand, siteUrl } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

const confirmationDescription =
  "Agendamento concluído com a Dra. Luara Alves. Confira os próximos passos e encontre o endereço do atendimento.";

function useConfirmationMetadata() {
  useEffect(() => {
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previous = {
      title: document.title,
      description: description?.content,
      robots: robots?.content,
      canonical: canonical?.href,
    };

    document.title = `Agendamento confirmado | ${brand.name}`;
    description?.setAttribute("content", confirmationDescription);
    robots?.setAttribute("content", "noindex, nofollow");
    canonical?.setAttribute("href", `${siteUrl}/confirmacao`);

    return () => {
      document.title = previous.title;
      if (previous.description) description?.setAttribute("content", previous.description);
      if (previous.robots) robots?.setAttribute("content", previous.robots);
      if (previous.canonical) canonical?.setAttribute("href", previous.canonical);
    };
  }, []);
}

export function ConfirmationPage() {
  useConfirmationMetadata();

  return (
    <div className="confirmation-page">
      <a className="skip-link" href="#confirmacao-conteudo">
        Ir para o conteúdo
      </a>

      <header className="confirmation-header">
        <div className="container confirmation-header__inner">
          <a className="confirmation-brand" href="/" aria-label="Voltar à página inicial">
            <img
              src={assetUrl("assets/logo-guia.webp")}
              alt=""
              width={80}
              height={80}
              fetchPriority="high"
              decoding="async"
            />
            <span>
              <strong>{brand.name}</strong>
              <small>{brand.role} | {brand.cro}</small>
            </span>
          </a>

          <a className="confirmation-header__back" href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Voltar ao site
          </a>
        </div>
      </header>

      <main id="confirmacao-conteudo" className="confirmation-main">
        <section className="container confirmation-layout" aria-labelledby="confirmation-title">
          <article className="confirmation-card">
            <div className="confirmation-status" aria-hidden="true">
              <span><Check size={30} strokeWidth={1.8} /></span>
            </div>

            <p className="confirmation-kicker">Agendamento concluído</p>
            <h1 id="confirmation-title">
              Seu próximo cuidado{" "}
              <span>já começou.</span>
            </h1>
            <p className="confirmation-lead">
              Obrigada por escolher a Dra. Luara. Confira os dados do horário no serviço
              em que você realizou o agendamento e guarde esta página para os próximos passos.
            </p>

            <div className="confirmation-actions">
              <TrackedWhatsAppLink
                className="btn btn--primary"
                placement="confirmation"
                aria-label="Falar com a equipe da Dra. Luara pelo WhatsApp"
              >
                <MessageCircle className="btn__icon" size={18} aria-hidden="true" />
                Falar com a equipe
              </TrackedWhatsAppLink>
              <a className="btn btn--ghost" href={brand.mapsUrl} target="_blank" rel="noreferrer">
                <MapPin className="btn__icon" size={18} aria-hidden="true" />
                Abrir endereço no mapa
              </a>
            </div>

            <div className="confirmation-next">
              <h2>Antes do atendimento</h2>
              <ol>
                <li>
                  <span aria-hidden="true">01</span>
                  <div>
                    <strong>Confira a confirmação</strong>
                    <p>Revise a data e o horário no serviço de agendamento ou na mensagem recebida.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">02</span>
                  <div>
                    <strong>Precisa ajustar algum detalhe?</strong>
                    <p>Fale com a equipe pelo WhatsApp antes do atendimento.</p>
                  </div>
                </li>
              </ol>
            </div>
          </article>

          <aside className="confirmation-visual" aria-label="Informações do local de atendimento">
            <figure>
              <img
                src={assetUrl("assets/dra-hero.jpeg")}
                srcSet={`${assetUrl("assets/dra-hero-640.webp")} 640w, ${assetUrl("assets/dra-hero-960.webp")} 960w, ${assetUrl("assets/dra-hero.jpeg")} 1600w`}
                sizes="(max-width: 979px) min(100vw - 2rem, 26rem), 40vw"
                alt="Dra. Luara Alves em ambiente clínico."
                width={1600}
                height={1066}
                loading="eager"
                decoding="async"
              />
              <figcaption>
                <span>Seu atendimento será com</span>
                <strong>{brand.name}</strong>
                <small>{brand.role} · {brand.cro}</small>
              </figcaption>
            </figure>

            <a className="confirmation-location" href={brand.mapsUrl} target="_blank" rel="noreferrer">
              <span className="confirmation-location__icon" aria-hidden="true">
                <MapPin size={19} />
              </span>
              <span>
                <small>Local do atendimento</small>
                <strong>{brand.address}</strong>
              </span>
            </a>
          </aside>
        </section>
      </main>

      <footer className="confirmation-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} {brand.name}</p>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>
      </footer>
    </div>
  );
}
