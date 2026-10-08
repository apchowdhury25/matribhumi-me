/**
 * Bangladesh legal, trust, and disclosure copy.
 *
 * Edit this file (and src/config/businessModel.ts) to update public wording.
 * Do not treat this file as lawyer-reviewed Bangladesh legal advice.
 * Qualified Bangladesh legal counsel should review, replace, or amend
 * every public legal page before the language is treated as binding.
 */
import { buyerFeeDisclosure, buyerFeeNote, developerFeeLabel } from "./businessModel";

export const counselReview = {
  status: "pending_review" as const,
  jurisdiction: "Bangladesh",
  lastUpdated: "8 October 2026",
  notice:
    "This page is operational website copy for MatriBhumi’s Bangladesh property advisory service. It is not legal advice and has not been reviewed or approved by qualified Bangladesh legal counsel. Counsel should review, replace, or amend this language before it is treated as a binding legal document.",
  notLegalAdvice:
    "Nothing on this website is legal, tax, financial, or financing advice. Obtain independent professional advice before completing a property transaction.",
};

export type CounselReviewStatus = typeof counselReview.status;

export const positioning = {
  market: "Bangladesh",
  summary:
    "MatriBhumi operates as a property advisory and transaction-coordination platform connecting buyers with participating real-estate developers in Bangladesh.",
  sellerResponsibility:
    "The developer or seller remains responsible for the property sale.",
  buyerHelp: [
    "discover properties",
    "compare properties",
    "understand available options",
    "connect with developers",
    "arrange property viewings",
    "coordinate communications",
    "follow up through the transaction process",
  ],
  licence:
    "This website does not claim that MatriBhumi is licensed, registered, authorized, regulated, or legally permitted to perform a particular brokerage, real-estate agency, property consultancy, or intermediary activity in Bangladesh. No licence number, registration, regulatory approval, government affiliation, developer agreement, or legal certification is published here unless independently verified and inserted by the company after counsel review.",
};

export const howWeWork = {
  title: "How we work",
  summary:
    "MatriBhumi helps buyers discover and compare selected properties from participating developers and coordinates introductions, viewings and transaction-related communication.",
  purchaseAgreement:
    "The property purchase agreement is between the buyer and the relevant developer/seller.",
  funds:
    "MatriBhumi does not receive or hold the buyer’s property purchase funds.",
};

export const compensationTransparency = {
  title: "How MatriBhumi is paid",
  disclosure: buyerFeeDisclosure,
  note: buyerFeeNote,
  points: [
    "Buyers do not pay MatriBhumi’s core advisory fee.",
    "Participating developers may compensate MatriBhumi.",
    "Developer arrangements can differ.",
    "Buyers may ask MatriBhumi about relevant developer relationships.",
  ],
  developerFeeTermPublic:
    "Where a participating developer compensates MatriBhumi, the contractual description of that compensation is set in a private commercial agreement. Public pages do not publish amounts, percentages, or agreement terms.",
  developerFeeTermInternalLabel: developerFeeLabel(),
};

export const transactionFlows = {
  title: "Two separate relationships",
  intro:
    "The buyer’s property purchase is a separate relationship from any commercial agreement between a participating developer and MatriBhumi.",
  buyerPurchase: {
    title: "Property purchase",
    steps: ["Buyer", "Property purchase", "Developer/Seller"] as const,
    note: "The property purchase agreement, purchase price, and payment of that price are between the buyer and the relevant developer or seller.",
  },
  developerCommercial: {
    title: "Developer commercial agreement",
    steps: ["Developer", "Commercial agreement", "MatriBhumi"] as const,
    note: "Any consultant, referral, marketing, service, or other agreed fee payable by a participating developer is a separate commercial arrangement. It is not a fee paid by the buyer and is not part of the buyer’s property purchase price.",
  },
  funds: howWeWork.funds,
};

export const propertyDisclaimer = {
  title: "Property information",
  body:
    "Prices, availability, specifications, unit availability, completion schedules, service charges, taxes, title information and other property details may change. Buyers should confirm important information with the relevant developer/seller and qualified professionals before making a purchase decision. Property information on this website is not a guarantee.",
  source:
    "Property information is provided by or sourced from the relevant developer or seller. MatriBhumi does not represent that published details are complete, current, or error-free.",
};

