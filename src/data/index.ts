/**
 * Single source of truth for every word on this site.
 *
 * Content is drawn from SolomonOwusuAnsahCV.pdf. Where a figure appears below
 * (40% efficiency, 90+ facilitators, 12 bugs) it comes straight from the CV —
 * nothing here is invented. Lines marked TODO need Solomon to confirm.
 *
 * Adding an entry to `projects[]` or `collaborations[]` with `published: true`
 * generates its case-study route automatically.
 */

export const SITE_URL = "https://solo0722.github.io";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type Social = { label: string; handle: string; href: string };

export type SkillGroup = { category: string; items: string[] };

export type Role = {
  company: string;
  role: string;
  arrangement: string;
  location: string;
  period: string;
  current: boolean;
  href: string | null;
  summary: string;
  bullets: string[];
};

export type Education = {
  qualification: string;
  institution: string;
  location: string;
  period: string;
  note: string | null;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  href: string;
  skills: string[];
};

/** One screenshot in a case study. Projects may carry several. */
export type ProjectImage = { src: string; alt: string; caption?: string };

/** Projects can point at several places — a marketing site, the app, a repo. */
export type ProjectLink = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  title: string;
  /** Shown in the index list when the full title is long. */
  shortTitle?: string;
  year: string;
  category: string;
  /** Team projects show the organisation they were built inside. */
  org?: string;
  role: string;
  summary: string;
  problem: string;
  build: string;
  outcome: string;
  highlights: { label: string; body: string }[];
  tech: string[];
  links: ProjectLink[];
  images: ProjectImage[];
  /** false → listed but not linked, and no route is generated. */
  published: boolean;
};

export type ArchiveItem = {
  title: string;
  year: string;
  blurb: string;
  tech: string[];
  href: string | null;
};

/* -------------------------------------------------------------------------- */
/*  Profile                                                                   */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Solomon Owusu-Ansah",
  firstName: "Solomon",
  lastName: "Owusu-Ansah",
  role: "Software Developer & Data Scientist",
  location: "Kumasi, Ghana",
  email: "owusuansahsolomon39@gmail.com",
  phone: "+233 599171142",
  photo: "/profile.jpg",
  availability: "Available for new work",

  metaDescription:
    "Solomon Owusu-Ansah is a full-stack software developer and data scientist in Kumasi, Ghana — building web, mobile and smart-city platforms with React, Next.js, React Native and Python.",

  statement: ["I build software people", "actually want to use."],

  intro:
    "Full-stack developer and data scientist with four years spent shipping web and mobile products — from infrastructure intelligence and computer vision through to school systems and campus marketplaces.",

  about: [
    "I'm a full-stack developer and data scientist with over four years of experience building user-focused web and mobile applications. I work comfortably on both sides of the stack, and I do my best work on small teams that ship quickly and talk to their users.",
    "My day job is SchoolDesk at SpringKnight, a school-management platform used by schools across Ghana — I build the guardian and staff apps that teachers, parents and administrators use daily. Evenings go to InfiniCity Labs, where I'm the developer on AdAMS, a platform for monitoring road assets at scale, alongside the traffic management and wildlife monitoring systems built on the same foundation.",
    "I read Computer Engineering at KNUST and graduated with First Class Honours. In August 2026 I start a Master's in Computer Science at North Dakota State University as a Graduate Research Assistant.",
  ],

  facts: [
    { label: "Experience", value: "4+ years" },
    { label: "Education", value: "BSc Computer Engineering, First Class" },
    { label: "Based in", value: "Kumasi, Ghana" },
    { label: "Working", value: "Remote / worldwide" },
  ],
} as const;

/**
 * The CV, on Google Drive. Replacing the file in Drive updates every link here
 * without a redeploy, as long as the share ID stays the same.
 *
 * This is the "view" link, so it opens Drive's preview — readable inline, with
 * Drive's own download button. To make the buttons download the file directly
 * instead, swap in:
 *   https://drive.google.com/uc?export=download&id=1iaBqbd3agr1qCTxrrxBhFeEykL29uzRN
 *
 * Links use `target="_blank"` rather than the `download` attribute, because
 * browsers ignore `download` on cross-origin URLs.
 */
export const resumeUrl =
  "https://drive.google.com/file/d/1iaBqbd3agr1qCTxrrxBhFeEykL29uzRN/view?usp=sharing";

export const socials: Social[] = [
  { label: "GitHub", handle: "solo0722", href: "https://github.com/solo0722" },
  {
    label: "LinkedIn",
    handle: "solomon-owusu-ansah",
    href: "https://linkedin.com/in/solomon-owusu-ansah",
  },
  { label: "X", handle: "DevEx_Alchemy", href: "https://x.com/DevEx_Alchemy" },
];

