import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCinematicMotion(scopeRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;

    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const media = gsap.matchMedia(scope);
    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      heroTimeline
        .from("[data-hero-line]", {
          yPercent: 112,
          duration: 0.9,
          stagger: 0.11,
          ease: "power4.out",
        })
        .from(
          "[data-hero-reveal]",
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.68,
            stagger: 0.075,
          },
          0.14,
        )
        .from(
          "[data-hero-visual]",
          {
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0 round 5rem 1.5rem 5rem 2rem)",
            duration: 1.05,
            ease: "power4.inOut",
          },
          0.08,
        )
        .from(
          "[data-hero-image]",
          {
            scale: 1.1,
            duration: 1.35,
            ease: "power3.out",
          },
          0.12,
        )
        .from(
          ".floating-tag--cro",
          {
            autoAlpha: 0,
            x: -18,
            duration: 0.62,
          },
          0.64,
        )
        .set("[data-hero-visual]", { clearProps: "clipPath" })
        .set("[data-hero-image]", { clearProps: "transform" });

      media.add("(min-width: 760px)", () => {
        const hero = scope.querySelector<HTMLElement>(".hero");
        const about = scope.querySelector<HTMLElement>(".about");
        const trust = scope.querySelector<HTMLElement>(".trust");

        if (hero) {
          gsap.to("[data-hero-parallax]", {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }

        if (about) {
          gsap.fromTo(
            ".about__media > img",
            { scale: 1.045, yPercent: -2 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: about,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }

        if (trust) {
          gsap.fromTo(
            ".trust__art",
            { xPercent: 10, yPercent: 7, rotate: -2 },
            {
              xPercent: -4,
              yPercent: -7,
              rotate: 1.5,
              ease: "none",
              scrollTrigger: {
                trigger: trust,
                start: "top 82%",
                end: "60% 30%",
                scrub: 0.85,
              },
            },
          );

          gsap.from(".trust__cinematic-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trust,
              start: "top 66%",
              once: true,
            },
          });
        }
      });

      media.add("(max-width: 759px)", () => {
        const hero = scope.querySelector<HTMLElement>(".hero");

        if (hero) {
          gsap.to("[data-hero-parallax]", {
            yPercent: 3.5,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.85,
            },
          });
        }
      });
    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, [scopeRef]);
}
