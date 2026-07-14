// Single source of truth for all site content.
// Every value here is drawn from Harsh V Singh's own brief — no invented facts.

export const site = {
  name: "Harsh V Singh",
  monogram: "HVS",
  role: "Associate Director, Project Delivery",
  org: "Rang Digitech LLC",
  tagline: "Get the facts right — then make people care.",
  support:
    "A reporter who chased chief ministers for a quote now runs global delivery for a digital agency. Same craft: verify the fact, hit the deadline, say the complicated thing simply.",
  base: "Piscataway, New Jersey — filing daily from Vadodara & Ahmedabad, Gujarat",
  email: "singhharsh_7@yahoo.in",
  phone: "+91 95387 86693",
  phoneHref: "+919538786693",
  url: "https://harshvsingh.com",
} as const;

// Teletype datelines that cycle in the hero ticker.
export const ticker = [
  "BENGALURU · VIDHAN SOUDHA",
  "HYDERABAD · CIVIC DESK",
  "SINGAPORE EDITION · HOLLYWOOD BEAT",
  "AHMEDABAD · CONTENT DESK",
  "VADODARA · BRAND STUDIO",
  "PISCATAWAY · GLOBAL DELIVERY",
];

export type NavItem = { id: string; label: string; index: string };
export const nav: NavItem[] = [
  { id: "desk", label: "On the desk", index: "01" },
  { id: "career", label: "The beat", index: "02" },
  { id: "credentials", label: "The file", index: "03" },
  { id: "voices", label: "On the record", index: "04" },
  { id: "writing", label: "Dispatches", index: "05" },
  { id: "press", label: "In the press", index: "06" },
  { id: "contact", label: "Get in touch", index: "07" },
];

export type Stat = { figure: string; label: string; note: string };
export const stats: Stat[] = [
  { figure: "9+", label: "Years", note: "Newsroom to brand desk" },
  { figure: "13", label: "Bylines", note: "Filed in 7 days at TOI" },
  { figure: "4", label: "Continents", note: "US · UK · Canada · UAE · India" },
  { figure: "8+", label: "Group brands", note: "Content led at once" },
  { figure: "125+", label: "Certifications", note: "SEO, GenAI, brand, leadership" },
  { figure: "600+", label: "Books", note: "And 600+ films, 150+ docs" },
];

export type Capability = { title: string; body: string };
export const capabilities: Capability[] = [
  {
    title: "Global project delivery",
    body: "End-to-end ownership of a portfolio of active accounts — allocating resources and coordinating cross-functional teams through concurrent engagements across five markets.",
  },
  {
    title: "Brand strategy & reputation",
    body: "Guarding brand compliance and online reputation for every account in his care, with the same instinct for the on-the-record fact he built in the newsroom.",
  },
  {
    title: "Storytelling × SEO × applied AI",
    body: "Working at the intersection of narrative, search, and applied AI to build campaigns — the reporter's questions, pointed at a different kind of story.",
  },
  {
    title: "KPIs, not vanity metrics",
    body: "Keeping a close eye on the numbers that actually indicate whether the work is landing, and building campaigns that move them.",
  },
];

export type Dispatch = {
  dateline: string;
  role: string;
  org: string;
  body: string;
  era: "brand" | "news";
};

