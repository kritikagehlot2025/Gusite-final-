import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  Atom, Cpu, Music2, Mic2, Code2, PenTool, Languages, Trophy,
  Camera, Wand2, Brain, Palette,
} from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { PullQuote } from "@/components/Editorial";
import { Bento, type BentoItem } from "@/components/Bento";
import { HeroSlideshow, type Slide } from "@/components/HeroSlideshow";
import { CLUSTERS } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
// Triptych — fashion editorial plates (kept as-is)
import triGreenSit from "@assets/unnamed_1779118401963.jpg";
import triGreenWide from "@assets/unnamed_1779118449424.jpg";
import triPinkRed from "@assets/unnamed_1779118444321.jpg";
// Achievement photos for bento
import achGladrags from "@assets/unnamed_1779118342065.jpg";
import achAbacus from "@assets/unnamed_1779118522303.jpg";

/* -------------------- HERO SLIDESHOW -------------------- */
/* Diverse mix: singing → acting → science lab → astronomy → physics → robotics */
const HERO_SLIDES: Slide[] = [
  {
    src: "/photo-singing.jpg",
    alt: "Geetika performing Hindustani classical vocal on stage",
    tone: "light",
    eyebrow: "Vocal Artist · Hindustani Classical",
    title: "",
    body: "Stage performer — trained in the guru-shishya tradition of Indian classical music.",
  },
  {
    src: "/photo-starparivar-set.jpg",
    alt: "Geetika on the Star Parivaar set with Barun Sobti and Ridhi Dogra",
    tone: "light",
    eyebrow: "Child Artist · Star Plus · National Television",
    title: "",
    body: "On set with Barun Sobti and Ridhi Dogra — Iss Pyar Ko Kya Naam Doon.",
  },
  {
    src: "/photo-lab-team.jpg",
    alt: "Geetika with the McGill cancer cell research lab team",
    tone: "light",
    eyebrow: "Scientist · McGill Cancer Cell Lab · March 2025",
    title: "",
    body: "Gel electrophoresis, Zeiss microscopy, pipetting — real bench science.",
  },
  {
    src: "/photo-moon-stargazing.jpg",
    alt: "Rooftop night sky observation — stargazing and meteor tracking",
    tone: "light",
    eyebrow: "Self-Taught Astronomer",
    title: "",
    body: "Every constellation. Every blank space. A full year of shooting stars.",
  },
  {
    src: "/photo-jun-ye-selfie.jpg",
    alt: "Geetika with quantum physicist Dr. Jun Ye at McGill",
    tone: "light",
    eyebrow: "Physicist · Jun Ye Seminar · McGill 2025",
    title: "",
    body: "Youngest attendee at a Nobel-adjacent precision physics lecture.",
  },
  {
    src: "/photo-robotics-pit.jpg",
    alt: "FRC Team 7700 — competition robotics pit work",
    tone: "light",
    eyebrow: "Engineer · FRC Team 7700",
    title: "",
    body: "Build seasons, mechanical instinct, and the controlled chaos of competition robotics.",
  },
];

/* -------------------- SKILLS TOOLKIT -------------------- */
const SKILLS: { icon: React.ComponentType<{ className?: string }>; label: string; level: string }[] = [
  { icon: Atom,      label: "Physics",         level: "Self-taught + olympiad" },
  { icon: Brain,     label: "Mathematics",     level: "AP track" },
  { icon: Cpu,       label: "Robotics",        level: "FRC Team 7700" },
  { icon: Code2,     label: "Web + Code",      level: "React · TS · Python" },
  { icon: PenTool,   label: "Writing",         level: "Novel cycle · podcast" },
  { icon: Music2,    label: "Hindustani Vocal", level: "Stage performer" },
  { icon: Mic2,      label: "Voice Acting",    level: "Child-artist credits" },
  { icon: Camera,    label: "Multimedia",      level: "Edit · shoot · score" },
  { icon: Palette,   label: "Visual Art",      level: "Canvas · embroidery" },
  { icon: Trophy,    label: "Strategy Games",  level: "Chess · badminton · TT" },
  { icon: Languages, label: "Languages",       level: "EN · HI · FR" },
  { icon: Wand2,     label: "Storyworlds",     level: "Worldbuilding craft" },
];

