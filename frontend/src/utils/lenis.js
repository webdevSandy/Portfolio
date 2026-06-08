import Lenis from "@studio-freight/lenis";

let lenisInstance = null;
let rafId = null;

export const initLenis = () => {
  if (typeof window === "undefined") return;
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({ smoothWheel: true, lerp: 0.08 });
  
  function raf(time) {
    if (lenisInstance) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
  }
  
  lenisInstance = lenis;
  rafId = requestAnimationFrame(raf);
  return lenis;
};

export const destroyLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
};

