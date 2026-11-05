import type { RefObject } from "react";
import { useEffect } from "react";

type Cleanup = () => void;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function bindPointerMove(
  target: HTMLElement,
  onMove: (event: PointerEvent) => void,
  onLeave: () => void,
): Cleanup {
  let frame = 0;
  let latestEvent: PointerEvent | null = null;

  const handleMove = (event: PointerEvent) => {
    latestEvent = event;
    if (frame) return;

    frame = window.requestAnimationFrame(() => {
      frame = 0;
      if (latestEvent) onMove(latestEvent);
    });
  };

  const handleLeave = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    latestEvent = null;
    onLeave();
  };

  target.addEventListener("pointermove", handleMove, { passive: true });
  target.addEventListener("pointerleave", handleLeave);

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    target.removeEventListener("pointermove", handleMove);
    target.removeEventListener("pointerleave", handleLeave);
    onLeave();
  };
}

export function usePointerInteractions(scopeRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanupInteractions: Cleanup = () => undefined;

    const resetInteractiveStyles = () => {
      scope.querySelectorAll<HTMLElement>(".btn").forEach((button) => {
        button.classList.remove("is-magnetic-active");
        button.style.removeProperty("--magnetic-x");
        button.style.removeProperty("--magnetic-y");
      });

      scope
        .querySelectorAll<HTMLElement>(".service-card, .differential-card")
        .forEach((card) => {
          card.classList.remove("is-pointer-active");
          card.style.removeProperty("--tilt-x");
          card.style.removeProperty("--tilt-y");
          card.style.removeProperty("--spot-x");
          card.style.removeProperty("--spot-y");
        });

      scope.querySelectorAll<HTMLElement>("[data-pointer-hero]").forEach((hero) => {
        hero.classList.remove("is-pointer-active");
        hero.style.removeProperty("--hero-tilt-x");
        hero.style.removeProperty("--hero-tilt-y");
        hero.style.removeProperty("--hero-shift-x");
        hero.style.removeProperty("--hero-shift-y");
        hero.style.removeProperty("--hero-light-x");
        hero.style.removeProperty("--hero-light-y");
      });

      scope.querySelectorAll<HTMLElement>("[data-pointer-artwork]").forEach((artwork) => {
        artwork.style.removeProperty("--art-x");
        artwork.style.removeProperty("--art-y");
      });
    };

    const setupInteractions = () => {
      const cleanups: Cleanup[] = [];

      scope.querySelectorAll<HTMLElement>(".btn").forEach((button) => {
        cleanups.push(
          bindPointerMove(
            button,
            (event) => {
              const rect = button.getBoundingClientRect();
              const normalizedX = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 2 - 1;
              const normalizedY = clamp((event.clientY - rect.top) / rect.height, 0, 1) * 2 - 1;

              button.classList.add("is-magnetic-active");
              button.style.setProperty("--magnetic-x", `${(normalizedX * 7).toFixed(2)}px`);
              button.style.setProperty("--magnetic-y", `${(normalizedY * 5).toFixed(2)}px`);
            },
            () => {
              button.classList.remove("is-magnetic-active");
              button.style.setProperty("--magnetic-x", "0px");
              button.style.setProperty("--magnetic-y", "0px");
            },
          ),
        );
      });

      scope
        .querySelectorAll<HTMLElement>(".service-card, .differential-card")
        .forEach((card) => {
          cleanups.push(
            bindPointerMove(
              card,
              (event) => {
                const rect = card.getBoundingClientRect();
                const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
                const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

                card.classList.add("is-pointer-active");
                card.style.setProperty("--tilt-x", `${((0.5 - y) * 5).toFixed(2)}deg`);
                card.style.setProperty("--tilt-y", `${((x - 0.5) * 5).toFixed(2)}deg`);
                card.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
                card.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
              },
              () => {
                card.classList.remove("is-pointer-active");
                card.style.setProperty("--tilt-x", "0deg");
                card.style.setProperty("--tilt-y", "0deg");
                card.style.setProperty("--spot-x", "50%");
                card.style.setProperty("--spot-y", "50%");
              },
            ),
          );
        });

      scope.querySelectorAll<HTMLElement>("[data-pointer-hero]").forEach((heroMotion) => {
        const interactionArea = heroMotion.closest<HTMLElement>(".hero__visual") ?? heroMotion;

        cleanups.push(
          bindPointerMove(
            interactionArea,
            (event) => {
              const rect = interactionArea.getBoundingClientRect();
              const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
              const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);

              heroMotion.classList.add("is-pointer-active");
              heroMotion.style.setProperty("--hero-tilt-x", `${((0.5 - y) * 6).toFixed(2)}deg`);
              heroMotion.style.setProperty("--hero-tilt-y", `${((x - 0.5) * 6).toFixed(2)}deg`);
              heroMotion.style.setProperty("--hero-shift-x", `${((x - 0.5) * 8).toFixed(2)}px`);
              heroMotion.style.setProperty("--hero-shift-y", `${((y - 0.5) * 6).toFixed(2)}px`);
              heroMotion.style.setProperty("--hero-light-x", `${(x * 100).toFixed(1)}%`);
              heroMotion.style.setProperty("--hero-light-y", `${(y * 100).toFixed(1)}%`);
            },
            () => {
              heroMotion.classList.remove("is-pointer-active");
              heroMotion.style.setProperty("--hero-tilt-x", "0deg");
              heroMotion.style.setProperty("--hero-tilt-y", "0deg");
              heroMotion.style.setProperty("--hero-shift-x", "0px");
              heroMotion.style.setProperty("--hero-shift-y", "0px");
              heroMotion.style.setProperty("--hero-light-x", "50%");
              heroMotion.style.setProperty("--hero-light-y", "35%");
            },
          ),
        );
      });

      scope.querySelectorAll<HTMLElement>("[data-pointer-artwork]").forEach((artwork) => {
        const interactionArea = artwork.closest<HTMLElement>("section") ?? artwork.parentElement;
        if (!interactionArea) return;

        cleanups.push(
          bindPointerMove(
            interactionArea,
            (event) => {
              const rect = interactionArea.getBoundingClientRect();
              const x = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 2 - 1;
              const y = clamp((event.clientY - rect.top) / rect.height, 0, 1) * 2 - 1;

              artwork.style.setProperty("--art-x", `${(x * 8).toFixed(2)}px`);
              artwork.style.setProperty("--art-y", `${(y * 6).toFixed(2)}px`);
            },
            () => {
              artwork.style.setProperty("--art-x", "0px");
              artwork.style.setProperty("--art-y", "0px");
            },
          ),
        );
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    };

    const refreshInteractions = () => {
      cleanupInteractions();
      resetInteractiveStyles();

      if (!reducedMotionQuery.matches && finePointerQuery.matches) {
        cleanupInteractions = setupInteractions();
      } else {
        cleanupInteractions = () => undefined;
      }
    };

    refreshInteractions();
    reducedMotionQuery.addEventListener("change", refreshInteractions);
    finePointerQuery.addEventListener("change", refreshInteractions);

    return () => {
      reducedMotionQuery.removeEventListener("change", refreshInteractions);
      finePointerQuery.removeEventListener("change", refreshInteractions);
      cleanupInteractions();
      resetInteractiveStyles();
    };
  }, [scopeRef]);
}
