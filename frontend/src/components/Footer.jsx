export default function Footer() {
  return (
    <footer className="mt-10 border-t border-neutral-200/60 py-10 text-center text-sm text-neutral-500 dark:border-neutral-800">
      <p>© {new Date().getFullYear()} Sandy Chaudhary · Built with React, Tailwind & GSAP</p>
      <a href="#home" className="mt-2 inline-block underline hover:no-underline">Back to top</a>
    </footer>
  );
}