export const professionalAdvice = {
  title: "Independent professional advice",
  body:
    "Before completing a property transaction, buyers should obtain independent legal advice, tax advice, financial advice, and financing advice from qualified professionals of their own choosing.",
};

export const noInvestmentPromises = {
  title: "No investment promises",
  body:
    "MatriBhumi does not promise or imply guaranteed appreciation, guaranteed rental income, guaranteed returns, guaranteed resale value, guaranteed capital gains, guaranteed occupancy, or guaranteed investment performance. Property can lose value. Past or illustrative figures are not a prediction.",
};

export type BangladeshLegalTopic = {
  id: string;
  title: string;
  status: "pending_counsel";
  body: string;
};

export const bangladeshLegalTopics: readonly BangladeshLegalTopic[] = [
  {
    id: "company-status",
    title: "Company status and licensing",
    status: "pending_counsel",
    body: "Reserved for language supplied or approved by qualified Bangladesh legal counsel describing MatriBhumi’s company status and any licences or registrations that have been independently verified. This website does not invent licence numbers, registrations, or regulatory approvals.",
  },
  {
    id: "advisory-activity",
    title: "Property advisory and coordination activity",
    status: "pending_counsel",
    body: "Reserved for counsel-approved language on how Bangladesh law treats property advisory, introductions, and transaction coordination. Until that review, MatriBhumi describes its public role operationally and does not claim a specific licensed status.",
  },
  {
    id: "ownership-and-title",
    title: "Property ownership and title",
    status: "pending_counsel",
    body: "Reserved for counsel-approved information on ownership, title, and transfer of Bangladesh real property. Buyers should confirm title with the developer or seller and with independent legal counsel.",
  },
  {
    id: "taxes-and-charges",
    title: "Taxes, fees, and registration charges",
    status: "pending_counsel",
    body: "Reserved for counsel-approved information on taxes, stamp duties, registration charges, and similar costs that may apply to a Bangladesh property purchase. Published listing prices do not automatically include those amounts.",
  },
  {
    id: "non-resident-buyers",
    title: "Buyers living outside Bangladesh",
    status: "pending_counsel",
    body: "Reserved for counsel-approved information relevant to buyers who live outside Bangladesh. Ownership, payment, and registration rules can depend on citizenship, residency, and the facts of the transaction. Independent legal advice is required.",
  },
  {
    id: "developer-approvals",
    title: "Developer and project approvals",
    status: "pending_counsel",
    body: "Reserved for counsel-approved language on developer and project approvals. Approvals, structural certificates, and project registration belong to the relevant developer or seller unless a listing is marked MatriBhumi-owned.",
  },
  {
    id: "personal-data",
    title: "Personal data",
    status: "pending_counsel",
    body: "Reserved for counsel-approved language on Bangladesh personal-data and privacy requirements. The Privacy Policy describes current operational practice for information submitted on this website.",
  },
  {
    id: "property-marketing",
    title: "Property marketing and advertising",
    status: "pending_counsel",
    body: "Reserved for counsel-approved language on advertising and marketing of Bangladesh property. Listing copy should be confirmed with the relevant developer or seller.",
  },
];

export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type LegalPageContent = {
  slug: string;
  path: string;
  title: string;
  navLabel: string;
  description: string;
  sections: readonly LegalSection[];
};

const counselParagraph = counselReview.notice;
const notAdviceParagraph = counselReview.notLegalAdvice;