/* -------------------- FEATURED HIGHLIGHTS BENTO -------------------- */
const FEATURED: BentoItem[] = [
  {
    id: "f-frc", size: "xl", eyebrow: "Engineering & Robotics",
    title: "FRC Team 7700",
    blurb: "Build seasons, mechanical instinct, and the controlled chaos of competition robotics.",
    image: "/photo-robotics-pit.jpg", meta: "Works · Engineering",
    detail: "From CAD reviews at midnight to driver-station nerves on game day — Team 7700 is where I learned to design under deadline, debug under pressure, and trust a team. Click through to the Works cluster for the full build log.",
  },
  {
    id: "f-novel", size: "lg", eyebrow: "Writing",
    title: "The Novel Cycle",
    blurb: "A multi-book story world I've been building for years.",
    image: "/photo-screenplay-board.jpg", meta: "Works · Writing",
  },
  {
    id: "f-vocal", size: "md", eyebrow: "Performance",
    title: "Hindustani Vocal",
    blurb: "Stage repertoire, raagas, and live performance reels.",
    image: "/photo-singing.jpg", meta: "Works · Music",
  },
  {
    id: "f-ap", size: "md", eyebrow: "Academics",
    title: "AP Track + Olympiads",
    blurb: "The transcript backing the curiosity.",
    image: "/photo-quantum-research.jpg", meta: "Academics",
  },
  {
    id: "f-acting", size: "md", eyebrow: "Screen",
    title: "Child Artist Reel",
    blurb: "Years on screen — lead roles, national television, voice acting.",
    image: "/photo-starparivar-set.jpg", meta: "Works · Acting",
  },
  {
    id: "f-zion", size: "md", eyebrow: "Tech",
    title: "Zionaxelle",
    blurb: "A multimedia universe I built from scratch.",
    image: achGladrags, meta: "Works · Tech",
  },
];

/* -------------------- CURIOSITIES / BELTS & MEDALS -------------------- */
const CURIOSITIES: BentoItem[] = [
  { id: "c-karate", size: "md", eyebrow: "Belt", title: "Karate", blurb: "Years on the mat — discipline that bleeds into everything else.", image: "/photo-karate.jpg", meta: "Works · Athletics" },
  { id: "c-abacus", size: "md", eyebrow: "Mental Math", title: "Abacus Medals", blurb: "Lightning arithmetic from the elementary years.", image: achAbacus, meta: "Works · Math" },
  { id: "c-chess", size: "sm", eyebrow: "Strategy", title: "Chess", blurb: "Tournament play and pattern obsession.", meta: "Works · Games" },
  { id: "c-bad", size: "sm", eyebrow: "Court", title: "Badminton", blurb: "Smash, drop, repeat.", meta: "Works · Athletics" },
  { id: "c-tt", size: "sm", eyebrow: "Court", title: "Table Tennis", blurb: "Reflex over reach.", meta: "Works · Athletics" },
  { id: "c-misc", size: "wide", eyebrow: "Side Quests", title: "And a few oddities I'm proud of", blurb: "Random certificates, half-wins, things that don't fit a category but absolutely shaped me.", image: "/photo-hulahoop.jpg", meta: "Works · Curiosities" },
];

