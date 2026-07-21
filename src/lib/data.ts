// Single source of truth for all site content.
// Every value here is drawn from Harsh V Singh's own brief, no invented facts.

export const site = {
  name: "Harsh V Singh",
  monogram: "HVS",
  role: "Associate Director, Project Delivery",
  org: "Rang Digitech LLC",
  tagline: "Get the facts right, then make people care.",
  support:
    "A reporter who chased chief ministers for a quote now runs global delivery for a digital agency. Same craft: verify the fact, hit the deadline, say the complicated thing simply.",
  base: "Piscataway, New Jersey, filing daily from Vadodara & Ahmedabad, Gujarat",
  email: "singhharsh_7@yahoo.in",
  phone: "+91 95387 86693",
  phoneHref: "+919538786693",
  url: "https://harshvsingh.in",
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
  { id: "about", label: "About", index: "01" },
  { id: "desk", label: "On the desk", index: "02" },
  { id: "career", label: "The beat", index: "03" },
  { id: "credentials", label: "The file", index: "04" },
  { id: "voices", label: "On the record", index: "05" },
  { id: "writing", label: "Dispatches", index: "06" },
  { id: "press", label: "In the press", index: "07" },
  { id: "contact", label: "Get in touch", index: "08" },
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
    body: "End-to-end ownership of a portfolio of active accounts, allocating resources and coordinating cross-functional teams through concurrent engagements across five markets.",
  },
  {
    title: "Brand strategy & reputation",
    body: "Guarding brand compliance and online reputation for every account in his care, with the same instinct for the on-the-record fact he built in the newsroom.",
  },
  {
    title: "Storytelling × SEO × applied AI",
    body: "Working at the intersection of narrative, search, and applied AI to build campaigns: the reporter's questions, pointed at a different kind of story.",
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

// Reverse-chronological, the latest dispatch first.
export const career: Dispatch[] = [
  {
    dateline: "PISCATAWAY ↔ VADODARA · 2026 - NOW · DELIVERY",
    role: "Associate Director, Project Delivery",
    org: "Rang Digitech LLC",
    body: "Owns end-to-end delivery for a portfolio of digital marketing accounts across the US, UK, Canada, UAE, and India, resourcing, coordinating teams through concurrent engagements, and protecting KPIs, brand compliance and online reputation.",
    era: "brand",
  },
  {
    dateline: "VADODARA · 2024 - 2026 · BRAND",
    role: "Brand Manager",
    org: "Rang Digitech",
    body: "Set brand strategy at the intersection of storytelling, SEO, and applied AI, building campaigns measured on real numbers rather than vanity metrics.",
    era: "brand",
  },
  {
    dateline: "VADODARA · 2023 - 2024 · CONTENT",
    role: "Senior Content Writer & Head of Content",
    org: "Rang Technologies / Rang Digitech",
    body: "Led a team of SEO, social media and design professionals across eight-plus companies inside the group.",
    era: "brand",
  },
  {
    dateline: "AHMEDABAD · CONTENT DESK",
    role: "Content Writer, pen name “Ryan Allen”",
    org: "GoodFirms (OpenXcell)",
    body: "Wrote for a global client base across software development, mobile apps, SEO, blockchain and digital marketing.",
    era: "brand",
  },
  {
    dateline: "STUDY-ABROAD DESK · EDTECH",
    role: "Manager, Creative Content & Social Media",
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
    role: "Reporter, Hollywood beat",
    org: "International Business Times, Singapore Edition",
    body: "Covered the Hollywood beat out of Bangalore for IBT's Singapore edition.",
    era: "news",
  },
  {
    dateline: "HYDERABAD · 2018 - 2019 · CIVIC DESK",
    role: "Civic Affairs & Public-Health Reporter",
    org: "The Times of India",
    body: "Thirteen published bylines in seven days, a hospital sanitation investigation that prompted government scrutiny, organ-donation shortfalls, road safety on Necklace Road, and political messaging in government-school notebooks.",
    era: "news",
  },
  {
    dateline: "BENGALURU · 2017 - 2019 · POLITICS BUREAU",
    role: "Political Reporter, Karnataka",
    org: "NewsX (Bangalore Bureau)",
    body: "Ran camera and OB-van operations and landed on-camera interviews with CM Siddaramaiah, former CM B. S. Yeddyurappa, KPCC president Dr. G. Parameshwara and JD(S) spokesperson Tanveer Ahmed, reporting live from the Vidhan Soudha during the presidential-election proceedings for Ram Nath Kovind.",
    era: "news",
  },
];

export type CredentialGroup = { title: string; items: string[] };
export const credentials: CredentialGroup[] = [
  {
    title: "Brand & Leadership",
    items: [
      "Create a Brand Strategy - LinkedIn Learning",
      "Brand Leadership: Building Brand and Culture - LinkedIn Learning",
      "Leadership & People Management - Semrush",
      "Leading a Marketing Team - LinkedIn Learning",
      "Communicating with Clarity as a Manager - LinkedIn Learning",
      "Nano Tips for Empathetic Leadership, India Gary-Martin - LinkedIn Learning",
    ],
  },
  {
    title: "Marketing & Account Strategy",
    items: [
      "Key Account Management - LinkedIn Learning",
      "Account Management: Maintaining Relationships - LinkedIn Learning",
      "Customer Success Management Fundamentals - LinkedIn Learning",
      "Content Led SEO, with Brian Dean - Semrush",
      "SEO Strategies - Great Learning",
      "Marketing Analytics - Great Learning",
    ],
  },
  {
    title: "Content & Generative AI",
    items: [
      "Content Marketing Fundamentals, Ashley Segura - Semrush",
      "Generative AI for Digital Marketers - LinkedIn Learning",
      "Artificial Intelligence and Business Strategy - LinkedIn Learning",
      "Writing Great Content with Gen AI That Doesn't Sound Fake - LinkedIn Learning",
      "A Content Marketer's Guide to Using ChatGPT - LinkedIn Learning",
      "Email Marketing - HubSpot Academy",
      "Content Marketing - HubSpot Academy",
    ],
  },
  {
    title: "Journalism & Media Craft",
    items: [
      "Introduction to Digital Journalism - Reuters",
      "Video Journalism: Shooting Techniques - LinkedIn Learning",
    ],
  },
  {
    title: "Culture & DEI Leadership",
    items: [
      "Rolling Out a Diversity & Inclusion Training Program - LinkedIn Learning",
      "Foundations of Diversity, Equity, Inclusion & Belonging - LinkedIn Learning",
      "Fair & Effective Interviewing for Diversity & Inclusion - LinkedIn Learning",
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
      "Very rarely does one find a journalism enthusiast as passionate about journalism as Harsh. He stood out among his peers in college because he was very focused and had absolute clarity on what he wanted to do. Harsh will be an asset to any company that hires him. I truly hope to see him break big stories in the future.",
    name: "Prema Sridevi",
    title: "Founder & Editor-in-Chief, The Probe · ex-Republic TV, Times Now",
    feature: true,
  },
  {
    quote:
      "One of my first impressions of Harsh was of a silent observer who internalised everything without letting out much. In the days to come he proved a well-read, well-aware and confident student who held forth on views based on solid research, not cursory information gleaned off the internet. His well-balanced views put him well above the rest of the class, earning him a well-deserved run with The Times of India.",
    name: "Dr. K Sai Prasad",
    title: "PhD, MPhil, PGDJMC, MBA, Dean, COMMITS Bangalore",
  },
  {
    quote: "Precise and crisp fact-finding skills, has a nose for news.",
    name: "Srirupa Goswami",
    title:
      "Senior Producer & Reporter, The Indian Express · ex-NDTV, CNN-News18, The Times of India",
  },
  {
    quote:
      "I rarely come across real talents who stand out like Harsh. His ability to handle multiple projects was unlike anything I'd seen before, managing events, planning shoots and assigning work to achieve a common goal. As a team member or a leader, Harsh earns my highest recommendation.",
    name: "Krishan Roy",
    title: "Founder & CEO, Motorist · ex-The Hindu, NewsX, CNN-News18",
  },
  {
    quote:
      "As a journalist, Harsh has consistently demonstrated a strong commitment to excellence. His vast pool of knowledge on several subjects makes him a cut above the rest, along with his ability to think strategically and deliver his best at all times. During college I was quite intimidated by his presence, he was the guy who seemed to know everything, and honestly, it was so cool.",
    name: "Srijanee Majumdar",
    title: "Journalist, Hindustan Times · ex-Mid-Day, Republic Media, Sportskeeda",
  },
  {
    quote:
      "Harsh consistently delivers high-quality content that exceeds our expectations. His attention to detail, creativity and dedication shine through in his work, with a remarkable ability to communicate complex ideas in a clear and engaging manner. His contributions have greatly enriched our team.",
    name: "Kenneth Rivas",
    title: "Director of Business Development, American Consultants",
  },
  {
    quote:
      "His meticulous proofreading and insightful feedback significantly enhance the quality of his work, engaging and error-free, reflecting positively on the company's image. His ability to understand and adapt to various writing styles makes him an invaluable asset.",
    name: "Alma Halilovic",
    title: "UX Designer, Tech Fleet · ex-Rang Technologies",
  },
  {
    quote:
      "Harsh is very hardworking and was known in college for his innovative thinking. He sits quietly, observes everything, and speaks only when it adds value. He produced a lot of great news stories, excelled in all his coursework, and he's street-smart.",
    name: "Jyotsna Bharti",
    title: "Journalist & Content Producer · ex-Kashmir Observer",
  },
  {
    quote:
      "An exceptional student with a passion for political science, journalism and literature, pursued with a rare combination of boldness, empathy and hard work. I watched Harsh launch his career interviewing some of the most prominent figures in Indian media, politics and entertainment, always curious, always seeking out new perspectives. I have no hesitation in recommending him.",
    name: "Shibu Immanuel",
    title: "BA, LLB, L&D Lead, EssentiallySports · ex-Brifly News",
  },
  {
    quote:
      "Has a big heart for the news. An amazing counterpart to work with, sharing experiences and knowledge.",
    name: "Azam Rafiq Sait",
    title: "Dorothy Foods · co-founder, Brifly News · ex-British Herald",
  },
  {
    quote:
      "Harsh is a talented content writer. He consistently delivers high-quality content and meets deadlines with precision. I highly recommend him for his exceptional writing skills.",
    name: "Vishal Pandya",
    title: "Product Designer, AppVentory · ex-OpenXcell, Space-O Technologies",
  },
  {
    quote:
      "Harsh has always been an avid reader, and his passion for learning is truly inspiring. We worked together for a brief period at Brifly, where his dedication and creativity made a real impact on the team.",
    name: "Isha Chatterjee",
    title: "PR Manager, Jajabor Brand Consultancy · ex-Adfactors PR",
  },
  {
    quote:
      "He completed a 50-day internship in the commercial function and gained substantial exposure to applied commerce. He prepared comprehensive project reports well worth reading, achieving significant results. We wish him great success in his further assignments.",
    name: "VK Singh",
    title: "General Manager, Jindal Group · 39 years in executive leadership",
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
  img?: string; // clipping thumbnail
};
export const press: PressItem[] = [
  {
    outlet: "British Herald",
    title:
      "Narendra Modi Wins Reader's Poll for World's Most Powerful Person 2019",
    meta: "Jun 16, 2019 · went viral",
    href: "https://web.archive.org/web/20190629011422/https://www.britishherald.com/narendra-modi-wins-readers-poll-for-worlds-most-powerful-person-2019/",
    img: "/field-notes/press-british-herald.jpg",
  },
  {
    outlet: "International Business Times · Singapore",
    title: "Reporter archive, Hollywood beat",
    meta: "ibtimes.sg",
    href: "https://www.ibtimes.sg/reporters/harsh-v-singh",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "Dirt, dump & filth: Ailing state-run hospitals need booster dose",
    meta: "Civic affairs & public health",
    href: "https://timesofindia.indiatimes.com/city/hyderabad/dirt-dump-filth-ailing-state-run-hospitals-need-booster-dose/articleshow/70849241.cms",
    img: "/field-notes/press-toi-hospitals.jpg",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "On Necklace Road, bikers run over safety",
    meta: "Road safety investigation",
    href: "https://timesofindia.indiatimes.com/city/hyderabad/on-necklace-rd-bikers-run-over-safety/articleshow/70268116.cms",
    img: "/field-notes/press-toi-necklace.jpg",
  },
  {
    outlet: "Times of India · Hyderabad",
    title: "Notebooks with K Chandrasekhar Rao's photo draw activists' ire",
    meta: "Politics in government-school notebooks",
    href: "https://timesofindia.indiatimes.com/city/hyderabad/notebooks-with-kcrs-photo-draws-activists-ire/articleshow/70882866.cms",
    img: "/field-notes/press-toi-notebooks.jpg",
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
    q: "Who is Harsh V Singh?",
    a: "Harsh V Singh is Associate Director, Project Delivery at Rang Digitech LLC, and a former news reporter for the Times of India, International Business Times (Singapore Edition), NewsX and British Herald. He now leads global digital marketing delivery while continuing to write independently on geopolitics, marketing, life and long-form narrative.",
  },
  {
    q: "What does Harsh V Singh do at Rang Digitech?",
    a: "He owns end-to-end project delivery for a global portfolio of digital marketing accounts spanning the US, UK, Canada, UAE, and India, managing cross-functional teams, resource allocation, KPIs and brand compliance across concurrent client engagements.",
  },
  {
    q: "Where has Harsh V Singh worked as a journalist?",
    a: "He reported for the Times of India in Hyderabad (civic affairs and public health), International Business Times, Singapore Edition (Hollywood beat), NewsX's Bangalore bureau (Karnataka state politics), and contributed to British Herald.",
  },
  {
    q: "What is Harsh V Singh's educational background?",
    a: "He holds an MA in Journalism and Audio-Visual Communication, a BA in Journalism from Presidency College Bangalore (Promising Journalist Award, 2018), and a B.Com from Garden City College, alongside 125-plus professional certifications in digital marketing, SEO and generative AI.",
  },
  {
    q: "Which high-profile figures has Harsh V Singh interviewed?",
    a: "Over his journalism career, he has interviewed a former Prime Minister of India, sitting and former Chief Ministers of Karnataka, Indian ambassadors, Members of Parliament and state legislators, and RTI commissioners.",
  },
  {
    q: "What is Harsh V Singh's area of professional expertise?",
    a: "His expertise centers on leadership and cross-functional team management, having led content, SEO, social media and design professionals across eight-plus companies before rising to Associate Director. He combines this with digital marketing project delivery, brand strategy, SEO and executive-level communications, sharpened by a background in investigative journalism and public relations, where clear, persuasive communication under pressure was the daily requirement.",
  },
  {
    q: "Does Harsh V Singh hold marketing or SEO certifications?",
    a: "Yes. He holds certifications from LinkedIn Learning, Semrush, HubSpot Academy, Google, Great Learning and Reuters, covering brand strategy, SEO, generative AI for marketers and account management.",
  },
  {
    q: "What companies has Harsh V Singh worked with?",
    a: "His career spans Rang Digitech, Rang Technologies, GoodFirms (via OpenXcell), Kanan.co, Jindal Saw Limited, Brifly News, the Times of India, International Business Times and NewsX.",
  },
  {
    q: "What kind of content does Harsh V Singh write today?",
    a: "He publishes long-form journalism and personal narrative on Substack and Medium, covering geopolitics, policy and brand strategy, drawing on his reporting background.",
  },
  {
    q: "Where is Harsh V Singh based?",
    a: "He is based in Vadodara, Gujarat, India, and also works out of Rang Digitech's Ahmedabad office while leading delivery teams across multiple countries.",
  },
  {
    q: "What is Harsh V Singh known for as a journalist?",
    a: "He is known for investigative civic reporting, including a Times of India exposé on sanitation failures across three Hyderabad government hospitals, and for securing on-camera interviews with senior Karnataka political leaders during his time at NewsX.",
  },
  {
    q: "What awards or recognitions has Harsh V Singh received?",
    a: "He received the “Architect of Success” award at Rang Digitech's AGM Flare 2024, delivered the closing speech at Rang Group's AGM 2025, was named Promising Journalist in 2018 during his undergraduate studies at Presidency College, Bangalore, and holds a National Cadet Corps (NCC) “A” Certificate.",
  },
  {
    q: "Who has Harsh V Singh interviewed or met throughout his career?",
    a: "Beyond his formal reporting assignments, Harsh has interviewed and met a wide range of public figures, from Supreme Court justices and Members of Parliament to authors, actors and cricketers, each documented with the actual story behind the encounter in his photo journal above, rather than as a name list.",
  },
  {
    q: "How is Harsh V Singh's writing style different from typical marketing content?",
    a: "His writing carries a reporter's discipline, verified facts, sourced claims and narrative pacing, applied to brand strategy and corporate communications instead of daily news.",
  },
  {
    q: "What is Harsh V Singh's professional philosophy?",
    a: "Get the facts right, then make people care. The same principle that drove his investigative journalism now shapes how he builds brand strategy and campaigns that move measurable results.",
  },
  {
    q: "How can I connect with Harsh V Singh?",
    a: "He's reachable via LinkedIn, by phone at +91 95387 86693, or by email at singhharsh_7@yahoo.in. His writing is published on Substack and Medium.",
  },
];

// ---------------------------------------------------------------
// THE PHOTO JOURNAL, real encounters, each with the story behind
// it. Entries with `src` render as photo plates (drop Harsh's own
// frame at that path in /public to replace the placeholder scene);
// entries with `story` render as archive cards.
// ---------------------------------------------------------------
export type JournalEntry = {
  meta: string; // dateline, place · date · assignment
  name: string;
  story?: string;
  src?: string;
};

export const journal: JournalEntry[] = [
  {
    meta: "The Lalit Ashok · Bangalore",
    name: "Chitra Subramaniam",
    story:
      "Met and spoke with the journalist whose investigative reporting first broke open the Bofors-India Howitzer deal.",
    src: "/field-notes/chitra-subramaniam.jpg",
  },
  {
    meta: "Bangalore · Jan 20, 2016",
    name: "Justice N. Santosh Hegde",
    story:
      "Asked the former Supreme Court judge and Karnataka Lokayukta directly whether the Rajya Sabha needed reform. His answer, that the Upper House was built as an intellectual check on the Lok Sabha but had become a seat people could effectively buy, stuck with me long after the interview ended.",
    src: "/field-notes/santosh-hegde.jpg",
  },
  {
    meta: "On the beat · Bangalore",
    name: "The second floor, Vidhan Soudha",
    src: "/field-notes/vidhan-soudha.jpg",
  },
  {
    meta: "Bangalore",
    name: "Chetan Bhagat",
    story:
      "Read 2 States on a friend's recommendation in 2011. Seven years later, sat beside its author asking him questions for a story. He signed off with a note thanking me for entering the reading world. Full circle, the kind journalism occasionally hands you.",
    src: "/field-notes/chetan-bhagat.jpg",
  },
  {
    meta: "Hyderabad",
    name: "VVS Laxman",
    story:
      "Told him thank you, for carrying Indian cricket through the match-fixing years, and for that Kolkata Test against Australia alongside Rahul Dravid in particular. He smiled, acknowledged it kindly, signed an autograph for my father, and posed for a quick selfie before he had to rush off. Genuinely humble, exactly as advertised.",
    src: "/field-notes/vvs-laxman.jpg",
  },
  {
    meta: "Bangalore · Sep 6, 2018",
    name: "Teesta Setalvad",
    story:
      "In conversation with the civil-rights activist and journalist. She wrote a note afterward: questioning and scepticism are the hallmark of the profession, and overcoming fear and intimidation comes with the territory. A line worth keeping on the wall of anyone who reports for a living.",
    src: "/field-notes/teesta-setalvad.jpg",
  },
  {
    meta: "Delhi HC · Supreme Court",
    name: "Justice Siddharth Mridul & Justice R.K. Agrawal",
    story:
      "Interviewed Justice Siddharth Mridul of the Delhi High Court and Justice R.K. Agrawal of the Supreme Court of India on judicial and constitutional matters.",
    src: "/field-notes/justices-mridul-agrawal.jpg",
  },
  {
    meta: "COMMITS alumna",
    name: "Prema Sridevi",
    story:
      "With the then News & Special Projects Editor at Republic TV, an alumna of my college.",
    src: "/field-notes/prema-sridevi.jpg",
  },
  {
    meta: "Bangalore · before GE 2019",
    name: "At the Google News Initiative",
    src: "/field-notes/google-news-initiative.jpg",
  },
  {
    meta: "On camera · Bangalore",
    name: "Chidanand Rajghatta",
    story:
      "Interviewed the foreign correspondent and author on the craft of journalism, on the record, on camera. He later wrote Illiberal India: Gauri Lankesh and the Age of Unreason.",
    src: "/field-notes/chidanand-rajghatta.jpg",
  },
  {
    meta: "Bangalore Literature Festival",
    name: "Pavan K. Varma",
    story:
      "Second meeting with the former diplomat and MP, who personally translated a collection of Atal Bihari Vajpayee's poetry. Asked him directly whether Vajpayee himself had requested the translation. He confirmed it, a phone call, a personal ask, exactly as the story had always gone.",
    src: "/field-notes/pavan-k-varma.jpg",
  },
  {
    meta: "College alumna",
    name: "Faye D'Souza",
    story: "With the former Editor-in-Chief of Mirror Now, an alumna of my college.",
    src: "/field-notes/faye-dsouza.jpg",
  },
  {
    meta: "Bangalore Literature Festival",
    name: "R. Aravamudan",
    story:
      "Former director of the Satish Dhawan Space Centre and the ISRO Satellite Centre, one of Dr. Vikram Sarabhai's first handpicked engineers in 1962, senior to Dr. APJ Abdul Kalam, and the man who recruited scientist S. Nambi Narayanan.",
    src: "/field-notes/r-aravamudan.jpg",
  },
  {
    meta: "Police HQ · Bangalore · NewsX",
    name: "CM Siddaramaiah",
    story:
      "Covered a media briefing with the Karnataka Chief Minister alongside the state's senior IPS cadre, part of ongoing NewsX coverage of Karnataka state politics.",
    src: "/field-notes/siddaramaiah.jpg",
  },
  {
    meta: "Benson Town · Bangalore · NewsX",
    name: "Tanveer Ahmed",
    story:
      "Recorded on-camera bytes from the JD(S) national spokesperson on two developing state political issues, one of several assignments covering Karnataka's opposition politics that season.",
    src: "/field-notes/tanveer-ahmed.jpg",
  },
  {
    meta: "Fortune Park JP Celestial · #NewsX",
    name: "Taking the byte",
    story: "With Sathish Kumar, on two developing issues.",
    src: "/field-notes/tanveer-byte.jpg",
  },
  {
    meta: "Bangalore",
    name: "Praveen Shetty",
    story:
      "Recorded a byte from Praveen Shetty of the pro-Kannada organization Karnataka Rakshana Vedike.",
    src: "/field-notes/praveen-shetty.jpg",
  },
  {
    meta: "A small cabin",
    name: "Subir Ghosh",
    story:
      "An unexpected, challenging interview with the author of Gas Wars: Crony Capitalism and the Ambanis, a book that landed back in the spotlight when Delhi CM Arvind Kejriwal took on Mukesh Ambani and Reliance Industries.",
    src: "/field-notes/subir-ghosh.jpg",
  },
  {
    meta: "Leela Palace · Bangalore · BPF 2016",
    name: "Raj Shekhar",
    story:
      "Friendly conversation with the lyricist and poet who made his Bollywood debut writing for Tanu Weds Manu. Success brought more work his way, he said, but the field stays difficult regardless. Everyone's still fighting their own version of the same struggle.",
    src: "/field-notes/raj-shekhar.jpg",
  },
  {
    meta: "Gokulam Grand · Sep 17, 2017",
    name: "Armaan Malik",
    story: "Interviewed the singer ahead of a performance in Bangalore.",
    src: "/field-notes/armaan-malik.jpg",
  },
  {
    meta: "Bangalore · BMTC",
    name: "Between assignments",
    src: "/field-notes/between-assignments.jpg",
  },
  {
    meta: "Bangalore",
    name: "Ashwini Iyer Tiwari",
    story:
      "Caught the Filmfare-winning director of Nil Battey Sannata, Bareilly Ki Barfi and Panga for a quick interview. Fifteen minutes in a chaotic, crowded space, and her warmth still came through completely unhurried.",
    src: "/field-notes/ashwini-iyer-tiwari.jpg",
  },
  {
    meta: "Sapna Book House · Koramangala",
    name: "Sachin Garg",
    story:
      "A casual Facebook exchange turned into a personal invite: the author messaging to check if I was in Bangalore, then inviting me to his launch event. Showed up as promised.",
    src: "/field-notes/sachin-garg.jpg",
  },
  {
    meta: "Bangalore",
    name: "Ashwin Sanghi",
    story: "With the author.",
    src: "/field-notes/ashwin-sanghi.jpg",
  },
  {
    meta: "21st Chief of the Army Staff",
    name: "General J.J. Singh",
    story:
      "Met the general closely associated with the planning and execution of the Kargil War, the public face of the Indian Army as ADGMO for a generation that grew up watching those broadcasts.",
    src: "/field-notes/jj-singh.jpg",
  },
  {
    meta: "London",
    name: "Virendra Sharma",
    story: "Friendly conversation with the Labour MP, following an interview.",
    src: "/field-notes/virendra-sharma.jpg",
  },
  {
    meta: "At his residence · Bangalore",
    name: "M.V. Rajeev Gowda",
    story:
      "Met the Member of Parliament, Rajya Sabha, and INC national spokesperson at his residence.",
    src: "/field-notes/mv-rajeev-gowda.jpg",
  },
  {
    meta: "Bangalore",
    name: "Shailesh Gandhi",
    story:
      "Heard the Right to Information activist and former Central Information Commissioner speak on threats to the RTI Act. The only RTI activist to have served as a Central Information Commissioner, he disposed of over 20,000 cases in two years and nine months.",
    src: "/field-notes/shailesh-gandhi.jpg",
  },
  {
    meta: "Gandhi Bhavan · Bangalore",
    name: "Jayaprakash Narayan",
    story:
      "Discussed journalism, the Right to Information Act and governance with the founder and president of the Lok Satta Party.",
    src: "/field-notes/jayaprakash-narayan.jpg",
  },
  {
    meta: "Rashtriya Sanskriti Mahotsav",
    name: "Warsi Brothers",
    story:
      "With the Qawwali singers of Hyderabad, Nazeer Ahmed Khan Warsi and Naseer Ahmed Khan Warsi, along with accompanists.",
    src: "/field-notes/warsi-brothers.jpg",
  },
  {
    meta: "Bangalore Literature Festival",
    name: "Manu S. Pillai",
    story:
      "Met the author and former chief of staff to Shashi Tharoor, around his book Rebel Sultans: The Deccan from Khilji to Shivaji.",
    src: "/field-notes/manu-s-pillai.jpg",
  },
  {
    meta: "Bangalore Literature Festival",
    name: "Mukund Padmanabhan",
    story: "A good chat with the Editor of The Hindu.",
    src: "/field-notes/mukund-padmanabhan.jpg",
  },
  {
    meta: "Bangalore",
    name: "Ramu Patil",
    story: "With the Chief of News Bureau, The New Indian Express.",
    src: "/field-notes/ramu-patil.jpg",
  },
  {
    meta: "NSoJ · Bangalore",
    name: "Aditya Sondhi",
    story:
      "Discussed defamation law and India-Pakistan relations with the senior advocate of the Karnataka High Court.",
    src: "/field-notes/aditya-sondhi.jpg",
  },
  {
    meta: "Madras Café · Airlift",
    name: "Prakash Belawadi",
    story: "With the actor.",
    src: "/field-notes/prakash-belawadi.jpg",
  },
  {
    meta: "Mirchi 95 · Bangalore",
    name: "RJ Ridhi",
    story: "With Ridhi Shah, iamridhiculous, while she hosts the show.",
    src: "/field-notes/rj-ridhi.jpg",
  },
  {
    meta: "At his house · Bangalore",
    name: "A.M.R. Ramesh",
    story:
      "Met the director who has worked across Kannada, Tamil, Telugu and Malayalam cinema and rose to prominence with Cyanide, then at work on a biopic of Bengaluru DIG (Prisons) D. Roopa.",
    src: "/field-notes/amr-ramesh.jpg",
  },
  {
    meta: "On assignment",
    name: "With the camera",
    src: "/field-notes/with-the-camera.jpg",
  },
];

// ---------------------------------------------------------------
// ABOUT, the long version
// ---------------------------------------------------------------
export const aboutParas: string[] = [
  "Harsh V Singh spent his twenties chasing chief ministers for a quote and hospital corridors for a story. Today he runs global project delivery for Rang Digitech LLC, Associate Director since April 2026, based out of Piscataway, New Jersey, running his team day-to-day from Rang's Vadodara and Ahmedabad offices in Gujarat, leading delivery for a cross-functional team that manages client relationships and campaign execution across the US, UK, Canada, UAE, and India.",
  "Before any of that, he was a reporter, bylined stories for The Times of India, the International Business Times (Singapore Edition), NewsX and British Herald. Reporting that took him from hospital wards in Hyderabad to the floor of the Karnataka Vidhan Soudha, sitting across from sitting and former Chief Ministers, party spokespeople and civil servants to get the quote that mattered. That grounding, verify the fact, hit the deadline, say the complicated thing simply, still drives how he thinks about brand strategy and corporate communications now. Just aimed at a different kind of story.",
  "Nine-plus years in, journalism and brand strategy still run on the same fuel: get the facts right, then make people care. He has interviewed sitting chief ministers, a former prime minister, Indian ambassadors, actors, singers, foreign MPs, Indian MLAs, MLCs and MPs, RTI commissioners, scholars, and Nobel laureate Kailash Satyarthi, and broken investigative stories that prompted government scrutiny.",
];

export type Recognition = { title: string; context: string };
export const recognition: Recognition[] = [
  { title: "“Architect of Success”", context: "Rang Digitech AGM Flare 2024" },
  { title: "Closing speech", context: "Rang Group AGM 2025" },
  { title: "Promising Journalist Award", context: "Presidency College, 2018" },
  { title: "NCC “A” Certificate", context: "National Cadet Corps" },
];