export const legalPages = {
  terms: {
    slug: "terms",
    path: "/terms",
    title: "Terms & Conditions",
    navLabel: "Terms",
    description: "Terms of use for the MatriBhumi website. Operational copy pending Bangladesh legal counsel review.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph, notAdviceParagraph],
      },
      {
        heading: "Who MatriBhumi is on this website",
        paragraphs: [
          positioning.summary,
          positioning.sellerResponsibility,
          `${howWeWork.summary} ${howWeWork.purchaseAgreement}`,
          positioning.licence,
        ],
      },
      {
        heading: "Use of this website",
        paragraphs: [
          "These terms apply to your use of matribhumi.me. By using the site you agree to use it lawfully and not to scrape, misrepresent, or interfere with the service.",
          "Materials on this website describe selected projects from participating developers in Bangladesh. A listing is MatriBhumi-owned only when it is explicitly marked as such.",
        ],
      },
      {
        heading: "No seller, no purchase funds",
        paragraphs: [
          howWeWork.purchaseAgreement,
          transactionFlows.funds,
          "MatriBhumi coordinates discovery, comparison, introductions, viewings, and transaction-related communication. Completing a purchase, paying the purchase price, and registering title are matters between the buyer, the developer or seller, and the professionals the buyer appoints.",
        ],
      },
      {
        heading: "Property information and investment language",
        paragraphs: [propertyDisclaimer.body, noInvestmentPromises.body],
      },
      {
        heading: "Fees",
        paragraphs: [buyerFeeDisclosure, buyerFeeNote],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms: hello@matribhumi.me. Office: House 12, Road 7, Gulshan, Dhaka 1212, Bangladesh.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    navLabel: "Privacy",
    description: "How MatriBhumi handles personal information submitted on this website. Operational copy pending Bangladesh legal counsel review.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph, notAdviceParagraph],
      },
      {
        heading: "What this policy covers",
        paragraphs: [
          "This policy describes operational practice for personal information submitted on matribhumi.me in connection with MatriBhumi’s Bangladesh property advisory service. It is not a complete statement of Bangladesh data-protection law.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "When you submit a form we may collect your name, email, phone or WhatsApp number, country of residence, preferred city, property preferences, budget, message, and any file you attach.",
          "Waitlist requests, brochure downloads, inquiries, viewing requests, advisory briefs, and job applications are stored so a member of the team can respond, coordinate an introduction to a participating developer where relevant, and send materials you asked for.",
          "Server logs may include an IP address used for security and rate limiting.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use the information to respond to you, match published Bangladesh listings as a screening aid, coordinate viewings and developer introductions, and keep a record of the enquiry.",
          "We do not sell this information.",
        ],
      },
      {
        heading: "Sharing",
        paragraphs: [
          "If you ask to be introduced to a participating developer, relevant contact and requirement details may be shared with that developer so they can continue the property discussion. We do not publish internal staff notes or commercial terms on this website.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Essential cookies operate the staff session and remember cookie choices. Analytics cookies are optional and are not set unless you accept them and an analytics identifier is present. See the Cookie Policy.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: ["Privacy questions: hello@matribhumi.me."],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    path: "/cookies",
    title: "Cookie Policy",
    navLabel: "Cookies",
    description: "Cookie notice for matribhumi.me. Operational copy pending Bangladesh legal counsel review.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph],
      },
      {
        heading: "Essential cookies",
        paragraphs: [
          "Essential cookies operate the staff session and remember whether you have seen the cookie notice. The site cannot provide the staff console without the session cookie.",
        ],
      },
      {
        heading: "Analytics cookies",
        paragraphs: [
          "Analytics cookies are optional. They are not set unless you accept them and an analytics identifier is present in the environment.",
        ],
      },
      {
        heading: "Local storage",
        paragraphs: [
          "Saved homes and comparison lists use local storage on your device, not a third-party cookie.",
        ],
      },
    ],
  },
  property: {
    slug: "property-disclaimer",
    path: "/disclaimer/property",
    title: "Property Disclaimer",
    navLabel: "Property disclaimer",
    description: "Property information on MatriBhumi.me may change and is not a guarantee.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph, notAdviceParagraph],
      },
      {
        heading: "Property details may change",
        paragraphs: [propertyDisclaimer.body, propertyDisclaimer.source],
      },
      {
        heading: "Who confirms the facts",
        paragraphs: [
          "Confirm prices, availability, specifications, unit mix, completion schedules, service charges, taxes, and title with the relevant developer or seller and with qualified professionals before you decide to purchase.",
          howWeWork.purchaseAgreement,
        ],
      },
      {
        heading: "No investment promises",
        paragraphs: [noInvestmentPromises.body, professionalAdvice.body],
      },
    ],
  },
  buyerFee: {
    slug: "buyer-fee",
    path: "/disclaimer/buyer-fee",
    title: "Buyer Fee Disclosure",
    navLabel: "Buyer-fee disclosure",
    description: "MatriBhumi does not charge buyers a core property advisory fee. Participating developers may compensate MatriBhumi.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph],
      },
      {
        heading: "What buyers pay MatriBhumi",
        paragraphs: [buyerFeeDisclosure],
      },
      {
        heading: "Compensation transparency",
        paragraphs: [
          compensationTransparency.points.join(" "),
          buyerFeeNote,
          compensationTransparency.developerFeeTermPublic,
        ],
      },
      {
        heading: "Separate from the purchase price",
        paragraphs: [
          transactionFlows.buyerPurchase.note,
          transactionFlows.developerCommercial.note,
          transactionFlows.funds,
        ],
      },
    ],
  },
  developers: {
    slug: "developer-disclosure",
    path: "/disclaimer/developers",
    title: "Developer Partner Disclosure",
    navLabel: "Developer disclosure",
    description: "MatriBhumi may have commercial relationships with participating developers. Public pages do not publish confidential terms.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph],
      },
      {
        heading: "Participating developers",
        paragraphs: [
          "MatriBhumi presents selected properties from participating real-estate developers in Bangladesh. Public developer names appear only when a partnership is published. This website does not invent developer agreements.",
          positioning.sellerResponsibility,
          howWeWork.purchaseAgreement,
        ],
      },
      {
        heading: "Commercial relationships",
        paragraphs: [
          "MatriBhumi may receive a consultant, referral, marketing, service, or other agreed fee from participating developers under separate commercial agreements. The appropriate contractual terminology can differ between developer relationships.",
          "Buyers do not pay MatriBhumi’s core advisory fee. Participating developers may compensate MatriBhumi. Developer arrangements can differ. Buyers may ask MatriBhumi about relevant developer relationships.",
          "Public pages do not disclose confidential developer compensation, agreement terms, or internal notes.",
        ],
      },
      {
        heading: "Two relationships",
        paragraphs: [
          transactionFlows.intro,
          `${transactionFlows.buyerPurchase.steps.join(" → ")}. ${transactionFlows.buyerPurchase.note}`,
          `${transactionFlows.developerCommercial.steps.join(" → ")}. ${transactionFlows.developerCommercial.note}`,
          transactionFlows.funds,
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    path: "/disclaimer",
    title: "General Disclaimer",
    navLabel: "Disclaimer",
    description: "General disclaimer for MatriBhumi’s Bangladesh property advisory website. Not legal advice.",
    sections: [
      {
        heading: "About this page",
        paragraphs: [counselParagraph, notAdviceParagraph],
      },
      {
        heading: "What MatriBhumi does",
        paragraphs: [
          positioning.summary,
          howWeWork.summary,
          howWeWork.purchaseAgreement,
          positioning.licence,
        ],
      },
      {
        heading: "Property information",
        paragraphs: [propertyDisclaimer.body, noInvestmentPromises.body],
      },
      {
        heading: "Fees and developer relationships",
        paragraphs: [buyerFeeDisclosure, buyerFeeNote],
      },
      {
        heading: "Independent advice",
        paragraphs: [professionalAdvice.body, transactionFlows.funds],
      },
    ],
  },
} as const satisfies Record<string, LegalPageContent>;

export const legalNav = [
  { href: legalPages.privacy.path, label: legalPages.privacy.navLabel },
  { href: legalPages.terms.path, label: legalPages.terms.navLabel },
  { href: legalPages.cookies.path, label: legalPages.cookies.navLabel },
  { href: legalPages.disclaimer.path, label: legalPages.disclaimer.navLabel },
  { href: legalPages.property.path, label: legalPages.property.navLabel },
  { href: legalPages.buyerFee.path, label: legalPages.buyerFee.navLabel },
  { href: legalPages.developers.path, label: legalPages.developers.navLabel },
  { href: "/legal/bangladesh", label: "Bangladesh legal information" },
] as const;

export const legalCompliance = [
  {
    title: "Developer of record",
    body: "Approvals, structural certificates, and developer registration belong to the participating developer for each listing. References are published when that developer provides them. MatriBhumi is the advisor and coordinator unless a listing is marked MatriBhumi-owned.",
  },
  {
    title: "Buyer fees",
    body: buyerFeeDisclosure,
  },
  {
    title: "Office",
    body: "MatriBhumi. House 12, Road 7, Gulshan, Dhaka 1212, Bangladesh. This website does not claim a real-estate licence in Bangladesh.",
  },
] as const;
