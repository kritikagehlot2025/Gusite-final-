import { useEffect, useRef, useState, useCallback } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import atmosNotebook from "@/assets/atmos-notebook.jpg";
import atmosTelescope from "@/assets/atmos-telescope.jpg";
import atmosMusic from "@/assets/atmos-music.jpg";
import textureComos from "@/assets/texture-cosmos.jpg";

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}

export function ScrollExpandProfile() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = fully collapsed, 1 = fully expanded

  const handleScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const wh = window.innerHeight;
    const totalTravel = rect.height - wh;
    if (totalTravel <= 0) {
      setProgress(0);
      return;
    }
    // How far through the sticky zone are we? 0 = top sentinel at top, 1 = bottom sentinel at bottom
    const scrolled = -rect.top;
    const raw = scrolled / totalTravel;
    setProgress(clamp(raw, 0, 1));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Expansion gates: expand in the middle 60% of the scroll zone
  const expandStart = 0.08;
  const expandEnd = 0.3;
  const collapseStart = 0.7;
  const collapseEnd = 0.92;

  let expandProgress: number;
  if (progress < expandStart) {
    expandProgress = 0;
  } else if (progress < expandEnd) {
    expandProgress = (progress - expandStart) / (expandEnd - expandStart);
  } else if (progress < collapseStart) {
    expandProgress = 1;
  } else if (progress < collapseEnd) {
    expandProgress = 1 - (progress - collapseStart) / (collapseEnd - collapseStart);
  } else {
    expandProgress = 0;
  }

  // ease the progress
  const ep = expandProgress < 0.5
    ? 2 * expandProgress * expandProgress
    : 1 - Math.pow(-2 * expandProgress + 2, 2) / 2;

  const isExpanded = ep > 0.01;
  const fullyExpanded = ep > 0.85;

  // Dynamic values derived from ep
  const cardPaddingY = lerp(24, 56, ep);
  const cardPaddingX = lerp(28, 64, ep);
  const borderOpacity = lerp(0.2, 0.7, ep);
  const shadowSpread = lerp(0, 120, ep);
  const glowOpacity = lerp(0, 0.18, ep);

  return (
    /* Tall scroll container — gives the sticky card room to "play" */
    <div ref={wrapperRef} className="relative" style={{ height: "350vh" }}>
      <div
        className="sticky top-0 flex items-start justify-center w-full overflow-hidden"
        style={{ height: "100vh", paddingTop: "48px", paddingBottom: "48px" }}
      >
        {/* Ambient backdrop glow that intensifies on expand */}
        <div
          className="pointer-events-none fixed inset-0 transition-opacity"
          style={{
            opacity: ep,
            background: `radial-gradient(60% 50% at 50% 40%, hsl(41 80% 55% / 0.07), transparent 70%)`,
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 0,
          }}
        />

        {/* The card itself */}
        <div
          className="relative overflow-hidden border bg-[hsl(220_25%_8%)] flex flex-col"
          style={{
            borderColor: `hsl(41 80% 60% / ${borderOpacity})`,
            borderWidth: "1px",
            borderRadius: lerp(6, 4, ep) + "px",
            width: `${lerp(55, 92, ep)}%`,
            maxWidth: "1200px",
            maxHeight: "calc(100vh - 96px)",
            boxShadow: `
              0 0 0 1px hsl(41 80% 55% / ${glowOpacity}),
              0 ${Math.round(shadowSpread * 0.25)}px ${shadowSpread}px -16px hsl(220 80% 4% / 0.95),
              0 0 ${Math.round(shadowSpread * 0.6)}px -20px hsl(41 80% 55% / ${glowOpacity * 2})
            `,
            padding: `${cardPaddingY}px ${cardPaddingX}px`,
            transition: "all 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 10,
          }}
        >
          {/* Gold corner accents */}
          <GoldCorners opacity={ep} />

          {/* Compact header — always visible */}
          <header
            className="flex items-start gap-6 shrink-0"
            style={{ marginBottom: isExpanded ? `${lerp(0, 36, ep)}px` : "0" }}
          >
            <figure
              className="relative overflow-hidden shrink-0 border border-border bg-paper-deep"
              style={{
                width: `${lerp(56, 100, ep)}px`,
                aspectRatio: "3/4",
                transition: "all 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                borderColor: `hsl(41 80% 60% / ${lerp(0.15, 0.45, ep)})`,
              }}
            >
              <img
                src={heroPortrait}
                alt="Geetika Gehlot"
                className="absolute inset-0 w-full h-full object-cover object-[60%_25%]"
              />
              <span className="absolute inset-1.5 border border-paper/10 pointer-events-none" />
            </figure>

            <div className="flex flex-col gap-2 pt-1">
              <span
                className="font-mono tracking-[0.3em] text-gold"
                style={{
                  fontSize: lerp(9, 11, ep) + "px",
                  opacity: 0.7,
                }}
              >
                § 01 — Personal Profile
              </span>
              <h2
                className="font-serif leading-tight text-ink"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: lerp(18, 30, ep) + "px",
                  fontWeight: 600,
                  transition: "font-size 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                  color: `hsl(38 40% ${lerp(82, 96, ep)}%)`,
                }}
              >
                Geetika Gehlot
              </h2>
              <p
                className="font-mono text-ink-soft"
                style={{
                  fontSize: lerp(10, 13, ep) + "px",
                  opacity: lerp(0.5, 0.75, ep),
                  letterSpacing: "0.08em",
                  transition: "font-size 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                Montréal · India-born · Multidisciplinary
              </p>

              {/* Collapsed preview hint */}
              {!isExpanded && (
                <p
                  className="text-ink-soft font-accent italic mt-1"
                  style={{
                    fontSize: "13px",
                    opacity: clamp(1 - ep * 4, 0, 1),
                    transition: "opacity 0.4s ease",
                  }}
                >
                  Scroll to read the full story ↓
                </p>
              )}
            </div>

            {/* Scroll indicator bar */}
            <div
              className="ml-auto shrink-0 flex flex-col items-center gap-1"
              style={{ opacity: lerp(0.4, 0.18, ep) }}
            >
              <span className="font-mono text-gold" style={{ fontSize: "8px", letterSpacing: "0.2em" }}>
                SCROLL
              </span>
              <div className="w-px bg-border" style={{ height: "40px" }}>
                <div
                  className="w-px bg-gold origin-top"
                  style={{
                    height: "100%",
                    transform: `scaleY(${clamp(progress / expandStart, 0, 1)})`,
                    transition: "transform 0.1s linear",
                  }}
                />
              </div>
            </div>
          </header>

          {/* Rule line */}
          <div
            className="shrink-0"
            style={{
              height: "1px",
              background: `linear-gradient(to right, hsl(41 80% 55% / ${lerp(0, 0.45, ep)}), transparent)`,
              marginBottom: `${lerp(0, 28, ep)}px`,
              opacity: ep,
              transition: "all 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Essay body — fades in as card expands */}
          <div
            className="overflow-y-auto flex-1 min-h-0 essay-scroll"
            style={{
              opacity: clamp((ep - 0.3) / 0.5, 0, 1),
              transition: "opacity 0.5s ease",
              pointerEvents: fullyExpanded ? "auto" : "none",
            }}
          >
            <Essay />
          </div>

          {/* Bottom fade */}
          {isExpanded && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0"
              style={{
                height: "80px",
                background: "linear-gradient(to top, hsl(220 25% 8% / 0.95), transparent)",
                opacity: ep,
                transition: "opacity 0.6s ease",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Gold corner brackets ───────────────────────────────────────── */
function GoldCorners({ opacity }: { opacity: number }) {
  const style = (corner: string): React.CSSProperties => {
    const isRight = corner.includes("right");
    const isBottom = corner.includes("bottom");
    return {
      position: "absolute",
      [isBottom ? "bottom" : "top"]: "16px",
      [isRight ? "right" : "left"]: "16px",
      width: "20px",
      height: "20px",
      opacity: opacity * 0.7,
      transition: "opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
      borderTop: isBottom ? "none" : "1px solid hsl(41 80% 60%)",
      borderBottom: isBottom ? "1px solid hsl(41 80% 60%)" : "none",
      borderLeft: isRight ? "none" : "1px solid hsl(41 80% 60%)",
      borderRight: isRight ? "1px solid hsl(41 80% 60%)" : "none",
    };
  };
  return (
    <>
      <span style={style("top-left")} />
      <span style={style("top-right")} />
      <span style={style("bottom-left")} />
      <span style={style("bottom-right")} />
    </>
  );
}

/* ─── Essay ─────────────────────────────────────────────────────── */
function EssayPhoto({
  src,
  alt,
  caption,
  align = "right",
}: {
  src: string;
  alt: string;
  caption: string;
  align?: "left" | "right" | "full";
}) {
  if (align === "full") {
    return (
      <figure className="my-10 w-full">
        <div className="relative w-full aspect-[21/9] overflow-hidden border border-border/40">
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <figcaption className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-ink-soft/60 uppercase">
          {caption}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure
      className={`my-2 mb-6 ${align === "right" ? "float-right ml-8" : "float-left mr-8"} w-48 md:w-64`}
      style={{ shapeOutside: "border-box" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden border border-border/40 bg-paper-deep">
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute inset-1.5 border border-paper/10 pointer-events-none" />
      </div>
      <figcaption className="mt-2 font-mono text-[9px] tracking-[0.2em] text-ink-soft/50 uppercase">
        {caption}
      </figcaption>
    </figure>
  );
}

function Essay() {
  return (
    <article className="essay-body pr-4 pb-16" style={{ maxWidth: "780px", margin: "0 auto" }}>

      {/* § I */}
      <section className="essay-section mb-10">
        <h3 className="essay-heading">I. Origin</h3>

        <EssayPhoto
          src={heroPortrait}
          alt="Geetika Gehlot portrait"
          caption="Montréal, 2024"
          align="right"
        />

        <p className="drop-cap">
          I was born in a city that does not sleep lightly. Rajasthan, India — sandstone
          and spice and a sky so wide it made ambition feel obligatory. My earliest memories
          are not of a classroom but of the space between things: between words in a
          conversation I was too young to join, between the notes of a raag my grandmother
          hummed while she cooked, between the lines of a physics problem my father was
          trying to explain to someone else and I was absorbing from across the room.
        </p>
        <p>
          That space between things is where I have always lived. Not quite inside any
          single discipline, any single culture, any single language. The gap, it turns
          out, is not emptiness. It is where everything interesting happens.
        </p>
        <p>
          My family moved when I was young — first within India, then out of it entirely,
          to Canada, to Montréal, a city whose own identity is built on the productive
          tension between languages and traditions. I did not know it then, but I was
          training for that city my whole life.
        </p>
      </section>

      {/* § II */}
      <section className="essay-section mb-10">
        <h3 className="essay-heading">II. Between Worlds</h3>

        <EssayPhoto
          src={atmosNotebook}
          alt="Notebook and handwritten notes"
          caption="Notes, drafts, and half-formed questions"
          align="left"
        />

        <p>
          Moving between countries at a formative age is not a neutral event. It rewires
          something. You stop assuming that the way things are done where you grew up is the
          only way — or even the best way. You develop a kind of permeability to context,
          an ability to read rooms that are not yours and find your footing faster than you
          should.
        </p>
        <p>
          I speak four languages: English, French, Hindi, and Marwari. Each one carries a
          different register of myself. English is where I think most precisely, where I
          build arguments and debug code. French is where I navigate Montréal — the
          bureaucracy of it, the culture of it, the daily choreography of a bilingual city.
          Hindi is where I feel, where old memories arrive in intact sentences. Marwari is
          where I belong without explanation, the language of family dinners and festivals
          and stories that predate every version of me I have so far been.
        </p>
        <p>
          What does it mean to be fluent in a culture? I have been thinking about this
          for years. It is not just the language. It is the assumptions embedded in the
          grammar, the things people do not say because they do not have to, the shared
          references that make communication efficient. I grew up learning to find those
          load-bearing silences in more than one culture, more than one linguistic family.
          It made me a better thinker, a better writer, and, I believe, a better scientist.
          The best researchers I have encountered are all translators of a kind — moving
          fluently between levels of abstraction, between formalism and intuition, between
          their discipline's vocabulary and the common tongue.
        </p>
        <p>
          I am still becoming fluent in all the cultures I move through. I do not think
          that process ever finishes. But it has given me a tolerance for ambiguity that
          I now recognise as one of the most practically useful things I own.
        </p>
      </section>

      {/* § III */}
      <section className="essay-section mb-10">
        <h3 className="essay-heading">III. The Mind and Its Obsessions</h3>

        <EssayPhoto
          src={atmosTelescope}
          alt="Telescope and night sky observation"
          caption="Observing — always observing"
          align="right"
        />

        <p>
          If you asked me to identify the central obsession of my intellectual life, I
          would not give you a subject. I would give you a posture. I am obsessed with
          the moment when something that appeared complicated becomes, in the right frame,
          simple. The moment when a pattern reveals itself under enough scrutiny. The
          moment when the equation you have been staring at for an hour suddenly speaks.
        </p>
        <p>
          Physics found me through my father, who treated it not as a subject but as a
          lens. Before I had a name for it, I was learning to see forces as conversations,
          energy as currency, time as a dimension rather than a river. The formal study
          came later, and it came hard — I will not pretend otherwise. The mathematical
          machinery of physics is not gentle. But I kept returning to it because of what
          it promised: a language precise enough to describe the universe without losing
          its strangeness.
        </p>
        <p>
          Mathematics followed closely. I competed in math olympiads not because I was
          the fastest calculator in the room but because I loved the architecture of proofs
          — the way you could build an airtight argument from almost nothing, the way a
          well-chosen lemma could open a problem that had seemed sealed. Chess gave me
          something similar: the pleasure of thinking several moves ahead, of holding a
          branching tree of possibilities in memory and choosing the path with the best
          expected value. The disciplines are different in almost every surface feature.
          The underlying skill is the same.
        </p>
        <p>
          Computer science arrived as a natural extension. I came to programming not from
          wanting to build apps but from wanting to build things that think, or at least
          simulate thinking closely enough to be useful. I taught myself React and
          TypeScript. I learned Python. I built this site. Not because I want to be a
          software engineer — though I might become one as a means to an end — but because
          I want to be someone who can build whatever needs to be built, in whatever medium
          is required, with whatever tools exist at the time.
        </p>
        <p>
          Current interests: quantum information, complex systems, the mathematics of
          emergence, and the uncomfortable zone where computation meets cognition. I do
          not know exactly which of these threads will become the main strand of a research
          career. I know that I am following them with serious intention and keeping notes.
        </p>
      </section>

      {/* Full-width photo */}
      <EssayPhoto src={textureComos} alt="Cosmos texture" caption="The texture of deep time" align="full" />

      {/* § IV */}
      <section className="essay-section mb-10">
        <h3 className="essay-heading">IV. The Creative Life</h3>

        <EssayPhoto
          src={atmosMusic}
          alt="Music and instruments"
          caption="Riyaaz — daily practice in Hindustani vocal"
          align="left"
        />

        <p>
          The assumption that STEM and the arts are in competition is one I have never
          been able to take seriously, because it has never matched my experience. The
          creativity required to design an experiment and the creativity required to write
          a novel are not different in kind. They are different in material. Both demand
          the ability to hold a large, incompletely specified problem in mind, generate
          hypotheses, test them against reality or against an internal standard of
          coherence, and revise. Both require the tolerance of not knowing, for long
          stretches, whether you are on the right track.
        </p>
        <p>
          I have been training in Hindustani classical vocal for years. Riyaaz — daily
          practice — is non-negotiable. A raag is not a melody; it is a grammar. It
          specifies which notes are permitted, which are forbidden, which are emphasised,
          in which direction the phrases typically move, what emotional territory the raag
          inhabits. Within those constraints, improvisation is not just allowed but
          required. You must find something new to say inside a structure that has been
          explored for centuries. I find this an almost exact description of what good
          science asks of you as well.
        </p>
        <p>
          Writing is the other major strand. I am several volumes into a novel series —
          a world built over years, with its own internal history, its own geography, its
          own rules for how power and magic and knowledge are distributed. Worldbuilding
          at that scale is a systems design problem. You have to ensure internal
          consistency, manage the reader's information load, and make choices that have
          downstream consequences across thousands of pages. I take it seriously as craft
          and as practice. Every chapter I revise makes me a better thinker.
        </p>
        <p>
          I am also a child artist — film and television credits from early childhood that
          I have spent years contextualising, understanding what it means to have grown up
          performing, to have learned from a young age how to be in front of a camera, how
          to modulate a performance for a medium, how to take direction. What I took from
          that training is less about acting and more about attention: the discipline of
          noticing, in real time, what is happening in a scene.
        </p>
        <p>
          Badminton, chess, table tennis, karate, abacus competitions — each of these
          sounds like a hobby until you look closely at the underlying skill being built.
          In every case, it is the same skill: accurate perception under time pressure,
          decision-making with incomplete information, recovery from error without losing
          composure. These are the skills you need in a laboratory, on a stage, in a
          meeting where the stakes are real.
        </p>
      </section>

      {/* § V */}
      <section className="essay-section mb-10">
        <h3 className="essay-heading">V. What I Am Building</h3>
        <p>
          This site is an artifact. I built it from scratch — React, TypeScript, Vite,
          Tailwind — not because I needed a portfolio but because I needed a structure
          that could hold the full picture. Most portfolios are curated highlights. This
          is a dossier: every claim has evidence, every skill has a receipt, every
          curiosity has a paper trail.
        </p>
        <p>
          The FRC robotics team taught me what it means to build under pressure with a
          team that is counting on you. Build season is twelve weeks of design, iteration,
          fabrication, and testing, ending in competition. It is also twelve weeks of
          learning to communicate across roles — between the software team and the
          mechanical team, between the strategic vision and the engineering constraints.
          I learned more about project management in one build season than in any classroom.
        </p>
        <p>
          Zionaxelle is a multimedia brand I designed from nothing — visual identity,
          content strategy, web presence, production pipeline. It exists because I wanted
          to know whether I could build something coherent and ship it, not just design it
          in theory. I can. I did. The evidence is there.
        </p>
        <p>
          The YMCA Youth Co-op gave me a context for leadership that had nothing to do
          with being the smartest person in the room. As Vice President, the work was
          organisational: understanding what the group needed, translating that into
          programs, managing the gap between what was planned and what was possible,
          and doing it with enough care that people wanted to come back. I am still
          learning how to do this well.
        </p>
      </section>

      {/* § VI */}
      <section className="essay-section mb-4">
        <h3 className="essay-heading">VI. Where I Am Headed</h3>
        <p>
          I do not have a five-year plan in the conventional sense. I have a model of
          what I want my work to look like: rigorous, interdisciplinary, evidence-based,
          and built at the intersection of STEM and creative practice. The specific
          institution, the specific programme, the specific career title — these are
          variables I am optimising for, not fixed points I am navigating toward.
        </p>
        <p>
          What I know: I want to do research that matters. I want to make things that
          work. I want to keep training as a vocalist because the practice of it makes
          everything else better. I want to finish the novel. I want to keep building
          tools and systems that allow me to think more clearly, move faster, and share
          work more honestly.
        </p>
        <p>
          I am fifteen years old. I have been working on these things for most of my
          conscious life. I am going to keep working on them.
        </p>
        <p className="font-accent italic text-ink-soft mt-6 text-base border-l-2 border-gold/40 pl-5">
          The dossier is the argument. Everything else on this site is the evidence.
          Welcome to the paper trail.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <span className="flex-1 h-px bg-border/40" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-gold/50">END § 01</span>
          <span className="flex-1 h-px bg-border/40" />
        </div>
      </section>
    </article>
  );
}
