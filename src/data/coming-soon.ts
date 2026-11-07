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
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_a4848681-2b49-4613-af9d-0dbe3a663ecc.png",
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    detail: "Unflavored · 500 g",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_4cee545f-9d45-47a7-936f-0f1d6815f3c6.png",
  },
  {
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    detail: "Blue Raspberry · 30 servings",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204113_bffcf2aa-f92b-4143-afb0-522a945601f9.png",
  },
  {
    slug: "hydrate-electrolyte-mix",
    name: "Hydrate Electrolyte Mix",
    detail: "Lemon Lime · 30 servings",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_6c034781-767f-409c-813e-9374c5a4523c.png",
  },
  {
    slug: "collagen-type-1-3",
    name: "Collagen Type I & III",
    detail: "Unflavored · 300 g",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_6f22f418-fd87-487f-900a-562589153a10.png",
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    detail: "120 capsules",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_619d1f55-bf45-4c79-8e06-8402fc5c2b8f.png",
  },
];

export type MerchDesign = "core-tee" | "lab-tee" | "signature-hoodie" | "helix-hoodie";

export interface MerchPreview {
  design: MerchDesign;
  name: string;
  detail: string;
}

export const MERCH_PREVIEW: MerchPreview[] = [
  { design: "core-tee", name: "Core Logo Tee", detail: "Black · Heavyweight cotton" },
  { design: "lab-tee", name: "Research Dept. Tee", detail: "White · Front and back print" },
  { design: "signature-hoodie", name: "Signature Hoodie", detail: "Navy · Brushed fleece" },
  { design: "helix-hoodie", name: "Helix Hoodie", detail: "Heather grey · Oversized fit" },
];
