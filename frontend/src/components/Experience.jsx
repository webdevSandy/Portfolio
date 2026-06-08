import { useEffect, useRef } from "react";
import { revealOnce } from "../utils/motion";

export default function Experience({ items = [] }) {
  const root = useRef(null);

  useEffect(() => {
    root.current?.querySelectorAll(".timeline-item").forEach((el, i) => revealOnce(el, { delay: i * 0.15 }));
  }, []);

  return (
    <section id="experience" ref={root} className="mx-auto max-w-5xl px-6 py-24">
      {/* Standardized Centered Header */}
      <div className="mb-16 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          Journey
        </span>
        <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 mt-4">
          Work Experience
        </h2>
        <div className="mt-3 h-1 w-12 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mx-auto" />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          My professional timeline and key career milestones.
        </p>
      </div>

      {/* Centered Timeline */}
      <div className="relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-[2px] before:bg-emerald-500/30 before:dark:bg-emerald-500/20 before:-translate-x-1/2">
        {items.map((exp, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className="timeline-item mb-12 flex flex-col md:flex-row items-stretch relative">
              
              {/* Center Dot Indicator */}
              <span className="absolute left-4 md:left-1/2 top-8 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-neutral-50 dark:ring-neutral-950 z-10">
              </span>
              
              {/* Timeline Card Container */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12 md:order-last'}`}>
                <div className="timeline-card rounded-3xl border border-neutral-200/60 bg-white/50 p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:border-neutral-800/60 dark:bg-neutral-900/40 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{exp.role}</h3>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{exp.date}</span>
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm font-semibold mb-4">{exp.company}</div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
              
              {/* Desktop layout Spacer for alignment */}
              <div className="hidden md:block w-1/2"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

