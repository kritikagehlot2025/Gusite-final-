import { PageShell } from "@/components/SiteChrome";
import { findCluster } from "@/data/clusters";
import { useReveal } from "@/hooks/useReveal";
import { AboutCardStack } from "@/components/AboutCardStack";

const About = () => {
  useReveal();
  const cluster = findCluster("about")!;

  return (
    <PageShell>
      <section className="container pt-16 md:pt-20 pb-6">
        <div className="flex items-baseline gap-6 mb-5 animate-fade-in">
          <span className="font-mono text-xs tracking-[0.3em] text-gold">§ 01</span>
          <span className="eyebrow">About</span>
          <span className="flex-1 h-px bg-border" />
        </div>
        <h1 className="display-xl text-xl md:text-2xl lg:text-3xl text-balance max-w-5xl animate-fade-up">
          Who I am, where I come from, and where I am headed.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft leading-relaxed font-accent italic animate-fade-up">
          Scroll through the profile, the essay reads itself, then the facets stack on top.
        </p>
      </section>

      <AboutCardStack topics={cluster.topics} />
    </PageShell>
  );
};

export default About;
