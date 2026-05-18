import { useState } from "react";
import {
  Mail, ArrowUpRight, Linkedin, Github, Send, MapPin,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "@/hooks/use-toast";

type IconCmp = React.ComponentType<{ className?: string }>;

const CONTACT_EMAIL = "geetika@example.com";

const Contact = () => {
  useReveal();

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 05</span>
          <span className="eyebrow">Contact</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          Open correspondence and links to everywhere else.
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Reach out directly via email or connect through any of the channels below.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <section className="container pb-16 flex justify-center">
        <ContactBlock />
      </section>
    </PageShell>
  );
};

function ContactBlock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tn = name.trim(), te = email.trim(), tm = message.trim();
    if (!tn || tn.length > 100) { toast({ title: "Please add your name", description: "Up to 100 characters." }); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(te) || te.length > 255) { toast({ title: "Please enter a valid email" }); return; }
    if (!tm || tm.length > 2000) { toast({ title: "Add a short message", description: "Up to 2000 characters." }); return; }
    setSending(true);
    const subject = encodeURIComponent(`Hello from ${tn}`);
    const body = encodeURIComponent(`${tm}\n\n— ${tn} (${te})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setSending(false), 800);
    toast({ title: "Opening your mail client…" });
  };

  const channels: Array<{ icon: IconCmp; label: string; value: string; href?: string; num: string }> = [
    { icon: Mail,     label: "Email",    value: CONTACT_EMAIL,         href: `mailto:${CONTACT_EMAIL}`, num: "01" },
    { icon: Linkedin, label: "LinkedIn", value: "/in/geetika-gehlot",  href: "https://www.linkedin.com/in/geetika-gehlot", num: "02" },
    { icon: Github,   label: "GitHub",   value: "@geetika",            href: "https://github.com/geetika", num: "03" },
    { icon: MapPin,   label: "Based in", value: "Montréal, QC",                                          num: "04" },
  ];

  return (
    <div className="space-y-10 w-full max-w-4xl mx-auto">
      {/* Archive-style channel tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {channels.map(({ icon: I, label, value, href, num }) => {
          const inner = (
            <div
              className="fancy-tile group/tile relative block p-5 h-full bg-paper border border-border hover:bg-navy-deep hover:text-paper-contrast transition-all duration-700 ease-cinematic hover:-translate-y-1 hover:border-gold fibers stipple overflow-hidden"
              style={{ minHeight: "140px" }}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <I className="w-4 h-4 text-gold" />
                  <span className="font-mono text-[0.6rem] tracking-[0.28em] text-gold">{num}</span>
                </div>
                <div>
                  <p className="font-display text-base leading-snug group-hover/tile:text-paper-contrast transition-colors duration-300 mb-1">{label}</p>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ink-soft group-hover/tile:text-paper-contrast-soft transition-colors duration-300 truncate">{value}</p>
                </div>
              </div>
              {href && (
                <ArrowUpRight className="absolute right-4 bottom-4 w-4 h-4 text-ink-soft group-hover/tile:text-gold group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 transition-all duration-500" />
              )}
              <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-700 group-hover/tile:w-full" />
            </div>
          );

          return href ? (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">{inner}</a>
          ) : (
            <div key={label}>{inner}</div>
          );
        })}
      </div>

      {/* Contact form */}
      <form onSubmit={onSubmit} className="bg-paper-deep border border-border p-6 md:p-8 space-y-4 w-full max-w-3xl mx-auto">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-gold mb-6">Send a message</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="eyebrow">Your name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required
              className="mt-2 w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-display text-base text-ink" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="eyebrow">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required
              className="mt-2 w-full bg-paper border focus:border-gold border-border outline-none px-3 py-2 font-display text-base text-ink" placeholder="you@domain.com" />
          </label>
        </div>
        <label className="block">
          <span className="eyebrow">Message</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} required rows={6}
            className="mt-2 w-full bg-paper border border-border focus:border-gold outline-none px-3 py-2 font-accent text-base text-ink resize-y"
            placeholder="Say hello, ask a question, or open a door." />
          <span className="block mt-1 font-mono text-[0.6rem] tracking-widest text-ink-soft text-right">{message.length}/2000</span>
        </label>
        <button type="submit" disabled={sending}
          className="inline-flex items-center gap-2 bg-navy-deep text-paper px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.3em] hover:bg-gold hover:text-navy-deep transition-colors disabled:opacity-50">
          <Send className="w-3.5 h-3.5" />
          {sending ? "Sending…" : "Send via email"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
