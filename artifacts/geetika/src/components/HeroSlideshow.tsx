import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

export type Slide = {
  src: string;
  alt: string;
  /** "light" => white text on dark photo. "dark" => black text on light photo. */
  tone: "light" | "dark";
  eyebrow?: string;
  title: string;
  body?: string;
};

type Props = {
  slides: Slide[];
  /** auto-advance interval in ms; 0 disables */
  intervalMs?: number;
};

export function HeroSlideshow({ slides, intervalMs = 6000 }: Props) {
  const [i, setI] = useState(0);
  const [showText, setShowText] = useState(true);
  const total = slides.length;
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const root = document.documentElement;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
          root.classList.add("hero-in-view");
        } else {
          root.classList.remove("hero-in-view");
        }
      },
      { threshold: [0, 0.05, 0.5, 1] },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      root.classList.remove("hero-in-view");
    };
  }, []);

  const go = (n: number) => setI(((n % total) + total) % total);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    if (!intervalMs) return;
    const t = setInterval(() => setI((p) => (p + 1) % total), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key.toLowerCase() === "h") setShowText((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, total]);

  const s = slides[i];
  const textMain = "text-paper";
  const textSoft = "text-paper/80";
  const textFaint = "text-paper/60";
  const accent = "text-gold";
  const overlayGrad = "bg-gradient-to-r from-navy-deep/85 via-navy-deep/45 to-navy-deep/15";
  const chromeBorder = "border-paper/30";
  const chromeHover = "hover:border-gold hover:text-gold";

  return (
    <section
      ref={sectionRef}
      className="force-light relative w-full h-screen -mt-16 overflow-hidden bg-navy-deep"
      aria-roledescription="carousel"
      aria-label="Portfolio hero slideshow"
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <img
          key={idx}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={idx !== i}
        />
      ))}

      {/* Gradient overlay */}
      {showText && <div className={`absolute inset-0 ${overlayGrad}`} />}

      {/* Text overlay, pl-16 on small screens to clear the left nav arrow */}
      {showText && (
        <div className={`relative container h-full pt-32 pb-24 flex flex-col justify-between ${textMain} animate-fade-in`}>
          <div className={`flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.3em] ${textFaint}`}>
            <span>E-Portfolio · </span>
            <span className="hidden md:inline">Geetika Gehlot · Montréal</span>
            <span className="font-mono">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Text block, padded left on mobile so the nav arrow doesn't overlap the gold eyebrow */}
          <div className="max-w-4xl pl-14 sm:pl-0">
            {s.eyebrow && (
              <p className={`font-mono text-xs uppercase tracking-[0.3em] ${accent} mb-6`}>
                {s.eyebrow}
              </p>
            )}
            <h1 className={`font-display text-4xl sm:text-5xl md:text-7xl leading-[1.02] tracking-tight ${textMain} mt-2 mb-4`}>
              {s.title}
            </h1>
            {s.body && (
              <p className={`mt-2 max-w-xl text-lg leading-relaxed font-accent italic ${textSoft}`}>
                {s.body}
              </p>
            )}
          </div>

          {/* Bottom row: dots + scroll cue */}
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-2 pl-14 sm:pl-0" role="tablist" aria-label="Slide navigation">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === i}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => go(idx)}
                  className={`h-[2px] transition-all ${
                    idx === i
                      ? "w-10 bg-gold"
                      : "w-5 bg-paper/40 hover:bg-paper/70"
                  }`}
                />
              ))}
            </div>

            <a
              href="#after-hero"
              className={`font-mono text-[0.6rem] tracking-[0.3em] ${textFaint} hover:${accent} animate-shimmer`}
            >
              ↓ SCROLL TO ENTER
            </a>
          </div>
        </div>
      )}

      {/* Eye toggle, top right */}
      <div className="absolute top-24 right-6 md:right-10 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowText((v) => !v)}
          aria-label={showText ? "Hide overlay text" : "Show overlay text"}
          title="Toggle overlay (H)"
          className={`w-10 h-10 flex items-center justify-center border ${chromeBorder} ${chromeHover} ${textMain} backdrop-blur-sm bg-black/10 transition-colors`}
        >
          {showText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Left nav arrow, positioned at bottom third so it doesn't overlap the text block */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className={`absolute left-3 md:left-6 bottom-36 z-20 w-12 h-12 flex items-center justify-center border ${chromeBorder} ${chromeHover} ${textMain} backdrop-blur-sm bg-black/10 transition-colors`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right nav arrow, matching position */}
      <button
        onClick={next}
        aria-label="Next slide"
        className={`absolute right-3 md:right-6 bottom-36 z-20 w-12 h-12 flex items-center justify-center border ${chromeBorder} ${chromeHover} ${textMain} backdrop-blur-sm bg-black/10 transition-colors`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}

export default HeroSlideshow;
