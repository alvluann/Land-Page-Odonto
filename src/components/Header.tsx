import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, navItems } from "../data/content";
import { assetUrl } from "../lib/assetUrl";
import { TrackedWhatsAppLink } from "./TrackedWhatsAppLink";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    let previousScrollY = window.scrollY;

    const updateScrolledState = () => {
      frame = 0;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      const nextIsScrolled = currentScrollY > 16;

      setIsScrolled((current) =>
        current === nextIsScrolled ? current : nextIsScrolled,
      );

      if (isMenuOpen || currentScrollY < 48 || scrollDelta < -7) {
        setIsHeaderHidden(false);
      } else if (currentScrollY > 120 && scrollDelta > 7) {
        setIsHeaderHidden(true);
      }

      previousScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 980px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [isMenuOpen]);

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
    <header
      className={`topbar ${isScrolled ? "is-scrolled" : ""} ${isHeaderHidden ? "is-hidden" : ""} ${isMenuOpen ? "is-menu-open" : ""}`.trim()}
    >
      <div className="container topbar__inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="Voltar para o início"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="brand__logo">
            <img
              src={assetUrl("assets/logo-guia.webp")}
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

        <TrackedWhatsAppLink className="btn btn--primary btn--compact topbar__cta" placement="header">
          <MessageCircle className="btn__icon" size={17} aria-hidden="true" />
          Agendar
        </TrackedWhatsAppLink>

        <button
          type="button"
          className="topbar__menu-button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <button
          type="button"
          className="topbar__backdrop"
          aria-label="Fechar menu"
          tabIndex={-1}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-navigation"
        className={`topbar__mobile-menu ${isMenuOpen ? "is-open" : ""}`.trim()}
        aria-label="Navegação para celular"
        aria-hidden={!isMenuOpen}
      >
        <div className="container topbar__mobile-menu-inner">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeHref === item.href ? "is-active" : ""}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => {
                setActiveHref(item.href);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
