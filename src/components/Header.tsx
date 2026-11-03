import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, navItems, whatsappHref } from "../data/content";
import { assetUrl } from "../lib/assetUrl";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current?.target.id) {
          setActiveHref(`#${current.target.id}`);
        }
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`topbar ${isScrolled ? "is-scrolled" : ""}`.trim()}>
      <div className="container topbar__inner">
        <a className="brand" href="#inicio" aria-label="Voltar para o início">
          <span className="brand__logo">
            <img
              src={assetUrl("assets/logo-guia.png")}
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
            <a
              key={item.href}
              className={`topbar__nav-link ${activeHref === item.href ? "is-active" : ""}`.trim()}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary btn--compact topbar__cta" href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle className="btn__icon" size={17} aria-hidden="true" />
          Agendar
        </a>
      </div>
    </header>
  );
}
