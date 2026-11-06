import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let motionQuery: MediaQueryList | null = null;

function getMotionQuery() {
  if (typeof window === "undefined") return null;
  motionQuery ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return motionQuery;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1) {
    getMotionQuery()?.addEventListener("change", notifyListeners);
    document.addEventListener("visibilitychange", notifyListeners);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    getMotionQuery()?.removeEventListener("change", notifyListeners);
    document.removeEventListener("visibilitychange", notifyListeners);
  };
}

function getSnapshot() {
  const documentVisible = typeof document === "undefined" || !document.hidden;
  const reducedMotion = getMotionQuery()?.matches ?? true;
  return (documentVisible ? 1 : 0) | (reducedMotion ? 2 : 0);
}

export function usePlaybackPreferences() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => 2);

  return {
    isDocumentVisible: (snapshot & 1) === 1,
    reducedMotion: (snapshot & 2) === 2,
  };
}
