import { CATEGORIES, type Product } from "./products";

type Lang = "en" | "es";

/** Spanish copy for each product, keyed by slug. Products without an entry fall back to English. */
export const PRODUCTS_ES: Record<string, { description: string; longDescription: string }> = {
  // GLP3-RT (retatrutide)
  ...Object.fromEntries(
    ["retatrutide-10mg", "retatrutide-20mg", "retatrutide-30mg", "retatrutide-60mg"].map((slug) => [
      slug,
      {
        description: "Agonista triple de los receptores de GIP, GLP-1 y glucagón. Reactivo de investigación liofilizado.",
        longDescription:
          "GLP3-RT es un péptido sintético con actividad agonista sobre los receptores de GIP, GLP-1 y glucagón. Se suministra como polvo liofilizado para estudios in vitro de unión a receptores, vías de señalización y análisis. Solo para uso en investigación de laboratorio.",
      },
    ]),
  ),
  // GLP2-TZ (tirzepatide)
  ...Object.fromEntries(
    ["tirzepatide-10mg", "tirzepatide-15mg", "tirzepatide-20mg", "tirzepatide-30mg", "tirzepatide-60mg"].map((slug) => [
      slug,
      {
        description: "Agonista dual de los receptores de GIP y GLP-1. Reactivo de investigación liofilizado.",
        longDescription:
          "GLP2-TZ es un péptido sintético de 39 aminoácidos con actividad agonista sobre los receptores de GIP y GLP-1, conjugado con un diácido graso C20. Se suministra como polvo liofilizado para estudios in vitro de farmacología de receptores y análisis. Solo para uso en investigación de laboratorio.",
      },
    ]),
  ),
  "ghk-cu-100mg": {
    description: "Complejo de glicil-L-histidil-L-lisina con cobre(II). Reactivo de investigación liofilizado.",
    longDescription:
      "GHK-Cu es el tripéptido Gly-His-Lys complejado con cobre(II). Se suministra como polvo liofilizado para estudios in vitro de péptidos que se unen al cobre, química de coordinación de iones metálicos y ensayos en cultivo celular. Solo para uso en investigación de laboratorio.",
  },
  "tesamorelin-10mg": {
    description: "Análogo sintético de GHRH(1-44) con un grupo trans-3-hexenoílo en el extremo N-terminal.",
    longDescription:
      "Tesamorelin es un análogo sintético de 44 aminoácidos de la hormona liberadora de la hormona de crecimiento (GHRH) que lleva un grupo de ácido trans-3-hexenoico en el extremo N-terminal. Se suministra como polvo liofilizado para estudios in vitro de unión al receptor de GHRH y de estabilidad peptídica. Solo para uso en investigación de laboratorio.",
  },
  "tb-500-bpc-157-combo": {
    description: "TB-500 y BPC-157 suministrados en dos viales liofilizados por separado.",
    longDescription:
      "Kit con un vial de TB-500 (5mg) y un vial de BPC-157 (5mg). Cada vial se liofiliza de forma independiente para mayor estabilidad y se envía con su propio COA de lote. Destinado a estudios comparativos in vitro. Solo para uso en investigación de laboratorio.",
  },
  "nad-plus-500mg": {
    description: "Nicotinamida adenina dinucleótido (forma oxidada). Reactivo de grado investigación.",
    longDescription:
      "El NAD+ es una coenzima dinucleotídica que actúa como transportador de electrones en reacciones redox y como sustrato de las enzimas sirtuinas y PARP. Se suministra como polvo liofilizado para ensayos enzimáticos in vitro e investigación bioquímica. Solo para uso en investigación de laboratorio.",
  },
  // MOTS-c
  ...Object.fromEntries(
    ["mots-c-40mg", "mots-c-10mg"].map((slug) => [
      slug,
      {
        description: "Péptido de 16 aminoácidos derivado de la mitocondria. Reactivo de investigación liofilizado.",
        longDescription:
          "MOTS-c es un péptido de 16 aminoácidos codificado en el gen mitocondrial del ARNr 12S. Se suministra como polvo liofilizado para estudios in vitro de la señalización de AMPK y de la comunicación entre la mitocondria y el núcleo. Solo para uso en investigación de laboratorio.",
      },
    ]),
  ),
  "ipamorelin-cjc-1295-combo": {
    description: "Ipamorelin y CJC-1295 suministrados en dos viales liofilizados por separado.",
    longDescription:
      "Kit con un vial de Ipamorelin (5mg), agonista del receptor GHS-R1a, y un vial de CJC-1295 (5mg), análogo modificado de GRF(1-29). Cada vial se liofiliza de forma independiente y se envía con su propio COA de lote. Destinado a estudios comparativos in vitro de receptores. Solo para uso en investigación de laboratorio.",
  },
  "klow-blend-80mg": {
    description: "Formulación patentada de varios péptidos en un solo vial liofilizado.",
    longDescription:
      "KLOW Blend es una formulación liofilizada patentada que contiene varios péptidos de investigación en un solo vial. Contacta a soporte para conocer los detalles de su composición. Solo para uso en investigación de laboratorio.",
  },
  "bacteriostatic-water-10ml": {
    description: "Agua estéril con alcohol bencílico al 0.9% para reconstituir reactivos liofilizados.",
    longDescription:
      "El agua bacteriostática es agua estéril de grado USP que contiene alcohol bencílico al 0.9% como conservante bacteriostático. Se usa en el laboratorio para reconstituir péptidos liofilizados para investigación in vitro. No apta para uso humano ni veterinario.",
  },
};

