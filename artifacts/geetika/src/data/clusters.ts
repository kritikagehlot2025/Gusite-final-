import type { LucideIcon } from "lucide-react";
import { User, GraduationCap, Wand as Wand2, FileText, Mail, Sparkles } from "lucide-react";

/* ── Data model ── */

export type EmbedItem = {
  type: "youtube" | "image" | "link";
  src: string;
  caption?: string;
};

export type TopicData = {
  slug: string;
  label: string;
  blurb: string;
  detail: string;
  embed?: EmbedItem;
  gallery?: EmbedItem[];
};

export type Cluster = {
  num: string;
  slug: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
  topics: TopicData[];
};

const topic = (label: string, blurb: string, detail: string, embed?: EmbedItem, gallery?: EmbedItem[]): TopicData => ({
  slug: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  blurb,
  detail,
  ...(embed ? { embed } : {}),
  ...(gallery?.length ? { gallery } : {}),
});

const PLAYLIST = "https://www.youtube.com/embed/videoseries?list=PLa3Wj4jzB_6FG8GcJA41Lx2JGtABeQN5f";
const YT = (id: string) => `https://www.youtube.com/embed/${id}`;

export const CLUSTERS: Cluster[] = [
  /* ══════════════════════════════════════════════════════════
     01 · ABOUT , embeds first, then text-only
     ══════════════════════════════════════════════════════════ */
  {
    num: "01", slug: "about", label: "About", icon: User,
    tagline: "Who I am, where I come from, and where I am headed.",
    topics: [
      /*, with embeds, */
      topic("Personal Profile", "Born in India. Based in Montréal. Seventeen.",
        "Born in India and raised across two continents, currently based in Montréal. Seventeen years old. Work spans physics, mathematics, robotics, writing, music, visual art, and media production.",
        { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India" },
        [
          { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India" },
          { type: "youtube", src: YT("Gepai0H85ZA"), caption: "Self Introduction, Geetika Gehlot" },
        ]),
      topic("Born on Shivaratri", "A sacred night that became a birthday.",
        "Born on the night of Mahashivaratri, the great Hindu festival of Lord Shiva, one of the most spiritually significant nights in the Vedic calendar. The festival falls on the 14th night of the new moon during the lunar month of Phalguna. To be born on that night is considered deeply auspicious in Rajasthani and Hindu tradition. The Adiyogi, the first yogi, is worshipped on this day.",
        { type: "image", src: "/photo-shivaratri-adiyogi.jpg", caption: "Mahashivaratri, The Adiyogi, Festival Night" }),
      topic("Self-Taught Astronomer", "Every constellation. Every blank space. A year of shooting stars.",
        "At age 14–15, decided to study astronomy entirely independently, no class, no teacher, no curriculum. Mapped every constellation visible in the northern hemisphere, studied the blank spaces between them, learned star positions, declinations, and how the sky rotates through the year.\n\nTracked meteor showers in advance and stayed up through the night to observe them, the Eta Aquarids, the Perseids, and others. Also tracked Comet 12P/Pons-Brooks through the constellation Taurus in April 2024, one of the brightest periodic comets, visible to the naked eye.",
        { type: "image", src: "/photo-moon-stargazing.jpg", caption: "Night Sky, Rooftop Stargazing Session" },
        [
          { type: "image", src: "/photo-moon-stargazing.jpg", caption: "Night Sky, Rooftop Stargazing Session" },
          { type: "image", src: "/photo-comet-pons-brooks.jpg", caption: "Comet 12P/Pons-Brooks, Taurus, April 2024" },
          { type: "image", src: "/photo-meteor-eta-aquarii.jpg", caption: "Eta Aquarids Meteor Shower, Pre-Dawn Observation" },
        ]),
      topic("NASA, Name in Space", "Geetika Gehlot. Europa Clipper. Jupiter orbit, 2030.",
        "Name inscribed on NASA's Europa Clipper mission, launched in October 2024, bound for Jupiter's moon Europa, arriving in 2030. The mission will investigate whether Europa's subsurface ocean could support life. Over a million names were submitted and encoded onto a microchip aboard the spacecraft. Geetika Gehlot is aboard.",
        { type: "image", src: "/photo-nasa-europa-clipper.jpg", caption: "NASA Europa Clipper, Message in a Bottle, Geetika Gehlot" }),
      topic("Rangoli", "Geometry in powder. Made by hand.",
        "Rangoli made for festivals and celebrations, a traditional Indian art form of placing coloured powder in geometric patterns on the floor. This piece features a large mandala design with a lotus at the centre, concentric rings of violet and rose, and ornate border scrollwork. Entirely freehand. Done for a festival occasion.",
        { type: "image", src: "/photo-rangoli.jpg", caption: "Festival Rangoli, Freehand Mandala, India" }),
      topic("Identity Timeline", "Rajasthan to Montréal, the route.",
        "Early education in India followed by relocation to Canada in 2024. Transition involved adaptation to new academic systems, languages, and cultural environments. Continued development across STEM subjects and creative disciplines during this period.",
        { type: "image", src: "/photo-rajasthani.jpg", caption: "Rajasthan, Early Childhood" }),
      topic("Arrival in Montréal", "October 2024, landing in a new city.",
        "Arrived in Montréal in October 2024, beginning a new chapter after years in India. First views of the city from above on the approach into YUL, the St. Lawrence, the grid of neighbourhoods, the skyline. Then the first morning looking out over downtown from a high floor. Everything new, everything starting.",
        { type: "image", src: "/photo-flight-montreal.jpg", caption: "Approach into Montréal, October 2024" },
        [
          { type: "image", src: "/photo-flight-montreal.jpg", caption: "Approach into Montréal, October 2024" },
          { type: "image", src: "/photo-montreal-city.jpg", caption: "Montréal, First Views of the City" },
        ]),
      /*, text-only, sorted to end, */
      topic("Languages & Culture", "English, French, Hindi, Marwari.",
        "Multilingual development across Indian and Canadian environments, with functional use across academic, social, and creative contexts. Exposure to multiple cultural systems has shaped communication style and academic orientation."),
      topic("Education Goals", "Advanced coursework. Competitive preparation.",
        "Current academic path includes advanced coursework in mathematics and sciences alongside preparation for competitive examinations and enrichment programs."),
      topic("Career Vision", "No single focus. Many directions.",
        "No single career focus. Academic and creative interests span scientific research, engineering, computational work, writing, performance, and design."),
      topic("What I Am Building", "This site. The full record.",
        "This site contains records of academic work, creative output, competition participation, and independent projects. Entries are organized across writing, robotics, music, research, visual art, and leadership activities."),
    ],
  },

  /* ══════════════════════════════════════════════════════════
     02 · ACADEMICS , embeds first, then text-only
     (Removed: Growth Notes, Science Fair Log, no embed)
     ══════════════════════════════════════════════════════════ */
  {
    num: "02", slug: "academics", label: "Academics", icon: GraduationCap,
    tagline: "Education timeline, exams, awards, physics, and research interests.",
    topics: [
      /*, with embeds, */
      topic("Graduation 2026", "Sec 5, crossing the stage.",
        "Completing Sec 5 in Montréal in 2026. A milestone that marks the close of high school and the launch of the next chapter, university-level science and research. Four years condensed into one gown, one stage, and a lot of accumulated work.",
        { type: "image", src: "/photo-graduation.jpg", caption: "Graduation, Sec 5, Montréal 2026" }),
      topic("Narayana Co Kaveri School", "India's most rigorous secondary program. The highest batch.",
        "Enrolled in Narayana Co Kaveri, one of India's most prestigious and academically rigorous secondary school chains, known for producing top NEET and JEE performers. Placed in the highest academic batch, reserved for the strongest students in the cohort. The curriculum is well beyond standard secondary level, science and mathematics taught at a pace and depth that prepares students directly for national medical and engineering entrance exams.",
        { type: "image", src: "/photo-narayana-principal.jpg", caption: "Narayana Co Kaveri School, With Principal, Highest Batch" }),
      topic("Allen Institute, Elite Batch", "India's topmost coaching institute. The batch for the best.",
        "Enrolled in Allen Career Institute, India's premier competitive exam coaching institute, known nationally for producing NEET and JEE toppers. Placed in the topmost batch, reserved exclusively for the highest-scoring and most academically advanced students.\n\nThe Allen study material is the gold standard, no shortcuts, no simplified versions. Pre-Medical Physics on May 26, 2023: vectors, resolution, dot products, and force problems.",
        { type: "image", src: "/photo-allen-physics.jpg", caption: "Allen Pre-Medical Physics, May 26, 2023" }),
      topic("Advanced Biology at 14", "College-level biology. Self-annotated. Proof of serious study.",
        "In 2023, studying college-level advanced biology at an age when most students are still doing basic cellular structure. The Allen biology material goes deep, mucosal layers, Brunner's glands, Paneth cells, nerve plexuses, Peyer's patches. All annotated by hand.\n\nThe mitochondria notes (also May 26, 2023): Kolliker discovery, C. Benda naming, Oxysomes and ATP synthase particles, Endosymbiont Hypothesis tracing to Purple Sulphur Bacteria. All of it, at 14.",
        { type: "image", src: "/photo-allen-bio-notes.jpg", caption: "Allen Biology Notes, Advanced Level, May 2023" },
        [
          { type: "image", src: "/photo-allen-bio-notes.jpg", caption: "Allen Biology, Intestinal Anatomy Notes, May 2023" },
          { type: "image", src: "/photo-bio-notes-mitochondria.jpg", caption: "Allen Biology, Mitochondria & Endosymbiont Hypothesis, May 2023" },
        ]),
      topic("Jun Ye Seminar", "Youngest attendee at a Nobel-adjacent physics lecture.",
        "Attended a public lecture by Jun Ye, quantum physicist at JILA (Joint Institute for Laboratory Astrophysics), NIST Fellow, and University of Colorado Boulder professor. Jun Ye's work on optical lattice atomic clocks and ultracold molecules is among the most cited in modern precision physics. Was the youngest person in the room. Stayed after to speak with him and with McGill Physics Director Robert Guy.",
        { type: "image", src: "/photo-jun-ye-selfie.jpg", caption: "With Dr. Jun Ye (JILA/NIST), After Lecture, McGill 2025" },
        [
          { type: "image", src: "/photo-jun-ye-selfie.jpg", caption: "With Dr. Jun Ye (JILA/NIST), After Lecture, McGill 2025" },
          { type: "image", src: "/photo-jun-ye-lecture.jpg", caption: "Jun Ye Lecture, Precision Sensing for Fundamental Physics" },
        ]),
      topic("Cancer Cell Lab", "Pipettes, gel electrophoresis, and science.",
        "Hands-on session at a McGill-affiliated cancer research lab in March 2025. Work included gel electrophoresis setup, pipetting, and use of a Zeiss stereo microscope. Worked alongside graduate researchers, Hengameh, Darolan, Emily, and Caitlyn, in a real P5 lab environment. First experience with live bench science beyond school biology. The kind of day that confirms a direction.",
        { type: "image", src: "/photo-lab-microscope.jpg", caption: "Zeiss Microscope, Cancer Cell Lab, March 2025" },
        [
          { type: "image", src: "/photo-lab-microscope.jpg", caption: "Zeiss Stereo Microscope, Cancer Cell Lab, March 2025" },
          { type: "image", src: "/photo-lab-gel.jpg", caption: "Gel Electrophoresis, Loading & Running the Gel" },
          { type: "image", src: "/photo-lab-pipette.jpg", caption: "Pipetting, Sample Preparation" },
          { type: "image", src: "/photo-lab-pipette2.jpg", caption: "Pipetting Technique, P5 Lab Environment" },
          { type: "image", src: "/photo-lab-team.jpg", caption: "Lab Team, Hengameh, Darolan, Emily & Caitlyn, March 2025" },
        ]),
      topic("TCS ION IntelliGem, Won", "National moral values drawing competition. Won twice.",
        "Competed in TCS ION IntelliGem, a national competition organized by Tata Consultancy Services. Won in the drawing category for moral values. Winning entry: SDG 11, Sustainable Cities and Communities, rendered in a full illustrated scene with facts, statistics, characters, and a WOW callout, all hand-drawn and annotated.\n\nWon once in person, then won again in the online edition during the 2021 lockdown. Two wins, two different formats.",
        { type: "image", src: "/photo-tcs-intelligem-drawing.jpg", caption: "TCS ION IntelliGem, Winning Drawing, SDG Moral Values Category" },
        [
          { type: "image", src: "/photo-tcs-intelligem-drawing.jpg", caption: "Winning Drawing, SDG 11, Sustainable Cities & Communities" },
          { type: "image", src: "/photo-intelligem.jpg", caption: "TCS ION IntelliGem, Award Ceremony" },
          { type: "image", src: "/photo-intelligem-podium.jpg", caption: "TCS ION IntelliGem, On the Podium" },
          { type: "image", src: "/photo-intelligem-stage.jpg", caption: "TCS ION IntelliGem, On Stage" },
        ]),
      topic("CPR & First Aid", "Certified. Ready to act.",
        "Completed CPR and First Aid certification through school. Training included chest compressions, rescue breathing, bandaging techniques, and emergency response protocols. The class involved hands-on practice, wrapping, splinting, and working through simulated scenarios.",
        { type: "image", src: "/photo-cpr-class.jpg", caption: "First Aid Bandaging Practice, School Certification Session" },
        [
          { type: "image", src: "/photo-cpr-class.jpg", caption: "First Aid Bandaging Practice, School Certification Session" },
          { type: "image", src: "/photo-cpr-cert-tv.jpg", caption: "CPR & First Aid, Certification" },
        ]),
      topic("Physics Journey", "From curiosity to self-directed study.",
        "Independent study in physics began during early schooling years, initially driven by curiosity in space and fundamental forces. Continued development includes mechanics, electromagnetism, quantum concepts, and introductory university-level material. Research sessions go late, the laptop screen open, the world quiet, the concepts demanding full attention.",
        { type: "image", src: "/photo-quantum-research.jpg", caption: "Late-Night Physics Research, Quantum Entanglement Study" }),
      topic("Chandrayaan-3 & Space", "Next to India's lunar lander, and inside a spacesuit.",
        "Visited a science museum exhibition showcasing a scale model of the Vikram lander from Chandrayaan-3, India's historic mission that successfully landed on the Moon's south pole on August 23, 2023, making India the first country to reach that region. Also put my face in the astronaut cutout frame at the same exhibition.",
        { type: "image", src: "/photo-chandrayaan3.jpg", caption: "With Chandrayaan-3 Vikram Lander Model, Science Museum, India 2024" },
        [
          { type: "image", src: "/photo-chandrayaan3.jpg", caption: "With Chandrayaan-3 Vikram Lander Model, Science Museum, India 2024" },
          { type: "image", src: "/photo-astronaut-frame.jpg", caption: "'Be An Astronaut' Installation, Science Exhibition, India 2024" },
        ]),
      topic("Space Dream", "Astronaut frame. Real intention.",
        "A science museum made you stand in a spacesuit and look out at Earth. This is the photo from that moment. Behind it: years of physics self-study, research interest in orbital mechanics, and the kind of fixation that turns into a career if you let it.",
        { type: "image", src: "/photo-astronaut-frame.jpg", caption: "'Be An Astronaut' Installation, Science Exhibition, India 2024" }),
      topic("Machine Learning", "Apple or tomato? Image classification, first session.",
        "First introduction to machine learning through a structured classroom session, training an image classifier to distinguish apples from tomatoes using supervised learning. Built using a web-based ML platform. The project was called 'Supermarket.' Simple problem, foundational concept.",
        { type: "image", src: "/photo-ml-class.jpg", caption: "Machine Learning Class, Image Classification Project, March 2025" }),
      topic("Awards Vault", "Every ribbon, every certificate.",
        "Academic and extracurricular awards across mathematics, science, and competitions. SOF Science Olympiad, TCS IntelliGem Finalist, Gladrags Little Miss India Top 10, Whizz Kidzs Abacus National Award, and more.",
        { type: "image", src: "/photo-sof.jpg", caption: "SOF Science Olympiad, Certificate & Medal" }),
      topic("Research Interests", "Quantum, particle, astrophysics.",
        "Current interests include quantum mechanics, particle physics, relativity, astrophysics, and complex systems. Additional interest in computational modeling and mathematical structures underlying physical systems.",
        { type: "image", src: "/photo-quantum-research.jpg", caption: "Late-Night Physics Research, Quantum Study" }),
      /*, text-only, sorted to end, */
      topic("Education Timeline", "India to Québec secondary system.",
        "Schooling began in India and continued in Canada after relocation in 2024. Current studies are based in Montréal within the Quebec secondary system, completing Secondary IV."),
      topic("Subject Strengths", "Mathematics, physics, computer science.",
        "Primary focus areas are mathematics, physics, and computer science. Additional competence in languages, writing, and humanities subjects."),
      topic("AP Prep", "Coursework, review, and exam strategy.",
        "AP study plans, review notes, and the strategy behind balancing depth with volume. This is where academic stamina gets documented."),
      topic("Independent Archive", "Self-directed projects and explorations.",
        "Self-directed projects outside formal coursework, including experiments, reading-based study, problem solving, and exploratory work in physics, mathematics, and computational topics."),
      topic("Mentorship", "Guided by teachers, coaches, and researchers.",
        "Academic guidance received through teachers, competition coaches, and external mentors in science and mathematics."),
      topic("Future STEM Goals", "University physics. Research. Applied work.",
        "Long-term academic trajectory includes university-level study in physics, engineering, or related interdisciplinary fields, with continued involvement in research and applied problem solving."),
    ],
  },

  /* ══════════════════════════════════════════════════════════
     03 · WORKS , embeds first, then text-only
     Removed: Performance Portfolio (dissolved), Childhood Trophies (dissolved),
              Random Wins, Tech Build Log, FL Studio & DaVinci Resolve (split)
     ══════════════════════════════════════════════════════════ */
  {
    num: "03", slug: "works", label: "Works", icon: Wand2,
    tagline: "Every craft under one roof, robotics, writing, music, screen, design, art, leadership, sport.",
    topics: [
      /* ── Engineering & Robotics ── */
      topic("Engineering & Robotics", "FRC 7700 · CAD · fabrication · competition day.",
        "Participation in FIRST Robotics Competition Team 7700. Work includes mechanical design, prototyping, systems integration, and competition participation during build seasons. The school robotics hub, stacked 7700 bumpers, drill press, wiring stations, organized hardware trays, is where the season comes together. Iterative engineering under strict timelines, with the robot at the center.",
        { type: "image", src: "/photo-robotics-pit.jpg", caption: "FRC Team 7700, Pit Work, FIRST Robotics Quebec 2026" },
        [
          { type: "image", src: "/photo-robotics-pit.jpg", caption: "FRC Team 7700, Pit Work, FIRST Robotics Quebec 2026" },
          { type: "image", src: "/photo-robotics-hub.jpg", caption: "FRC 7700 School Workshop, Build Season Hardware" },
          { type: "image", src: "/photo-robotics-parts.jpg", caption: "FRC 7700, Parts & Components, Build Season" },
          { type: "image", src: "/photo-wie-build.jpg", caption: "WIE Build Challenge, 2-Minute Green Structure, Concordia 2025" },
          { type: "image", src: "/photo-singappenny.jpg", caption: "Singappenny's 2025, Engineering Women Conference" },
          { type: "image", src: "/photo-mcgill-engineering.jpg", caption: "McGill Engineering, Formula Electric & Rocketry Display" },
        ]),

      topic("Detailed Rangoli Arts", "Helping homes around India during festivals.",
        "Rangoli artwork done in nearby homes, this one created in 2022",
        { type: "image", src: "/photo-rangoli.jpg", caption: "Helping add colour and decoration to neighbourhood spaces across India thtough Mumbai, Bengaluru, Jodhpur, and Sojat." }),
      topic("Engineering Skills", "CAD, fabrication, systems thinking.",
        "Experience with CAD tools including Onshape and SolidWorks, fabrication methods, wiring systems, and mechanical assembly. Skills developed through robotics work and independent technical projects.",
        { type: "image", src: "/photo-mcgill-engineering.jpg", caption: "McGill Engineering, Formula Electric & Rocketry Display" }),
      topic("Women in Engineering", "Singappenny's 2025, invited, attended, present.",
        "Invited to Singappenny's 2025 Engineering Women conference, a large-scale event bringing together women in engineering across disciplines. One of the few secondary-school students in the room.",
        { type: "image", src: "/photo-singappenny.jpg", caption: "Singappenny's 2025, Engineering Women Conference" }),
      topic("WIE Build Challenge", "Green creation in two minutes.",
        "Concordia Women in Engineering event featuring a rapid engineering challenge: build a freestanding structure using green connectors and wooden sticks in under two minutes. The structure held.",
        { type: "image", src: "/photo-wie-build.jpg", caption: "WIE Build Challenge, 2-Minute Green Structure, Concordia 2025" }),
      topic("Library Studio Volunteering", "Teaching & assistance for kids to code and create at Westmount Library.",
        "Volunteered at the Westmount Library Studio, a makerspace for children and youth. Helped kids with Ozobot programmable robots, tablets, coding activities, and creative projects. Brought skills in CAD, sewing, and 3D printing to support the studio's programming.",
        { type: "image", src: "/photo-library-studio.jpg", caption: "Westmount Library Studio, Ozobot Coding Session with Kids" }),
      /* ── Writing ── */
      topic("Novel Series & Screenwriting", "A multi-book story world.",
        "Long-form fictional writing project consisting of multiple interconnected narratives. Includes structured worldbuilding, character development, and sustained multi-year writing output. Story structure boards map the full arc, three-act structure, character flaws, midpoint reversals, and thematic through-lines.",
        { type: "image", src: "/photo-screenplay-board.jpg", caption: "Story Structure Board, Act Breakdown & Character Arc Development" }),
      /* ── Music & Performance ── */
      topic("Vocal Performance", "Hindustani classical on stage.",
        "Training and performance in Hindustani classical music, including raga-based singing, rhythmic practice, and stage participation. Years of structured daily riyaaz under the guru-shishya tradition.",
        { type: "image", src: "/photo-singing.jpg", caption: "Stage Performance, Hindustani Classical Vocal" }),
      topic("Instrumental", "Keys, strings, and self-taught paths.",
        "Experience with keyboard and harmonium alongside informal exploration of additional instruments. Also plays electric guitar with developing technical proficiency, including a custom-painted pink Stratocaster-style guitar, hand-decorated with original doodle art.",
        { type: "image", src: "/photo-guitar-pink.jpg", caption: "Custom Pink Electric Guitar, Hand-Illustrated Body Art" }),
      topic("WHS Music Class, Jazz concerts", "Grade 10, Westmount High School jazz ensemble.",
        "Member of the Westmount High School music class band in grade 10. Played jazz in guitar, songs include 'Mack the Knife' and other jazz standards",
        { type: "image", src: "/photo-jazz-sheets.jpg", caption: "WHS Jazz Band: Sheet Music, Grade 10" },
        [
          { type: "image", src: "/photo-jazz-sheets.jpg", caption: "WHS Jazz Band: Several Sheet Music, Spread, Grade 10" },
          { type: "image", src: "/photo-jazz-sheet-detail.jpg", caption: "WHS Jazz Band, Sheet Music Detail, Chord Voicings & Markings" },
        ]),
      topic("Robotics Hub", "The shop. The parts. The process.",
        "The FRC 7700 robotics room at school: butcher-block workbenches, organized hardware trays sorted by fastener type and bracket size, 7700 bumper stacks in the corner, and the drill press running most of the season.",
        { type: "image", src: "/photo-robotics-hub.jpg", caption: "FRC 7700 School Workshop, Build Season Hardware" },
        [
          { type: "image", src: "/photo-robotics-hub.jpg", caption: "FRC 7700 School Workshop, Build Season Hardware" },
          { type: "image", src: "/photo-robotics-parts.jpg", caption: "FRC 7700, Parts & Components, Build Season" },
          { type: "image", src: "/photo-robotics-pit.jpg", caption: "FRC Team 7700, Pit Work, Competition Day" },
        ]),
      topic("Bharatnatyam", "Classical Indian dance, the devotional form.",
        "Bharatnatyam performance, one of the oldest classical dance forms of India, originating in Tamil Nadu. The performance combines expressive gesture (abhinaya), rhythm (nritta), and narrative (nritya). A disciplined art form requiring years of training in mudras, footwork, and expression.",
        { type: "youtube", src: YT("DiAoqNQJzRU"), caption: "Bharatnatyam Performance, Geetika Gehlot" }),
      topic("Rajasthani Dance", "Roots on stage, folk performance from the desert.",
        "Rajasthani folk dance performance, a celebration of the cultural traditions of Rajasthan, the land of origin. Vibrant, rhythmic, and deeply rooted in desert culture. A performance that connects personal history to artistic expression.",
        { type: "youtube", src: YT("5QBuTpvBKiw"), caption: "Rajasthani Dance Performance, Geetika Gehlot" }),
      topic("Band-it Festival 2019", "Level 2 · Furtado's School of Music.",
        "Selected in Level 2 of Band-it Festival 2019, the largest inter-school music festival organized by Furtado's School of Music. A competitive multi-school performance event. Selected and performed on the main stage.",
        { type: "image", src: "/photo-bandit-stage.jpg", caption: "Band-it Festival 2019, Level 2 · Furtado's School of Music" },
        [
          { type: "image", src: "/tv-bandit.png", caption: "Band-it Festival, On Stage Performance Still" },
        ]),
      topic("Hula Hoop", "Physical performance and body coordination.",
        "Hula hoop practice and performance, a discipline requiring rhythmic coordination, core control, and sustained focus. Part of the physical performance repertoire alongside dance and martial arts.",
        { type: "image", src: "/photo-hulahoop.jpg", caption: "Hula Hoop, Physical Performance & Coordination" }),
      /* ── Production ── */
      topic("FL Studio", "Original music production since 2020.",
        "Using FL Studio since 2020, producing original music, beats, and audio compositions entirely independently. Full command of the DAW: piano roll editing, mixer routing, plugin chains, automation, mastering, and export. Not learning it, using it. Five-plus years of hands-on production.",
        { type: "image", src: "/photo-studio.jpg", caption: "FL Studio, Music Production Setup" }),
      topic("DaVinci Resolve", "Professional video editing and colour grading.",
        "Using DaVinci Resolve since 2020, professional video editing, colour grading, visual effects, and post-production. Full pipeline from raw footage to final export. Adopted at an age when most people haven't heard of it. Five-plus years of hands-on experience.",
        { type: "image", src: "/photo-dj-software.jpg", caption: "DaVinci Resolve, Video Editing & Colour Grading" }),
      topic("DJ Skills", "Mixing, scratching, and reading the room.",
        "Self-taught DJ practice using VirtualDJ, with focus on beatmatching, EQ layering, and transition technique. Builds playlists across pop, dance, and electronic genres. The same pattern-recognition that runs through physics and chess runs here, timing, anticipation, and knowing where the energy wants to go.",
        { type: "image", src: "/photo-dj-software.jpg", caption: "VirtualDJ Session, Beatmatching & Playlist Curation" }),
      /* ── Events & Freelance ── */
      topic("Professional Event Hosting", "Real parties. Real pay. Real results.",
        "Organized and hosted children's birthday parties in India on a professional basis, complete event production including decoration design, theme coordination, balloon setups, entertainment, and on-the-day hosting. Paid for the work. First engagement: hosted a kids' birthday party for an outside family and was paid. Second: organized and hosted own sister's birthday party, and was paid for that too.",
        { type: "image", src: "/photo-birthday-kids-party.jpg", caption: "Birthday Party Hosting, Organized & Hosted, Paid Event" },
        [
          { type: "image", src: "/photo-birthday-kids-party.jpg", caption: "Kids Birthday Party, Hosted & Organized, Paid Event" },
          { type: "image", src: "/photo-birthday-decor-princess.jpg", caption: "Birthday Decoration, Princess Theme Setup" },
          { type: "image", src: "/photo-birthday-hosting-paid.jpg", caption: "Hosting in Action, Paid Birthday Event" },
          { type: "image", src: "/photo-birthday-sister-party.jpg", caption: "Sister's Birthday Party, Organized & Hosted, Also Paid" },
        ]),
      /* ── Screen & Media ── */
      topic("Child Artist Archive", "Years on screen, the full overview.",
        "Film and television work completed during childhood across multiple productions. Lead roles, supporting credits, voice work, and modelling across Indian national media. This is the overview; individual productions have their own entries below.",
        { type: "youtube", src: PLAYLIST, caption: "Child Artist Reel, Full Playlist" },
        [
          { type: "youtube", src: PLAYLIST, caption: "Full Playlist, All Productions" },
          { type: "youtube", src: YT("43_Uz4Ho2D0"), caption: "Diva Entertainment Reel, Geetika Gehlot, Age 8" },
          { type: "youtube", src: YT("6F5-l7m1WNM"), caption: "Diva Entertainment Reel, Part 2" },
          { type: "youtube", src: YT("EY1dm43XraY"), caption: "Screen Audition #3" },
          { type: "youtube", src: YT("vEFwQJupu6E"), caption: "Screen Audition #4" },
          { type: "youtube", src: YT("eyVlHzkGSQY"), caption: "Screen Audition, Aug 2017" },
        ]),
      topic("DD Kisan, Salaam India", "Lead role on national agricultural television.",
        "Lead role in Salaam India, a programme broadcast on DD Kisan, the agricultural channel of Doordarshan, India's national public broadcaster. A full lead role, performed on a production team, shot and broadcast to a national audience. Aired 1st June 2017.",
        { type: "youtube", src: YT("AtksG5ySKus"), caption: "DD Kisan · Salaam India, Lead Role, 1 June 2017" },
        [
          { type: "image", src: "/tv-ddkisan.png", caption: "DD Kisan · Salaam India, On Screen Still" },
          { type: "youtube", src: YT("AtksG5ySKus"), caption: "Salaam India, Full Episode, DD Kisan, 1 June 2017" },
        ]),
      topic("Zee TV, Woh Apna Sa", "Holi special on primetime Indian television.",
        "Appeared in the Holi special episode of Woh Apna Sa on Zee TV, one of India's largest primetime entertainment channels. A high-production television appearance in a nationally broadcast seasonal special. Also appeared in webisode content for the series.",
        { type: "youtube", src: YT("I9hti8CCvrc"), caption: "Zee TV · Woh Apna Sa, Webisode" },
        [
          { type: "image", src: "/tv-zeeholi.png", caption: "Woh Apna Sa · Holi Special, On Set Still" },
          { type: "image", src: "/tv-holi.png", caption: "With Amit Behl & Priyanka Sharma, Zee TV Holi Special" },
          { type: "image", src: "/tv-sudeep.png", caption: "With Sudeep Sahir, Zee TV, Woh Apna Sa" },
          { type: "youtube", src: YT("I9hti8CCvrc"), caption: "Woh Apna Sa · Webisode, Hindi Show, Zee TV" },
        ]),
      topic("Star Parivaar, Iss Pyar Ko Kya Naam Doon", "On set with the cast of a hit Star Plus serial.",
        "Appeared in an episode of Iss Pyar Ko Kya Naam Doon on Star Plus, shot on the main production set. Time on set with the principal cast, including Barun Sobti and Ridhi Dogra. The production team, the blocking, the takes, a real working TV set.",
        { type: "image", src: "/photo-starparivar-set.jpg", caption: "Star Parivaar, On Set · Iss Pyar Ko Kya Naam Doon" },
        [
          { type: "image", src: "/photo-starparivar-set.jpg", caption: "On Set, Iss Pyar Ko Kya Naam Doon" },
          { type: "image", src: "/photo-starparivar-barun.jpg", caption: "With Barun Sobti, On Set, Star Plus" },
          { type: "image", src: "/tv-ridhi.png", caption: "With Ridhi Dogra, Production Still" },
          { type: "image", src: "/tv-dalljiet.png", caption: "With Dalljiet Kaur, On Set" },
          { type: "image", src: "/tv-onset.png", caption: "With Shalini Arora & Buneet Kapoor, On Set" },
        ]),
      topic("Alt Balaji, Rhymes Series", "Lead in four children's nursery rhymes.",
        "Lead role across four short-form children's rhyme videos produced for Alt Balaji, the OTT streaming platform. Four separate pieces, four lead performances, distributed across a digital platform with national reach.\n\nRhymes: Humpty Dumpty · The Wheels on the Bus · Five Little Ducks · If You're Happy and You Know It.",
        { type: "image", src: "/tv-altbalaji.png", caption: "Alt Balaji Rhymes Series, On Screen Still" },
        [
          { type: "image", src: "/tv-altbalaji.png", caption: "Alt Balaji Rhymes Series, On Screen Still" },
          { type: "youtube", src: YT("SZ2wycYrmL0"), caption: "Humpty Dumpty, Alt Balaji Nursery Rhymes" },
          { type: "youtube", src: YT("a_F3s1iiAos"), caption: "The Wheels on the Bus, Alt Balaji Nursery Rhymes" },
          { type: "youtube", src: YT("SPxaJq3xWk4"), caption: "Five Little Ducks, Alt Balaji Nursery Rhymes" },
          { type: "youtube", src: YT("2XVz-8b1MEE"), caption: "If You're Happy and You Know It, Alt Balaji Nursery Rhymes" },
        ]),
      topic("9XM, Independence Day Promo", "70th Independence Day promo for 9XM music channel.",
        "Featured in the 70th Independence Day promotional segment for 9XM, a major Hindi music and entertainment channel. Broadcast nationally during the Independence Day programming block.",
        { type: "youtube", src: YT("GIDID2bPXgs"), caption: "9XM, 70th Independence Day Promo" },
        [
          { type: "image", src: "/tv-9xm.png", caption: "9XM · 70th Independence Day, On Screen Still" },
          { type: "youtube", src: YT("GIDID2bPXgs"), caption: "9XM Salaam, 70th Independence Day Promo" },
        ]),
      topic("Asian Paints Advertisement", "National brand, television commercial.",
        "Featured in a television advertisement for Asian Paints, one of India's largest paint manufacturers with national advertising campaigns. Shot two commercials: the main Eco Xpress Painting campaign (#3DaysMeinDone) and the Diwali Special edition.",
        { type: "youtube", src: YT("18PkNhMXsPk"), caption: "Asian Paints Eco Xpress, #3DaysMeinDone" },
        [
          { type: "image", src: "/tv-asianpaints.png", caption: "Asian Paints Eco Xpress, On Screen Still" },
          { type: "youtube", src: YT("18PkNhMXsPk"), caption: "Asian Paints Eco Xpress Painting, #3DaysMeinDone" },
          { type: "youtube", src: YT("HKMDMkMpZfE"), caption: "Asian Paints Eco Xpress, Diwali Special" },
        ]),
      topic("Voice & Screen", "Voice acting and dubbing.",
        "Voice acting and dubbing work for media projects, including dubbing in Veere Di Wedding and Hindi Medium. The discipline of performing with voice only, distinct from on-camera work.",
        { type: "image", src: "/photo-dubbing-studio.jpg", caption: "Recording Studio, Dubbing Session" },
        [
          { type: "image", src: "/photo-dubbing-studio.jpg", caption: "Recording Studio, Dubbing Session" },
          { type: "image", src: "/photo-studio.jpg", caption: "Studio Setup, Production & Recording Environment" },
        ]),
      topic("Veere Di Wedding, Dubbing", "Voice work on a Bollywood feature film.",
        "Dubbing work on Veere Di Wedding, the 2018 Bollywood feature film starring Kareena Kapoor Khan, Sonam Kapoor, Swara Bhaskar, and Shikha Talsania. Voice-only performance contributed to the final audio mix of a major Hindi film release.",
        { type: "image", src: "/photo-dubbing-studio.jpg", caption: "Recording Studio, Veere Di Wedding Dubbing Session" },
        [
          { type: "image", src: "/photo-studio.jpg", caption: "Studio Setup, Production & Recording Environment" },
        ]),
      topic("Hindi Medium, Dubbing", "Voice work on an Irrfan Khan film.",
        "Dubbing work on Hindi Medium, the 2017 Bollywood film starring Irrfan Khan and Saba Qamar. An understated, critically acclaimed film about class and education. Voice performance contributed to post-production audio for the release.",
        { type: "image", src: "/photo-dubbing-studio.jpg", caption: "Recording Studio, Hindi Medium Dubbing Session" }),
      topic("Media Credits", "The full filmography.",
        "Full record of acting and voice-related credits across productions. Zee TV · Star Parivaar · DD Kisan · Alt Balaji · 9XM · Asian Paints · Gladrags Little Miss India Top 10. International modelling for Sarees Bazaar UK, US, NZ, Amazon, Alibaba, Indiamart.",
        { type: "image", src: "/photo-gladrags-lineup.jpg", caption: "Gladrags Miss India Top 7" },
        [
          { type: "image", src: "/photo-gladrags-lineup.jpg", caption: "Gladrags Little Miss & Master India, Lineup" },
          { type: "image", src: "/photo-mukesh-fashion.jpg", caption: "International Modelling, Sarees Bazaar UK Campaign" },
          { type: "image", src: "/tv-sareesuk.png", caption: "Sarees Bazaar UK, International Modelling Still" },
          { type: "youtube", src: YT("N0Bj1B2CkOM"), caption: "Gladrags Group Dance, Little Miss India" },
          { type: "youtube", src: YT("FzodZhhiszw"), caption: "Rose Promo, Performance Reel" },
        ]),
      /* ── Tech & Creative Brand ── */
      topic("Zionaxelle", "A Multimedia Artist, visit the site.",
        "Multimedia creative brand project involving design, web presence, visual identity, content strategy, and production pipeline. Self-designed from the ground up as a coherent creative universe, zionaxelle.com.",
        { type: "link", src: "https://zionaxelle.com", caption: "Zionaxelle, Multimedia Creative Brand" }),
      /* ── Art & Culture ── */
      topic("Canvas Art", "Paintings",
        "Visual artwork including painting and drawing using multiple mediums, oil, acrylic, watercolor, and mixed media. One such example of original works include a Saraswati composition and a landscape canvas, both created in 2020 & installed in the home mandir.",
        { type: "image", src: "/photo-mandir.jpg", caption: "Original Paintings, Home Mandir, Montréal 2025" }),
      topic("Embroidery & Henna", "Threads & Stains",
        "Hand Henna & embroidery work with traditional and contemporary design approaches. Uses of meditative practices that doubles as aesthetic art.",
        { type: "image", src: "/photo-henna.jpg", caption: "Henna artwork created by Geetika in 2025" }),
      topic("Global Cuisine", "Trying every dish from everywhere.",
        "A personal project of intentional food exploration across cuisines. Korean tteokbokki with ramyeon and a full banchan spread, kimchi, gosari, daikon, and seaweed. The interest is anthropological: what a cuisine tells you about a culture is more than any textbook.",
        { type: "image", src: "/photo-korean-food.jpg", caption: "Korean Cuisine, Tteokbokki & Banchan, Montréal" }),
      /* ── Leadership ── */
      topic("YMCA Youth Co-op", "VP of a youth cooperative in Montréal.",
        "Vice President of the YMCA Youth Co-op in Montréal, a student-run cooperative serving NDG, Westmount, and Côte Saint-Luc. Responsibilities include running & managing all: finances, marketing & HR, also: Led, organized and ran general meetings, organized community activities (bake-offs, outings, old age home visits), coordinating & being the head for the entire co-op, including: the marketing, HR, and finance committees.",
        { type: "image", src: "/photo-ymca-event.jpg", caption: "YMCA Youth Co-op, Community Event, Summer 2025" },
        [
          { type: "image", src: "/photo-ymca-event.jpg", caption: "YMCA Youth Co-op, Community Event, Summer 2025" },
          { type: "image", src: "/photo-ymca-office.jpg", caption: "YMCA Youth Co-op, Office & Team Meetings" },
          { type: "image", src: "/photo-ymca-baking.jpg", caption: "YMCA Youth Co-op, Community Bake-Off" },
          { type: "image", src: "/photo-ymca-grocery.jpg", caption: "YMCA Youth Co-op, Grocery Community Activity" },
          { type: "image", src: "/photo-ymca-outing.jpg", caption: "YMCA Youth Co-op, Team Outing" },
          { type: "image", src: "/photo-ymca-outreach.jpg", caption: "YMCA Youth Co-op, Community Outreach" },
        ]),
      topic("Atwater Planting Internship", "Botany, fieldwork, and a team working all around the neighbourhood",
        "Summer internship for managing and growing several Atwater planting sites in Montréal, working alongside a team of young enthusiasts & researchers. Field and outdoor work involved plant study and ecological survey.",
        { type: "image", src: "/photo-atwater-team.jpg", caption: "Atwater Internship Team, Field Day, Summer 2025" }),
      topic("Culture & Discovery", "different countries, different cultures, one soul.",
        "Experience of navigating, discovering and becoming amazed by Indian, Canadian, African & European cultural environments across language, education, and social systems.",
        { type: "image", src: "/photo-rajasthani.jpg", caption: "Classical Dress of Shimla, as a tourist, Cultural Journey begins young!" },
        [
          { type: "image", src: "/photo-rajasthani.jpg", caption: "Rajasthani Classical Dress, Cultural Roots" },
          { type: "youtube", src: YT("5QBuTpvBKiw"), caption: "Rajasthani Dance Performance, Geetika Gehlot" },
        ]),
      /* ── Athletics ── */
      topic("Gold medals: Martial Arts", "Right from the beginning. Many years on the mat!",
        "Martial arts training including discipline, forms, and the philosophy of controlled & humble power. The physical training that complemented intellectual growth as well. Sports Authority of India recognition.",
        { type: "image", src: "/photo-karate.jpg", caption: "Karate, Sports Authority of India Award" }),
      topic("Abacus", "Lightning-fast arithmetic!",
        "Mental math training from elementary, several trophies in numerous INTER-STATE abacus competitions, awarded for outstanding speed calculations, and numerical intuition that still shapes mathematical reasoning. Whizz Kidzs Abacus National Award.",
        { type: "image", src: "/photo-abacus.jpg", caption: "Whizz Kidzs, Abacus National Award: 3rd Prize, 3rd in the country" }),
      /* ── Side Quests ── */
      topic("Aerobics, Tricks, Gymnastics & Freestyle Dance", "Performances",
        "On stage for a state-level semi-final competition, won Second Prize in competition, State Level, Maharashtra; combining several forms of physical tricks and dances into her own style!",
        { type: "image", src: "/photo-hulahoop.jpg", caption: "Side Quests, Second Prize Aerobics competition, State Level, Maharashtra" }),
      /* ── Childhood achievements, dissolved from Childhood Trophies ── */
      topic("School's President & Female Class Valedictorian, Grades 3 & 5", "Crowned!",
        "The Head Girl (School's President, Highest leadership rank, Grade 5) & Ryan Princess (Female Class Valedictorian, Grade 3 & 5)",
        { type: "image", src: "/photo-crown.jpg", caption: "Ryan Princess Competition, Crowned" }),
      topic("Gladrags, Little Miss India", "Top 7 finalist in the famous India-National pageant.",
        "Selected as one of the Top 7 finalists in Gladrags Little Miss & Master India, a nationally recognised children's talent & modelling pageant. Excelled full competition cycles with auditions, callbacks, dances, performances, until the finals lineup.",
        { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India, Solo" },
        [
          { type: "image", src: "/photo-gladrags-solo.jpg", caption: "Gladrags Little Miss & Master India, Solo" },
          { type: "image", src: "/photo-gladrags-lineup.jpg", caption: "Gladrags Little Miss India, Finalists Lineup" },
        ]),
      topic("Gladrags Group Dance", "On stage at the Gladrags finals.",
        "Group dance performance at the Gladrags Little Miss India competition, the finals stage, with the full lineup of finalists. A coordinated group performance as part of the pageant competition rounds.",
        { type: "youtube", src: YT("N0Bj1B2CkOM"), caption: "Gladrags Group Dance, Little Miss India Finals" }),
      /*, text-only, sorted to end, */
      topic("Multimedia Production", "Edit, shoot!",
        "Experience in video editing, audio production, graphic design, and content creation. Fully fluent in DaVinci Resolve, FL Studio, etc."),
      topic("Tech Skills", "React, TypeScript, Python.",
        "Web development using React, TypeScript, and Python, alongside version control and standard development tools."),
      topic("Mentoring", "Passing on!",
        "Peer support in academic subjects, robotics, and music. Teaching is the fastest way to learn."),
      topic("Badminton & Table-Tennis", "Court sport discipline!",
        "Participation and awards in 5+ badminton tournaments in Goregaon sports club along with competitive plays in TT"),
      topic("Chess", "Pattern observation!",
        "Competitive and training: Qualified for city-level chess tournaments in both Mumbai & Gurgaon; notable pattern recognition and strategy."),
      topic("Freelance & Design", "Custom designs from t-shirts, backpacks & sneakers to posters & flyers",
        "Took on freelance design work for custom projects, concept development, artwork creation. Paid work, ongoing and completely independent."),
    ],
  },

  /* ══════════════════════════════════════════════════════════
     04 · VAULT
     ══════════════════════════════════════════════════════════ */


  /* ══════════════════════════════════════════════════════════
     05 · CONTACT
     ══════════════════════════════════════════════════════════ */
  {
    num: "05", slug: "contact", label: "Contact", icon: Mail,
    tagline: "Open correspondence and links to everywhere else.",
    topics: [
      topic("Channels", "Where to find me.",
        "Email, LinkedIn, GitHub, and other platforms, the official channels for professional and creative correspondence."),
      topic("Links", "The wider web.",
        "External projects, collaborations, publications, and platforms where the work lives beyond this site."),
    ],
  },
];

export const findCluster = (slug: string) => CLUSTERS.find((c) => c.slug === slug);

export type Subpage = {
  slug: string;
  label: string;
  kind?: "overview" | "highlights" | "evidence" | "media" | "reflection" | "related" | "topic";
};

export const findSubpage = (cluster: Cluster, slug: string) =>
  cluster.topics.find((t) => t.slug === slug);

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
