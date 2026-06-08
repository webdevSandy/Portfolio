import { useEffect, useRef, useCallback } from "react";
import { safeTimeline, parallax } from "../utils/motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Typewriter from "typewriter-effect";

export default function Hero({ profile }) {
  const root = useRef(null);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const tl = safeTimeline({ defaults: { ease: "power3.out", duration: 0.9 } });
    tl.from(el.querySelector(".hero-badge"), { y: 16, opacity: 0 })
      .from(el.querySelectorAll(".headline .line"), { yPercent: 120, opacity: 0, stagger: 0.08 }, "-=0.4")
      .from(el.querySelector(".hero-sub"), { y: 12, opacity: 0, clearProps: "opacity,transform" }, "-=0.5")
      .from(el.querySelector(".hero-cta"), { y: 8, opacity: 0 }, "-=0.55");
  }, []);

  return (
    <section ref={root} id="home" className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Particles background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100, duration: 0.4 } } },
          particles: {
            color: { value: "#8b5cf6" }, // softly matching fuchsia/emerald themes
            links: { color: "#8b5cf6", distance: 150, enable: true, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 0.8, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } }
          },
          detectRetina: true
        }}
      />
      <div className="hero-blob pointer-events-none absolute -top-32 right-0 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-emerald-400 opacity-20 blur-[100px] -z-20" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 md:py-36">
        <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 px-3 py-1 text-sm backdrop-blur dark:border-neutral-800 dark:bg-black/30">
          <span className="h-2 w-2 rounded-full bg-emerald-500 relative flex"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
          Available for freelance
        </div>

        <h1 className="headline mt-6 text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50 md:text-7xl">
          <span className="block overflow-hidden"><span className="line inline-block">Hi, I’m {profile?.name?.split(' ')[0] || 'Sandy'}.</span></span>
          <span className="block overflow-hidden mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-500">
            <span className="line inline-block w-full min-h-[1.2em]">
              <Typewriter
                options={{
                  strings: profile?.typewriterTitles && profile.typewriterTitles.length > 0
                    ? profile.typewriterTitles
                    : (profile?.title ? [profile.title, 'Creative Coder.'] : ['Frontend Developer.', 'UI/UX Enthusiast.', 'Creative Coder.']),
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                }}
              />
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-5 max-w-2xl text-base text-neutral-700 dark:text-neutral-300 md:text-lg">
          {profile?.tagline || 'I craft performant, accessible web experiences with crisp visuals and delightful motion.'}
        </p>

        <div className="hero-cta mt-8 flex gap-3">
          <a href="#projects" className="rounded-xl bg-emerald-500 px-5 py-3 text-white transition hover:-translate-y-0.5">View Projects</a>
          <a href="#contact" className="rounded-xl border border-neutral-300 px-5 py-3 text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">Contact</a>
        </div>
      </div>
    </section>
  );
}
