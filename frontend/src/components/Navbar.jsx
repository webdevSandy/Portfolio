import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Download } from "lucide-react";

export default function Navbar({ profile }) {
  const bar = useRef(null);
  const [lastY, setLastY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY && y > 80;
      gsap.to(bar.current, { y: goingDown ? -80 : 0, duration: 0.3, ease: "power2.out" });
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.4 });

    const sections = document.querySelectorAll("section");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const navLinks = [
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "About", href: "/#about", id: "about" }
  ];

  return (
    <header
      ref={bar}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:border-neutral-800/50 dark:bg-neutral-950/80"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/#home" className="text-xl font-bold tracking-tight">Sandy.</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`transition-colors hover:text-emerald-500 ${activeSection === link.id ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-300"}`}
            >
              {link.name}
            </a>
          ))}
          <a href="/#contact" className="ml-1 rounded-xl bg-emerald-500 px-4 py-2 text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/50">Contact</a>
        </div>

        {/* Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:gap-4">
          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="flex items-center gap-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 px-3 py-1.5 text-xs md:text-sm font-semibold text-neutral-700 dark:text-neutral-200 transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white dark:hover:text-emerald-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          )}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <button className="md:hidden p-2 text-neutral-600 dark:text-neutral-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 shadow-xl">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors hover:text-emerald-500 py-2 border-b border-neutral-100 dark:border-neutral-900 ${activeSection === link.id ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-300"}`}
              >
                {link.name}
              </a>
            ))}
            <a href="/#contact" onClick={() => setIsMenuOpen(false)} className="mt-2 text-center rounded-xl bg-emerald-500 px-4 py-3 text-white shadow-lg w-full font-bold">Contact Me</a>
          </div>
        </div>
      )}
    </header>
  );
}
