// Single source of truth for all site content.
// Every value here is drawn from Harsh V Singh's own brief, no invented facts.

export const site = {
  name: "Harsh V Singh",
  role: "Associate Director - Project Delivery",
  org: "Rang Digitech LLC",
  tagline: "Get the facts right, then make people care.",
  support:
    "A reporter who chased chief ministers for a quote now runs global delivery for a digital agency. Same craft: verify the fact, hit the deadline, say the complicated thing simply.",
  base: "Vadodara, Gujarat · Leading delivery across the US, UK, Canada, UAE & India",
  // First professional dateline (NewsX politics bureau, Bengaluru), and the
  // year the masthead counts its volumes from.
  established: 2017,
  // The hero's standing bio, pipe-separated exactly as supplied.
  heroBio: [
    "Associate Director at Rang Digitech LLC",
    "Worked with Rang Technologies, GoodFirms, Jindal, Times of India, and NewsX",
    "Formerly in Journalism & Corporate Communications",
  ],
  email: "singhharsh_7@yahoo.in",
  phone: "+91 95387 86693",
  phoneHref: "+919538786693",
  url: "https://harshvsingh.in",
} as const;

// Teletype datelines that cycle in the hero ticker, newest first. The order
// matters: the masthead label reads "Now filing", the ticker rests on the
// first entry before it starts, and reduced-motion and no-JS readers never
// see past it - so the current posting has to lead. From there it walks back
// through the career.
export const ticker = [
  "PISCATAWAY · GLOBAL DELIVERY",
  "VADODARA · BRAND STUDIO",
  "AHMEDABAD · CONTENT DESK",
  "SINGAPORE EDITION · HOLLYWOOD BEAT",
  "HYDERABAD · CIVIC DESK",
  "BENGALURU · VIDHAN SOUDHA",
];

// Hero portrait frames, cross-faded in order. The first is the one that ships
// in the static HTML and carries the alt text; the rest are the same subject,
// so they are marked decorative rather than announced again.
//
// These are cut from the studio originals (avatar.jpg, avatar1.png) to one
// shared framing contract, because two portraits that dissolve into each other
// have to agree on where the face sits or the swap reads as a slip:
//   4:5 · head = 42.5% of frame height · 9% headroom · head centred
// Keep that contract for any frame added here - crop to it rather than letting
// the frame letterbox a raw photo, and leave the backdrop pure white so the
// .frame multiply blend can burn it off against the paper tone.
export const portraits = [
  { src: "/portrait-01.webp", alt: "Portrait of Harsh V Singh" },
  { src: "/portrait-02.webp", alt: "" },
];
export const PORTRAIT_INTERVAL = 3000;

export type NavItem = { id: string; label: string; index: string };
export const nav: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "career", label: "The beat", index: "02" },
  { id: "credentials", label: "The file", index: "03" },
  { id: "voices", label: "On the record", index: "04" },
  { id: "writing", label: "Dispatches", index: "05" },
  { id: "press", label: "In the press", index: "06" },
  { id: "contact", label: "Get in touch", index: "07" },
];

/** `suffix` is set apart from the numeral so it can be typeset smaller and
 *  in the accent - a qualifier, not a digit. It also keeps the count-up
 *  animation off it, so only the number moves. */
export type Stat = {
  figure: string;
  suffix?: string;
  label: string;
  note: string;
};
export const stats: Stat[] = [
  {
    figure: "9.5",
    suffix: "+",
    label: "Years",
    note: "Newsroom to Associate Director",
  },
  { figure: "3", label: "Newsrooms", note: "Times of India · IBT · NewsX" },
  { figure: "5", label: "Markets", note: "US · UK · Canada · UAE · India" },
  {
    figure: "125",
    suffix: "+",
    label: "Certifications",
    note: "SEO, GenAI, brand & leadership",
  },
  {
    figure: "600",
    suffix: "+",
    label: "Books read",
    note: "Rated and reviewed on Goodreads",
  },
  // Two honours in one cell rather than a seventh column: the strip is a
  // six-up grid at desktop and a seventh would orphan itself on every
  // smaller breakpoint. Named only - the full citations are in the
  // recognition list, the FAQ and the JSON-LD, and at full length here the
  // note ran five lines against everyone else's two, which set the whole
  // strip's height.
  {
    figure: "2",
    label: "Awards",
    note: "Architect of Success 2024 · Promising Journalist 2018",
  },
];

export type Dispatch = {
  /** Start year, set large as the timeline's anchor. */
  from?: string;
  /** End year, or "Now". Only read when `from` is present. */
  to?: string;
  place: string;
  desk: string;
  role: string;
  org: string;
  body: string;
  era: "brand" | "news";
};

