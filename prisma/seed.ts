import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.viewingRequest.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.nearbyPlace.deleteMany();
  await prisma.floorPlan.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.property.deleteMany();
  await prisma.development.deleteMany();
  await prisma.location.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.job.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.user.deleteMany();
  await prisma.developer.deleteMany();

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "MatriBhumiAdmin!2026",
    12,
  );

  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL ?? "admin@matribhumi.me",
      name: "Amina Rahman",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "editor@matribhumi.me",
      name: "Nabil Chowdhury",
      passwordHash,
      role: "EDITOR",
    },
  });

  const developer = await prisma.developer.create({
    data: {
      name: "MatriBhumi",
      slug: "matribhumi",
      description:
        "MatriBhumi is a demonstration real estate developer creating homes and districts where architecture, landscape, and daily life belong together.",
      logoUrl: "/brand/logo-mark.svg",
    },
  });

  const [dhaka, chattogram, dubai, singapore] = await Promise.all([
    prisma.location.create({
      data: {
        name: "Dhaka",
        slug: "dhaka",
        city: "Dhaka",
        country: "Bangladesh",
        region: "South Asia",
        featured: true,
        heroImage: "/media/location-dhaka.jpg",
        latitude: 23.8103,
        longitude: 90.4125,
        description:
          "A river metropolis of work, culture, and kinship — the demonstration home of MatriBhumi.",
        overview:
          "Dhaka is presented here as a fictionalised planning context: dense, water-shaped, and in need of housing that respects climate, family life, and the public realm.",
        lifestyle:
          "Tree-lined streets, shaded courtyards, and mixed streets where shops, schools, and homes share a block.",
        connectivity:
          "Demonstration sites sit near major roads, river crossings, and planned transit corridors.",
        opportunities:
          "Infill districts, waterfront edges, and family communities — all fictional illustrations, not live offerings.",
        attractions: [
          { name: "River promenades", category: "Leisure" },
          { name: "Cultural districts", category: "Culture" },
          { name: "University campuses", category: "Education" },
        ],
      },
    }),
    prisma.location.create({
      data: {
        name: "Chattogram",
        slug: "chattogram",
        city: "Chattogram",
        country: "Bangladesh",
        region: "South Asia",
        featured: true,
        heroImage: "/media/hero-nature.jpg",
        latitude: 22.3569,
        longitude: 91.7832,
        description: "Hills, harbour, and a slower coastal register of living.",
        overview: "A demonstration setting for low-rise homes among trees and gardens.",
        lifestyle: "Nature living, weekend markets, and harbour light.",
        connectivity: "Port, airport, and hill roads — illustrative only.",
        opportunities: "Villa communities and nature-edge housing studies.",
        attractions: [{ name: "Hill forests", category: "Nature" }],
      },
    }),
    prisma.location.create({
      data: {
        name: "Dubai",
        slug: "dubai",
        city: "Dubai",
        country: "United Arab Emirates",
        region: "Middle East",
        featured: true,
        heroImage: "/media/location-coastal.jpg",
        latitude: 25.2048,
        longitude: 55.2708,
        description: "A demonstration international location for climate-aware urban housing.",
        overview: "Used only as a fictional market context for MatriBhumi Horizon.",
        lifestyle: "Urban apartments with shaded podiums and evening public rooms.",
        connectivity: "Metro-adjacent fiction; not a live listing.",
        opportunities: "Mid-rise and tower living studies.",
        attractions: [{ name: "Waterfront walks", category: "Leisure" }],
      },
    }),
    prisma.location.create({
      data: {
        name: "Singapore",
        slug: "singapore",
        city: "Singapore",
        country: "Singapore",
        region: "Southeast Asia",
        featured: true,
        heroImage: "/media/location-singapore.jpg",
        latitude: 1.3521,
        longitude: 103.8198,
        description: "A garden-city demonstration for mixed-use districts.",
        overview: "MatriBhumi Central is a fictional study in living above a civic street.",
        lifestyle: "Cafés, trees, and apartments sharing the same block.",
        connectivity: "Transit-oriented fiction.",
        opportunities: "Mixed-use destinations.",
        attractions: [{ name: "Parks", category: "Nature" }],
      },
    }),
    prisma.location.create({
      data: {
        name: "London",
        slug: "london",
        city: "London",
        country: "United Kingdom",
        region: "Europe",
        featured: false,
        heroImage: "/media/location-london.jpg",
        latitude: 51.5074,
        longitude: -0.1278,
        description: "A riverside demonstration city for future studies.",
        overview: "No live MatriBhumi inventory. Shown to illustrate a global map.",
        lifestyle: "River walks and compact urban homes.",
        connectivity: "Rail and river.",
        opportunities: "Future partnership studies only.",
        attractions: [{ name: "River terraces", category: "Leisure" }],
      },
    }),
    prisma.location.create({
      data: {
        name: "Toronto",
        slug: "toronto",
        city: "Toronto",
        country: "Canada",
        region: "North America",
        featured: false,
        heroImage: "/media/location-toronto.jpg",
        latitude: 43.6532,
        longitude: -79.3832,
        description: "A lakeside demonstration city.",
        overview: "Placeholder presence for the interactive map.",
        lifestyle: "Park-oriented mid-rise living.",
        connectivity: "Transit and waterfront trails.",
        opportunities: "Future studies only.",
        attractions: [{ name: "Lake parks", category: "Nature" }],
      },
    }),
  ]);

  const bashundhara = await prisma.location.create({
    data: {
      name: "Bashundhara",
      slug: "bashundhara",
      city: "Dhaka",
      country: "Bangladesh",
      region: "South Asia",
      featured: true,
      heroImage: "/media/project-central.jpg",
      latitude: 23.8199,
      longitude: 90.4526,
      description:
        "Dhaka’s new-district living: malls, golf, amusement parks, and modern streets. Demonstration context for MatriBhumi homes — we are not Bashundhara Group.",
      overview:
        "Bashundhara is presented as a planned urban district where residences sit near shopping, leisure, and open ground. MatriBhumi’s listings here are fictional illustrations of that kind of life.",
      lifestyle:
        "Everyday errands at a mall, weekends on a golf edge, family afternoons at an amusement park — and a home you can live in full-time or return to from overseas.",
      connectivity:
        "Airport-adjacent east Dhaka, major roads, and the city’s newer service network. Illustrative only.",
      opportunities:
        "Apartments and mixed-use blocks for expats, retirees, and households already in Dhaka. Demonstration inventory, not live offerings.",
      attractions: [
        { name: "Shopping malls", category: "Shopping" },
        { name: "Golf course", category: "Leisure" },
        { name: "Amusement park", category: "Leisure" },
        { name: "Convention and events", category: "Culture" },
      ],
    },
  });

  const amenitySeed = [
    ["Swimming pool", "pool", "wellness"],
    ["Gym", "gym", "wellness"],
    ["Spa", "spa", "wellness"],
    ["Concierge", "concierge", "service"],
    ["Security", "security", "service"],
    ["Parking", "parking", "access"],
    ["Gardens", "gardens", "landscape"],
    ["Clubhouse", "clubhouse", "community"],
    ["Children's areas", "children", "community"],
    ["Coworking lounge", "coworking", "community"],
    ["Library", "library", "community"],
    ["Coworking terrace", "terrace", "community"],
    ["Bicycle storage", "bicycle", "access"],
    ["EV charging", "ev", "access"],
    ["Guest suite", "guest", "service"],
    ["Shopping mall", "mall", "leisure"],
    ["Golf course", "golf", "leisure"],
    ["Amusement park", "amusement", "leisure"],
    ["Cinema", "cinema", "leisure"],
  ] as const;

  const amenities = await Promise.all(
    amenitySeed.map(([name, slug, category]) =>
      prisma.amenity.create({ data: { name, slug, icon: slug, category } }),
    ),
  );
  const amenityBySlug = Object.fromEntries(amenities.map((a) => [a.slug, a.id]));

  const developments = await prisma.$transaction([
    prisma.development.create({
      data: {
        name: "MatriBhumi Heights",
        slug: "matribhumi-heights",
        tagline: "A vertical neighborhood above a planted plaza.",
        description:
          "MatriBhumi Heights is a fictional residential tower in Bashundhara, Dhaka — organised around a public podium, shared rooms, and apartments a short way from malls, golf, and district parks.",
        architecture:
          "Limestone and bronze-tinted glass, deep shading, and a planted crown. Demonstration design only.",
        lifestyle: "Urban living with gardens in the sky and Bashundhara’s malls, golf, and amusement parks on the same map.",
        locationNote: "Bashundhara new district, Dhaka — demonstration site",
        heroImage: "/media/project-heights.jpg",
        category: "RESIDENTIAL",
        propertyType: "APARTMENT",
        status: "UNDER_CONSTRUCTION",
        completion: "2027",
        startingPrice: "180000",
        featured: true,
        signature: true,
        latitude: 23.821,
        longitude: 90.451,
        locationId: bashundhara.id,
        developerId: developer.id,
        stats: { units: 240, floors: 38, greenCover: "32%" },
      },
    }),
    prisma.development.create({
      data: {
        name: "MatriBhumi Riverside",
        slug: "matribhumi-riverside",
        tagline: "Homes that turn toward the water.",
        description:
          "A fictional waterfront district of terraced apartments, boardwalks, and rooms for gathering at the river's edge.",
        architecture: "Timber balconies, pale stone, and a public walk that never privatises the shore.",
        lifestyle: "Morning walks, evening light on water, everyday shops along the path.",
        locationNote: "Buriganga-adjacent demonstration edge, Dhaka",
        heroImage: "/media/project-riverside.jpg",
        category: "WATERFRONT",
        propertyType: "APARTMENT",
        status: "LAUNCHED",
        completion: "2026",
        startingPrice: "220000",
        featured: true,
        signature: true,
        latitude: 23.705,
        longitude: 90.411,
        locationId: dhaka.id,
        developerId: developer.id,
        stats: { units: 186, acres: "9.4", boardwalk: "1.2 km" },
      },
    }),
    prisma.development.create({
      data: {
        name: "The Grove Residences",
        slug: "the-grove-residences",
        tagline: "Courtyard villas among existing trees.",
        description:
          "A fictional villa community in Chattogram, planned around retained forest patches and shared gardens.",
        architecture: "Rammed earth, timber, and metal roofs that sit low in the canopy.",
        lifestyle: "Nature living with room for extended family and quiet work.",
        locationNote: "Hill-edge demonstration site, Chattogram",
        heroImage: "/media/project-grove.jpg",
        category: "VILLAS",
        propertyType: "VILLA",
        status: "READY",
        completion: "2025",
        startingPrice: "410000",
        featured: true,
        signature: true,
        latitude: 22.37,
        longitude: 91.8,
        locationId: chattogram.id,
        developerId: developer.id,
        stats: { villas: 42, acres: "18", treeRetention: "70%" },
      },
    }),
    prisma.development.create({
      data: {
        name: "MatriBhumi Horizon",
        slug: "matribhumi-horizon",
        tagline: "Apartments oriented to sky and shade.",
        description:
          "A fictional tower study in Dubai exploring climate, podium life, and long views. Not a live offering.",
        architecture: "Sandstone, deep fins, and a shaded civic base.",
        lifestyle: "Urban living with communal kitchens, a library, and evening terraces.",
        locationNote: "Demonstration plot, Dubai",
        heroImage: "/media/project-horizon.jpg",
        category: "RESIDENTIAL",
        propertyType: "APARTMENT",
        status: "UNDER_CONSTRUCTION",
        completion: "2028",
        startingPrice: "450000",
        featured: true,
        signature: false,
        latitude: 25.1972,
        longitude: 55.2744,
        locationId: dubai.id,
        developerId: developer.id,
        stats: { units: 310, floors: 44, greenCover: "28%" },
      },
    }),
    prisma.development.create({
      data: {
        name: "Bhumi Gardens",
        slug: "bhumi-gardens",
        tagline: "A family neighborhood around a central park.",
        description:
          "Townhouses and low apartments organised around play, walking, and everyday errands. Fictional demonstration community.",
        architecture: "Pale brick, timber, and streets sized for people first.",
        lifestyle: "Family communities with a park you can see from the kitchen.",
        locationNote: "Uttara-adjacent demonstration fabric, Dhaka",
        heroImage: "/media/project-gardens.jpg",
        category: "COMMUNITIES",
        propertyType: "TOWNHOUSE",
        status: "LAUNCHED",
        completion: "2027",
        startingPrice: "160000",
        featured: true,
        signature: true,
        latitude: 23.874,
        longitude: 90.398,
        locationId: dhaka.id,
        developerId: developer.id,
        stats: { homes: 128, park: "2.1 ha", schoolsWalk: "6 min" },
      },
    }),
    prisma.development.create({
      data: {
        name: "MatriBhumi Central",
        slug: "matribhumi-central",
        tagline: "Live above a street that stays awake.",
        description:
          "A fictional mixed-use block in Singapore: residences over civic rooms, food, and workplaces.",
        architecture: "A porous ground floor, gardens at mid-level, apartments above.",
        lifestyle: "Mixed-use destinations where the commute is a staircase.",
        locationNote: "Demonstration district, Singapore",
        heroImage: "/media/project-central.jpg",
        category: "MIXED_USE",
        propertyType: "MIXED_USE",
        status: "UPCOMING",
        completion: "2029",
        startingPrice: "620000",
        featured: true,
        signature: true,
        latitude: 1.304,
        longitude: 103.832,
        locationId: singapore.id,
        developerId: developer.id,
        stats: { units: 160, retail: "18", workplaces: "4 floors" },
      },
    }),
    prisma.development.create({
      data: {
        name: "MatriBhumi Bashundhara",
        slug: "matribhumi-bashundhara",
        tagline: "A home next to the mall, the fairway, and the park.",
        description:
          "A fictional mixed-use community in Bashundhara’s new districts: residences, a planted street, and walking distance to shopping, golf, and family leisure. MatriBhumi is not Bashundhara Group; this is demonstration inventory in that kind of place.",
        architecture: "Mid-rise stone and glass, podiums with shade, and a civic ground floor that opens to the district.",
        lifestyle:
          "For expats visiting, retirees staying, and Dhaka families who want modern amenities without a long drive: malls, golf, amusement parks, and a proper home.",
        locationNote: "Bashundhara, Dhaka — demonstration district living",
        heroImage: "/media/lifestyle-mixed.jpg",
        category: "MIXED_USE",
        propertyType: "MIXED_USE",
        status: "LAUNCHED",
        completion: "2027",
        startingPrice: "195000",
        featured: true,
        signature: true,
        latitude: 23.818,
        longitude: 90.454,
        locationId: bashundhara.id,
        developerId: developer.id,
        stats: { units: 220, mallWalk: "6 min", golfWalk: "12 min" },
      },
    }),
  ]);

  const [heights, riverside, grove, horizon, gardens, central, bashundharaDev] = developments;

  const gallery = (hero: string, extras: string[]) =>
    [hero, ...extras].map((url, i) => ({
      url,
      alt: "Demonstration interior or architecture",
      sortOrder: i,
    }));

  async function addProperty(data: Parameters<typeof prisma.property.create>[0]["data"] & {
    amenitySlugs: string[];
    nearby: { name: string; category: string; distance: string }[];
    units: { name: string; type: string; bedrooms: number; bathrooms: number; area: number; price: string; status?: "AVAILABLE" | "RESERVED" | "SOLD"; floor?: number }[];
    plans: { name: string; type: string; imageUrl: string; area: number; bedrooms: number; bathrooms: number }[];
    images: { url: string; alt: string; sortOrder: number }[];
  }) {
    const { amenitySlugs, nearby, units, plans, images, ...rest } = data;
    const property = await prisma.property.create({ data: rest });
    await prisma.propertyImage.createMany({
      data: images.map((img) => ({ ...img, propertyId: property.id })),
    });
    await prisma.propertyAmenity.createMany({
      data: amenitySlugs.map((slug) => ({ propertyId: property.id, amenityId: amenityBySlug[slug] })),
    });
    await prisma.nearbyPlace.createMany({
      data: nearby.map((place) => ({ ...place, propertyId: property.id })),
    });
    await prisma.unit.createMany({
      data: units.map((unit) => ({ ...unit, propertyId: property.id })),
    });
    await prisma.floorPlan.createMany({
      data: plans.map((plan) => ({
        ...plan,
        pdfUrl: "/media/plans/sample-plan.pdf",
        propertyId: property.id,
      })),
    });
    return property;
  }

  const commonNearby = [
    { name: "Neighborhood school", category: "Schools", distance: "0.6 km" },
    { name: "Community clinic", category: "Hospitals", distance: "1.4 km" },
    { name: "Market street", category: "Shopping", distance: "0.4 km" },
    { name: "City airport", category: "Airports", distance: "12 km" },
    { name: "Transit stop", category: "Transportation", distance: "350 m" },
    { name: "Local kitchens", category: "Restaurants", distance: "0.3 km" },
  ];

  const bashundharaNearby = [
    { name: "District shopping mall", category: "Shopping", distance: "0.5 km" },
    { name: "Golf course", category: "Leisure", distance: "1.1 km" },
    { name: "Amusement park", category: "Leisure", distance: "1.4 km" },
    { name: "Hazrat Shahjalal International Airport", category: "Airports", distance: "8 km" },
    { name: "Hospitals and clinics", category: "Hospitals", distance: "1.2 km" },
    { name: "International school", category: "Schools", distance: "0.8 km" },
  ];

  await addProperty({
    name: "Heights Residences",
    slug: "heights-residences",
    description:
      "One- to three-bedroom apartments in MatriBhumi Heights, Bashundhara — deep balconies, podium gardens, and walking distance to malls, golf, and district parks. Demonstration inventory only.",
    type: "APARTMENT",
    status: "UNDER_CONSTRUCTION",
    completionDate: new Date("2027-11-01"),
    startingPrice: "180000",
    bedroomsMin: 1,
    bedroomsMax: 3,
    bathroomsMin: 1,
    bathroomsMax: 3,
    areaMin: 620,
    areaMax: 1680,
    floors: 38,
    totalUnits: 240,
    heroImage: "/media/project-heights.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.821,
    longitude: 90.451,
    featured: true,
    lifestyle: "urban-living",
    developmentId: heights.id,
    locationId: bashundhara.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "gym", "concierge", "security", "parking", "gardens", "children", "mall", "golf"],
    nearby: bashundharaNearby,
    images: gallery("/media/project-heights.jpg", [
      "/media/interior-living.jpg",
      "/media/interior-kitchen.jpg",
      "/media/interior-bedroom.jpg",
      "/media/amenity-pool.jpg",
      "/media/amenity-spa.jpg",
    ]),
    units: [
      { name: "A-1204", type: "1 Bed", bedrooms: 1, bathrooms: 1, area: 620, price: "180000", floor: 12 },
      { name: "B-1806", type: "2 Bed", bedrooms: 2, bathrooms: 2, area: 980, price: "265000", floor: 18 },
      { name: "C-2701", type: "3 Bed", bedrooms: 3, bathrooms: 3, area: 1480, price: "390000", status: "RESERVED", floor: 27 },
    ],
    plans: [
      { name: "Type A", type: "1 Bed", imageUrl: "/media/plans/type-a.svg", area: 620, bedrooms: 1, bathrooms: 1 },
      { name: "Type B", type: "2 Bed", imageUrl: "/media/plans/type-b.svg", area: 980, bedrooms: 2, bathrooms: 2 },
    ],
  });

  await addProperty({
    name: "Riverside Terraces",
    slug: "riverside-terraces",
    description:
      "Apartments stepping down to a public boardwalk. Every home has a river-facing outdoor room. Fictional demonstration.",
    type: "APARTMENT",
    status: "LAUNCHED",
    completionDate: new Date("2026-08-01"),
    startingPrice: "220000",
    bedroomsMin: 1,
    bedroomsMax: 4,
    bathroomsMin: 1,
    bathroomsMax: 3,
    areaMin: 700,
    areaMax: 2100,
    floors: 12,
    totalUnits: 186,
    heroImage: "/media/project-riverside.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.705,
    longitude: 90.411,
    featured: true,
    lifestyle: "waterfront-living",
    developmentId: riverside.id,
    locationId: dhaka.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "gym", "gardens", "clubhouse", "security", "parking"],
    nearby: commonNearby,
    images: gallery("/media/project-riverside.jpg", [
      "/media/lifestyle-waterfront.jpg",
      "/media/interior-living.jpg",
      "/media/amenity-clubhouse.jpg",
    ]),
    units: [
      { name: "T-0402", type: "2 Bed", bedrooms: 2, bathrooms: 2, area: 1120, price: "295000", floor: 4 },
      { name: "T-0801", type: "3 Bed", bedrooms: 3, bathrooms: 3, area: 1640, price: "410000", floor: 8 },
    ],
    plans: [{ name: "Terrace 2", type: "2 Bed", imageUrl: "/media/plans/type-b.svg", area: 1120, bedrooms: 2, bathrooms: 2 }],
  });

  await addProperty({
    name: "Grove Courtyard Villas",
    slug: "grove-courtyard-villas",
    description:
      "Four-bedroom courtyard villas with private gardens and a shared forest edge. Demonstration content.",
    type: "VILLA",
    status: "READY",
    completionDate: new Date("2025-03-01"),
    startingPrice: "410000",
    bedroomsMin: 3,
    bedroomsMax: 5,
    bathroomsMin: 3,
    bathroomsMax: 5,
    areaMin: 2400,
    areaMax: 4200,
    totalUnits: 42,
    heroImage: "/media/project-grove.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 22.37,
    longitude: 91.8,
    featured: true,
    lifestyle: "private-residences",
    developmentId: grove.id,
    locationId: chattogram.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "gardens", "security", "parking", "clubhouse", "children"],
    nearby: commonNearby,
    images: gallery("/media/project-grove.jpg", [
      "/media/lifestyle-private.jpg",
      "/media/interior-kitchen.jpg",
      "/media/hero-nature.jpg",
    ]),
    units: [
      { name: "Villa 11", type: "Courtyard", bedrooms: 4, bathrooms: 4, area: 3100, price: "520000" },
      { name: "Villa 18", type: "Garden", bedrooms: 3, bathrooms: 3, area: 2480, price: "410000", status: "SOLD" },
    ],
    plans: [{ name: "Courtyard 4", type: "Villa", imageUrl: "/media/plans/type-villa.svg", area: 3100, bedrooms: 4, bathrooms: 4 }],
  });

  await addProperty({
    name: "Horizon Sky Residences",
    slug: "horizon-sky-residences",
    description:
      "High apartments with long views and a shaded podium. Fictional Dubai study — not for sale.",
    type: "APARTMENT",
    status: "UNDER_CONSTRUCTION",
    completionDate: new Date("2028-06-01"),
    startingPrice: "450000",
    bedroomsMin: 1,
    bedroomsMax: 3,
    bathroomsMin: 1,
    bathroomsMax: 3,
    areaMin: 690,
    areaMax: 1900,
    floors: 44,
    totalUnits: 310,
    heroImage: "/media/project-horizon.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 25.1972,
    longitude: 55.2744,
    featured: true,
    lifestyle: "urban-living",
    developmentId: horizon.id,
    locationId: dubai.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "gym", "spa", "concierge", "security", "parking", "library"],
    nearby: commonNearby,
    images: gallery("/media/project-horizon.jpg", [
      "/media/hero-urban.jpg",
      "/media/amenity-spa.jpg",
      "/media/interior-bedroom.jpg",
    ]),
    units: [
      { name: "H-2105", type: "2 Bed", bedrooms: 2, bathrooms: 2, area: 1080, price: "610000", floor: 21 },
    ],
    plans: [{ name: "Sky 2", type: "2 Bed", imageUrl: "/media/plans/type-b.svg", area: 1080, bedrooms: 2, bathrooms: 2 }],
  });

  await addProperty({
    name: "Bhumi Park Townhomes",
    slug: "bhumi-park-townhomes",
    description:
      "Two- and three-bedroom townhomes facing a central park. Demonstration family housing.",
    type: "TOWNHOUSE",
    status: "LAUNCHED",
    completionDate: new Date("2027-04-01"),
    startingPrice: "160000",
    bedroomsMin: 2,
    bedroomsMax: 4,
    bathroomsMin: 2,
    bathroomsMax: 3,
    areaMin: 980,
    areaMax: 1760,
    totalUnits: 86,
    heroImage: "/media/project-gardens.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.874,
    longitude: 90.398,
    featured: true,
    lifestyle: "family-communities",
    developmentId: gardens.id,
    locationId: dhaka.id,
    developerId: developer.id,
    amenitySlugs: ["gardens", "children", "clubhouse", "security", "parking"],
    nearby: commonNearby,
    images: gallery("/media/project-gardens.jpg", [
      "/media/lifestyle-family.jpg",
      "/media/amenity-play.jpg",
      "/media/interior-living.jpg",
    ]),
    units: [
      { name: "Park 22", type: "Townhome", bedrooms: 3, bathrooms: 3, area: 1320, price: "210000" },
    ],
    plans: [{ name: "Park 3", type: "Townhome", imageUrl: "/media/plans/type-b.svg", area: 1320, bedrooms: 3, bathrooms: 3 }],
  });

  await addProperty({
    name: "Central Living",
    slug: "central-living",
    description:
      "Apartments above a civic street in a fictional Singapore mixed-use block.",
    type: "MIXED_USE",
    status: "UPCOMING",
    completionDate: new Date("2029-09-01"),
    startingPrice: "620000",
    bedroomsMin: 1,
    bedroomsMax: 3,
    bathroomsMin: 1,
    bathroomsMax: 2,
    areaMin: 540,
    areaMax: 1500,
    floors: 22,
    totalUnits: 160,
    heroImage: "/media/project-central.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 1.304,
    longitude: 103.832,
    featured: true,
    lifestyle: "mixed-use-destinations",
    developmentId: central.id,
    locationId: singapore.id,
    developerId: developer.id,
    amenitySlugs: ["gym", "coworking", "library", "concierge", "security", "parking", "gardens"],
    nearby: commonNearby,
    images: gallery("/media/project-central.jpg", [
      "/media/lifestyle-mixed.jpg",
      "/media/amenity-library.jpg",
      "/media/interior-kitchen.jpg",
    ]),
    units: [
      { name: "CL-0903", type: "1 Bed", bedrooms: 1, bathrooms: 1, area: 580, price: "620000", floor: 9 },
    ],
    plans: [{ name: "Loft 1", type: "1 Bed", imageUrl: "/media/plans/type-a.svg", area: 580, bedrooms: 1, bathrooms: 1 }],
  });

  await addProperty({
    name: "Heights Penthouses",
    slug: "heights-penthouses",
    description: "Upper residences with planted terraces. Demonstration penthouses in MatriBhumi Heights.",
    type: "PENTHOUSE",
    status: "UNDER_CONSTRUCTION",
    completionDate: new Date("2027-11-01"),
    startingPrice: "740000",
    bedroomsMin: 3,
    bedroomsMax: 4,
    bathroomsMin: 3,
    bathroomsMax: 4,
    areaMin: 2200,
    areaMax: 3100,
    floors: 38,
    totalUnits: 6,
    heroImage: "/media/hero-night.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.8215,
    longitude: 90.4514,
    featured: false,
    lifestyle: "private-residences",
    developmentId: heights.id,
    locationId: bashundhara.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "spa", "concierge", "security", "parking", "gardens", "golf"],
    nearby: bashundharaNearby,
    images: gallery("/media/hero-night.jpg", ["/media/interior-living.jpg", "/media/amenity-pool.jpg"]),
    units: [{ name: "PH-02", type: "Penthouse", bedrooms: 4, bathrooms: 4, area: 2860, price: "890000", floor: 38 }],
    plans: [{ name: "PH", type: "Penthouse", imageUrl: "/media/plans/type-villa.svg", area: 2860, bedrooms: 4, bathrooms: 4 }],
  });

  await addProperty({
    name: "Grove Forest Houses",
    slug: "grove-forest-houses",
    description: "Quiet houses at the tree line. Nature-living demonstration homes.",
    type: "VILLA",
    status: "READY",
    completionDate: new Date("2025-03-01"),
    startingPrice: "560000",
    bedroomsMin: 4,
    bedroomsMax: 5,
    bathroomsMin: 4,
    bathroomsMax: 5,
    areaMin: 3400,
    areaMax: 4200,
    totalUnits: 12,
    heroImage: "/media/lifestyle-nature.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 22.372,
    longitude: 91.805,
    featured: false,
    lifestyle: "nature-living",
    developmentId: grove.id,
    locationId: chattogram.id,
    developerId: developer.id,
    amenitySlugs: ["gardens", "security", "parking", "pool"],
    nearby: commonNearby,
    images: gallery("/media/lifestyle-nature.jpg", ["/media/hero-nature.jpg", "/media/sustain-courtyard.jpg"]),
    units: [{ name: "Forest 4", type: "House", bedrooms: 4, bathrooms: 4, area: 3600, price: "560000" }],
    plans: [{ name: "Forest", type: "House", imageUrl: "/media/plans/type-villa.svg", area: 3600, bedrooms: 4, bathrooms: 4 }],
  });

  await addProperty({
    name: "Bashundhara District Residences",
    slug: "bashundhara-district-residences",
    description:
      "One- to four-bedroom homes in MatriBhumi Bashundhara: a demonstration community for expats, retirees, and Dhaka families who want malls, golf, amusement parks, and a modern building on the same map. Fictional inventory — MatriBhumi is not Bashundhara Group.",
    type: "MIXED_USE",
    status: "LAUNCHED",
    completionDate: new Date("2027-06-01"),
    startingPrice: "195000",
    bedroomsMin: 1,
    bedroomsMax: 4,
    bathroomsMin: 1,
    bathroomsMax: 3,
    areaMin: 680,
    areaMax: 2100,
    floors: 22,
    totalUnits: 220,
    heroImage: "/media/lifestyle-mixed.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.818,
    longitude: 90.454,
    featured: true,
    lifestyle: "mixed-use-destinations",
    developmentId: bashundharaDev.id,
    locationId: bashundhara.id,
    developerId: developer.id,
    amenitySlugs: ["pool", "gym", "concierge", "security", "parking", "gardens", "mall", "golf", "amusement", "cinema", "children"],
    nearby: bashundharaNearby,
    images: gallery("/media/lifestyle-mixed.jpg", [
      "/media/project-central.jpg",
      "/media/amenity-clubhouse.jpg",
      "/media/lifestyle-family.jpg",
      "/media/amenity-pool.jpg",
    ]),
    units: [
      { name: "BD-0702", type: "1 Bed", bedrooms: 1, bathrooms: 1, area: 680, price: "195000", floor: 7 },
      { name: "BD-1205", type: "2 Bed", bedrooms: 2, bathrooms: 2, area: 1050, price: "285000", floor: 12 },
      { name: "BD-1801", type: "3 Bed", bedrooms: 3, bathrooms: 3, area: 1580, price: "410000", floor: 18 },
    ],
    plans: [
      { name: "District 2", type: "2 Bed", imageUrl: "/media/plans/type-b.svg", area: 1050, bedrooms: 2, bathrooms: 2 },
    ],
  });

  const riversideHomes = await addProperty({
    name: "Canal Lofts",
    slug: "canal-lofts",
    description: "Compact lofts along a demonstration canal edge in MatriBhumi Riverside. Fictional inventory.",
    type: "APARTMENT",
    status: "LAUNCHED",
    completionDate: new Date("2026-08-01"),
    startingPrice: "195000",
    bedroomsMin: 0,
    bedroomsMax: 2,
    bathroomsMin: 1,
    bathroomsMax: 2,
    areaMin: 480,
    areaMax: 980,
    floors: 6,
    totalUnits: 48,
    heroImage: "/media/hero-waterfront.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.706,
    longitude: 90.412,
    featured: true,
    lifestyle: "waterfront-living",
    developmentId: riverside.id,
    locationId: dhaka.id,
    developerId: developer.id,
    amenitySlugs: ["gardens", "security", "parking", "coworking"],
    nearby: commonNearby,
    images: gallery("/media/hero-waterfront.jpg", ["/media/lifestyle-waterfront.jpg", "/media/interior-kitchen.jpg"]),
    units: [
      { name: "CL-0201", type: "Studio", bedrooms: 0, bathrooms: 1, area: 480, price: "195000", floor: 2 },
      { name: "CL-0504", type: "2 Bed", bedrooms: 2, bathrooms: 2, area: 920, price: "310000", floor: 5 },
    ],
    plans: [{ name: "Loft S", type: "Studio", imageUrl: "/media/plans/type-a.svg", area: 480, bedrooms: 0, bathrooms: 1 }],
  });

  const gardensFlats = await addProperty({
    name: "Parkside Apartments",
    slug: "parkside-apartments",
    description: "Low apartments facing the central park at Bhumi Gardens. Demonstration family housing.",
    type: "APARTMENT",
    status: "LAUNCHED",
    completionDate: new Date("2027-04-01"),
    startingPrice: "145000",
    bedroomsMin: 1,
    bedroomsMax: 3,
    bathroomsMin: 1,
    bathroomsMax: 2,
    areaMin: 640,
    areaMax: 1280,
    floors: 5,
    totalUnits: 40,
    heroImage: "/media/lifestyle-family.jpg",
    brochureUrl: "/media/brochures/matribhumi-preview.pdf",
    latitude: 23.875,
    longitude: 90.399,
    featured: false,
    lifestyle: "family-communities",
    developmentId: gardens.id,
    locationId: dhaka.id,
    developerId: developer.id,
    amenitySlugs: ["gardens", "children", "security", "parking", "bicycle"],
    nearby: commonNearby,
    images: gallery("/media/lifestyle-family.jpg", ["/media/project-gardens.jpg", "/media/amenity-play.jpg"]),
    units: [
      { name: "PS-0108", type: "1 Bed", bedrooms: 1, bathrooms: 1, area: 640, price: "145000", floor: 1 },
      { name: "PS-0402", type: "3 Bed", bedrooms: 3, bathrooms: 2, area: 1180, price: "240000", floor: 4 },
    ],
    plans: [{ name: "Park 1", type: "1 Bed", imageUrl: "/media/plans/type-a.svg", area: 640, bedrooms: 1, bathrooms: 1 }],
  });

  const extraHomes = [riversideHomes, gardensFlats];
  await prisma.unit.createMany({
    data: extraHomes.flatMap((home, index) =>
      Array.from({ length: 8 }, (_, i) => ({
        name: `U-${index + 1}${i + 10}`,
        type: i % 2 ? "2 Bed" : "1 Bed",
        bedrooms: i % 2 ? 2 : 1,
        bathrooms: 1,
        area: 700 + i * 40,
        price: String(160000 + i * 12000),
        status: "AVAILABLE" as const,
        propertyId: home.id,
        floor: i + 1,
      })),
    ),
  });

  const articles = [
    {
      title: "How we plan a street that people will actually use",
      slug: "planning-streets-people-use",
      excerpt: "Shade, seating, and a reason to linger — notes from MatriBhumi's urban design studio. Demonstration article.",
      category: "ARCHITECTURE" as const,
      coverImage: "/media/about-studio.jpg",
      body: `## A street is a room

MatriBhumi treats the space between buildings as seriously as the buildings themselves. This demonstration essay describes how we size sidewalks, plant for shade, and keep ground floors open to daily life.

We do not claim a proprietary method. We share a way of looking: start with walking, then light, then the shops and rooms that keep a street company after dusk.

### What we measure

- How far a child can walk to a park without crossing a fast road
- Where the afternoon sun actually falls in June
- Whether a building's edge offers a place to wait

These are planning questions, not marketing lines.`,
    },
    {
      title: "Water, quietly: designing with rain in Dhaka",
      slug: "designing-with-rain-dhaka",
      excerpt: "Courtyards, bioswales, and roofs that hold a storm. A demonstration note on water.",
      category: "SUSTAINABILITY" as const,
      coverImage: "/media/sustain-water.jpg",
      body: `## Hold the rain

In a monsoon city, water is not a problem to hide. This fictional briefing describes landscape tactics we study: permeable courts, planted roofs, and cisterns sized for dry weeks.

No certification is claimed. The work is to make wet days livable and dry days less brittle.`,
    },
    {
      title: "A handover is a relationship",
      slug: "handover-is-a-relationship",
      excerpt: "What we try to get right when keys change hands. Demonstration operations note.",
      category: "NEWS" as const,
      coverImage: "/media/about-lobby.jpg",
      body: `## After the photograph

A home is not finished at the photoshoot. This article — demonstration content — describes snagging, building manuals, and the people residents can actually call.`,
    },
    {
      title: "Reading a location without reading the future",
      slug: "reading-a-location",
      excerpt: "How we talk about place without promising what a market will do.",
      category: "MARKET_INSIGHTS" as const,
      coverImage: "/media/location-aerial.jpg",
      body: `## Place, not prediction

MatriBhumi discusses transport, schools, and daily amenities because they shape how a home is used. We do not forecast prices, rents, or returns. This demonstration piece explains the difference.`,
    },
    {
      title: "Kitchen windows and the park",
      slug: "kitchen-windows-and-the-park",
      excerpt: "A short note on family planning at Bhumi Gardens.",
      category: "LIFESTYLE" as const,
      coverImage: "/media/lifestyle-family.jpg",
      body: `## See the green from the sink

At Bhumi Gardens, a fictional community, we placed kitchens toward the park so the day's ordinary work still looks onto trees and play.`,
    },
    {
      title: "Update: Heights podium gardens take root",
      slug: "heights-podium-gardens",
      excerpt: "A demonstration project update from MatriBhumi Heights.",
      category: "PROJECT_UPDATES" as const,
      coverImage: "/media/about-construction.jpg",
      body: `## Planting a plaza in the air

Construction photography in this article is generated for the demonstration site. It illustrates how we talk about progress without inventing milestones.`,
    },
    {
      title: "Materials we return to",
      slug: "materials-we-return-to",
      excerpt: "Stone, timber, lime, and metal that can be maintained.",
      category: "DESIGN" as const,
      coverImage: "/media/sustain-courtyard.jpg",
      body: `## Quiet materials

We prefer surfaces that age in public: limewash, timber that can be oiled, stone that can be repaired. Demonstration palette, not a specification.`,
    },
    {
      title: "What a clubhouse is for",
      slug: "what-a-clubhouse-is-for",
      excerpt: "A room that belongs to the street, not a locked amenity. Demonstration note.",
      category: "LIFESTYLE" as const,
      coverImage: "/media/amenity-clubhouse.jpg",
      body: `## Borrowed living rooms

A clubhouse should work on a Tuesday afternoon: shade, a table, a kitchen someone can actually use.`,
    },
    {
      title: "Drawing the mixed-use block",
      slug: "drawing-the-mixed-use-block",
      excerpt: "How MatriBhumi Central stacks living, work, and a civic street. Demonstration essay.",
      category: "ARCHITECTURE" as const,
      coverImage: "/media/project-central.jpg",
      body: `## One plot, several days

The ground floor stays public. The middle holds work. The top is home. This is a study, not a completed building.`,
    },
    {
      title: "A note on talking about money",
      slug: "a-note-on-talking-about-money",
      excerpt: "Why this website will not promise a yield.",
      category: "MARKET_INSIGHTS" as const,
      coverImage: "/media/about-model.jpg",
      body: `## No forecasts

If a number cannot be stood beside in a quiet room, it does not belong on a MatriBhumi page.`,
    },
  ];

  for (const article of articles) {
    await prisma.newsArticle.create({
      data: {
        ...article,
        authorId: admin.id,
        readingTime: 4,
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  await prisma.job.createMany({
    data: [
      {
        title: "Project Architect",
        slug: "project-architect",
        department: "Design",
        location: "Dhaka",
        type: "Full-time",
        description: "Lead a demonstration residential project from sketch through site. Fictional opening.",
        requirements: "A portfolio of built or academic housing work. Care with climate and construction.",
      },
      {
        title: "Landscape Designer",
        slug: "landscape-designer",
        department: "Design",
        location: "Dhaka",
        type: "Full-time",
        description: "Planting, water, and the spaces between buildings.",
        requirements: "Experience with tropical or monsoon landscapes preferred.",
      },
      {
        title: "Community Manager",
        slug: "community-manager",
        department: "Customer experience",
        location: "Dhaka",
        type: "Full-time",
        description: "Be the person residents can reach after handover.",
        requirements: "Patience, clarity, and comfort with operations.",
      },
      {
        title: "Development Analyst",
        slug: "development-analyst",
        department: "Development",
        location: "Singapore",
        type: "Full-time",
        description: "Study sites, infrastructure, and program mix. Not a sales role.",
        requirements: "Numeracy and a respect for uncertainty.",
      },
      {
        title: "Site Engineer",
        slug: "site-engineer",
        department: "Construction",
        location: "Dhaka",
        type: "Full-time",
        description: "Keep the demonstration site honest: quality, programme, and the people doing the work.",
        requirements: "Construction experience and a calm way with contractors.",
      },
      {
        title: "Interior Designer",
        slug: "interior-designer",
        department: "Design",
        location: "Dhaka",
        type: "Full-time",
        description: "Joinery, light, and rooms that can be lived in without a stylist.",
        requirements: "A portfolio of residential interiors.",
      },
      {
        title: "Sales Consultant",
        slug: "sales-consultant",
        department: "Sales",
        location: "Dubai",
        type: "Full-time",
        description: "Help people understand a home without promising a market. Demonstration role.",
        requirements: "Clarity, patience, and comfort saying 'we do not forecast returns'.",
      },
      {
        title: "Communications Lead",
        slug: "communications-lead",
        department: "Studio",
        location: "Dhaka",
        type: "Full-time",
        description: "Write in public the way we build: carefully, without invented claims.",
        requirements: "Writing samples. No press-release theatre.",
      },
    ],
  });

  console.log("MatriBhumi demonstration database seeded.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
