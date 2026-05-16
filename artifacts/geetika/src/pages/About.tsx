import { PageShell } from "@/components/SiteChrome";
import { MoodMosaic } from "@/components/MoodMosaic";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import { ScrollExpandProfile } from "@/components/ScrollExpandProfile";

const About = () => {
  useReveal();
  const cluster = findCluster("about")!;

  return (
    <PageShell>
      {/* Page header */}
      <section className="container pt-16 md:pt-24 pb-10">
        <div className="flex items-baseline gap-6 mb-8 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 01</span>
          <span className="eyebrow">About</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          Who I am, where I come from, and where I am headed.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Born in India, raised between continents, now building from Montréal.
          Scroll into the profile below to read the full story.
        </p>
        <div className="rule-gold mt-8" />
      </section>

      {/* Scroll-driven expanding profile essay */}
      <ScrollExpandProfile />

      {/* MoodMosaic below */}
      <section className="container pt-8 pb-6">
        <div className="flex items-baseline gap-6 mb-6">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 01.2</span>
          <span className="eyebrow">Facets</span>
          <span className="flex-1 h-px bg-border" />
        </div>
      </section>
      <div className="overflow-hidden">
        <MoodMosaic topics={cluster.topics} />
      </div>
    </PageShell>
  );
};

export default About;
