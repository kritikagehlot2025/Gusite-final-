import { Wand as Wand2 } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { ArchiveMosaic } from "@/components/ArchiveMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";

const ON_SCREEN_CREDITS = [
  { src: "/tv-ddkisan.png",       alt: "Geetika as lead in Salaam India on DD Kisan",           caption: "Lead Role · Salaam India",        channel: "DD Kisan" },
  { src: "/tv-zeeholi.png",       alt: "Geetika in Woh Apna Sa on Zee TV",                      caption: "Woh Apna Sa · Episode 38",        channel: "Zee TV" },
  { src: "/tv-barun.png",         alt: "Geetika with Barun Sobti on set",                       caption: "With Barun Sobti",                channel: "Star Parivaar" },
  { src: "/tv-dalljiet.png",      alt: "Geetika with Dalljiet Kaur",                            caption: "With Dalljiet Kaur",              channel: "Iss Pyar Ko Kya Naam Doon" },
  { src: "/tv-jayshree.png",      alt: "Geetika with Jayshree T. and Utkarsha Naik",            caption: "With Jayshree T. & Utkarsha Naik",channel: "Star Parivaar" },
  { src: "/tv-holi.png",          alt: "Geetika with Amit Behl and Priyanka Sharma at Holi",   caption: "With Amit Behl & Priyanka Sharma", channel: "Zee TV, Holi Special" },
  { src: "/tv-sudeep.png",        alt: "Geetika with Sudeep Sahir",                             caption: "With Sudeep Sahir",               channel: "Zee TV" },
  { src: "/tv-ridhi.png",         alt: "Geetika with Ridhi Dogra",                              caption: "With Ridhi Dogra",                channel: "On Set" },
  { src: "/tv-onset.png",         alt: "Geetika with Shalini Arora and Buneet Kapoor",          caption: "With Shalini Arora & Buneet Kapoor", channel: "On Set" },
  { src: "/tv-altbalaji.png",     alt: "Geetika in Alt Balaji Rhymes Series",                   caption: "Lead · 5 Rhymes Series",          channel: "Alt Balaji" },
  { src: "/tv-dubbing.png",       alt: "Geetika in dubbing studio recording Veere Di Wedding",  caption: "Dubbing Session",                 channel: "Veere Di Wedding · Hindi Medium" },
  { src: "/tv-asianpaints.png",   alt: "Geetika in Asian Paints Eco Xpress advertisement",      caption: "Asian Paints Eco Xpress",         channel: "Advertisement" },
  { src: "/tv-9xm.png",           alt: "Geetika in 9XM 70th Independence Day promo",            caption: "70th Independence Day Promo",     channel: "9XM Salaam" },
  { src: "/tv-bandit.png",        alt: "Geetika performing at Band-it Festival 2019",           caption: "Band-it Festival 2019 · Level 2", channel: "Furtado's School of Music" },
  { src: "/tv-sareesuk.png",      alt: "Geetika modelling for Sarees Bazaar UK",                caption: "Sarees Bazaar UK",                channel: "International Modelling" },
  { src: "/tv-gladrags-group.png",alt: "Gladrags Little Miss India Top 10 finalists",           caption: "Top 10 Finalist",                 channel: "Gladrags Little Miss India" },
];

const Works = () => {
  useReveal();
  const cluster = findCluster("works")!;

  return (
    <PageShell>
      <section className="container pt-16 md:pt-24 pb-12">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 03</span>
          <span className="eyebrow">Works</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <div className="flex items-start gap-5 mb-6 animate-fade-in">
          <Wand2 className="w-6 h-6 text-gold shrink-0 mt-2" />
          <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
            Every craft under one roof.
          </h1>
        </div>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Robotics, writing, music, screen, design, art, leadership, sport, FL Studio, DaVinci Resolve, event hosting, freelance,
          click any box to see the receipts, build logs, and performance reels.
        </p>
        <div className="rule-gold mt-10" />
      </section>

      <ArchiveMosaic topics={cluster.topics} />

      <section className="relative py-14 md:py-20 overflow-hidden" data-reveal>
        <div className="container">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap" data-reveal>
            <div>
              <p className="label-gold mb-3">§ 03 · Film & Television</p>
              <h2 className="display-xl text-2xl md:text-3xl lg:text-4xl">
                On screen.
              </h2>
            </div>
            <p className="max-w-md text-ink-soft text-sm leading-relaxed font-accent italic">
              Zee TV · Star Parivaar · DD Kisan · Alt Balaji · 9XM · Asian Paints · Gladrags · Dubbing for Veere Di Wedding & Hindi Medium.
            </p>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3" data-reveal>
            {ON_SCREEN_CREDITS.map(({ src, alt, caption, channel }, idx) => (
              <figure
                key={caption}
                data-reveal
                data-reveal-delay={String((idx % 4) * 80)}
                className="relative overflow-hidden group break-inside-avoid mb-3 crumpled-paper film-grain"
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-display text-[0.75rem] font-medium text-paper leading-tight">{caption}</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-gold/80 mt-0.5">{channel}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Works;