// Reverse-chronological, the latest dispatch first.
export const career: Dispatch[] = [
  {
    from: "2026",
    to: "Now",
    place: "Piscataway ↔ Vadodara",
    desk: "Delivery",
    role: "Associate Director - Project Delivery",
    org: "Rang Digitech LLC",
    body: "Owns end-to-end delivery for a portfolio of digital marketing accounts across the US, UK, Canada, UAE, and India, resourcing, coordinating teams through concurrent engagements, and protecting KPIs, brand compliance and online reputation.",
    era: "brand",
  },
  {
    from: "2024",
    to: "2026",
    place: "Vadodara",
    desk: "Brand",
    role: "Brand Manager",
    org: "Rang Digitech",
    body: "Set brand strategy at the intersection of storytelling, SEO, and applied AI, building campaigns measured on real numbers rather than vanity metrics.",
    era: "brand",
  },
  {
    from: "2023",
    to: "2024",
    place: "Vadodara",
    desk: "Content",
    role: "Senior Content Writer & Head of Content",
    org: "Rang Technologies / Rang Digitech",
    body: "Led a team of SEO, social media and design professionals across eight-plus companies inside the group.",
    era: "brand",
  },
  {
    from: "2022",
    to: "2023",
    place: "Ahmedabad",
    desk: "Content desk",
    role: "Content Writer, pen name “Ryan Allen”",
    org: "GoodFirms (OpenXcell)",
    body: "Wrote for a global client base across software development, mobile apps, SEO, blockchain and digital marketing.",
    era: "brand",
  },
  {
    from: "2021",
    to: "2023",
    place: "Study-abroad desk",
    desk: "EdTech",
    role: "Manager, Creative Content & Social Media",
    org: "Kanan.Co",
    body: "Led content for Visa Crunch and academic content for KananPrep and its franchises; ran campaigns that lifted brand engagement by 40 percent.",
    era: "brand",
  },
  {
    from: "2020",
    to: "2021",
    place: "Commercial function",
    desk: "Public relations",
    role: "Public Relations",
    org: "Jindal Saw Limited",
    body: "Coordinated with 15-plus commercial-function departments on company literature, CSR campaigns and internal communications.",
    era: "brand",
  },
  {
    from: "2020",
    to: "2021",
    place: "Bengaluru",
    desk: "News venture",
    role: "Co-founder & Editorial Head",
    org: "Brifly News",
    body: "Curated the news into 60-word summaries and trained a team of writers on SEO-friendly reporting.",
    era: "news",
  },
  {
    from: "2020",
    place: "Bengaluru",
    desk: "Entertainment bureau",
    role: "Reporter, Hollywood beat",
    org: "International Business Times, Singapore Edition",
    body: "Covered the Hollywood beat out of Bangalore for IBT's Singapore edition.",
    era: "news",
  },
  {
    from: "2018",
    to: "2019",
    place: "Hyderabad",
    desk: "Civic desk",
    role: "Civic Affairs & Public-Health Reporter",
    org: "The Times of India",
    body: "Thirteen published bylines in seven days, a hospital sanitation investigation that prompted government scrutiny, organ-donation shortfalls, road safety on Necklace Road, and political messaging in government-school notebooks.",
    era: "news",
  },
  {
    from: "2017",
    to: "2019",
    place: "Bengaluru",
    desk: "Politics bureau",
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
      "He stood out among his peers because he was very focused and had absolute clarity on what he wanted to do. Harsh will be an asset to any company that hires him.",
    name: "Prema Sridevi",
    title: "Founder & Editor-in-Chief, The Probe · ex-Republic TV, Times Now",
    feature: true,
  },
  {
    quote:
      "A well-read, well-aware and confident student who held forth on views based on solid research, not cursory information. His well-balanced views put him well above the rest of the class.",
    name: "Dr. K Sai Prasad",
    title: "PhD, MPhil, PGDJMC, MBA, Dean, COMMITS Bangalore",
  },
  {
    quote:
      "Precise and crisp fact-finding skills, has a nose for news. He is a truly dedicated journalist who always goes the extra mile.",
    name: "Srirupa Goswami",
    title:
      "Senior Producer & Reporter, The Indian Express · ex-NDTV, CNN-News18, The Times of India",
  },
  {
    quote:
      "His ability to handle multiple projects was unlike anything I'd seen before, managing events and assigning work to achieve a common goal. Harsh earns my highest recommendation.",
    name: "Krishan Roy",
    title: "Founder & CEO, Motorist · ex-The Hindu, NewsX, CNN-News18",
  },
  {
    quote:
      "His vast pool of knowledge makes him a cut above the rest, along with his ability to think strategically and deliver his best. He is highly committed to excellence.",
    name: "Srijanee Majumdar",
    title: "Journalist, Hindustan Times · ex-Mid-Day, Republic Media, Sportskeeda",
  },
  {
    quote:
      "Harsh consistently delivers high-quality content. His attention to detail, creativity and dedication shine through, with a remarkable ability to communicate complex ideas clearly.",
    name: "Kenneth Rivas",
    title: "Director of Business Development, American Consultants",
  },
  {
    quote:
      "His meticulous proofreading and insightful feedback significantly enhance the quality of his work, engaging and error-free. His ability to adapt to various writing styles makes him an invaluable asset.",
    name: "Alma Halilovic",
    title: "UX Designer, Tech Fleet · ex-Rang Technologies",
  },
  {
    quote:
      "Harsh is very hardworking and was known for his innovative thinking. He sits quietly, observes everything, and speaks only when it adds value. He is truly street-smart.",
    name: "Jyotsna Bharti",
    title: "Journalist & Content Producer · ex-Kashmir Observer",
  },
  {
    quote:
      "I watched Harsh launch his career interviewing some of the most prominent figures in Indian media, always curious, always seeking out new perspectives. I have no hesitation in recommending him.",
    name: "Shibu Immanuel",
    title: "BA, LLB, L&D Lead, EssentiallySports · ex-Brifly News",
  },
  {
    quote:
      "Has a big heart for the news. An amazing counterpart to work with, sharing experiences and knowledge. He is incredibly dedicated to uncovering the truth.",
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
      "Harsh has always been an avid reader, and his passion for learning is truly inspiring. His dedication and creativity made a real, lasting impact on our entire team.",
    name: "Isha Chatterjee",
    title: "PR Manager, Jajabor Brand Consultancy · ex-Adfactors PR",
  },
  {
    quote:
      "He gained substantial exposure to applied commerce and prepared comprehensive project reports well worth reading, achieving significant results. We wish him great success in his further assignments.",
    name: "VK Singh",
    title: "General Manager, Jindal Group · 39 years in executive leadership",
  },
];

