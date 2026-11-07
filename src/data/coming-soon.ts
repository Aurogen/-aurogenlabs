// Lines announced on the site but not for sale yet. No prices, nutrition facts or claims:
// those come from the client when each line launches.

export interface SupplementPreview {
  slug: string;
  name: string;
  detail: string;
  image: string;
}

export const SUPPLEMENTS_PREVIEW: SupplementPreview[] = [
  {
    slug: "whey-protein-isolate",
    name: "Whey Protein Isolate",
    detail: "French Vanilla · 5 lb",
    image: "/supplements/whey-protein-isolate.webp",
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    detail: "Unflavored · 500 g",
    image: "/supplements/creatine-monohydrate.webp",
  },
  {
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    detail: "Blue Raspberry · 30 servings",
    image: "/supplements/ignite-pre-workout.webp",
  },
  {
    slug: "hydrate-electrolyte-mix",
    name: "Hydrate Electrolyte Mix",
    detail: "Lemon Lime · 30 servings",
    image: "/supplements/hydrate-electrolyte-mix.webp",
  },
  {
    slug: "collagen-type-1-3",
    name: "Collagen Type I & III",
    detail: "Unflavored · 300 g",
    image: "/supplements/collagen-type-1-3.webp",
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    detail: "120 capsules",
    image: "/supplements/magnesium-glycinate.webp",
  },
];

export interface MerchPreview {
  slug: string;
  name: string;
  detail: string;
  /** Studio photo of the garment with the Aurogen print. */
  image: string;
  /** The same piece worn, shown on hover / in rotation. */
  lifestyle: string;
}

export const MERCH_PREVIEW: MerchPreview[] = [
  {
    slug: "core-tee",
    name: "Core Logo Tee",
    detail: "Black · Heavyweight cotton",
    image: "/merch/core-tee.webp",
    lifestyle: "/merch/core-tee-lifestyle.webp",
  },
  {
    slug: "signature-hoodie",
    name: "Signature Hoodie",
    detail: "Navy · Brushed fleece",
    image: "/merch/signature-hoodie.webp",
    lifestyle: "/merch/signature-hoodie-lifestyle.webp",
  },
  {
    slug: "helix-hoodie",
    name: "Helix Hoodie",
    detail: "Heather grey · Oversized fit",
    image: "/merch/helix-hoodie.webp",
    lifestyle: "/merch/helix-hoodie-lifestyle.webp",
  },
];
