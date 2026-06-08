import { useRef, useEffect } from 'react';
import { revealOnce } from '../utils/motion';

function SkillRing({ name, value }) {
  // Simple heuristic to get SimpleIcons slugs (lowercase, strip spaces). Not perfect but covers 95% of generic tech names.
  const iconSlug = name.toLowerCase().replace(/[\s.]/g, '');

  return (
    <div className="flex flex-col items-center gap-3 w-24">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-neutral-200/60 bg-white/50 shadow-sm dark:border-neutral-700/60 dark:bg-neutral-800/40 transition-transform hover:scale-110 hover:shadow-md">
        <img 
          src={`https://cdn.simpleicons.org/${iconSlug}/10b981`} 
          alt={name}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            // Fallback rendering if simpleicons doesn't have the exact slug
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML = `<span class="text-sm font-bold text-emerald-500">${name.substring(0, 2).toUpperCase()}</span>`;
          }}
        />
      </div>
      <span className="text-xs font-medium text-center dark:text-neutral-300">{name}</span>
    </div>
  );
}

export default function Skills({ groups = [] }) {
  const root = useRef(null);

  useEffect(() => {
    root.current?.querySelectorAll(".skill-card").forEach((el, i) => revealOnce(el, { delay: i * 0.06 }));
  }, []);

  return (
    <section id="skills" ref={root} className="mx-auto max-w-6xl px-6 py-24">
      {/* Standardized Centered Header */}
      <div className="mb-16 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          Skills
        </span>
        <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 mt-4">
          Technical Arsenal
        </h2>
        <div className="mt-3 h-1 w-12 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mx-auto" />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          The tools, frameworks, and technologies I use to craft premium web products.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title} className="skill-card rounded-3xl border border-neutral-200/60 bg-white/50 p-8 shadow-sm backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-900/40">
            <h3 className="text-xl font-semibold mb-6">{g.title}</h3>
            <div className="flex flex-wrap gap-6">
              {g.items.map((s) => (
                <SkillRing key={s.name || s} name={s.name || s} value={s.value || 85} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
