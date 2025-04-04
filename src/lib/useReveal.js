// src/lib/useReveal.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP reveal animation using clip-path and opacity on scroll.
 * 
 * @param {HTMLElement} node - The DOM element to animate.
 * @param {{
 *  duration?: number,
 *  delay?: number,
 *  ease?: string,
 *  triggerOffset?: string,
 *  clipDirection?: 'top' | 'bottom' | 'left' | 'right'
 * }} options 
 */
export function useReveal(node, {
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  triggerOffset = 'top 80%',
  clipDirection = 'top'
} = {}) {
  
  const directions = {
    top: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    bottom: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
    left: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    right: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
  };

  const [initialClip, finalClip] = directions[clipDirection] || directions.top;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: node,
      start: triggerOffset,
      toggleActions: 'play none none reverse',
    }
  });

  tl.fromTo(node, {
    clipPath: initialClip,
    opacity: 0
  }, {
    clipPath: finalClip,
    opacity: 1,
    duration,
    delay,
    ease,
  });

  return {
    destroy() {
      tl.scrollTrigger?.kill();
      tl.kill();
    }
  };
}