export type Column = {
  name: string;
  handle: string;
  href: string;
  body: string;
  /** The platform's own mark colour, used for its logo, label and hover edge. */
  brand: string;
};
export const writing: Column[] = [
  {
    name: "Substack",
    handle: "singhharsh7.substack.com",
    href: "https://singhharsh7.substack.com/",
    body: "Dispatches on life, people, and memory, and the lessons history still echoes. 8.5k+ subscribers.",
    // Substack's orange sits within a hair of this site's own accent, so it
    // costs the palette nothing.
    brand: "#ff6719",
  },
  {
    name: "Medium",
    handle: "@singhharsh_7",
    href: "https://medium.com/@singhharsh_7",
    body: "Personal essays on marriage, memory, and the small moments that outlast the news cycle.",
    brand: "#191919",
  },
];

export type PressItem = {
  outlet: string;
  title: string;
  meta: string;
  href?: string;
  img?: string; // clipping thumbnail
  imgPos?: string; // object-position, for scans with wide white margins
};
export const press: PressItem[] = [
  {
    outlet: "British Herald",
    title:
      "Narendra Modi Wins Reader's Poll for World's Most Powerful Person 2019",
    meta: "Jun 16, 2019 · went viral",
    href: "https://web.archive.org/web/20190629011422/https://www.britishherald.com/narendra-modi-wins-readers-poll-for-worlds-most-powerful-person-2019/",
    img: "/field-notes/press-bh.png",
  },
  {
    outlet: "International Business Times · Singapore",
    title: "Reporter archive, Hollywood beat",
    meta: "ibtimes.sg",
    href: "https://www.ibtimes.sg/reporters/harsh-v-singh",
    img: "/field-notes/press-ibtimes.png",
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
  {
    outlet: "Times of India · Hyderabad",
    title: "Not enough organs despite increase in donations",
    meta: "Aug 13, 2019 · print edition",
    img: "/field-notes/press-toi-organs.jpg",
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
    figure: "200+",
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
  // Canonical /user/ form, not the /u/<name>/s/<token> share link: this array
  // is also the JSON-LD `sameAs` set, and a share token is a redirect that can
  // rot, not a stable identity URL.
  { label: "Reddit", href: "https://www.reddit.com/user/singhharsh7/" },
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
];

// The frame the Get in touch section closes on. Deliberately not a journal
// entry - it earns its place there instead of in the gallery, so it is
// declared on its own rather than filtered back out at render time.
export const contactPhoto = {
  src: "/field-notes/with-the-camera.jpg",
  alt: "Harsh V Singh on assignment, seated with a camera among a press pack",
};

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
