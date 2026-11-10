// Lines announced on the site but not for sale yet. No prices, nutrition facts or claims:
// those come from the client when each line launches.

export interface SupplementPreview {
  slug: string;
  name: string;
  detail: string;
  detail_es: string;
  image: string;
}

export const SUPPLEMENTS_PREVIEW: SupplementPreview[] = [
  {
    slug: "whey-protein-isolate",
    name: "Whey Protein Isolate",
    detail: "French Vanilla · 5 lb",
    detail_es: "Vainilla francesa · 5 lb",
    image: "/supplements/whey-protein-isolate-v2.webp",
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    detail: "Unflavored · 500 g",
    detail_es: "Sin sabor · 500 g",
    image: "/supplements/creatine-monohydrate-v2.webp",
  },
  {
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    detail: "Blue Raspberry · 30 servings",
    detail_es: "Frambuesa azul · 30 porciones",
    image: "/supplements/ignite-pre-workout-v2.webp",
  },
  {
    slug: "hydrate-electrolyte-mix",
    name: "Hydrate Electrolyte Mix",
    detail: "Lemon Lime · 30 servings",
    detail_es: "Limón y lima · 30 porciones",
    image: "/supplements/hydrate-electrolyte-mix-v2.webp",
  },
  {
    slug: "collagen-type-1-3",
    name: "Collagen Type I & III",
    detail: "Unflavored · 300 g",
    detail_es: "Sin sabor · 300 g",
    image: "/supplements/collagen-type-1-3-v2.webp",
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    detail: "120 capsules",
    detail_es: "120 cápsulas",
    image: "/supplements/magnesium-glycinate-v2.webp",
  },
];

export interface MerchPreview {
  slug: string;
  name: string;
  detail: string;
  detail_es: string;
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
    detail_es: "Blanca · Algodón",
    image: "/merch/logo-tee.webp",
    lifestyle: "/merch/logo-tee-lifestyle.webp",
  },
  {
    slug: "polo",
    name: "Aurogen Polo",
    detail: "White with navy collar · Piqué cotton",
    detail_es: "Blanca con cuello azul marino · Algodón piqué",
    image: "/merch/polo.webp",
    lifestyle: "/merch/polo-lifestyle.webp",
  },
  {
    slug: "half-zip-hoodie",
    name: "Half-Zip Hoodie",
    detail: "White · Oversized fit",
    detail_es: "Blanco · Corte oversized",
    image: "/merch/half-zip-hoodie.webp",
    lifestyle: "/merch/half-zip-hoodie-lifestyle.webp",
  },
];
