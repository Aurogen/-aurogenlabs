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
  /** Product cut out on the shared studio backdrop (same for every item). */
  image: string;
}

export const MERCH_PREVIEW: MerchPreview[] = [
  {
    slug: "logo-tee",
    name: "Aurogen Logo Tee",
    detail: "White · Cotton",
    detail_es: "Blanca · Algodón",
    image: "/merch/logo-tee-v2.webp",
  },
  {
    slug: "polo",
    name: "Aurogen Polo",
    detail: "White with navy collar · Piqué cotton",
    detail_es: "Blanca con cuello azul marino · Algodón piqué",
    image: "/merch/polo-v2.webp",
  },
  {
    slug: "half-zip-hoodie",
    name: "Half-Zip Hoodie",
    detail: "White · Oversized fit",
    detail_es: "Blanco · Corte oversized",
    image: "/merch/half-zip-hoodie-v2.webp",
  },
  {
    slug: "vial-case",
    name: "Vial Travel Case",
    detail: "Black · Holds 9 vials",
    detail_es: "Negro · Para 9 viales",
    image: "/merch/vial-case-v2.webp",
  },
  {
    slug: "raglan-crop-tee",
    name: "Move Your Way Crop Tee",
    detail: "Off-white · Raglan, boxy fit",
    detail_es: "Blanco hueso · Raglán, corte amplio",
    image: "/merch/raglan-crop-tee-v2.webp",
  },
  {
    slug: "fitted-crop-tee",
    name: "Own Your Power Crop Tee",
    detail: "Sand · Fitted",
    detail_es: "Arena · Ajustada",
    image: "/merch/fitted-crop-tee-v2.webp",
  },
  {
    slug: "cap-brown",
    name: "Own Your Progress Cap",
    detail: "Brown · Embroidered",
    detail_es: "Café · Bordada",
    image: "/merch/cap-brown-v2.webp",
  },
  {
    slug: "cap-navy",
    name: "Move Beyond Cap",
    detail: "Navy · Embroidered",
    detail_es: "Azul marino · Bordada",
    image: "/merch/cap-navy-v2.webp",
  },
];