const Index = () => {
  useReveal();

  return (
    <PageShell>
      {/* HERO — fullscreen navigable slideshow */}
      <HeroSlideshow slides={HERO_SLIDES} />

      {/* MANIFESTO */}
      <section
        id="after-hero"
        className="relative py-12 md:py-16 scroll-mt-16 overflow-hidden crumpled-paper crinkle film-grain leak parchment fibers"
      >
        <div className="container relative">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10">
            <div className="md:col-span-3" data-reveal>
              <p className="label-gold">§ 00 · Foreword</p>
              <p className="eyebrow mt-3">Read aloud</p>
              <div className="rule-gold mt-5 max-w-[60%]" />
            </div>
            <div className="md:col-span-9 max-w-3xl">
              <p
                className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.05] text-balance drop-cap"
                data-reveal
              >
                This is not a résumé. It is a working dossier — equal parts laboratory
                notebook, gallery catalogue, and founder's manifesto. Every page has
                layers, sublayers, evidence. Every claim is meant to be examined.
              </p>
              <div className="rule-double my-8 max-w-xs" data-reveal data-reveal-delay="120" />
              <p
                className="font-accent text-lg md:text-xl text-ink-soft leading-relaxed"
                data-reveal
                data-reveal-delay="200"
              >
                I was born in India, raised between two continents, and I now write,
                perform, code, and study physics from Montréal. I have spent the
                last ten years collecting questions — this site is where I begin to
                answer them, in public, with proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div data-reveal>
        <PullQuote attr="The operating principle">
          Curiosity is not my hobby. It is my operating system.
        </PullQuote>
      </div>

      {/* SKILLS TOOLKIT */}
      <section className="relative py-10 md:py-14 overflow-hidden scanlines film-grain dust weave-soft stipple">
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 01 · Toolkit</p>
              <h2 className="display-xl text-2xl md:text-3xl lg:text-4xl text-ink">
                Skills I bring <span className="font-accent text-gold">to the table.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
              A working list, not a brag sheet. Each tool earns its place by what I've shipped, not what I've studied.
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILLS.map(({ icon: I, label, level }, idx) => (
              <li
                key={label}
                data-reveal
                data-reveal-delay={String(idx * 40)}
                className="fancy-tile bg-paper border border-border p-5 group hover:bg-navy-deep hover:text-paper-contrast transition-all duration-700 ease-cinematic relative overflow-hidden fibers stipple hover:-translate-y-1 hover:border-gold"
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

      {/* FEATURED HIGHLIGHTS BENTO */}
      <section className="relative py-10 md:py-14 overflow-hidden crumpled-paper film-grain leak marble fibers">
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 02 · Showcase</p>
              <h2 className="display-xl text-2xl md:text-3xl lg:text-4xl text-ink">
                Featured <span className="font-accent text-gold">work.</span>
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed">
              Hover for the elevator pitch. Click for the full story.
            </p>
          </div>
          <div data-reveal>
            <Bento items={FEATURED} />
          </div>
        </div>
      </section>

      {/* TRIPTYCH — three editorial plates */}
      <section className="container py-8 md:py-10">
        <div className="grid md:grid-cols-3 gap-2">
          {[
            { src: triGreenSit, label: "Festive Wear", num: "I" },
            { src: triGreenWide, label: "Bridal Collection", num: "II" },
            { src: triPinkRed, label: "Designer Wear", num: "III" },
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1400 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-3 border border-paper/15 pointer-events-none" />
              <figcaption className="absolute bottom-6 left-6 right-6 text-paper">
                <span className="font-mono text-xs text-gold tracking-widest">PLATE {x.num}</span>
                <p className="font-display text-xl md:text-2xl mt-1 leading-tight">{x.label}</p>
                <span className="block w-10 h-px bg-gold mt-3 transition-all duration-500 group-hover:w-20" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CURIOSITIES / BELTS, MEDALS & SIDE QUESTS */}
      <section className="relative py-10 md:py-14 overflow-hidden crinkle film-grain dust linen parchment weave-soft">
        <div className="container relative">
          <div className="flex items-end justify-between mb-8 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 03 · Random Wins</p>
              <h2 className="display-xl text-2xl md:text-3xl lg:text-4xl text-ink">
                Belts, medals <span className="font-accent text-gold">& side quests.</span>
              </h2>
            </div>
            <Link
              to="/works#karate"
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft hover:text-gold transition-colors flex items-center gap-2 group"
            >
              Open the CV &amp; Resume archive
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div data-reveal>
            <Bento items={CURIOSITIES} />
          </div>
        </div>
      </section>

      {/* GRAND GROUPS — site index */}
      <section className="relative py-10 md:py-16 overflow-hidden film-grain dust crumpled-paper marble fibers">
        <div className="container relative">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 04 · The Archive</p>
              <h2 className="display-xl text-2xl md:text-3xl lg:text-4xl text-ink">
                Five pages, <span className="font-accent text-gold">one dossier.</span>
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft text-sm leading-relaxed font-accent italic">
                The whole site lives across five pages — about, academics & research,
                the merged works, the CV &amp; Resume archive, and a way to reach me. No grand
                groupings, no fractal cul-de-sacs. Just five doors.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-2 lg:grid-cols-5 gap-3 [&>li:nth-child(5)]:col-span-2 lg:[&>li:nth-child(5)]:col-span-1" data-reveal>
            {CLUSTERS.map((c) => {
              const CI = c.icon;
              return (
                <li key={c.slug}>
                  <Link
                    to={`/${c.slug}`}
                    className="fancy-tile group/tile block p-6 h-full bg-paper border border-border hover:bg-navy-deep hover:text-paper-contrast transition-all duration-700 ease-cinematic relative overflow-hidden fibers stipple hover:-translate-y-1 hover:border-gold"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <CI className="w-5 h-5 text-gold" />
                      <span className="font-mono text-[0.65rem] tracking-widest text-gold">{c.num}</span>
                    </div>
                    <h4 className="font-display text-lg md:text-xl leading-snug mb-2">{c.label}</h4>
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

      {/* CORE TRAITS BAND */}
      <section className="force-light bg-navy-deep text-paper py-14 md:py-20 relative overflow-hidden grain crumpled-paper film-grain leak marble stipple">
        <div className="container relative">
          <p className="label-gold mb-6" data-reveal>§ 05 · Core Traits</p>
          <h2 className="display-xl text-2xl md:text-4xl mb-8 max-w-3xl text-balance" data-reveal>
            Five instincts <span className="font-accent text-gold">I trust</span> before any plan.
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              ["I", "Analytical Precision", "Numbers before opinions."],
              ["II", "Creative Intelligence", "Form follows imagination."],
              ["III", "Leadership", "Quiet, by example."],
              ["IV", "Relentless Work Ethic", "Hours compound."],
              ["V", "Cross-disciplinary Thinking", "Edges are where ideas meet."],
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
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
