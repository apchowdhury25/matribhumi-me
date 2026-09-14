export const media = {
  hero: {
    plaza: { src: "/media/hero-plaza.jpg", alt: "Landscaped plaza at the base of a contemporary MatriBhumi development" },
    waterfront: { src: "/media/hero-waterfront.jpg", alt: "Waterfront residences along a calm river at dusk" },
    nature: { src: "/media/hero-nature.jpg", alt: "Low-rise homes set among trees and gardens" },
    urban: { src: "/media/hero-urban.jpg", alt: "Urban residential tower at twilight" },
  },
} as const;

export function demoImage(src: string, alt: string) {
  return { src, alt: `${alt} (demonstration imagery)` };
}
