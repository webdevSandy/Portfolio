import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const safeTimeline = (opts = {}) =>
  prefersReduced() ? gsap.timeline({ ...opts, duration: 0 }) : gsap.timeline(opts);

/** fade + rise once when scrolled into view */
export const revealOnce = (el, { y = 24, delay = 0, duration = 0.7 } = {}) => {
  if (!el) return;
  gsap.from(el, {
    opacity: 0,
    y,
    duration: prefersReduced() ? 0 : duration,
    delay,
    ease: "power3.out",
    clearProps: "opacity,transform",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    }
  });
};

/** simple parallax (uses scrub) */
export const parallax = (el, { yPercent = 15 } = {}) => {
  if (!el) return;
  gsap.to(el, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};
