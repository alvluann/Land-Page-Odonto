import type { RefObject } from "react";
import { useEffect } from "react";

const DESKTOP_MOTION_QUERY = "(min-width: 980px) and (hover: hover) and (pointer: fine)";

export function useCinematicMotion(scopeRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const desktopMotion = window.matchMedia(DESKTOP_MOTION_QUERY);
    let cancelled = false;
    let loadTimer = 0;
    let cleanupMotion: (() => void) | undefined;

    const loadDesktopMotion = () => {
      if (!desktopMotion.matches || loadTimer || cleanupMotion) return;

      loadTimer = window.setTimeout(async () => {
        loadTimer = 0;

        let motionModules;

        try {
          motionModules = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
        } catch {
          return;
        }

        const [{ gsap }, { ScrollTrigger }] = motionModules;

        if (cancelled || !desktopMotion.matches) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const hero = scope.querySelector<HTMLElement>(".hero");
          const about = scope.querySelector<HTMLElement>(".about");
          const trust = scope.querySelector<HTMLElement>(".trust");

          if (hero) {
            gsap.to("[data-hero-parallax]", {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.45,
              },
            });
          }

          if (about) {
            gsap.fromTo(
              ".about__portrait-main",
              { scale: 1.025, yPercent: -1 },
              {
                scale: 1,
                yPercent: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: about,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
          }

          if (trust) {
            gsap.fromTo(
              ".trust__art",
              { xPercent: 7, yPercent: 4 },
              {
                xPercent: -3,
                yPercent: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: trust,
                  start: "top 82%",
                  end: "60% 30%",
                  scrub: 0.55,
                },
              },
            );

            gsap.from(".trust__cinematic-line", {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: trust,
                start: "top 66%",
                once: true,
              },
            });
          }
        }, scope);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        cleanupMotion = () => {
          window.removeEventListener("load", refresh);
          context.revert();
          cleanupMotion = undefined;
        };
      }, 120);
    };

    const handleDesktopMotionChange = () => {
      if (desktopMotion.matches) {
        loadDesktopMotion();
      } else {
        if (loadTimer) window.clearTimeout(loadTimer);
        loadTimer = 0;
        cleanupMotion?.();
      }
    };

    desktopMotion.addEventListener("change", handleDesktopMotionChange);
    loadDesktopMotion();

    return () => {
      cancelled = true;
      desktopMotion.removeEventListener("change", handleDesktopMotionChange);
      if (loadTimer) window.clearTimeout(loadTimer);
      cleanupMotion?.();
    };
  }, [scopeRef]);
}
