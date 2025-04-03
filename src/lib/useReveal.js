// src/lib/animations/useReveal.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Svelte action for vertical clip-path reveal animation on scroll
 */
export function useReveal(node, {
  duration = 1,
  delay = 0,
  ease = 'power3.out',
  triggerOffset = 'top 80%',
  clipDirection = 'top' // can be extended later
} = {}) {
  // Default clip-path for vertical reveal
  const initialClip = 'inset(100% 0% 0% 0%)';
  const finalClip = 'inset(0% 0% 0% 0%)';

  const animation = gsap.fromTo(
    node,
    {
      clipPath: initialClip,
      opacity: 0,
    },
    {
      clipPath: finalClip,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: node,
        start: triggerOffset,
        toggleActions: 'play none none reverse',
      },
    }
  );

  return {
    destroy() {
      animation.scrollTrigger?.kill();
      animation.kill();
    }
  };
}
