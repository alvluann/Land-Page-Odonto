import { brand, navItems, whatsappHref } from "../data/content";

export function Header() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <a className="brand" href="#inicio" aria-label="Voltar para o início">
          <span className="brand__logo">
            <img
              src="/assets/logo-cro.jpeg"
              alt="Logo da Dra. Luara Alves"
              width={80}
              height={80}
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="brand__text">
            <strong>{brand.name}</strong>
            <small>
              {brand.role} | {brand.cro}
            </small>
          </span>
        </a>

        <nav className="topbar__nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} className="topbar__nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary btn--compact topbar__cta" href={whatsappHref} target="_blank" rel="noreferrer">
          Agendar
        </a>
      </div>
    </header>
  );
}