export function productDescription(p: Pick<Product, "slug" | "description">, lang: Lang): string {
  return lang === "es" ? PRODUCTS_ES[p.slug]?.description ?? p.description : p.description;
}

export function productLongDescription(p: Pick<Product, "slug" | "longDescription">, lang: Lang): string {
  return lang === "es" ? PRODUCTS_ES[p.slug]?.longDescription ?? p.longDescription : p.longDescription;
}

/** Display name of a category; the English label stays the filter / URL value. */
export function categoryLabel(label: string, lang: Lang): string {
  if (lang !== "es") return label;
  return CATEGORIES.find((c) => c.label === label)?.label_es ?? label;
}

const BADGES_ES: Record<string, string> = {
  "BEST SELLER": "MÁS VENDIDO",
  POPULAR: "POPULAR",
  BULK: "AL POR MAYOR",
  PREMIUM: "PREMIUM",
  COMBO: "COMBO",
  NEW: "NUEVO",
  EXCLUSIVE: "EXCLUSIVO",
};

export function badgeLabel(badge: string, lang: Lang): string {
  return lang === "es" ? BADGES_ES[badge.trim().toUpperCase()] ?? badge : badge;
}

const STORAGE_PARTS_ES: Record<string, string> = {
  "store cold": "Conservar en frío",
  "protect from light": "Proteger de la luz",
  "do not freeze": "No congelar",
};

/** Storage notes are " · "-separated phrases; known phrases are translated, the rest (e.g. temperatures) kept. */
export function storageLabel(storage: string, lang: Lang): string {
  if (lang !== "es") return storage;
  return storage
    .split(" · ")
    .map((part) => STORAGE_PARTS_ES[part.trim().toLowerCase()] ?? part)
    .join(" · ");
}

/** "1 Vial" → "1 vial", "2 Vials" → "2 viales". */
export function sizeLabel(size: string, lang: Lang): string {
  if (lang !== "es") return size;
  const m = size.trim().match(/^(\d+)\s+vials?$/i);
  if (!m) return size;
  return `${m[1]} ${m[1] === "1" ? "vial" : "viales"}`;
}

/** "USP Grade" → "Grado USP"; percentages stay as they are. */
export function purityLabel(purity: string, lang: Lang): string {
  if (lang !== "es") return purity;
  const m = purity.trim().match(/^(.+?)\s+grade$/i);
  return m ? `Grado ${m[1]}` : purity;
}