// Reverse-chronological — the latest dispatch first.
export const career: Dispatch[] = [
  {
    dateline: "PISCATAWAY ↔ VADODARA · 2026 – NOW · DELIVERY",
    role: "Associate Director — Project Delivery",
    org: "Rang Digitech LLC",
    body: "Owns end-to-end delivery for a portfolio of digital-marketing accounts across the US, UK, Canada, UAE and India — resourcing, coordinating teams through concurrent engagements, and protecting KPIs, brand compliance and online reputation.",
    era: "brand",
  },
  {
    dateline: "VADODARA · 2024 – 2026 · BRAND",
    role: "Brand Manager",
    org: "Rang Digitech",
    body: "Set brand strategy at the intersection of storytelling, SEO and applied AI — building campaigns measured on real numbers rather than vanity metrics.",
    era: "brand",
  },
  {
    dateline: "VADODARA · 2023 – 2024 · CONTENT",
    role: "Senior Content Writer & Head of Content",
    org: "Rang Technologies / Rang Digitech",
    body: "Led a team of SEO, social-media and design professionals across eight-plus companies inside the group.",
    era: "brand",
  },
  {
    dateline: "AHMEDABAD · CONTENT DESK",
    role: "Content Writer — pen name “Ryan Allen”",
    org: "GoodFirms (OpenXcell)",
    body: "Wrote for a global client base across software development, mobile apps, SEO, blockchain and digital marketing.",
    era: "brand",
  },
  {
    dateline: "STUDY-ABROAD DESK · EDTECH",
    role: "Manager — Creative Content & Social Media",
    org: "Kanan.Co",
    body: "Led content for Visa Crunch and academic content for KananPrep and its franchises; ran campaigns that lifted brand engagement by 40 percent.",
    era: "brand",
  },
  {
    dateline: "COMMERCIAL FUNCTION · PUBLIC RELATIONS",
    role: "Public Relations",
    org: "Jindal Saw Limited",
    body: "Coordinated with 15-plus commercial-function departments on company literature, CSR campaigns and internal communications.",
    era: "brand",
  },
  {
    dateline: "BENGALURU · NEWS VENTURE",
    role: "Co-founder & Editorial Head",
    org: "Brifly News",
    body: "Curated the news into 60-word summaries and trained a team of writers on SEO-friendly reporting.",
    era: "news",
  },
  {
    dateline: "BENGALURU · ENTERTAINMENT BUREAU",
    role: "Reporter — Hollywood beat",
    org: "International Business Times, Singapore Edition",
    body: "Covered the Hollywood beat out of Bangalore for IBT's Singapore edition.",
    era: "news",
  },
  {
    dateline: "HYDERABAD · 2018 – 2019 · CIVIC DESK",
    role: "Civic Affairs & Public-Health Reporter",
    org: "The Times of India",
    body: "Thirteen published bylines in seven days — a hospital-sanitation investigation that prompted government scrutiny, organ-donation shortfalls, road safety on Necklace Road, and political messaging in government-school notebooks.",
    era: "news",
  },
  {
    dateline: "BENGALURU · 2017 – 2019 · POLITICS BUREAU",
    role: "Political Reporter — Karnataka",
    org: "NewsX (Bangalore Bureau)",
    body: "Ran camera and OB-van operations and landed on-camera interviews with CM Siddaramaiah, former CM B. S. Yeddyurappa, KPCC president Dr. G. Parameshwara and JD(S) spokesperson Tanveer Ahmed — reporting live from the Vidhan Soudha during the presidential-election proceedings for Ram Nath Kovind.",
    era: "news",
  },
];

export type CredentialGroup = { title: string; items: string[] };
export const credentials: CredentialGroup[] = [
  {
    title: "Brand & Leadership",
    items: [
      "Create a Brand Strategy — LinkedIn Learning",
      "Brand Leadership: Building Brand and Culture — LinkedIn Learning",
      "Leadership & People Management — Semrush",
      "Leading a Marketing Team — LinkedIn Learning",
      "Communicating with Clarity as a Manager — LinkedIn Learning",
      "Nano Tips for Empathetic Leadership, India Gary-Martin — LinkedIn Learning",
    ],
  },
  {
    title: "Marketing & Account Strategy",
    items: [
      "Key Account Management — LinkedIn Learning",
      "Account Management: Maintaining Relationships — LinkedIn Learning",
      "Customer Success Management Fundamentals — LinkedIn Learning",
      "Content Led SEO, with Brian Dean — Semrush",
      "SEO Strategies — Great Learning",
      "Marketing Analytics — Great Learning",
    ],
  },
  {
    title: "Content & Generative AI",
    items: [
      "Content Marketing Fundamentals, Ashley Segura — Semrush",
      "Generative AI for Digital Marketers — LinkedIn Learning",
      "Artificial Intelligence and Business Strategy — LinkedIn Learning",
      "Writing Great Content with Gen AI That Doesn't Sound Fake — LinkedIn Learning",
      "A Content Marketer's Guide to Using ChatGPT — LinkedIn Learning",
      "Email Marketing — HubSpot Academy",
      "Content Marketing — HubSpot Academy",
    ],
  },
  {
    title: "Journalism & Media Craft",
    items: [
      "Introduction to Digital Journalism — Reuters",
      "Video Journalism: Shooting Techniques — LinkedIn Learning",
    ],
  },
  {
    title: "Culture & DEI Leadership",
    items: [
      "Rolling Out a Diversity & Inclusion Training Program — LinkedIn Learning",
      "Foundations of Diversity, Equity, Inclusion & Belonging — LinkedIn Learning",
      "Fair & Effective Interviewing for Diversity & Inclusion — LinkedIn Learning",
    ],
  },
];

