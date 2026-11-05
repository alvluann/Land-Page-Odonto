import { Mail, MapPin, MessageCircle } from "lucide-react";
import { brand, navItems } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__statement" aria-hidden="true">
        <span>Cuidado que preserva</span>
        <strong>quem você é.</strong>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            src={assetUrl("assets/logo-cro.jpeg")}
            alt="Identidade visual da Dra. Luara Alves."
            width={180}
            height={180}
            loading="lazy"
            decoding="async"
          />
          <p>
            <strong>{brand.name}</strong>
            <span>
              {brand.role} | {brand.cro}
            </span>
          </p>
        </div>

        <div className="footer__links">
          <h3>Mapa do site</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <address className="footer__contact">
          <h3>Contato</h3>
          <TrackedWhatsAppLink placement="footer">
            <span className="footer__contact-icon" aria-hidden="true">
              <MessageCircle size={18} strokeWidth={1.8} />
            </span>
            <span>WhatsApp: {brand.phoneDisplay}</span>
          </TrackedWhatsAppLink>
          <a href={`mailto:${brand.email}`}>
            <span className="footer__contact-icon" aria-hidden="true">
              <Mail size={18} strokeWidth={1.8} />
            </span>
            <span>{brand.email}</span>
          </a>
          <a
            className="footer__contact-address"
            href={brand.mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir no mapa: ${brand.address}`}
          >
            <span className="footer__contact-icon" aria-hidden="true">
              <MapPin size={18} strokeWidth={1.8} />
            </span>
            <span>{brand.address}</span>
          </a>
          <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
            <span className="footer__contact-icon" aria-hidden="true">
              <InstagramIcon />
            </span>
            <span>Instagram: {brand.instagram}</span>
          </a>
        </address>
      </div>

      <div className="footer__bottom">
        <p>
          © {year} {brand.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
