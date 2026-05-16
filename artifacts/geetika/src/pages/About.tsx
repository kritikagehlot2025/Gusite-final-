import { PageShell } from "@/components/SiteChrome";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import { ScrollExpandProfile } from "@/components/ScrollExpandProfile";
import { StackingTopicCards } from "@/components/StackingTopicCards";

const About = () => {
  useReveal();
  const cluster = findCluster("about")!;

  return (
    <PageShell>
      {/* Page header */}
      <section className="container pt-16 md:pt-20 pb-8">
        <div className="flex items-baseline gap-6 mb-6 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 01</span>
          <span className="eyebrow">About</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          Who I am, where I come from, and where I am headed.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Born in India, raised between continents, now building from Montréal.
          Scroll into the profile below to read the full story.
        </p>
      </section>

      {/* Scroll-driven expanding profile essay */}
      <ScrollExpandProfile />

      {/* Stacking topic cards */}
      <StackingTopicCards topics={cluster.topics} />
    </PageShell>
  );
};

export default About;
