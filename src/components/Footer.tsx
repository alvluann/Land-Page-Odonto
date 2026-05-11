import { brand, navItems, whatsappHref } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            src="/assets/logo-cro.jpeg"
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
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp: {brand.phoneDisplay}
          </a>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <p>{brand.city}</p>
          <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
            Instagram: {brand.instagram}
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
