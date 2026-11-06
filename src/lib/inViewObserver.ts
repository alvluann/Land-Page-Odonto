type InViewHandler = (entry: IntersectionObserverEntry) => void;

interface ObserverPool {
  observer: IntersectionObserver;
  handlers: Map<Element, Set<InViewHandler>>;
}

const observerPools = new Map<string, ObserverPool>();

function getThresholdKey(threshold: IntersectionObserverInit["threshold"]) {
  if (Array.isArray(threshold)) return threshold.join(",");
  return String(threshold ?? 0);
}

export function observeInView(
  element: Element,
  handler: InViewHandler,
  options: IntersectionObserverInit = {},
) {
  const key = `${options.rootMargin ?? "0px"}|${getThresholdKey(options.threshold)}`;
  let pool = observerPools.get(key);

  if (!pool) {
    const handlers = new Map<Element, Set<InViewHandler>>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        handlers.get(entry.target)?.forEach((entryHandler) => entryHandler(entry));
      });
    }, options);

    pool = { observer, handlers };
    observerPools.set(key, pool);
  }

  const elementHandlers = pool.handlers.get(element) ?? new Set<InViewHandler>();
  elementHandlers.add(handler);
  pool.handlers.set(element, elementHandlers);
  pool.observer.observe(element);

  return () => {
    const currentPool = observerPools.get(key);
    if (!currentPool) return;

    const currentHandlers = currentPool.handlers.get(element);
    currentHandlers?.delete(handler);

    if (!currentHandlers?.size) {
      currentPool.handlers.delete(element);
      currentPool.observer.unobserve(element);
    }

    if (!currentPool.handlers.size) {
      currentPool.observer.disconnect();
      observerPools.delete(key);
    }
  };
}
