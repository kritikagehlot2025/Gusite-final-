import type { LucideIcon } from "lucide-react";
import { User, GraduationCap, Wand as Wand2, FileText, Mail, Sparkles } from "lucide-react";

/* ── New data model ── */

export type TopicData = {
  slug: string;
  label: string;
  blurb: string;
  detail: string;
  embed?: {
    type: "youtube" | "image";
    src: string;
    caption?: string;
  };
};

export type Cluster = {
  num: string;
  slug: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  topics: TopicData[];
};

const topic = (label: string, blurb: string, detail: string, embed?: TopicData["embed"]): TopicData => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  blurb,
  detail,
  embed,
});

export const CLUSTERS: Cluster[] = [
  {
    num: "01", slug: "about", label: "About", icon: User,
    tagline: "Who I am, where I come from, and where I am headed.",
    topics: [
      topic("Personal Profile", "Born in India. Based in Montréal. Seventeen.",
        "Born in India and raised across two continents, currently based in Montréal. Seventeen years old. Work spans physics, mathematics, robotics, writing, music, visual art, and media production. Early interest in scientific reasoning developed into sustained self-study in physics and mathematics alongside structured school coursework and competition preparation. Creative work developed in parallel through writing, performance, and visual arts, with ongoing output in each area.",
        { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India" }),
      topic("Identity Timeline", "Rajasthan to Montréal — the route.",
        "Early education in India followed by relocation to Canada in 2024. Transition involved adaptation to new academic systems, languages, and cultural environments. Continued development across STEM subjects and creative disciplines during this period, with increasing participation in competitions, school programs, and independent projects.",
        { type: "image", src: "/photo-rajasthani.jpg", caption: "Rajasthan — Early Childhood" }),
      topic("Languages & Culture", "English, French, Hindi, Marwari.",
        "Multilingual development across Indian and Canadian environments, with functional use across academic, social, and creative contexts. Exposure to multiple cultural systems has shaped communication style and academic orientation."),
      topic("Education Goals", "Advanced coursework. Competitive preparation.",
        "Current academic path includes advanced coursework in mathematics and sciences alongside preparation for competitive examinations and enrichment programs. Long-term academic direction is oriented toward physics, engineering, and interdisciplinary study combining technical and creative domains."),
      topic("Career Vision", "No single focus. Many directions.",
        "No single career focus. Academic and creative interests span scientific research, engineering, computational work, writing, performance, and design. Long-term direction involves combining these areas through projects that require cross-disciplinary problem solving."),
      topic("What I Am Building", "This site. The full record.",
        "This site contains records of academic work, creative output, competition participation, and independent projects. Entries are organized across writing, robotics, music, research, visual art, and leadership activities, with supporting materials where available."),
    ],
  },
  {
    num: "02", slug: "academics", label: "Academics", icon: GraduationCap,
    tagline: "Education timeline, exams, awards, physics, and research interests.",
    topics: [
      topic("Education Timeline", "India to Québec secondary system.",
        "Schooling began in India and continued in Canada after relocation in 2024. Current studies are based in Montréal within the Quebec secondary system, completing Secondary IV. Academic focus includes mathematics, physics, chemistry, biology, computer science, languages, and humanities, alongside participation in advanced preparation programs."),
      topic("Subject Strengths", "Mathematics, physics, computer science.",
        "Primary focus areas are mathematics, physics, and computer science. Additional competence in languages, writing, and humanities subjects. Academic performance includes strong results in standardized evaluations and school examinations."),
      topic("Awards Vault", "Every ribbon, every certificate.",
        "Academic and extracurricular awards across mathematics, science, and competitions. Includes olympiad participation, school honours, and recognition in structured academic programs. SOF Science Olympiad, TCS IntelliGem Finalist, Gladrags Little Miss India Top 10, Whizz Kidzs Abacus National Award, and more.",
        { type: "image", src: "/photo-sof.jpg", caption: "SOF Science Olympiad — Certificate & Medal" }),
      topic("Growth Notes", "Progress tracked honestly.",
        "Records of academic development over time, including areas of difficulty, improvement cycles, and performance changes across subjects. Focus is on tracking progression rather than final outcomes."),
      topic("Physics Journey", "From curiosity to self-directed study.",
        "Independent study in physics began during early schooling years, initially driven by curiosity in space and fundamental forces. Continued development includes mechanics, electromagnetism, quantum concepts, and introductory university-level material, alongside structured school physics."),
      topic("Research Interests", "Quantum, particle, astrophysics.",
        "Current interests include quantum mechanics, particle physics, relativity, astrophysics, and complex systems. Additional interest in computational modeling and mathematical structures underlying physical systems."),
      topic("Independent Archive", "Self-directed projects and explorations.",
        "Self-directed projects outside formal coursework, including experiments, reading-based study, problem solving, and exploratory work in physics, mathematics, and computational topics."),
      topic("Mentorship", "Guided by teachers, coaches, and researchers.",
        "Academic guidance received through teachers, competition coaches, and external mentors in science and mathematics. Includes structured feedback on problem solving and research direction."),
      topic("Future STEM Goals", "University physics. Research. Applied work.",
        "Long-term academic trajectory includes university-level study in physics, engineering, or related interdisciplinary fields, with continued involvement in research and applied problem solving."),
      topic("Math Competitions", "Olympiad prep, TCS IntelliGem Finalist.",
        "Contest mathematics, olympiad preparation, and the grind behind fast, accurate reasoning. TCS IntelliGem Finalist. Every result here is the product of repetition, pattern recognition, and performance under pressure.",
        { type: "image", src: "/photo-intelligem-podium.jpg", caption: "TCS IntelliGem — Finalist Presentation" }),
      topic("Science Fair Log", "Experiments with receipts.",
        "Project boards, hypothesis tests, iterations, and presentation days. The science fair log captures the full cycle from idea to evidence, including the failures that shaped the final result."),
      topic("AP Prep", "Coursework, review, and exam strategy.",
        "AP study plans, review notes, and the strategy behind balancing depth with volume. This is where academic stamina gets documented and the gap between understanding and performance gets closed."),
    ],
  },
  {
    num: "03", slug: "works", label: "Works", icon: Wand2,
    tagline: "Every craft under one roof — robotics, writing, music, screen, design, art, leadership, sport.",
    topics: [
      topic("FRC Team 7700", "Build seasons and competition robotics.",
        "Participation in FIRST Robotics Competition Team 7700. Work includes mechanical design, prototyping, systems integration, and competition participation during build seasons. Experience includes iterative design cycles and collaborative engineering under strict timelines.",
        { type: "youtube", src: "https://www.youtube.com/embed/videoseries?list=PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", caption: "FRC Team 7700 — Competition Highlights" }),
      topic("Engineering Skills", "CAD, fabrication, systems thinking.",
        "Experience with CAD tools including Onshape and SolidWorks, fabrication methods, wiring systems, and mechanical assembly. Skills developed through robotics work and independent technical projects."),
      topic("Robotics Build Log", "Season-by-season documentation.",
        "Season-based documentation of robotics development, including design iterations, testing outcomes, mechanical failures, and redesign processes. The log is the proof that the process was real."),
      topic("Novel Series Archive", "A multi-book story world.",
        "Long-form fictional writing project consisting of multiple interconnected narratives. Includes structured worldbuilding, character development, and sustained multi-year writing output."),
      topic("Writing Samples", "Excerpts, essays, and experiments.",
        "Selected creative and analytical writing pieces across fiction, nonfiction, and experimental formats. Each sample chosen to demonstrate range and consistency of output."),
      topic("Podcast", "Conversations and monologues.",
        "Audio content covering creative topics, academic interests, and structured discussions. Includes recorded episodes and production notes."),
      topic("Creative Method", "How the work happens.",
        "Workflow spanning ideation, drafting, revision, and completion across writing, music, and technical projects. Emphasis on iterative development and refinement."),
      topic("Vocal Performance", "Hindustani classical on stage.",
        "Training and performance in Hindustani classical music, including raga-based singing, rhythmic practice, and stage participation. Years of structured daily riyaaz under the guru-shishya tradition.",
        { type: "image", src: "/photo-singing.jpg", caption: "Stage Performance — Hindustani Classical Vocal" }),
      topic("Instrumental", "Keys, strings, and self-taught paths.",
        "Experience with keyboard and harmonium alongside informal exploration of additional instruments. Also plays electric guitar with developing technical proficiency in modern guitar techniques."),
      topic("Performance Portfolio", "Stage time, documented.",
        "Record of live performances including school events, recitals, competitions, and informal presentations. Selected in Level 2 of Band-it Festival 2019 — the largest inter-school music festival organized by Furtado's School of Music.",
        { type: "image", src: "/photo-bandit-stage.jpg", caption: "Band-it Festival 2019 — Level 2 · Furtado's School of Music" }),
      topic("Repertoire", "The catalog of what I perform.",
        "A living list of ragas, compositions, and pieces — primarily within the Hindustani classical tradition. Repertoire is the map of what the voice can do."),
      topic("Child Artist Archive", "Years on screen.",
        "Film and television work completed during childhood. Lead role in Salaam India (DD Kisan). Zee TV Woh Apna Sa — Holi special. Star Parivaar: Iss Pyar Ko Kya Naam Doon. Alt Balaji Rhymes Series — lead in 5 rhymes. Asian Paints advertisement. 70th Independence Day promo for 9XM.",
        { type: "youtube", src: "https://www.youtube.com/embed/videoseries?list=PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", caption: "Child Artist Reel — Zee TV · Star Parivaar · Alt Balaji · DD Kisan" }),
      topic("Acting Reel", "Selected scenes and performances.",
        "Selected recorded acting performances from film and television work. Dramatic and naturalistic roles across age ranges, production styles, and formats.",
        { type: "youtube", src: "https://www.youtube.com/embed/videoseries?list=PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", caption: "Acting Reel — Full Playlist" }),
      topic("Voice & Screen", "Voice acting and dubbing.",
        "Voice acting and dubbing work for media projects, including dubbing in Veere Di Wedding and Hindi Medium. The discipline of performing with voice only — distinct from on-camera work.",
        { type: "image", src: "/photo-dubbing-studio.jpg", caption: "Recording Studio — Dubbing Session" }),
      topic("Media Credits", "The full filmography.",
        "Full record of acting and voice-related credits across productions. Zee TV · Star Parivaar · DD Kisan · Alt Balaji · 9XM · Asian Paints · Gladrags Little Miss India Top 10. International modelling for Sarees Bazaar UK, US, NZ, Amazon, Alibaba, Indiamart.",
        { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India — Top 10" }),
      topic("Zionaxelle", "A multimedia universe, built from scratch.",
        "Multimedia project involving design, web presence, visual identity, content strategy, and production pipeline. Self-designed from the ground up as a coherent creative brand.",
        { type: "youtube", src: "https://www.youtube.com/embed/videoseries?list=PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f", caption: "Zionaxelle — Content & Performance Reel" }),
      topic("Multimedia Production", "Edit, shoot, score.",
        "Experience in video editing, audio production, graphic design, and content creation. The toolkit behind every piece of media shipped — from short-form to long-form."),
      topic("Tech Skills", "React, TypeScript, Python.",
        "Web development using React, TypeScript, and Python, alongside version control and standard development tools. Tech skills are the platform on which creative ideas get built."),
      topic("Tech Build Log", "Shipped projects and experiments.",
        "Record of software and digital projects including prototypes and deployed applications. Every app, site, and tool — from hackathon build to production."),
      topic("Canvas Art", "Paintings, drawings, visual experiments.",
        "Visual artwork including painting and drawing using multiple mediums — oil, acrylic, watercolor, and mixed media. Each piece documented with process context."),
      topic("Embroidery", "Thread as medium.",
        "Hand embroidery work with traditional and contemporary design approaches. A meditative practice that doubles as visual art."),
      topic("Mixed Media", "When one material isn't enough.",
        "Artworks combining multiple materials and formats. Mixed media work is where the different creative threads literally come together."),
      topic("YMCA Youth Co-op", "Leadership by example.",
        "Vice President of a youth cooperative in Montréal. Responsibilities include organizing activities, coordinating members, and supporting program operations for a student team.",
        ),
      topic("Mentoring", "Passing it forward.",
        "Peer support in academic subjects, robotics, and music. Teaching is the fastest way to learn — and the most honest way to prove understanding."),
      topic("Community & Family", "Roots and responsibilities.",
        "Family background and community involvement within cultural and educational contexts. The context that makes everything else make sense."),
      topic("Cultural Integration", "Two continents, one mind.",
        "Experience navigating Indian and Canadian cultural environments across language, education, and social systems.",
        { type: "image", src: "/photo-rajasthani.jpg", caption: "Rajasthani Classical Dress — Cultural Roots" }),
      topic("Badminton", "Court sport, court discipline.",
        "Participation in badminton through training and competitive play. The court teaches timing, anticipation, and recovery under pressure."),
      topic("Table Tennis", "Reflex over reach.",
        "Experience in table tennis with emphasis on speed and reaction-based gameplay. The fastest racket sport and a masterclass in processing under pressure."),
      topic("Chess", "Pattern obsession on the board.",
        "Competitive and training experience in chess focused on pattern recognition and strategy. Every move is a hypothesis; every game is an experiment."),
      topic("Strategic Thinking", "The thread between games and life.",
        "Application of structured decision-making across academic, technical, and game-based contexts. Pattern recognition, risk assessment, and the discipline of thinking several moves ahead."),
      topic("Karate", "Years on the mat.",
        "Martial arts training including discipline, forms, and the philosophy of controlled power. Structured physical training that complements intellectual work.",
        { type: "image", src: "/photo-karate.jpg", caption: "Karate — Sports Authority of India Award" }),
      topic("Abacus", "Lightning arithmetic.",
        "Mental math training from the elementary years — abacus competitions, speed calculations, and the numerical intuition that still shapes mathematical reasoning. Whizz Kidzs Abacus National Award.",
        { type: "image", src: "/photo-abacus.jpg", caption: "Whizz Kidzs — Abacus National Award" }),
      topic("Side Quests", "Things that don't fit a category.",
        "Random projects, one-off experiments, and curiosities that didn't become obsessions but absolutely shaped the way I think. Side quests are the spice."),
      topic("Random Wins", "Unexpected victories.",
        "Competitions, certificates, and achievements that came from left field. Not every win is planned — some come from showing up and being ready."),
      topic("Childhood Trophies", "The early evidence.",
        "From spelling bees to art contests — the trophies and certificates from the early years. Ryan Princess Competition, Gladrags Little Miss India, and more. They're small, but they're the first receipts.",
        { type: "image", src: "/photo-crown.jpg", caption: "Ryan Princess Competition — Crowned" }),
    ],
  },
  {
    num: "04", slug: "vault", label: "CV & Resume", icon: FileText,
    tagline: "CV, certificates, transcripts, recognition — every receipt, open for inspection.",
    topics: [
      topic("Certificates", "Every certificate, catalogued.",
        "Academic certificates, competition awards, extracurricular recognitions — each one scanned, dated, and contextualized. The vault is the paper trail."),
      topic("Transcripts", "The academic record.",
        "Official transcripts, grade reports, and standardized test scores. Not just the highlights — the full record, including the semesters that taught the most."),
      topic("Recognition", "Honours, nominations, acknowledgments.",
        "Beyond certificates — community recognition, nominations, and acknowledgments that don't fit a frame but matter. Letters, mentions, and the informal receipts."),
    ],
  },
  {
    num: "05", slug: "contact", label: "Contact", icon: Mail,
    tagline: "Open correspondence and links to everywhere else.",
    topics: [
      topic("Channels", "Where to find me.",
        "Email, LinkedIn, GitHub, and other platforms — the official channels for professional and creative correspondence."),
      topic("Links", "The wider web.",
        "External projects, collaborations, publications, and platforms where the work lives beyond this site."),
    ],
  },
];

export const findCluster = (slug: string) => CLUSTERS.find((c) => c.slug === slug);

/* ── Backward-compatible types for FractalPage / ClusterShell ── */

export type Subpage = {
  slug: string;
  label: string;
  kind?: "overview" | "highlights" | "evidence" | "media" | "reflection" | "related" | "topic";
};

export const findSubpage = (cluster: Cluster, slug: string) =>
  cluster.topics.find((t) => t.slug === slug);

/* Derive subpages from topics for backward compat */
export function getSubpages(cluster: Cluster): Subpage[] {
  return [
    { slug: "overview", label: "Overview", kind: "overview" },
    { slug: "highlights", label: "Highlights", kind: "highlights" },
    { slug: "media", label: "Media", kind: "media" },
    ...cluster.topics.map((t) => ({ slug: t.slug, label: t.label, kind: "topic" as const })),
    { slug: "evidence", label: "Evidence", kind: "evidence" },
    { slug: "reflection", label: "Reflection", kind: "reflection" },
    { slug: "related", label: "Related", kind: "related" },
  ];
}

/* PROOF_CLUSTER stub — no longer a real page, kept for import compat */
export const PROOF_CLUSTER: Cluster = {
  num: "06", slug: "proof", label: "Proof of Curiosity", icon: Sparkles,
  tagline: "Notebook scans, sketches, half-formed ideas.",
  topics: [],
};

export const LEGACY_REDIRECTS: Record<string, string> = {
  "/academic": "/academics",
  "/research": "/academics",
  "/film": "/works",
  "/technology": "/works",
  "/cv": "/vault",
  "/future": "/about",
  "/stem": "/academics",
  "/robotics": "/works",
  "/writing": "/works",
  "/music": "/works",
  "/acting": "/works",
  "/tech": "/works",
  "/art": "/works",
  "/leadership": "/works",
  "/athletics": "/works",
  "/curiosities": "/works",
  "/vision": "/about",
  "/proof": "/works",
};
