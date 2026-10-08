export const siteConfig = {
  name: "MatriBhumi",
  legalName: "MatriBhumi",
  shortName: "MatriBhumi",
  url: "https://matribhumi.me",
  domain: "matribhumi.me",
  description:
    "Your independent property advisor and transaction partner. Curated developer projects across Bangladesh, UAE and Malaysia — at no cost to the buyer.",
  tagline: "Find the right property. We coordinate the rest.",
  supporting:
    "Independent property guidance across Bangladesh, UAE and Malaysia. We help buyers compare participating developer projects and coordinate the transaction — at no cost to the buyer.",
  positioning:
    "Your independent property advisor and transaction partner.",
  districtRelation:
    "Selected developer projects in and around Dhaka’s master-planned Bashundhara district, and other markets we cover with participating developers.",
  audience:
    "For Bangladeshi expats, returning retirees, and households already in Bangladesh who want help choosing a home and coordinating the process.",
  buyerFee:
    "MatriBhumi charges the buyer no brokerage fee, no consultation fee, and no property-search fee. Participating developers compensate MatriBhumi under a separate agreement. Those agreements differ; no commission percentage is published here.",
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
    title: "Independent of any one developer",
    body: "We curate projects from a network of participating developers. The developer is the seller. MatriBhumi is the advisor and coordinator.",
  },
  {
    title: "Compare before you commit",
    body: "Budget, location, layout, and how you will actually use the home — we help you set those requirements and compare selected developments side by side.",
  },
  {
    title: "No fee to the buyer",
    body: "There is no brokerage fee, consultation fee, or property-search fee for the buyer. The participating developer compensates MatriBhumi under a separate agreement.",
  },
  {
    title: "Introductions you can follow",
    body: "When a project fits, we introduce qualified buyers to the relevant developer and stay on the communication so questions do not stall.",
  },
  {
    title: "Viewings and the transaction path",
    body: "We coordinate property viewings and help you follow the developer’s process — documents, timelines, and follow-up — without pretending to be the seller.",
  },
  {
    title: "Reachable from abroad — and from across town",
    body: "Clear information and people you can actually call, whether you are in Dubai, Kuala Lumpur, London, or another neighbourhood of Dhaka.",
  },
  {
    title: "A long view of home",
    body: "We advise as if this address will still matter in twenty years. Independent legal and tax advice remains yours to seek.",
  },
] as const;

export const comingHomePrinciples = [
  {
    title: "How you will actually use it",
    body: "A few weeks at Eid, a retirement year, or full-time life next to a mall and a park: the shortlist should fit the calendar you already keep.",
  },
  {
    title: "Location in the new districts",
    body: "Bashundhara-style living puts golf, amusement parks, shopping, and home on one map. Place is one factor among many, not a prediction.",
  },
  {
    title: "Looking after the home while you are away",
    body: "Ask the developer how building management, neighbours, and upkeep work when the house is empty for part of the year. We help you get those answers.",
  },
  {
    title: "Development quality",
    body: "Construction standards and the care given to shared spaces belong to the developer of record. We help you inspect what they publish and what a viewing shows.",
  },
  {
    title: "Not a financial product",
    body: "MatriBhumi does not promise rental income, appreciation, or returns. Independent legal and tax advice is yours to seek.",
  },
  {
    title: "Title and running costs",
    body: "Price, size, service charges, and legal title should be reviewed with the developer and your own counsel. We do not provide financial advice.",
  },
] as const;

export const diasporaFaq = [
  {
    question: "Does MatriBhumi charge the buyer a fee?",
    answer:
      "No. MatriBhumi charges the buyer no brokerage fee, no consultation fee, and no property-search fee. Participating developers compensate MatriBhumi under a separate commercial agreement. Those agreements differ by developer, so no universal commission percentage is published here.",
  },
  {
    question: "Who is the seller of a listed property?",
    answer:
      "The participating developer is the seller. MatriBhumi discovers and curates projects, helps you compare them, introduces qualified buyers to the relevant developer, and coordinates communication, viewings, and follow-up. A listing is MatriBhumi-owned only when it is explicitly marked as such.",
  },
  {
    question: "Can I buy if I hold foreign citizenship?",
    answer:
      "Ownership rules depend on the country of the property and on your citizenship and residency. MatriBhumi coordinates introductions and helps you follow the developer’s process. Independent legal advice in that jurisdiction is yours to obtain. We do not claim a licence in Bangladesh, UAE, or Malaysia on this site.",
  },
  {
    question: "How do payments and registration work from overseas?",
    answer:
      "Payment accounts, milestone schedules, and title registration belong to the developer of record and to the lawyers you appoint. We help you ask the right questions and stay on the correspondence. We do not operate project escrow or complete registration ourselves.",
  },
  {
    question: "Who looks after the home when I am away?",
    answer:
      "Building management is the developer’s (or the building’s) responsibility. We help you obtain those details before you commit, including security, inspections, and upkeep between visits.",
  },
  {
    question: "What does joining the waitlist do?",
    answer:
      "Waitlist members hear first when curated floor plans, viewing slots, or developer updates are released for a project you asked about. It is a coordination list, not a reservation contract.",
  },
] as const;

export const leadership = [
  {
    name: "Amina Rahman",
    role: "Founder",
    image: "/media/leader-founder.jpg",
    bio: "Portrait and full biography to follow. The standard is independent advice: the right home for how you live, then a clean introduction to the developer who is selling it.",
  },
  {
    name: "Farhan Kabir",
    role: "Partner relations",
    image: "/media/leader-development.jpg",
    bio: "Portrait and full biography to follow. Relationships with participating developers, so a buyer’s questions reach the people who can answer them.",
  },
  {
    name: "Leila Nassar",
    role: "Buyer advisory",
    image: "/media/leader-design.jpg",
    bio: "Portrait and full biography to follow. Requirements, budget, and shortlists — then viewings and follow-up until the transaction is in the developer’s hands.",
  },
] as const;

export const legalCompliance = [
  {
    title: "Developer of record",
    body: "Approvals, structural certificates, and developer registration belong to the participating developer for each listing. References are published when that developer provides them. MatriBhumi is the advisor and coordinator unless a listing is marked MatriBhumi-owned.",
  },
  {
    title: "Buyer fees",
    body: "MatriBhumi charges the buyer no brokerage, consultation, or property-search fee. Compensation comes from the participating developer under a separate agreement. No universal percentage is shown because those agreements differ.",
  },
  {
    title: "Office",
    body: "MatriBhumi. House 12, Road 7, Gulshan, Dhaka 1212, Bangladesh. This site does not claim a real-estate licence in Bangladesh, UAE, or Malaysia.",
  },
] as const;

export type SiteConfig = typeof siteConfig;