export const navLinks = [
  { label: "About", href: "#about", index: "01" },
  // { label: "Stack", href: "#stack", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Prjects", href: "#work", index: "04" },
  // { label: "Credentials", href: "#credentials", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Stack                                                                     */
/* -------------------------------------------------------------------------- */

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind", "HTML & CSS", "Ant Design"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "MongoDB", "PostgreSQL", "SQL", "Firebase"],
  },
  {
    category: "Mobile & Desktop",
    items: ["React Native", "Expo", "Flutter", "Dart", "Electron"],
  },
  {
    /* Every item here is evidenced by the CV — the 365 Data Science statistics
       certificate, the LLM line under Hard Skills, and the analytics work on
       TMC. TODO: add Pandas / NumPy / scikit-learn etc. if you use them. */
    category: "Data Science & AI",
    items: [
      "Python",
      "Statistics",
      "Data Analysis",
      "Data Visualisation",
      "LLM Building & Deployment",
    ],
  },
  {
    category: "Cloud & Tooling",
    items: ["AWS Lambda", "AWS CloudFormation", "Microservices", "Git", "Vercel", "Sanity", "Figma"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Order is deliberate, not chronological: SpringKnight is the day job and leads
 * the list. InfiniCity follows — it runs in the evenings, and started later.
 * The Experience accordion opens whichever role sits first.
 */
export const experience: Role[] = [
  {
    company: "SpringKnight Limited",
    role: "Full-stack Developer — Web & Mobile",
    arrangement: "Remote",
    location: "London, United Kingdom",
    period: "Sep 2024 — Present",
    current: true,
    href: "https://www.schooldesk.cc",
    summary:
      "Building the guardian and staff mobile apps for SchoolDesk, a school-management platform.",
    bullets: [
      "Built SchoolDesk Guardian Edition, a mobile app that keeps guardians connected to their child's academic progress — attendance, results and school communication in one place.",
      "Built SchoolDesk Staff Edition, giving teachers and administrators the tools to manage their day-to-day responsibilities from a phone rather than a desktop.",
      "Ran training sessions across partner schools for 90+ facilitators and guardians, which contributed to a 60% increase in platform adoption.",
    ],
  },
  {
    company: "InfiniCity Labs",
    role: "Full-stack Developer",
    arrangement: "Remote",
    location: "Fargo, North Dakota, USA",
    period: "Mar 2025 — Present",
    current: true,
    href: "https://infinicitylabs.org",
    summary:
      "Lead developer on infrastructure intelligence — road assets, traffic, and wildlife.",
    bullets: [
      "Lead software developer on AdAMS, the Advanced Road Asset Management System — a data-driven platform for monitoring and analysing road assets at scale. Owned it end to end, from data model through to the analysis interface.",
      "Designed and built TMC, the Traffic Management Control System, integrating real-time road and traffic recording with the analytics and visualisation layer on top of it.",
      "Built BisonGuard, an intelligent herd monitoring platform combining IoT sensors, drones, GPS tracking and computer vision to protect herds and reduce vehicle–wildlife collisions on transportation corridors.",
    ],
  },
  {
    company: "AI4AI",
    role: "Frontend Developer — Graduate Trainee",
    arrangement: "Remote",
    location: "Accra, Ghana",
    period: "Apr 2025 — Aug 2025",
    current: false,
    href: "https://ai4ai.org",
    summary:
      "Mobile app widening AI literacy across Africa through culturally relevant content.",
    bullets: [
      "Helped design and build an AI literacy mobile application aimed at improving understanding and adoption of AI across Africa through accessible, culturally relevant content.",
      "Focused on interface and experience work, making the app legible across a wide range of literacy levels rather than assuming a technical audience.",
    ],
  },
  {
    company: "Asqii LLC.",
    role: "Frontend & Mobile Developer — Intern",
    arrangement: "Remote",
    location: "London, United Kingdom",
    period: "Sep 2023 — Jan 2024",
    current: false,
    href: "https://www.schooldesk.cc",
    summary: "Shipped exams and messaging into SchoolDesk across web and mobile.",
    bullets: [
      "Designed and implemented SchoolDesk's exam feature end to end, letting schools create, administer and monitor exams across both web and mobile — increasing exam administration efficiency by 40%.",
      "Built and integrated an in-app messaging system connecting staff, students and guardians, lifting user engagement by 30%.",
      "Diagnosed and fixed over 12 critical bugs and performance issues across both surfaces, reducing crash rates by 20%.",
      "Ran structured testing across web and mobile, documenting 100+ bugs and inconsistencies and driving a 20% improvement in platform quality.",
      "Trained 100+ facilitators and guardians on the platform, contributing to a 60% increase in adoption.",
    ],
  },
  {
    company: "JLS Trading Co.",
    role: "Frontend Developer — Intern",
    arrangement: "Remote",
    location: "Charlotte, North Carolina, USA",
    period: "Sep 2022 — Dec 2022",
    current: false,
    href: "https://jlstradingco.com",
    summary: "QA and backend integration on Omniscio, an inventory management system.",
    bullets: [
      "Tested the Omniscio inventory management system, finding and resolving over 50 critical bugs and cutting user-reported issues by 30%.",
      "Integrated backend data into the inventory web app, reaching a 98% success rate on frontend–backend synchronisation and improving data processing speed by 20%.",
      "Kept cross-functional teams aligned on scope and priorities, reducing project completion time by 15%.",
    ],
  },
  {
    company: "JLS Trading Co.",
    role: "Frontend Developer — Intern",
    arrangement: "Remote",
    location: "Charlotte, North Carolina, USA",
    period: "Sep 2021 — Jan 2022",
    current: false,
    href: "https://jlstradingco.com",
    summary: "First internship — building the internal Feature Tracker.",
    bullets: [
      "Contributed to the Feature Tracker system, which captured and tracked over 100 feature requests and drove a 25% increase in satisfaction with Omniscio by surfacing what users actually wanted built.",
      "Rebuilt and optimised the submission form, increasing submissions by 40% while cutting the time it took to file one by 30%.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Education & certifications                                                */
/* -------------------------------------------------------------------------- */

export const education: Education[] = [
  {
    /* The period column shows completion years — KNUST reads 2024, so this
       reads 2028, the expected finish. The programme starts August 2026. */
    qualification: "MSc Computer Science",
    institution: "North Dakota State University",
    location: "Fargo, North Dakota, USA",
    period: "2028",
    note: "Graduate Research Assistant",
  },
  {
    qualification: "BSc Computer Engineering",
    institution: "Kwame Nkrumah University of Science and Technology",
    location: "Kumasi, Ghana",
    period: "2024",
    note: "First Class Honours",
  },
];

export const certifications: Certification[] = [
  {
    title: "Data Science Career Path — Statistics",
    issuer: "365 Data Science",
    year: "2024",
    href: "https://learn.365datascience.com/certificates/CC-573243D71E/",
    skills: ["Data Science", "Statistics"],
  },
  {
    title: "AWS Academy Graduate — Introduction to Cloud, Semester 2",
    issuer: "Amazon Web Services",
    year: "2024",
    href: "https://www.credly.com/badges/b75bbcce-17de-4c3f-ac65-b7757afef5da/linked_in_profile",
    skills: ["Cloud Computing", "CloudFormation", "Microservices"],
  },
  {
    title: "AWS Academy Graduate — Introduction to Cloud, Semester 1",
    issuer: "Amazon Web Services",
    year: "2024",
    href: "https://www.credly.com/badges/1067f9e1-38c3-408f-a3d2-039c6366d80d/linked_in_profile",
    skills: ["Cloud Computing", "AWS Lambda"],
  },
  {
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
    href: "https://www.credly.com/badges/b60494cd-94a6-410e-943b-ff3f7457b7c0/linked_in_profile",
    skills: ["AWS CloudFormation"],
  },
  {
    title: "Network Technician Career Path",
    issuer: "Cisco",
    year: "2024",
    href: "https://www.credly.com/badges/03b20bfa-d29e-4ecb-ae2b-906ad6245ee9/linked_in_profile",
    skills: ["Network Security", "Network Administration", "VPN", "Protocol Design"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Team projects — built with others, inside an organisation                  */
/* -------------------------------------------------------------------------- */

/**
 * ⚠ TWO THINGS TO SEND ME:
 *   1. Screenshots. Each project takes an array, so a project can carry as many
 *      images as you like — the case study renders a gallery automatically.
 *   2. Details for BisonGuard and GeoZone. Both are `published: false`, so they
 *      show in the list as "Details coming" but don't link anywhere and don't
 *      generate a route. Flip the flag once they're filled in.
 *
 * The `tech` arrays for AdAMS, TMC and GeoZone are inferred from your stack,
 * not from the CV — TODO: correct them before anyone interviews you on it.
 */
export const collaborations: CaseStudy[] = [
  {
    slug: "schooldesk",
    title: "SchoolDesk",
    year: "2023",
    category: "Platform",
    org: "SpringKnight Limited · Asqii LLC.",
    role: "Full-stack developer",
    summary: "School-management platform — exams, messaging, guardian and staff apps.",
    problem:
      "Schools run on paperwork and group chats. Exams are assembled by hand, results are transcribed more than once, and the channel between a school and a guardian is usually a teacher's personal phone number. Every one of those is a place where information gets lost or arrives too late to act on.",
    build:
      "I've worked on SchoolDesk across two companies and both platforms. At Asqii I designed and implemented the exam feature end to end — creating, administering and monitoring exams across web and mobile — and built the in-app messaging system connecting staff, students and guardians. At SpringKnight I built the Guardian Edition and Staff Edition mobile apps, giving each audience a surface shaped to what they actually need rather than one interface for everyone.",
    outcome:
      "Exam administration efficiency rose 40% and user engagement 30% after messaging shipped. Fixing 12 critical defects cut crash rates by 20%, and training 190+ facilitators and guardians across both roles contributed to a 60% increase in adoption.",
    highlights: [
      {
        label: "Exams, end to end",
        body: "Design through delivery across web and mobile — a 40% efficiency gain in exam administration.",
      },
      {
        label: "One audience per app",
        body: "Guardian and Staff editions built separately, so neither is a compromise of the other.",
      },
      {
        label: "Adoption is part of the job",
        body: "Trained 190+ facilitators and guardians in person; adoption rose 60%.",
      },
    ],
    tech: ["React", "React Native", "Node.js", "TypeScript"],
    links: [
      { label: "Website", href: "https://www.schooldesk.cc" },
    ],
    images: [
      {
        src: "/work/schooldesk-site.png",
        alt: "SchoolDesk marketing site showing check-in notifications, bus tracking and lunch balance cards",
        caption:
          "The platform SchoolDesk presents to schools — check-in, transport tracking and balances in one place.",
      },
    ],
    published: true,
  },
  {
    slug: "adams",
    title: "AdAMS — Advanced Road Asset Management System",
    shortTitle: "AdAMS",
    year: "2025",
    category: "Platform",
    org: "InfiniCity Labs · NDSU SMARTLab",
    role: "Lead software developer",
    summary: "Data-driven monitoring and analysis of road assets at scale.",
    problem:
      "Road authorities own enormous inventories of physical assets — signs, markings, barriers, surfaces — and most of that inventory is tracked in spreadsheets and windscreen surveys. Nobody has a current picture of what exists, what condition it's in, or what needs attention first. Maintenance ends up reactive, and budgets get spent on whatever failed most recently rather than what matters most.",
    build:
      "AdAMS turns collected road data into a queryable, visual asset inventory. I led the build end to end — the data model that represents assets and their condition over time, the ingestion path that gets survey data into it, and the interface engineers actually work in. It's built at InfiniCity Labs, the smart-infrastructure startup spun out of the SMARTLab group at North Dakota State University.",
    outcome:
      "Asset condition became something you can look at rather than something you commission a survey to find out. Maintenance decisions move from reactive to planned, because the current state of the network is visible in one place.",
    highlights: [
      {
        label: "Owned end to end",
        body: "Lead developer across data model, ingestion and interface, rather than a single layer of it.",
      },
      {
        label: "Research to product",
        body: "Taken from a research prototype through to a platform engineering teams use operationally.",
      },
      {
        label: "Analysis, not just storage",
        body: "The value is in what the data tells you about condition and priority — the inventory is the starting point.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Python", "Data Visualisation"],
    links: [
      { label: "Website", href: "https://infinicitylabs.org" },
      { label: "Web app", href: "https://app.infinicitylabs.org" },
    ],
    images: [
      {
        src: "/work/adams-dashboard.png",
        alt: "AdAMS operations dashboard showing active projects, work orders and a traffic signs map",
        caption: "Operations dashboard — projects, work orders and the spatial asset overview.",
      },
      {
        src: "/work/adams-recordings.png",
        alt: "AdAMS recording library with a selected road recording and accelerometer sensor analytics",
        caption: "Recording library with per-leg road footage and synchronised sensor analytics.",
      },
      {
        src: "/work/infinicity-signin.png",
        alt: "InfiniCity Labs platform sign-in screen",
        caption: "The InfiniCity platform entry point.",
      },
    ],
    published: true,
  },
  {
    slug: "tmc",
    title: "TMC — Traffic Management Control System",
    shortTitle: "TMC",
    year: "2025",
    category: "Platform",
    org: "InfiniCity Labs · NDSU SMARTLab",
    role: "Design & development",
    summary: "Real-time traffic recording, analytics and visualisation.",
    problem:
      "Traffic decisions are usually made on data that is weeks old and averaged into uselessness. By the time a count survey is processed, the conditions it described have moved on. Operators need to see what the road is doing now, and to look back over it without waiting for a report.",
    build:
      "TMC records road and traffic conditions in real time and puts an analytics and visualisation layer directly on top of the stream. I worked on both the system design and the build, alongside AdAMS — the two share the same underlying view of the road network, so assets and traffic can be reasoned about together rather than in separate tools.",
    outcome:
      "Operators get a live picture instead of a retrospective one, and the recorded history stays queryable for longer-term analysis.",
    highlights: [
      {
        label: "Real-time first",
        body: "Built around a live stream of road and traffic conditions rather than batch-processed surveys.",
      },
      {
        label: "Shares AdAMS' network model",
        body: "Traffic and asset data describe the same roads, so they can be analysed together.",
      },
      {
        label: "Visualisation as the product",
        body: "The analytics layer is the interface — raw counts aren't the deliverable.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Python", "Data Visualisation"],
    links: [
      { label: "Website", href: "https://infinicitylabs.org" },
      { label: "Web app", href: "https://app.infinicitylabs.org" },
    ],
    images: [
      {
        src: "/work/tmc-dashboard.png",
        alt: "TMC dashboard showing camera coverage counts, an interactive camera location map and live field feeds",
        caption:
          "Operations snapshot — camera coverage, recording workload and analysis throughput, over a live camera map.",
      },
    ],
    published: true,
  },
  {
    slug: "bisonguard",
    title: "BisonGuard — Wildlife Intelligence",
    shortTitle: "BisonGuard",
    year: "2025",
    category: "Platform",
    org: "InfiniCity Labs · NDSU SMARTLab",
    role: "Full-stack developer",
    summary:
      "Herd monitoring that protects animals and keeps them off the road.",
    problem:
      "A herd spread across open range is effectively invisible between inspections, and the most dangerous thing it can do is wander onto a road. Vehicle–wildlife collisions kill animals, wreck vehicles and injure people, and by the time anyone knows a herd has drifted toward a transportation corridor it is usually already too late to act. Conservation teams and rangers needed to see where animals are continuously, not at whatever interval someone can drive out and check.",
    build:
      "BisonGuard is a command centre for a monitored range. IoT sensors, drone surveys and GPS collars feed a live picture of the herd, and a computer-vision layer runs detection across every camera in the network — classifying what it sees, counting what is in frame, and tracking individuals between sightings. Operators watch the feeds live, get alerts routed into an incident queue with SLA timers attached, and can replay any recording afterwards. On top of the live layer sits the analytics: population intelligence over time, distribution across zones, and predictive signals that flag a herd drifting toward a corridor before it reaches one.",
    outcome:
      "Monitoring moved from periodic inspection to continuous watch. The same detection pipeline that tracks herd health also serves as an early-warning system for collisions, so one platform covers both conservation and road safety.",
    highlights: [
      {
        label: "Detection across every camera",
        body: "Computer vision classifies and counts what's in frame in real time, with per-class breakdowns and zone distribution.",
      },
      {
        label: "Incidents, not just alerts",
        body: "Detections become tracked incidents with SLA timers, so a warning has an owner and a clock rather than just firing.",
      },
      {
        label: "Collision prevention",
        body: "Movement toward a transportation corridor is the signal that matters — the system is built to catch it early.",
      },
      {
        label: "Population intelligence over time",
        body: "Continuous monitoring turns into longitudinal data on herd size, distribution and behaviour.",
      },
    ],
    /* TODO: confirm — inferred from the interface (MJPEG/HLS streaming, live
       inference throughput, DigitalOcean hosting) rather than told to me. */
    tech: [
      "React",
      "TypeScript",
      "Python",
      "Computer Vision",
      "IoT & GPS Telemetry",
      "DigitalOcean",
    ],
    links: [
      { label: "Live app", href: "https://bisonguard-5yog2.ondigitalocean.app" },
    ],
    images: [
      {
        src: "/work/bisonguard-dashboard.png",
        alt: "BisonGuard dashboard showing a live camera feed with detection zones, live detection counts and per-class breakdown",
        caption: "Command centre — live feed with detection zones, class breakdown and inference throughput.",
      },
      {
        src: "/work/bisonguard-signin.png",
        alt: "BisonGuard sign-in screen",
        caption: "Sign-in for conservation teams, rangers and research institutions.",
      },
    ],
    published: true,
  },
  {
    slug: "geozone",
    title: "GeoZone",
    year: "2024",
    category: "Platform",
    org: "Academic project",
    role: "Full-stack developer",
    summary: "Attendance recording built on geofencing rather than trust.",
    problem:
      "Attendance is one of those records everyone needs and nobody wants to keep. Sign-in sheets get filled in by whoever arrives first, card readers queue at the door, and any honour-system app can be marked present from a bus. The underlying problem isn't recording attendance — it's establishing that the person marking themselves present was actually where they claimed to be.",
    build:
      "GeoZone makes location the evidence. An administrator draws a geofence around a site, and attendance can only be recorded from inside it — the device's position is checked against the boundary at the moment of sign-in, so being present is a precondition rather than a claim. Around that sits the ordinary machinery an attendance system needs: sites and their boundaries, sessions, rosters, and the record of who checked in where and when.",
    outcome:
      "Attendance stops depending on either an honour system or a queue at a card reader. The record carries its own proof, and administrators define what counts as 'here' per site rather than relying on hardware at a door.",
    highlights: [
      {
        label: "Location as the check",
        body: "Sign-in is validated against a drawn boundary, so presence is enforced rather than self-reported.",
      },
      {
        label: "Boundaries per site",
        body: "Administrators define each geofence to fit the actual place, instead of one fixed radius everywhere.",
      },
      {
        label: "No hardware at the door",
        body: "Runs on the phone people already carry — no readers, no cards, no queue.",
      },
    ],
    /* TODO: confirm — inferred from your stack, not from source. */
    tech: ["React Native", "TypeScript", "Geofencing", "Node.js"],
    links: [],
    images: [],
    published: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Solo work — built and shipped independently                               */
/* -------------------------------------------------------------------------- */

export const projects: CaseStudy[] = [
  // {
  //   slug: "applyplus",
  //   title: "ApplyPlus",
  //   year: "2025",
  //   category: "Web",
  //   role: "Design & full-stack build",
  //   summary: "Job-application automation — tailored CVs, cover letters and autofill.",
  //   problem:
  //     "Applying for jobs at any volume is mostly copying. The same details get retyped into a hundred slightly different forms, every CV needs reshaping for the posting in front of you, and every cover letter starts from a blank page. The work is repetitive enough to be automated and tedious enough that people give up before they've applied to anything.",
  //   build:
  //     "ApplyPlus keeps one structured profile per user and derives everything else from it. Paste a job posting and it reshapes the CV against that posting, drafts a matching cover letter, and fills the application form from the stored profile. I built it end to end — the profile model, the tailoring pipeline, the document generation, and the interface that ties them together — on Next.js with Firebase for auth and storage.",
  //   outcome:
  //     "What used to be an afternoon of copy-paste per application collapses into reviewing and sending. The profile stays the single source of truth, so updating one detail updates every future application rather than none of the past ones.",
  //   highlights: [
  //     {
  //       label: "One profile, many outputs",
  //       body: "A single structured record drives CV tailoring, cover-letter drafting and form autofill, so nothing is entered twice.",
  //     },
  //     {
  //       label: "Posting-aware tailoring",
  //       body: "Documents are reshaped against the specific job description rather than sent out generically.",
  //     },
  //     {
  //       label: "Built to be reviewed",
  //       body: "Everything generated is editable before it goes out — automation drafts, the user still signs off.",
  //     },
  //   ],
  //   tech: ["Next.js", "React", "TypeScript", "Firebase", "Vercel"],
  //   links: [
  //     { label: "Live site", href: "https://applyplus.vercel.app" },
  //     { label: "Source", href: "https://github.com/solo0722" },
  //   ],
  //   images: [
  //     {
  //       src: "https://ik.imagekit.io/5kwcgtj3iv/Screenshot%202025-03-20%20092831.png?updatedAt=1743466964954",
  //       alt: "ApplyPlus interface",
  //     },
  //   ],
  //   published: true,
  // },
  // {
  //   slug: "campusease",
  //   title: "CampusEase",
  //   year: "2024",
  //   category: "Mobile",
  //   role: "Team lead & full-stack developer",
  //   summary: "Services marketplace connecting KNUST students to local providers.",
  //   problem:
  //     "Campus services at KNUST ran on word of mouth. Finding someone to do laundry, grooming or academic support meant asking around a WhatsApp group and hoping. Providers had no way to be discovered beyond the students who already knew them, and students had no way to compare or verify anyone.",
  //   build:
  //     "My final-year project, and the one I led. CampusEase is a mobile-first marketplace scoped deliberately to KNUST: students browse and search providers by service type, providers hold a profile, and a rating system gives both sides something to go on. I led a team of three as full-stack developer, built the React Native client for iOS and Android, and used Firebase for realtime data and authentication.",
  //   outcome:
  //     "Delivered inside the project timeline, January to July 2024. Cross-platform delivery widened the potential reach by 50%, and Firebase held up through testing with 50+ simulated users. Discovery moved out of group chats and into something searchable.",
  //   highlights: [
  //     {
  //       label: "Led a team of three",
  //       body: "Final-year project delivered on schedule, coordinating with campus providers and students throughout.",
  //     },
  //     {
  //       label: "Cross-platform from one codebase",
  //       body: "React Native covering iOS and Android, increasing potential reach by 50%.",
  //     },
  //     {
  //       label: "Realtime by default",
  //       body: "Firebase kept listings and requests in sync, verified against 50+ simulated users.",
  //     },
  //   ],
  //   tech: ["React Native", "Expo", "Firebase", "FastAPI"],
  //   links: [
  //     { label: "Live site", href: "https://campusease.vercel.app" },
  //     { label: "Source", href: "https://github.com/solo0722" },
  //   ],
  //   images: [
  //     {
  //       src: "https://ik.imagekit.io/5kwcgtj3iv/images/Mobile%20Mockup%2009%20(2).png?updatedAt=1729791608684",
  //       alt: "CampusEase mobile screens",
  //     },
  //   ],
  //   published: true,
  // },
  // {
  //   slug: "class-assistant",
  //   title: "Class Assistant",
  //   year: "2024",
  //   category: "Web",
  //   role: "Full-stack build",
  //   summary: "Closing the communication gap in KNUST's virtual classrooms.",
  //   problem:
  //     "KNUST's move to virtual classrooms solved delivery but not conversation. Lecturers broadcast; students had no reliable channel back. Questions went unasked or scattered across personal WhatsApp numbers, and neither side had a shared record of what had been asked or answered.",
  //   build:
  //     "Class Assistant sits alongside the virtual classroom as a dedicated communication layer between students and lecturers — structured around classes rather than individuals, so context stays with the course. I built the React frontend, a Node.js API, and a PostgreSQL schema modelling classes, participants and threads.",
  //   outcome:
  //     "Course conversation gained a single home with a history, instead of living in private messages that vanished at the end of term.",
  //   highlights: [
  //     {
  //       label: "Structured by class",
  //       body: "Threads belong to a course, not a person, so context survives after the semester.",
  //     },
  //     {
  //       label: "Relational where it matters",
  //       body: "PostgreSQL models the participant graph properly rather than flattening it into documents.",
  //     },
  //     {
  //       label: "Additive, not replacing",
  //       body: "Designed to complement the existing virtual classroom instead of asking anyone to migrate.",
  //     },
  //   ],
  //   tech: ["React", "Node.js", "PostgreSQL", "Express"],
  //   links: [
  //     { label: "Live site", href: "https://class-assistant.vercel.app" },
  //     { label: "Source", href: "https://github.com/solo0722" },
  //   ],
  //   images: [
  //     {
  //       src: "https://ik.imagekit.io/5kwcgtj3iv/Screenshot%202024-11-12%20143103.png?updatedAt=1731432558974",
  //       alt: "Class Assistant interface",
  //     },
  //   ],
  //   published: true,
  // },
  // {
  //   slug: "streamline",
  //   title: "Streamline",
  //   year: "2023",
  //   category: "Web",
  //   role: "Design & build",
  //   summary: "A tech publication with a structured editorial backend.",
  //   problem:
  //     "Most personal tech blogs are either a static folder of markdown that nobody but the author can update, or a heavyweight CMS that outweighs the writing. Neither works if you want to publish regularly and let someone else edit.",
  //   build:
  //     "Streamline pairs a React frontend with Sanity as the editorial backend. Content models are defined as schemas — posts, authors, categories — so structure is enforced at the source rather than patched in the template. Editors write in Sanity Studio; the frontend renders whatever shape they publish.",
  //   outcome:
  //     "Publishing stopped requiring a deploy. The content model is explicit enough that the site layout can change without touching a single post.",
  //   highlights: [
  //     {
  //       label: "Schema-first content",
  //       body: "Posts, authors and categories are modelled in Sanity, so the frontend never guesses at shape.",
  //     },
  //     {
  //       label: "Editing without deploying",
  //       body: "Studio-based authoring means new posts go live without a build.",
  //     },
  //   ],
  //   tech: ["React", "Sanity", "Vercel"],
  //   links: [
  //     { label: "Live site", href: "https://streamline-one.vercel.app" },
  //     { label: "Source", href: "https://github.com/solo0722" },
  //   ],
  //   images: [
  //     {
  //       src: "https://ik.imagekit.io/5kwcgtj3iv/images/streamline.png?updatedAt=1685980343905",
  //       alt: "Streamline interface",
  //     },
  //   ],
  //   published: true,
  // },
  {
    slug: "moviemix",
    title: "Moviemix",
    year: "2023",
    category: "Web",
    role: "Design & build",
    summary: "Ratings, reviews and where to watch — across films and television.",
    problem:
      "Deciding what to watch means opening four tabs: one for the rating, one for the synopsis, one for reviews, one to work out which service actually has it. The information exists; it's just scattered.",
    build:
      "Moviemix pulls all of it into one view off the TMDB API — details, ratings, reviews and streaming availability on a single page per title, with search and browse across both films and TV. Built in React with a focus on getting from search to decision in as few steps as possible.",
    outcome:
      "Four tabs become one page. The interface is deliberately thin — the API does the work, the UI just gets out of the way.",
    highlights: [
      {
        label: "One page per decision",
        body: "Rating, synopsis, reviews and availability sit together rather than across four services.",
      },
      {
        label: "Film and TV in one model",
        body: "Both media types share a single browse and search path.",
      },
    ],
    tech: ["React", "TMDB API", "JavaScript"],
    links: [
      { label: "Live site", href: "https://moviemix.vercel.app" },
      { label: "Source", href: "https://github.com/solo0722" },
    ],
    images: [
      {
        src: "https://ik.imagekit.io/5kwcgtj3iv/images/moviemix.png?updatedAt=1685980275617",
        alt: "Moviemix interface",
      },
    ],
    published: true,
  },
  // {
  //   slug: "ripple",
  //   title: "Ripple",
  //   year: "2023",
  //   category: "Web",
  //   role: "Design & build",
  //   summary: "Storefront for phones and accessories on a headless commerce API.",
  //   problem:
  //     "A small retailer selling phones and accessories needs a real storefront — catalogue, cart, checkout — without taking on the maintenance burden of a self-hosted commerce platform.",
  //   build:
  //     "Ripple is a Next.js storefront on top of CommerceJS, which handles products, cart state and checkout as a service. That split let me spend the effort on the shopping experience — browsing, filtering, the cart — rather than on payment plumbing.",
  //   outcome:
  //     "A complete commerce flow with no server to maintain. Catalogue changes happen in the commerce backend and appear on the storefront without a code change.",
  //   highlights: [
  //     {
  //       label: "Headless by design",
  //       body: "CommerceJS owns products and checkout; the frontend owns the experience.",
  //     },
  //     {
  //       label: "Full purchase path",
  //       body: "Browse, filter, cart and checkout all working end to end.",
  //     },
  //   ],
  //   tech: ["Next.js", "CommerceJS", "React"],
  //   links: [
  //     { label: "Live site", href: "https://ripple-sigma.vercel.app" },
  //     { label: "Source", href: "https://github.com/solo0722" },
  //   ],
  //   images: [
  //     {
  //       src: "https://ik.imagekit.io/5kwcgtj3iv/images/ripple.png?updatedAt=1685980331800",
  //       alt: "Ripple storefront",
  //     },
  //   ],
  //   published: true,
  // },
];

/** Smaller builds — listed, not given a full case study. */
export const archive: ArchiveItem[] = [
  {
    title: "Word Finder",
    year: "2023",
    blurb: "Dictionary web app with speech recognition for spoken lookups.",
    tech: ["React", "Words API", "Web Speech API"],
    href: "https://wordfinder-gh.netlify.app",
  },
  {
    title: "Contaxts",
    year: "2023",
    blurb: "Contacts listing app built with Expo and a Sanity backend.",
    tech: ["React Native", "Expo", "Sanity"],
    href: null,
  },
  {
    title: "Deliveroo 2.0",
    year: "2023",
    blurb: "Food-delivery client rebuilt to study the ordering flow end to end.",
    tech: ["React Native", "Expo", "Sanity"],
    href: null,
  },
  {
    title: "Dotty",
    year: "2023",
    blurb: "News reader spanning sport, politics and entertainment feeds.",
    tech: ["React Native", "News API", "NativeBase"],
    href: null,
  },
  {
    title: "Image Resizer",
    year: "2022",
    blurb: "Desktop utility for batch-resizing images to arbitrary dimensions.",
    tech: ["Electron", "Node.js", "HTML/CSS"],
    href: null,
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Everything that can own a /work/[slug] route. */
const allWork: CaseStudy[] = [...projects, ...collaborations];

export const publishedWork = allWork.filter((w) => w.published);

export function getWork(slug: string): CaseStudy | undefined {
  return publishedWork.find((w) => w.slug === slug);
}

/** The next published case study, wrapping at the end. */
export function getNextWork(slug: string): CaseStudy {
  const i = publishedWork.findIndex((w) => w.slug === slug);
  return publishedWork[(i + 1) % publishedWork.length];
}
