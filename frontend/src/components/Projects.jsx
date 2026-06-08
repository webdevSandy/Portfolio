import { useEffect, useRef, useState } from "react";
import { revealOnce } from "../utils/motion";
import DesignModal from "./DesignModal";
import { motion } from "framer-motion";

export default function Projects({ items = [] }) {
  const root = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const r = root.current;
    if (!r) return;
    r.querySelectorAll(".project-card").forEach((card, i) => {
      revealOnce(card, { delay: i * 0.08 });
    });
  }, []);

  return (
    <section ref={root} id="projects" className="mx-auto max-w-6xl px-6 py-20">
      {/* Standardized Centered Header */}
      <div className="mb-16 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          Portfolio
        </span>
        <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 mt-4">
          Featured Projects
        </h2>
        <div className="mt-3 h-1 w-12 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mx-auto" />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          A curated selection of recent digital experiences and web engineering works.
        </p>
      </div>

      {/* Centered Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {items.map((p) => (
          <motion.article
            key={p.title}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="project-card group rounded-2xl border border-neutral-200 bg-white/60 p-4 shadow-sm backdrop-blur transition-colors dark:border-neutral-800 dark:bg-white/5 cursor-pointer hover:border-emerald-500/50"
            onClick={() => setSelectedProject(p)}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={p.image}
                alt={p.title}
                className="aspect-[16/10] w-full object-cover transition duration-300 filter grayscale-[50%] opacity-85 contrast-95 brightness-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">{p.desc}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <a href={p.demo} onClick={e => e.stopPropagation()} className="text-emerald-600 hover:underline font-semibold" target="_blank" rel="noreferrer">Live</a>
                <a href={p.code} onClick={e => e.stopPropagation()} className="text-neutral-600 hover:underline dark:text-neutral-300 font-semibold" target="_blank" rel="noreferrer">Code</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <DesignModal
        images={selectedProject?.image || []}
        showModal={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
