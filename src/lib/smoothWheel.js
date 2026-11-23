// Keep the native scroll position as the source of truth for sticky sections and Swiper.
export function smoothWheel(scroller) {
  const events = new AbortController();
  const { signal } = events;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const wheelTarget = scroller === document.scrollingElement ? window : scroller;
  let frame = 0;
  let target = 0;
  let lastPosition = 0;
  let lastTime = 0;

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function advance(now) {
    // Yield immediately if a link, the keyboard or another interaction moved the page.
    if (Math.abs(scroller.scrollTop - lastPosition) > 1) return stop();
    const remaining = target - scroller.scrollTop;
    const fraction = 1 - Math.exp(-Math.max(1, now - lastTime) / 85);
    const step = Math.sign(remaining) * Math.max(1, Math.abs(remaining) * fraction);
    const next = Math.abs(remaining) <= Math.abs(step) ? target : scroller.scrollTop + step;
    scroller.scrollTo({ top: next, behavior: 'instant' });
    if (next === target || scroller.scrollTop === lastPosition) return stop();
    lastTime = now;
    lastPosition = scroller.scrollTop;
    frame = requestAnimationFrame(advance);
  }

  function onWheel(event) {
    if (reducedMotion.matches || event.defaultPrevented || !event.cancelable ||
        event.ctrlKey || event.metaKey || event.shiftKey || !event.deltaY ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return stop();

    for (const el of event.composedPath()) {
      if (el === scroller || el === document) break;
      if (!(el instanceof HTMLElement)) continue;
      if (el.matches('input, textarea, select, [contenteditable="true"]')) return stop();
      if (el.scrollHeight > el.clientHeight + 1 &&
          /^(auto|scroll)$/.test(getComputedStyle(el).overflowY)) return stop();
    }

    const position = scroller.scrollTop;
    if (!frame || Math.sign(target - position) !== Math.sign(event.deltaY)) target = position;
    let delta = event.deltaY;
    if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) delta *= 16;
    if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) delta *= scroller.clientHeight;
    target = Math.round(Math.max(0, Math.min(target + delta, scroller.scrollHeight - scroller.clientHeight)));
    if (position === target) return stop();
    event.preventDefault();
    if (!frame) {
      lastPosition = position;
      lastTime = performance.now();
      frame = requestAnimationFrame(advance);
    }
  }

  wheelTarget.addEventListener('wheel', onWheel, { passive: false, signal });
  for (const type of ['pointerdown', 'keydown', 'touchstart']) {
    window.addEventListener(type, stop, { capture: true, passive: true, signal });
  }
  reducedMotion.addEventListener('change', stop, { signal });
  return () => {
    stop();
    events.abort();
  };
}
