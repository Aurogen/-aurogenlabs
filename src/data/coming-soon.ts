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
    slug: "logo-tee",
    name: "Aurogen Logo Tee",
    detail: "White · Cotton",
    image: "/merch/logo-tee.webp",
    lifestyle: "/merch/logo-tee-lifestyle.webp",
  },
  {
    slug: "polo",
    name: "Aurogen Polo",
    detail: "White with navy collar · Piqué cotton",
    image: "/merch/polo.webp",
    lifestyle: "/merch/polo-lifestyle.webp",
  },
  {
    slug: "half-zip-hoodie",
    name: "Half-Zip Hoodie",
    detail: "White · Oversized fit",
    image: "/merch/half-zip-hoodie.webp",
    lifestyle: "/merch/half-zip-hoodie-lifestyle.webp",
  },
];
