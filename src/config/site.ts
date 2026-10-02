export const siteConfig = {
  name: "MatriBhumi",
  legalName: "MatriBhumi Developments",
  shortName: "MatriBhumi",
  url: "https://matribhumi.me",
  domain: "matribhumi.me",
  description:
    "An independent, premium boutique architectural design and development firm. Homes for the Bangladeshi diaspora — a home-land, not a launch.",
  tagline: "A home in Bangladesh — to visit, to retire, to live well.",
  supporting:
    "Boutique private developments seamlessly integrated within Dhaka’s master-planned Bashundhara district. An address you can fly into for Eid, a winter month, or the longer stay of retirement.",
  positioning:
    "MatriBhumi is an independent, premium boutique architectural design and development firm.",
  districtRelation:
    "Boutique private developments seamlessly integrated within Dhaka’s master-planned Bashundhara district.",
  audience:
    "For high-net-worth Bangladeshi expats and retirees who want international design standards, and the warmth of a true home.",
  email: "hello@matribhumi.me",
  salesEmail: "sales@matribhumi.me",
  pressEmail: "press@matribhumi.me",
  careersEmail: "careers@matribhumi.me",
  phone: "+880 1700 000000",
  phoneHref: "tel:+8801700000000",
  brochurePath: "/media/brochures/matribhumi-preview.pdf",
  address: {
    line1: "House 12, Road 7",
    line2: "Gulshan",
    city: "Dhaka",
    country: "Bangladesh",
    postal: "1212",
  },
  social: {
    instagram: "https://www.instagram.com/matribhumi",
    linkedin: "https://www.linkedin.com/company/matribhumi",
    whatsapp: "https://wa.me/8801700000000",
  },
} as const;

