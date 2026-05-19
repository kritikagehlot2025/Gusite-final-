import { Link } from "react-router-dom";
import {
  ArrowUpRight, Atom, Cpu, Music2, Mic2, Code2, PenTool, Languages, Trophy,
  Camera, Wand2, Brain, Palette,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { Bento, type BentoItem } from "@/components/Bento";
import { HeroSlideshow, type Slide } from "@/components/HeroSlideshow";
import { CLUSTERS, findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import heroPortrait from "@/assets/hero-portrait.jpg";
import textureCosmos from "@/assets/texture-cosmos.jpg";
import texturePaper from "@/assets/texture-paper.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";

/* -------------------- HERO SLIDESHOW -------------------- */
const HERO_SLIDES: Slide[] = [
  {
    src: heroPortrait, alt: "Geetika Gehlot, portrait",
    tone: "light", eyebrow: "Geetika Gehlot · I",
    title: "Building worlds.",
    body: "Scientist · Researcher · Creator · Musician · Storyteller · Innovator. A 15-year-old multidisciplinary mind from Montréal.",
  },
  {
    src: atmosTelescope, alt: "Telescope under stars",
    tone: "light", eyebrow: "Plate II · Observation",
    title: "Through the lens.",
    body: "Robotics, physics, and the slow art of paying attention.",
  },
  {
    src: atmosNotebook, alt: "Open notebook with handwritten pages",
    tone: "dark", eyebrow: "Plate III · Notation",
    title: "On the page.",
    body: "A novel cycle in motion. Words before pixels, always.",
  },
  {
    src: atmosMusic, alt: "Stage lights and microphone",
    tone: "light", eyebrow: "Plate IV · Resonance",
    title: "In full voice.",
    body: "Hindustani vocal, voice acting, and the discipline of stage.",
  },
  {
    src: texturePaper, alt: "Aged paper texture",
    tone: "dark", eyebrow: "Plate V · Dossier",
    title: "Examined in public.",
    body: "Every claim, every clipping, every receipt, open for inspection.",
  },
];


/* -------------------- SKILLS TOOLKIT -------------------- */
const SKILLS: { icon: React.ComponentType<{ className?: string }>; label: string; level: string }[] = [
  { icon: Atom,      label: "Physics",         level: "Self-taught + Contact with highly deemed Professors" },
  { icon: Brain,     label: "Olympiads",     level: "& AP exams" },

  { icon: Cpu,       label: "Robotics",        level: "FRC Team 7700" },
  { icon: Code2,     label: "Web + Code",      level: "React · TS · Python" },
  { icon: PenTool,   label: "Authoring",         level: "Ongoing fiction novel series" },
  { icon: Music2,    label: "Hindustani Vocal", level: "Stage performer" },
  { icon: Mic2,      label: "Voice Acting",    level: "Child-artist credits" },
  { icon: Camera,    label: "Multimedia",      level: "Edit · shoot · score" },
  { icon: Palette,   label: "Visual Art",      level: "Canvas, Henna, Rangoli, Embroidery" },
  { icon: Trophy,    label: "Strategy Games",  level: "Chess · badminton · TT" },
  { icon: Languages, label: "Languages",       level: "EN · HI · FR · MW" },
  { icon: Wand2,     label: "Screenwriting",     level: "Cinematic Screenwriting" },
];

/* -------------------- FEATURED HIGHLIGHTS BENTO -------------------- */
const FEATURED: BentoItem[] = [
  {
    id: "f-frc", size: "xl", eyebrow: "Robotics",
    title: "FRC Team 7700",
    blurb: "Build seasons, mechanical instinct, and the controlled chaos of competition robotics.",
    image: atmosTelescope, meta: "Cluster 04 · Robotics",
    detail: "From CAD reviews at midnight to driver-station nerves on game day, Team 7700 is where I learned to design under deadline, debug under pressure, and trust a team. Click through to the cluster for the full build log.",
  },
  {
    id: "f-novel", size: "lg", eyebrow: "Writing",
    title: "The Novel Cycle",
    blurb: "A multi-book story world I've been building for years.",
    image: atmosNotebook, meta: "Cluster 05 · Writing",
  },
  {
    id: "f-vocal", size: "md", eyebrow: "Performance",
    title: "Hindustani Vocal",
    blurb: "Stage repertoire, raagas, and live performance reels.",
    image: atmosMusic, meta: "Cluster 06 · Music",
  },
  {
    id: "f-ap", size: "md", eyebrow: "Academics",
    title: "AP Track + Olympiads",
    blurb: "The transcript backing the curiosity.", meta: "Cluster 02 · Academics",
  },
  {
    id: "f-acting", size: "md", eyebrow: "Screen",
    title: "Child Artist Reel",
    blurb: "Years on screen, in front of a camera and a microphone.", meta: "Cluster 07 · Acting",
  },
  {
    id: "f-zion", size: "md", eyebrow: "Tech",
    title: "Zionaxelle",
    blurb: "A multimedia universe I built from scratch.", meta: "Cluster 08 · Tech",
  },
];

/* -------------------- RANDOM WINS / CURIOSITIES TEASER -------------------- */
const CURIOSITIES: BentoItem[] = [
  { id: "c-karate", size: "md", eyebrow: "Belt", title: "Karate", blurb: "Years on the mat, discipline that bleeds into everything else.", meta: "TODO · belt level + dojo" },
  { id: "c-abacus", size: "md", eyebrow: "Mental Math", title: "Abacus medals", blurb: "Lightning arithmetic from the elementary years.", meta: "TODO · grades + competitions" },
  { id: "c-chess", size: "sm", eyebrow: "Strategy", title: "Chess", blurb: "Tournament play and pattern obsession.", meta: "TODO · rating" },
  { id: "c-bad", size: "sm", eyebrow: "Court", title: "Badminton", blurb: "Smash, drop, repeat.", meta: "TODO" },
  { id: "c-tt", size: "sm", eyebrow: "Court", title: "Table Tennis", blurb: "Reflex over reach.", meta: "TODO" },
  { id: "c-misc", size: "wide", eyebrow: "Side quests", title: "And a few oddities I'm proud of", blurb: "Random certificates, half-wins, things that don't fit a category but absolutely shaped me.", meta: "Cluster 15 · Curiosities, full archive" },
];

const Index = () => {
  useReveal();

  return (
    <PageShell>
      {/* HERO, fullscreen navigable slideshow */}
      <HeroSlideshow slides={HERO_SLIDES} />

      {/* MANIFESTO, layered: paper bg + drifting notebook + telescope corner + crumpled-paper veil */}
      <section
        id="after-hero"
        className="relative py-16 md:py-24 scroll-mt-16 overflow-hidden crumpled-paper crinkle film-grain leak parchment fibers"
      >
        <img
          src={texturePaper}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-multiply pointer-events-none animate-ken"
        />
        <img
          src={atmosNotebook}
          alt=""
          aria-hidden
          className="absolute -right-16 top-6 w-[44%] max-w-2xl h-[80%] object-cover opacity-20 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={atmosTelescope}
          alt=""
          aria-hidden
          className="absolute -left-24 -bottom-10 w-[28%] max-w-md h-[55%] object-cover opacity-10 grayscale rotate-[-4deg] pointer-events-none hidden md:block animate-drift"
        />

        <div className="container relative">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-3" data-reveal>
              <p className="label-gold">00 · Hello</p>
              <p className="eyebrow mt-3">Scroll down</p>
              <div className="rule-gold mt-5 max-w-[60%]" />
            </div>
            <div className="md:col-span-9 max-w-3xl">
              <p
                className="font-display text-3xl md:text-5xl text-ink leading-[1.05] text-balance drop-cap"
                data-reveal
              >
              Born in India, raised through 
              several cities & countries, 
              Geetika has spent the last 17 years collecting 
              & attempting to answer questions, </p>
              <div className="rule-double my-8 max-w-xs" data-reveal data-reveal-delay="120" />
              <p
                className="font-accent text-xl md:text-2xl text-ink-soft leading-relaxed"
                data-reveal
                data-reveal-delay="200"
              >
              and in the process, lies a unique journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRAND GROUPS, index, layered music plate */}
      <section className="relative py-16 md:py-24 overflow-hidden film-grain dust crumpled-paper marble fibers">
        <img
          src={atmosMusic}
          alt=""
          aria-hidden
          className="absolute right-0 top-0 w-[40%] max-w-2xl h-[55%] object-cover opacity-20 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={texturePaper}
          alt=""
          aria-hidden
          className="absolute -left-10 bottom-0 w-[30%] max-w-md h-[50%] object-cover opacity-15 mix-blend-multiply pointer-events-none hidden md:block"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 04 · The Archive</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Five pages, <span className="font-accent text-gold">one dossier.</span>
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft text-sm leading-relaxed font-accent italic">
                The five main pages: about, academics & research,
                the works, the documents, and contact.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              ["I", "About", "Me"],
              ["II", "Academics", "& Excellences"],
              ["III", "Works", "Projects & Extracurriculars"],
              ["IV", "CV", "Resume & Documents"],
              ["V", "Contact", "Get in Touch"],
            ].map(([n, t, d], idx) => (
              <div
                key={t}
                className="border-t border-gold/40 pt-4"
                data-reveal
                data-reveal-delay={String(idx * 100)}
              >
                <p className="font-mono text-xs text-gold tracking-widest">{n}</p>
                <h3 className="font-display text-2xl mt-2">{t}</h3>
                <p className="text-paper/70 text-base mt-3 leading-relaxed font-accent">{d}</p>
              </div>
            ))}
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border" data-reveal>
            {CLUSTERS.map((c) => {
              const CI = c.icon;
              return (
                <li key={c.slug} className="bg-paper">
                  <Link
                    to={`/${c.slug}`}
                    className="fancy-tile group/tile block p-6 h-full hover:bg-navy-deep hover:text-paper-contrast transition-all duration-500 relative overflow-hidden fibers stipple hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <CI className="w-5 h-5 text-gold" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-gold">{c.num}</span>
                    </div>
                    <h4 className="font-display text-xl md:text-2xl leading-snug mb-2">{c.label}</h4>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft group-hover/tile:text-paper-contrast-soft mt-2">
                      {c.tagline}
                    </p>
                    <ArrowUpRight className="absolute right-4 bottom-4 w-4 h-4 text-ink-soft group-hover/tile:text-gold group-hover/tile:translate-x-1 group-hover/tile:-translate-y-1 transition-all duration-500" />
                    <span className="absolute left-0 bottom-0 h-px w-0 bg-gold transition-all duration-700 group-hover/tile:w-full" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* SKILLS TOOLKIT, layered telescope + cosmos veil + scanlines */}
      <section className="relative py-14 md:py-20 overflow-hidden scanlines film-grain dust weave-soft stipple">
        <img
          src={atmosTelescope}
          alt=""
          aria-hidden
          className="absolute -left-24 top-10 w-[40%] max-w-xl h-[80%] object-cover opacity-25 grayscale pointer-events-none hidden md:block animate-float"
        />
        <img
          src={textureCosmos}
          alt=""
          aria-hidden
          className="absolute right-0 -bottom-10 w-[55%] h-[60%] object-cover opacity-10 pointer-events-none animate-drift"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 01 · Toolkit</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Few of the skills I bring <span className="font-accent text-gold">to the table.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
                Not exhaustive; go to Pages: Works, Academics & CV for full list of Skills & Achievements
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {SKILLS.map(({ icon: I, label, level }, idx) => (
              <li
                key={label}
                data-reveal
                data-reveal-delay={String(idx * 40)}
                className="fancy-tile bg-paper p-5 group hover:bg-navy-deep hover:text-paper-contrast transition-all duration-500 relative overflow-hidden fibers stipple hover:-translate-y-1"
              >
                <I className="w-5 h-5 text-gold mb-4 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110" />
                <p className="font-display text-xl leading-tight">{label}</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft group-hover:text-paper-contrast-soft mt-2">
                  {level}
                </p>
                <span className="absolute right-3 top-3 font-mono text-[0.55rem] tracking-[0.25em] text-ink-soft/40 group-hover:text-gold transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED HIGHLIGHTS BENTO, cosmos bg + crumpled-paper field + drifting notebook */}
      <section className="relative py-14 md:py-20 overflow-hidden crumpled-paper film-grain leak marble fibers">
        <img
          src={textureCosmos}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none animate-ken"
        />
        <img
          src={atmosNotebook}
          alt=""
          aria-hidden
          className="absolute -left-10 bottom-0 w-[26%] max-w-sm h-[55%] object-cover opacity-10 grayscale rotate-[3deg] pointer-events-none hidden md:block animate-float"
        />
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 02 · Showcase</p>
              <h2 className="display-xl text-3xl md:text-5xl text-ink">
                Featured <span className="font-accent text-gold">work.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
              Hover & Click for more!
            </p>
          </div>
          <div data-reveal>
            <Bento items={FEATURED} />
          </div>
        </div>
      </section>

      {/* TRIPTYCH, three layered plates */}
      <section className="container py-8 md:py-10">
        <div className="grid md:grid-cols-3 gap-2">
          {[
            { src: atmosTelescope, label: "Observation", num: "I" },
            { src: atmosNotebook, label: "Notation", num: "II" },
            { src: atmosMusic, label: "Resonance", num: "III" },
          ].map((x, idx) => (
            <figure
              key={x.label}
              data-reveal
              data-reveal-delay={String(idx * 120)}
              className="relative aspect-[3/4] overflow-hidden group crumpled-paper film-grain stipple"
            >
              <img
                src={x.src}
                alt={x.label}
                width={1600}
                height={1000}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-3 border border-paper/15 pointer-events-none" />
              <figcaption className="absolute bottom-6 left-6 right-6 text-paper">
                <span className="font-mono text-xs text-gold tracking-widest">PLATE {x.num}</span>
                <p className="font-display text-3xl md:text-4xl mt-1 leading-tight">{x.label}</p>
                <span className="block w-10 h-px bg-gold mt-3 transition-all duration-500 group-hover:w-20" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

    </PageShell>
  );
};

export default Index;
