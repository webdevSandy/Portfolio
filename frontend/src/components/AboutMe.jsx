import { useEffect, useRef } from "react";
import { revealOnce, parallax } from "../utils/motion";

export default function AboutMe({ profile }) {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    revealOnce(el?.querySelector(".about-copy"));
    parallax(el?.querySelector(".about-blob"), { yPercent: 18 });
  }, []);

  return (
    <section id="about" ref={root} className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="about-blob pointer-events-none absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-emerald-400 to-indigo-500 opacity-25 blur-3xl -z-10" />
      
      {/* Standardized Centered Header */}
      <div className="mb-16 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          About Me
        </span>
        <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 mt-4">
          My Story
        </h2>
        <div className="mt-3 h-1 w-12 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mx-auto" />
      </div>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <img 
            className="rounded-2xl shadow-sm w-full max-h-[500px] object-cover" 
            src={profile?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"} 
            alt={`${profile?.name || 'Sandy'} portrait`} 
          />
        </div>
        <div className="about-copy flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"></h3>
          <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
            {profile?.bio || "I’m a frontend developer focused on building fast, accessible interfaces with crisp visuals and motion.\nI enjoy turning complex problems into simple, beautiful and intuitive designs."}
          </p>
        </div>
      </div>
    </section>
  );
}