export type Education = { credential: string; place: string; note?: string };
export const education: Education[] = [
  {
    credential: "MA, Journalism & AVC",
    place: "COMMITS, Bangalore",
  },
  {
    credential: "BA, Journalism",
    place: "Presidency College, Bangalore",
    note: "Promising Journalist Award, 2018",
  },
  {
    credential: "B.Com",
    place: "Garden City College",
  },
  {
    credential: "NCC “A” Certificate",
    place: "District-level football & cricket",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  feature?: boolean;
};
export const testimonials: Testimonial[] = [
  {
    quote:
      "Very rarely does one find a journalism enthusiast as passionate about journalism as Harsh. He had absolute clarity on what he wanted to do. I truly hope to see him break big stories in the future.",
    name: "Prema Sridevi",
    title: "Founder & Editor-in-Chief, The Probe · ex-Republic TV, Times Now",
    feature: true,
  },
  {
    quote: "Precise and crisp fact-finding skills — has a nose for news.",
    name: "Srirupa Goswami",
    title: "Senior Producer & Reporter, The Indian Express · ex-NDTV, CNN-News18",
  },
  {
    quote:
      "His ability to handle multiple projects was unlike anything I'd seen before. As a team member or a leader, Harsh earns my highest recommendation.",
    name: "Krishan Roy",
    title: "Founder & CEO, Motorist · ex-The Hindu, NewsX, CNN-News18",
  },
  {
    quote:
      "A strong commitment to excellence. His vast pool of knowledge makes him a cut above the rest, along with his ability to think strategically and deliver his best at all times.",
    name: "Srijanee Majumdar",
    title: "Journalist, Hindustan Times · ex-Mid-Day, Republic Media",
  },
  {
    quote:
      "A well-read, well-aware and confident student who held forth on views based on solid research — not cursory information gleaned off the internet.",
    name: "Dr. K Sai Prasad",
    title: "Dean, COMMITS Bangalore",
  },
  {
    quote:
      "Harsh consistently delivers high-quality content that exceeds our expectations, with a remarkable ability to communicate complex ideas in a clear and engaging manner.",
    name: "Kenneth Rivas",
    title: "Director of Business Development, American Consultants",
  },
  {
    quote:
      "His meticulous proofreading and insightful feedback significantly enhance the quality of his work — engaging and error-free, reflecting positively on the company's image.",
    name: "Alma Halilovic",
    title: "UX Designer, Tech Fleet · ex-Rang Technologies",
  },
  {
    quote:
      "He sits quietly, observes everything, and speaks only when it adds value. He produced a lot of great news stories, excelled in all his coursework, and he's street-smart.",
    name: "Jyotsna Bharti",
    title: "Journalist & Content Producer · ex-Kashmir Observer",
  },
  {
    quote:
      "An exceptional student with a passion for journalism, pursued with a rare combination of boldness, empathy and hard work. I have no hesitation in recommending him.",
    name: "Shibu Immanuel",
    title: "L&D Lead, EssentiallySports",
  },
  {
    quote: "Has a big heart for the news. An amazing counterpart to work with.",
    name: "Azam Rafiq Sait",
    title: "Co-founder, Brifly News · ex-British Herald",
  },
  {
    quote:
      "His passion for learning is truly inspiring. His dedication and creativity made a real impact on the team.",
    name: "Isha Chatterjee",
    title: "PR & Communications Manager · ex-Adfactors PR",
  },
  {
    quote:
      "He prepared comprehensive project reports well worth reading, and achieved significant results. We wish him great success in his further assignments.",
    name: "VK Singh",
    title: "General Manager, Jindal Group",
  },
];

export type Column = {
  name: string;
  handle: string;
  href: string;
  body: string;
};
export const writing: Column[] = [
  {
    name: "Substack",
    handle: "singhharsh7.substack.com",
    href: "https://singhharsh7.substack.com/",
    body: "Long-form dispatches on brand, media and the craft of getting attention honestly.",
  },
  {
    name: "Medium",
    handle: "@singhharsh_7",
    href: "https://medium.com/@singhharsh_7",
    body: "Essays and field notes from nine years across the newsroom and the brand desk.",
  },
];

export type PressItem = {
  outlet: string;
  title: string;
  meta: string;
  href?: string;
};
export const press: PressItem[] = [
  {
    outlet: "British Herald",
    title:
      "Narendra Modi Wins Reader's Poll for World's Most Powerful Person 2019",
    meta: "Jun 16, 2019 · went viral",
    href: "https://web.archive.org/web/20190629011422/https://www.britishherald.com/narendra-modi-wins-readers-poll-for-worlds-most-powerful-person-2019/",
  },
  {
    outlet: "International Business Times · Singapore",
    title: "Reporter archive — Hollywood beat",
    meta: "ibtimes.sg",
    href: "https://www.ibtimes.sg/reporters/harsh-v-singh",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "Dirt, dump & filth: Ailing state-run hospitals need booster dose",
    meta: "Civic affairs & public health",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "On Necklace Road, bikers run over safety",
    meta: "Road safety investigation",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "Notebooks with K Chandrasekhar Rao's photo draw activists' ire",
    meta: "Politics in government-school notebooks",
  },
];

export type CurrentlyItem = {
  figure: string;
  label: string;
  href: string;
  handle: string;
};
export const currently: CurrentlyItem[] = [
  {
    figure: "600+",
    label: "Books read",
    href: "https://www.goodreads.com/user/show/32236563-harsh-singh",
    handle: "Goodreads",
  },
  {
    figure: "600+",
    label: "Films watched",
    href: "https://www.imdb.com/user/p.rjltoqae2ghta4x5g2ihe3hyxy?ref_=ext_shr_lnk",
    handle: "IMDb",
  },
  {
    figure: "150+",
    label: "Documentaries",
    href: "https://www.imdb.com/user/p.rjltoqae2ghta4x5g2ihe3hyxy?ref_=ext_shr_lnk",
    handle: "IMDb",
  },
];

export type Social = { label: string; href: string };
export const socials: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/singhharsh7/" },
  { label: "X (Twitter)", href: "https://x.com/singhharsh_7" },
  { label: "Instagram", href: "https://www.instagram.com/singhharsh_7/" },
  { label: "Facebook", href: "https://www.facebook.com/HarshOnRocks" },
  { label: "Quora", href: "https://www.quora.com/profile/Harsh-V-Singh-9" },
  { label: "Substack", href: "https://singhharsh7.substack.com/" },
  { label: "Medium", href: "https://medium.com/@singhharsh_7" },
  {
    label: "Goodreads",
    href: "https://www.goodreads.com/user/show/32236563-harsh-singh",
  },
];

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  {
    q: "Where are you based?",
    a: "Piscataway, New Jersey on paper — but I run delivery day-to-day from Rang's Vadodara and Ahmedabad offices in Gujarat, across US, UK, Canada, UAE and India time zones.",
  },
  {
    q: "What do you actually do now?",
    a: "I own end-to-end delivery for a portfolio of digital-marketing accounts — allocating resources, coordinating teams through concurrent engagements, and protecting KPIs, brand compliance and online reputation for every account in my care.",
  },
  {
    q: "You were a journalist — how does that help brand work?",
    a: "It's the same fuel: get the facts right, then make people care. Verify the fact, hit the deadline, say the complicated thing simply. I've just aimed it at a different kind of story.",
  },
  {
    q: "Who have you interviewed?",
    a: "Sitting and former chief ministers, a former prime minister, Indian ambassadors, foreign MPs, MLAs, MLCs, RTI commissioners, actors and singers — and Nobel laureate Kailash Satyarthi.",
  },
  {
    q: "Are you open to a conversation?",
    a: "Yes — whether it's delivery leadership, brand strategy, or a byline. The fastest way to reach me is email or LinkedIn, below.",
  },
];

// Drop a photo at each `src` path inside /public and it appears automatically.
// Until then the tile renders as a styled archive frame — no broken images.
export type Plate = { no: string; src: string; caption: string };
export const fieldNotes: Plate[] = [
  { no: "01", src: "/field-notes/plate-01.jpg", caption: "The floor of the Vidhan Soudha, Bengaluru" },
  { no: "02", src: "/field-notes/plate-02.jpg", caption: "Civic desk — Hyderabad" },
  { no: "03", src: "/field-notes/plate-03.jpg", caption: "OB van, on assignment" },
  { no: "04", src: "/field-notes/plate-04.jpg", caption: "The brand studio — Vadodara" },
  { no: "05", src: "/field-notes/plate-05.jpg", caption: "On the road, South India" },
  { no: "06", src: "/field-notes/plate-06.jpg", caption: "Field note, undated" },
];
