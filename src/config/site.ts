import { buyerFeeNote, buyerFeeStatement } from "./businessModel";

export const siteConfig = {
  name: "MatriBhumi",
  legalName: "MatriBhumi",
  shortName: "MatriBhumi",
  url: "https://matribhumi.me",
  domain: "matribhumi.me",
  description:
    "Independent property guidance across Bangladesh, the UAE and Malaysia. Explore selected developments, compare options, connect with developers and coordinate your purchase — with no buyer fee.",
  tagline: "Find the right property. We coordinate the rest.",
  supporting:
    "Independent property guidance across Bangladesh, the UAE and Malaysia. Explore selected developments, compare options, connect with developers and coordinate your purchase — with no buyer fee.",
  positioning:
    "Independent property advisory and transaction coordination.",
  districtRelation:
    "Selected developer projects across Bangladesh, the UAE and Malaysia, including Dhaka, Chattogram, and Dhaka’s master-planned Bashundhara district as listings are published.",
  audience:
    "For buyers looking across Bangladesh, the UAE and Malaysia — including households already in those markets and people living abroad who want independent guidance.",
  buyerFee: buyerFeeStatement,
  buyerFeeNote,
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
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/developers", label: "Developers" },
  { href: "/locations", label: "Locations" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/for-developers", label: "For Developers" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const countryNav = [
  { href: "/locations/bangladesh", label: "Bangladesh" },
  { href: "/locations/uae", label: "UAE" },
  { href: "/locations/malaysia", label: "Malaysia" },
] as const;

export const bangladeshCityNav = [
  { href: "/locations/dhaka", label: "Dhaka" },
  { href: "/locations/chattogram", label: "Chattogram" },
  { href: "/locations/bashundhara", label: "Bashundhara" },
] as const;

export const footerNav = {
  markets: [
    { href: "/locations/bangladesh", label: "Bangladesh" },
    { href: "/locations/uae", label: "UAE" },
    { href: "/locations/malaysia", label: "Malaysia" },
  ],
  explore: [
    { href: "/properties", label: "Properties" },
    { href: "/developers", label: "Developers" },
    { href: "/locations", label: "Locations" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/advise", label: "Talk to an advisor" },
    { href: "/projects", label: "Projects" },
    { href: "/favorites", label: "Saved homes" },
    { href: "/compare", label: "Compare" },
  ],
  company: [
    { href: "/about", label: "About MatriBhumi" },
    { href: "/for-developers", label: "For Developers" },
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

export const whatWeDo = [
  {
    title: "Find a suitable property",
    body: "Tell us how you will live in the home. We shortlist selected developer properties across Bangladesh, the UAE and Malaysia as partnerships are published.",
  },
  {
    title: "Work with developers",
    body: "MatriBhumi is an independent advisor. We introduce you to the relevant participating developer and coordinate viewings and discussions.",
  },
  {
    title: "No buyer fee",
    body: "You pay MatriBhumi nothing for our core property advisory service. Where applicable, participating developers compensate MatriBhumi under separate agreements.",
  },
] as const;

export const whoItsFor = [
  {
    title: "Local property buyers",
    body: "Households already in Bangladesh, the UAE, or Malaysia who want help comparing developer projects before they buy.",
  },
  {
    title: "Buyers living abroad",
    body: "People looking for a home to visit, retire into, or live in — with an advisor who coordinates across time zones.",
  },
  {
    title: "Relocating families",
    body: "Buyers relocating who need a residential shortlist, viewings, and a clear path to the developer of record.",
  },
] as const;

export const howItWorksSteps = [
  {
    step: "01",
    title: "Share your requirements.",
    body: "Name, contact, residence, preferred city, property type, budget, bedrooms, purpose, and timeline. Sensitive documents are not required at this stage.",
  },
  {
    step: "02",
    title: "We match published listings.",
    body: "An advisor screens location, developer, type, price, bedrooms, and status. Matching is a staff aid, not an AI valuation or legal opinion.",
  },
  {
    step: "03",
    title: "An advisor contacts you.",
    body: "Your MatriBhumi property advisor will review your requirements and contact you.",
  },
  {
    step: "04",
    title: "We prepare a shortlist.",
    body: "Staff assemble selected properties with location, estimated price, features, and advisor notes for you to compare.",
  },
  {
    step: "05",
    title: "Developer introduction.",
    body: "When you choose a property, we introduce you to the developer of record and record the date, method, and follow-up.",
  },
  {
    step: "06",
    title: "Viewings.",
    body: "You request a viewing. MatriBhumi coordinates with the developer to confirm time and place.",
  },
  {
    step: "07",
    title: "Transaction coordination.",
    body: "Viewing → property selected → reservation → contract → completion. You purchase from the developer or seller. MatriBhumi is not the seller.",
  },
  {
    step: "08",
    title: "Closed.",
    body: "When the developer’s process completes, the file is marked closed. Any developer compensation is recorded internally, never on public pages.",
  },
] as const;

export const buyerServices = [
  { title: "Property advisory", body: "Requirements, budget, and a shortlist of selected developer properties." },
  { title: "Buying assistance", body: "Questions, documents, and a clear sequence from first enquiry to introduction." },
  { title: "Viewing coordination", body: "Arrange viewings with the developer and keep the diary across time zones." },
  { title: "Developer introductions", body: "A qualified introduction to the developer of record for the project you choose." },
  { title: "Transaction coordination", body: "Follow-up on the developer’s process so the purchase does not stall." },
  { title: "Cross-border support", body: "Help for buyers living abroad or relocating across Bangladesh, the UAE and Malaysia, within what local law allows." },
] as const;

export const developerServices = [
  { title: "Property marketing", body: "Present selected projects to buyers already looking with MatriBhumi across Bangladesh, the UAE and Malaysia." },
  { title: "Qualified buyer referrals", body: "Introductions after we understand budget, timing, and intent." },
  { title: "Buyer requirement matching", body: "Route enquiries to the project that actually fits." },
  { title: "Viewing coordination", body: "Schedule and follow up viewings with the buyer and your sales team." },
  { title: "Lead management", body: "Keep the conversation moving after the first enquiry." },
  { title: "Cross-border buyer access", body: "Reach buyers living abroad, relocators, and local buyers we already advise." },
  { title: "Transaction coordination", body: "Stay on the process until the buyer is in your contracting workflow." },
  { title: "Project presentation", body: "Help buyers understand the scheme, unit mix, and next steps." },
  { title: "Market exposure", body: "A public listing on MatriBhumi.me when a partnership is in place." },
  { title: "Buyer follow-up", body: "Reminders and answers so qualified interest does not go quiet." },
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
    title: "Independent guidance",
    body: "MatriBhumi is an independent advisor. We are not the developer of the homes we present, except where a listing is marked MatriBhumi-owned.",
  },
  {
    title: "Curated developer network",
    body: "We present selected developments from participating developers. Public names appear when a partnership is published.",
  },
  {
    title: "Cross-border support",
    body: "Guidance for buyers looking across Bangladesh, the UAE and Malaysia, including households living abroad.",
  },
  {
    title: "One point of coordination",
    body: "One advisor stays with you from the first brief through introductions, viewings, and follow-up.",
  },
  {
    title: "Transparent buyer-fee policy",
    body: "You pay MatriBhumi nothing for our core property advisory service. Where applicable, participating developers compensate us under separate arrangements.",
  },
  {
    title: "Property comparison",
    body: "Compare location, developer, type, price, and how you will use the home before you commit.",
  },
  {
    title: "Viewing coordination",
    body: "We arrange viewings with the developer and keep the diary across time zones.",
  },
  {
    title: "Developer introductions",
    body: "When a project fits, we introduce you to the developer of record and stay on the correspondence.",
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
      "Ownership rules in Bangladesh depend on your citizenship and residency. MatriBhumi coordinates introductions and helps you follow the developer’s process. Independent legal advice is yours to obtain. We do not claim a real-estate licence in Bangladesh on this site.",
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
    body: "You pay MatriBhumi nothing for our property advisory and transaction-coordination service. Where applicable, participating developers compensate MatriBhumi under separate commercial agreements. Developer arrangements vary by project. The buyer's purchase agreement is with the property developer/seller.",
  },
  {
    title: "Office",
    body: "MatriBhumi. House 12, Road 7, Gulshan, Dhaka 1212, Bangladesh. This site does not claim a real-estate licence in Bangladesh.",
  },
] as const;

export type SiteConfig = typeof siteConfig;
