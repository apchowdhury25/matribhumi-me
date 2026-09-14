export const siteConfig = {
  name: "MatriBhumi",
  legalName: "MatriBhumi Developments",
  shortName: "MatriBhumi",
  url: "https://matribhumi.me",
  domain: "matribhumi.me",
  description:
    "Homes in Bangladesh for expats coming back, retirees returning from overseas, and families who want modern new-district living in Bashundhara.",
  tagline: "A home in Bangladesh — to visit, to retire, to live well.",
  supporting:
    "MatriBhumi designs residences for Bangladeshi families overseas who return for holidays or part of the year, for retirees coming home, and for people already in Bangladesh who want a modern home in Bashundhara’s new districts — malls, golf, parks, and daily amenities close at hand.",
  audience:
    "For expats, returning retirees, and Dhaka residents who want a well-made home in Bangladesh’s new districts. Not a brochure promise, and not a financial product.",
  email: "hello@matribhumi.me",
  salesEmail: "sales@matribhumi.me",
  pressEmail: "press@matribhumi.me",
  careersEmail: "careers@matribhumi.me",
  phone: "+880 00 0000 0000",
  address: {
    line1: "House 12, Road 7",
    line2: "Gulshan",
    city: "Dhaka",
    country: "Bangladesh",
    postal: "1212",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
  demoNotice:
    "Demonstration content. Projects, people, prices, and locations on this site are fictional unless otherwise noted.",
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
    body: "Demonstration homes in and around Bashundhara sit near malls, golf, amusement parks, and the everyday services a modern Dhaka neighbourhood needs.",
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

export type SiteConfig = typeof siteConfig;
