import { useRef, useState } from "react";
import gsap from "gsap";
import { Loader2, Mail, Send } from "lucide-react";
import API_URL from '../utils/api';

export default function Contact() {
  const root = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      
      // Animate success badge
      setTimeout(() => {
        const badge = root.current?.querySelector(".sent-badge");
        if (badge) {
          gsap.fromTo(badge, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
        }
      }, 50);

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={root} className="mx-auto max-w-3xl px-6 py-24">
      {/* Standardized Centered Header */}
      <div className="mb-16 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          Contact
        </span>
        <h2 className="text-3xl font-bold md:text-5xl tracking-tight text-neutral-900 dark:text-neutral-50 mt-4 flex items-center justify-center gap-3">
          <Mail className="text-emerald-500" size={36} /> Get In Touch
        </h2>
        <div className="mt-3 h-1 w-12 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mx-auto" />
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Have an exciting project or opportunity in mind? Let’s build something together.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2">
        {/* Row 1: Name and Email */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Your Name</label>
          <input 
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900 focus:border-emerald-500 focus:outline-none transition w-full" 
            placeholder="John Doe" 
            required 
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Email Address</label>
          <input 
            type="email" 
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900 focus:border-emerald-500 focus:outline-none transition w-full" 
            placeholder="johndoe@example.com" 
            required 
            disabled={loading}
          />
        </div>

        {/* Row 2: Subject */}
        <div className="flex flex-col col-span-full">
          <label className="text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Subject</label>
          <input 
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900 focus:border-emerald-500 focus:outline-none transition w-full" 
            placeholder="Project details / Collaboration opportunity" 
            required 
            disabled={loading}
          />
        </div>

        {/* Row 3: Message */}
        <div className="flex flex-col col-span-full">
          <label className="text-sm font-semibold mb-2 text-neutral-600 dark:text-neutral-400">Message</label>
          <textarea 
            rows="6" 
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-900 focus:border-emerald-500 focus:outline-none transition w-full" 
            placeholder="Hi Sandy, I would love to collaborate with you on a MERN stack project..." 
            required 
            disabled={loading}
          />
        </div>

        {/* Submit & Status Display */}
        <div className="col-span-full flex flex-col gap-4 mt-2">
          <button 
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3.5 text-white font-medium transition duration-200 hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer text-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </button>

          {sent && (
            <div className="sent-badge flex items-center justify-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-400 font-medium text-center">
              ✨ Thanks! Your message was sent. I will reply soon.
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 font-medium text-center">
              ⚠️ {error}
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

