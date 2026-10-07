// Demo catalog: Aurogen sports nutrition line (investor preview branch).
export type Category = "Protein" | "Performance" | "Hydration" | "Wellness";

export interface Product {
  id: string;
  slug: string;
  name: string;
  compound: string;
  concentration: string;
  size: string;
  price: number;
  originalPrice?: number;
  goals: Category[];
  description: string;
  longDescription: string;
  inStock: boolean;
  featured: boolean;
  purity: string;
  sequence?: string;
  molecularWeight?: string;
  storage: string;
  badge?: string;
  image?: string;
  coaUrl?: string;
  /** Supplement-specific fields */
  benefits?: string[];
  directions?: string;
  facts?: [string, string][];
}

export const CATEGORIES: { label: Category; label_es: string }[] = [
  { label: "Protein", label_es: "Proteína" },
  { label: "Performance", label_es: "Rendimiento" },
  { label: "Hydration", label_es: "Hidratación" },
  { label: "Wellness", label_es: "Bienestar" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "whey-protein-isolate",
    name: "Whey Protein Isolate",
    compound: "French Vanilla",
    concentration: "5 lb",
    size: "68 servings",
    price: 89.99,
    originalPrice: 99.99,
    goals: ["Protein"],
    description: "25 g of fast-absorbing whey isolate per scoop to support muscle recovery.",
    longDescription:
      "Aurogen Whey Protein Isolate delivers 25 g of high-quality protein per scoop with 5.5 g of naturally occurring BCAAs and minimal sugar and fat. Whey isolate is filtered to remove most lactose, so it mixes smoothly and is easy on digestion. Use it after training to support muscle recovery, or any time of day to help reach your daily protein target.",
    inStock: true,
    featured: true,
    purity: "90% protein",
    storage: "Cool, dry place",
    badge: "Best seller",
    benefits: [
      "25 g protein and 5.5 g BCAAs per serving",
      "Supports muscle recovery and growth*",
      "Low sugar, low fat, mixes in seconds",
      "Third-party tested for label accuracy",
    ],
    directions: "Mix 1 scoop (32 g) with 8–10 oz of water or milk. Enjoy after training or between meals.",
    facts: [
      ["Serving size", "1 scoop (32 g)"],
      ["Servings per container", "68"],
      ["Calories", "120"],
      ["Protein", "25 g"],
      ["Carbohydrates", "2 g"],
      ["Sugar", "1 g"],
      ["Fat", "1 g"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_a4848681-2b49-4613-af9d-0dbe3a663ecc.png",
  },
  {
    id: "2",
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    compound: "Unflavored · Micronized",
    concentration: "500 g",
    size: "100 servings",
    price: 49.99,
    goals: ["Performance"],
    description: "5 g of pure micronized creatine per serving for strength and power.",
    longDescription:
      "Creatine monohydrate is one of the most studied sports supplements. It increases the muscles' phosphocreatine stores, which helps regenerate energy (ATP) during short, high-intensity efforts like lifting and sprinting. Aurogen Creatine is a single-ingredient, micronized powder: no fillers, no flavors, dissolves easily in any drink.",
    inStock: true,
    featured: true,
    purity: "Single ingredient",
    storage: "Cool, dry place",
    badge: "Most popular",
    benefits: [
      "Supports strength and power output*",
      "Helps performance in high-intensity training*",
      "Micronized for easy mixing",
      "Unflavored: add it to water, juice or your shake",
    ],
    directions: "Mix 1 scoop (5 g) into 8 oz of any beverage once daily. Take consistently, on training and rest days.",
    facts: [
      ["Serving size", "1 scoop (5 g)"],
      ["Servings per container", "100"],
      ["Creatine monohydrate", "5 g"],
      ["Other ingredients", "None"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_4cee545f-9d45-47a7-936f-0f1d6815f3c6.png",
  },
  {
    id: "3",
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    compound: "Blue Raspberry",
    concentration: "30 servings",
    size: "1 tub",
    price: 54.99,
    goals: ["Performance"],
    description: "Energy, focus and pump with 200 mg of caffeine per scoop.",
    longDescription:
      "Ignite is a pre-workout formula built for energy, focus and endurance. Each scoop combines 200 mg of caffeine with L-citrulline, beta-alanine and L-tyrosine to help you start strong and stay locked in through your session. Clear label, clinically studied ingredients, no proprietary blends.",
    inStock: true,
    featured: true,
    purity: "No proprietary blends",
    storage: "Cool, dry place",
    benefits: [
      "200 mg caffeine for energy and alertness*",
      "6 g L-citrulline to support blood flow*",
      "3.2 g beta-alanine to support endurance*",
      "Fully disclosed label",
    ],
    directions: "Mix 1 scoop with 10–12 oz of cold water 20–30 minutes before training. Do not exceed 1 scoop per day.",
    facts: [
      ["Serving size", "1 scoop (14 g)"],
      ["Caffeine", "200 mg"],
      ["L-Citrulline", "6 g"],
      ["Beta-Alanine", "3.2 g"],
      ["L-Tyrosine", "1 g"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204113_bffcf2aa-f92b-4143-afb0-522a945601f9.png",
  },
  {
    id: "4",
    slug: "hydrate-electrolyte-mix",
    name: "Hydrate Electrolyte Mix",
    compound: "Lemon Lime · Zero Sugar",
    concentration: "30 servings",
    size: "1 pouch",
    price: 44.99,
    goals: ["Hydration"],
    description: "Sodium, potassium and magnesium to replace what you lose in sweat.",
    longDescription:
      "Hydrate is a zero-sugar electrolyte drink mix with a balanced blend of sodium, potassium and magnesium. Use it during long or hot training sessions, after heavy sweating, or any day you need better hydration. Light, refreshing lemon-lime flavor.",
    inStock: true,
    featured: true,
    purity: "Zero sugar",
    storage: "Cool, dry place",
    badge: "New",
    benefits: [
      "Replaces electrolytes lost in sweat*",
      "Supports hydration and muscle function*",
      "Zero sugar, 10 calories",
      "Light lemon-lime flavor",
    ],
    directions: "Mix 1 scoop with 16 oz of water. Drink during or after exercise, or as needed throughout the day.",
    facts: [
      ["Serving size", "1 scoop (6 g)"],
      ["Sodium", "1,000 mg"],
      ["Potassium", "200 mg"],
      ["Magnesium", "60 mg"],
      ["Sugar", "0 g"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_6c034781-767f-409c-813e-9374c5a4523c.png",
  },
  {
    id: "5",
    slug: "collagen-type-1-3",
    name: "Collagen Type I & III",
    compound: "Unflavored · + Vitamin C",
    concentration: "300 g",
    size: "30 servings",
    price: 59.99,
    goals: ["Wellness"],
    description: "10 g of hydrolyzed collagen with vitamin C for skin, hair and joints.",
    longDescription:
      "Aurogen Collagen provides 10 g of hydrolyzed bovine collagen (types I & III) per serving, plus vitamin C, which the body uses to form collagen, and hyaluronic acid. Unflavored and fully soluble: stir it into coffee, smoothies or water.",
    inStock: true,
    featured: true,
    purity: "Hydrolyzed",
    storage: "Cool, dry place",
    benefits: [
      "Supports healthy skin, hair and nails*",
      "Supports joint and connective tissue health*",
      "Vitamin C to support natural collagen formation*",
      "Dissolves in hot or cold drinks",
    ],
    directions: "Stir 1 scoop (11 g) into 8 oz of any hot or cold beverage once daily.",
    facts: [
      ["Serving size", "1 scoop (11 g)"],
      ["Collagen peptides (types I & III)", "10 g"],
      ["Vitamin C", "90 mg"],
      ["Hyaluronic acid", "50 mg"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204115_6f22f418-fd87-487f-900a-562589153a10.png",
  },
  {
    id: "6",
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    compound: "High absorption",
    concentration: "200 mg",
    size: "120 capsules",
    price: 42.99,
    goals: ["Wellness"],
    description: "Gentle, highly absorbable magnesium for recovery, relaxation and sleep.",
    longDescription:
      "Magnesium takes part in hundreds of processes in the body, including muscle function, energy production and the nervous system. Glycinate is a chelated form that is well absorbed and gentle on the stomach, making it a good choice for evening use as part of your recovery routine.",
    inStock: true,
    featured: true,
    purity: "Chelated form",
    storage: "Cool, dry place",
    benefits: [
      "Supports muscle function and recovery*",
      "Supports relaxation and restful sleep*",
      "Chelated form, gentle on the stomach",
      "Vegan capsules",
    ],
    directions: "Take 2 capsules daily with water, preferably in the evening.",
    facts: [
      ["Serving size", "2 capsules"],
      ["Servings per container", "60"],
      ["Magnesium (as glycinate)", "200 mg"],
    ],
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20261007_204114_619d1f55-bf45-4c79-8e06-8402fc5c2b8f.png",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);
export const getProductBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getProductsByCategory = (category: Category) => PRODUCTS.filter((p) => p.goals.includes(category));