export const navItems = [
  { href: "/projects", label: "Developments" },
  { href: "/properties", label: "Properties" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  explore: [
    { href: "/projects", label: "Developments" },
    { href: "/properties", label: "Properties" },
    { href: "/locations", label: "Locations" },
    { href: "/favorites", label: "Saved homes" },
    { href: "/compare", label: "Compare" },
  ],
  company: [
    { href: "/about", label: "About MatriBhumi" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/insights", label: "Insights" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
} as const;

export const whoItsFor = [
  {
    title: "Expats overseas",
    body: "A Bangladesh address you can fly into for Eid, a winter month, or part of the year — then lock up and leave.",
  },
  {
    title: "Retirees coming home",
    body: "Quieter plans, guest rooms for children visiting from abroad, and neighbourhoods with hospitals, walks, and company close by.",
  },
  {
    title: "Living in Bangladesh now",
    body: "Households already in Dhaka who want a modern home in Bashundhara’s new districts — malls, golf, amusement parks, and daily amenities on the same map.",
  },
] as const;

export const districtLife = [
  {
    title: "Malls and daily errands",
    body: "Shopping, food, cinemas, and services planned as part of the district, not a long drive away.",
  },
  {
    title: "Golf and open ground",
    body: "Fairways and planted edges for morning walks, weekends, and a slower register of the city.",
  },
  {
    title: "Amusement parks and family days",
    body: "Places grandchildren, nieces, and neighbours can spend an afternoon without leaving the district.",
  },
  {
    title: "Modern building amenities",
    body: "Pools, gyms, concierge, security, and parking designed for both full-time living and part-year stays.",
  },
] as const;

export const lifestyles = [
  {
    slug: "urban-living",
    title: "Bashundhara living",
    description: "New-district apartments near malls, parks, and the city’s newer roads — for everyday Dhaka life or a season at home.",
    image: "/media/lifestyle-urban.jpg",
    filter: "APARTMENT",
  },
  {
    slug: "waterfront-living",
    title: "River holidays",
    description: "Waterfront rooms for slower visits — mornings by the water, evenings with family.",
    image: "/media/lifestyle-waterfront.jpg",
    filter: "WATERFRONT",
  },
  {
    slug: "private-residences",
    title: "Private residences",
    description: "Courtyard homes with space for parents, visiting children, and a quieter retirement.",
    image: "/media/lifestyle-private.jpg",
    filter: "VILLA",
  },
  {
    slug: "family-communities",
    title: "Family communities",
    description: "Neighbourhoods planned for gatherings, parks, schools, and relatives who live here year-round.",
    image: "/media/lifestyle-family.jpg",
    filter: "COMMUNITIES",
  },
  {
    slug: "nature-living",
    title: "Hill and garden stays",
    description: "Low-rise homes for longer winter stays, away from the city’s heat and noise.",
    image: "/media/lifestyle-nature.jpg",
    filter: "NATURE",
  },
  {
    slug: "mixed-use-destinations",
    title: "District living",
    description: "Malls, golf, amusement parks, and homes on the same plan — a modern Dhaka day without a long commute.",
    image: "/media/lifestyle-mixed.jpg",
    filter: "MIXED_USE",
  },
] as const;

export const whyMatriBhumi = [
  {
    title: "Designed to be left and returned to",
    body: "Layouts, storage, and building management assume you may be away for months — or live here every day. Both kinds of household are planned for.",
  },
  {
    title: "New-district convenience",
    body: "Residences in and around Bashundhara sit near malls, golf, amusement parks, and the everyday services a modern Dhaka neighbourhood needs.",
  },
  {
    title: "A plan for retirement",
    body: "Quieter rooms, step-free thinking where we can, and neighbourhoods with clinics, walks, and family close by — for people coming home from overseas to stay.",
  },
  {
    title: "Quality you can inspect from overseas",
    body: "We specify durable materials and work with builders who can stand behind the details — because you cannot visit the site every week.",
  },
  {
    title: "Rooms for gathering",
    body: "Courtyards, guest rooms, and shared spaces sized for Eid, weddings, and the relatives who live in Bangladesh year-round.",
  },
  {
    title: "Reachable from abroad — and from across town",
    body: "Clear information, realistic timelines, and people you can actually call, whether you are in Dubai, London, or another neighbourhood of Dhaka.",
  },
  {
    title: "A long view of home",
    body: "We build as if this address will still be yours in twenty years — a home-land, not a launch.",
  },
] as const;

export const comingHomePrinciples = [
  {
    title: "How you will actually use it",
    body: "A few weeks at Eid, a retirement year, or full-time life next to a mall and a park: the plan should fit the calendar you already keep.",
  },
  {
    title: "Location in the new districts",
    body: "Bashundhara-style living puts golf, amusement parks, shopping, and home on one map. Place is one factor among many, not a prediction.",
  },
  {
    title: "Looking after the home while you are away",
    body: "Building management, neighbours, and simple, durable rooms matter when the house is empty for part of the year.",
  },
  {
    title: "Development quality",
    body: "Construction standards and the care given to shared spaces influence how a building ages between visits — or through everyday use.",
  },
  {
    title: "Not a financial product",
    body: "MatriBhumi does not promise rental income, appreciation, or returns. Independent legal and tax advice is yours to seek.",
  },
  {
    title: "Title and running costs",
    body: "Price, size, service charges, and legal title should be reviewed carefully. We do not provide financial advice.",
  },
] as const;

export const diasporaFaq = [
  {
    question: "Can I legally purchase and own a MatriBhumi property if I hold foreign citizenship?",
    answer:
      "Yes. Dual citizens and non-resident Bangladeshis (NRBs) enjoy full property ownership rights in Bangladesh. Our legal team handles the complete registration process, ensuring compliance with local property laws seamlessly from abroad.",
  },
  {
    question: "How can I safely manage payments and wire transfers from overseas?",
    answer:
      "We facilitate secure, traceable international wire transfers directly to dedicated project accounts. All transactions are fully documented, compliant with Bangladesh Bank regulations, and aligned with transparent milestone-based construction timelines.",
  },
  {
    question: "How is my home looked after when I am away for months at a time?",
    answer:
      "Every MatriBhumi development features comprehensive, round-the-clock building management. This includes 24/7 smart security, regular structural inspections, and dedicated property upkeep, ensuring your home is pristine and secure the moment you turn the key for Eid or winter holidays.",
  },
  {
    question: "What are the advantages of joining the pre-launch waitlist?",
    answer:
      "Waitlist members receive priority access to architectural floor plans, exclusive early-bird pricing tiers, and the first choice of premium units (such as corner layouts and upper-floor views) before the public launch.",
  },
] as const;

export const leadership = [
  {
    name: "Amina Rahman",
    role: "Founder",
    image: "/media/leader-founder.jpg",
    bio: "Portrait and full biography to follow. The founding standard is international design standards meeting local heritage — a home that can be closed for the year and opened again for Eid.",
  },
  {
    name: "Farhan Kabir",
    role: "Development",
    image: "/media/leader-development.jpg",
    bio: "Portrait and full biography to follow. Land, structure, and builders who can stand beside a detail when the client is on another continent.",
  },
  {
    name: "Leila Nassar",
    role: "Architecture",
    image: "/media/leader-design.jpg",
    bio: "Portrait and full biography to follow. The studio turns a site into shade, courtyards, and rooms that still feel like a Bangladeshi home.",
  },
] as const;

export const legalCompliance = [
  {
    title: "RAJUK approvals",
    body: "Each pre-launch development is prepared for submission to RAJUK. Approval references will be published here as they are granted.",
  },
  {
    title: "Structural certifications",
    body: "Structural design is specified to international standards and certified by the appointed engineer of record. Certificate numbers will be listed with the construction drawings.",
  },
  {
    title: "Developer registration",
    body: "MatriBhumi Developments. Registered office: House 12, Road 7, Gulshan, Dhaka 1212, Bangladesh. Full registration particulars will be published before public sales.",
  },
] as const;

export type SiteConfig = typeof siteConfig;
