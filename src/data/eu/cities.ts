/**
 * EU city registry (Phase B2 — national coverage).
 *
 * Canonical slug == ASCII English slug. Per-locale name/slug overrides
 * are applied only where the city name materially differs across locales.
 *
 * Source for coordinates: GeoNames/Wikipedia (rounded to 4 decimals).
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export type PopulationTier = "primary" | "secondary" | "tertiary";

export interface EuCity {
  /** Canonical English ASCII slug. Unique within country. */
  canonical: string;
  country: EuCountryCode;
  name: Record<LocaleCode, string>;
  slug: Record<LocaleCode, string>;
  lat: number;
  lng: number;
  tier: PopulationTier;
}

const ALL_LOCALES: LocaleCode[] = ["en", "es", "fr", "de", "pt", "it"];

type LocaleOverride = Partial<Record<LocaleCode, { name?: string; slug?: string }>>;

/**
 * Build a city entry. Defaults all locales to (defaultName, canonical slug),
 * then applies overrides. Use overrides only for cities whose name actually
 * differs across languages (Munich/München, Naples/Napoli, etc.).
 */
function city(
  canonical: string,
  country: EuCountryCode,
  lat: number,
  lng: number,
  tier: PopulationTier,
  defaultName: string,
  overrides: LocaleOverride = {},
): EuCity {
  const name = {} as Record<LocaleCode, string>;
  const slug = {} as Record<LocaleCode, string>;
  for (const l of ALL_LOCALES) {
    name[l] = overrides[l]?.name ?? defaultName;
    slug[l] = overrides[l]?.slug ?? canonical;
  }
  return { canonical, country, name, slug, lat, lng, tier };
}

export const euCities: EuCity[] = [
  // ─────────── France (30) ───────────
  city("paris", "fr", 48.8566, 2.3522, "primary", "Paris"),
  city("marseille", "fr", 43.2965, 5.3698, "primary", "Marseille", {
    es: { name: "Marsella", slug: "marsella" },
    pt: { name: "Marselha", slug: "marselha" },
    it: { name: "Marsiglia", slug: "marsiglia" },
  }),
  city("lyon", "fr", 45.7640, 4.8357, "primary", "Lyon", {
    it: { name: "Lione", slug: "lione" },
  }),
  city("toulouse", "fr", 43.6047, 1.4442, "secondary", "Toulouse", {
    it: { name: "Tolosa", slug: "tolosa" },
  }),
  city("nice", "fr", 43.7102, 7.2620, "secondary", "Nice", {
    es: { name: "Niza", slug: "niza" },
    de: { name: "Nizza", slug: "nizza" },
    it: { name: "Nizza", slug: "nizza" },
  }),
  city("nantes", "fr", 47.2184, -1.5536, "secondary", "Nantes"),
  city("montpellier", "fr", 43.6108, 3.8767, "secondary", "Montpellier"),
  city("strasbourg", "fr", 48.5734, 7.7521, "secondary", "Strasbourg", {
    de: { name: "Straßburg", slug: "strassburg" },
    it: { name: "Strasburgo", slug: "strasburgo" },
    es: { name: "Estrasburgo", slug: "estrasburgo" },
    pt: { name: "Estrasburgo", slug: "estrasburgo" },
  }),
  city("bordeaux", "fr", 44.8378, -0.5792, "secondary", "Bordeaux", {
    es: { name: "Burdeos", slug: "burdeos" },
  }),
  city("lille", "fr", 50.6292, 3.0573, "secondary", "Lille"),
  city("rennes", "fr", 48.1173, -1.6778, "secondary", "Rennes"),
  city("reims", "fr", 49.2583, 4.0317, "tertiary", "Reims"),
  city("saint-etienne", "fr", 45.4397, 4.3872, "tertiary", "Saint-Étienne"),
  city("toulon", "fr", 43.1242, 5.9280, "tertiary", "Toulon"),
  city("le-havre", "fr", 49.4944, 0.1079, "tertiary", "Le Havre"),
  city("grenoble", "fr", 45.1885, 5.7245, "tertiary", "Grenoble"),
  city("dijon", "fr", 47.3220, 5.0415, "tertiary", "Dijon"),
  city("angers", "fr", 47.4784, -0.5632, "tertiary", "Angers"),
  city("nimes", "fr", 43.8367, 4.3601, "tertiary", "Nîmes"),
  city("aix-en-provence", "fr", 43.5297, 5.4474, "tertiary", "Aix-en-Provence"),
  city("clermont-ferrand", "fr", 45.7772, 3.0870, "tertiary", "Clermont-Ferrand"),
  city("brest", "fr", 48.3904, -4.4861, "tertiary", "Brest"),
  city("tours", "fr", 47.3941, 0.6848, "tertiary", "Tours"),
  city("limoges", "fr", 45.8336, 1.2611, "tertiary", "Limoges"),
  city("amiens", "fr", 49.8941, 2.2958, "tertiary", "Amiens"),
  city("perpignan", "fr", 42.6886, 2.8946, "tertiary", "Perpignan"),
  city("metz", "fr", 49.1193, 6.1757, "tertiary", "Metz"),
  city("besancon", "fr", 47.2378, 6.0241, "tertiary", "Besançon"),
  city("orleans", "fr", 47.9029, 1.9093, "tertiary", "Orléans"),
  city("rouen", "fr", 49.4432, 1.0993, "tertiary", "Rouen"),

  // ─────────── Germany (30) ───────────
  city("berlin", "de", 52.5200, 13.4050, "primary", "Berlin", {
    es: { name: "Berlín" },
    pt: { name: "Berlim", slug: "berlim" },
    it: { name: "Berlino", slug: "berlino" },
  }),
  city("hamburg", "de", 53.5511, 9.9937, "primary", "Hamburg", {
    es: { name: "Hamburgo", slug: "hamburgo" },
    fr: { name: "Hambourg", slug: "hambourg" },
    pt: { name: "Hamburgo", slug: "hamburgo" },
    it: { name: "Amburgo", slug: "amburgo" },
  }),
  city("munich", "de", 48.1351, 11.5820, "primary", "Munich", {
    de: { name: "München", slug: "muenchen" },
    es: { name: "Múnich" },
    pt: { name: "Munique", slug: "munique" },
    it: { name: "Monaco di Baviera", slug: "monaco-di-baviera" },
  }),
  city("cologne", "de", 50.9375, 6.9603, "primary", "Cologne", {
    de: { name: "Köln", slug: "koeln" },
    es: { name: "Colonia", slug: "colonia" },
    pt: { name: "Colônia", slug: "colonia" },
    it: { name: "Colonia", slug: "colonia" },
  }),
  city("frankfurt", "de", 50.1109, 8.6821, "primary", "Frankfurt", {
    es: { name: "Fráncfort" },
    fr: { name: "Francfort", slug: "francfort" },
    pt: { name: "Frankfurt" },
    it: { name: "Francoforte", slug: "francoforte" },
  }),
  city("stuttgart", "de", 48.7758, 9.1829, "secondary", "Stuttgart", {
    it: { name: "Stoccarda", slug: "stoccarda" },
  }),
  city("dusseldorf", "de", 51.2277, 6.7735, "secondary", "Düsseldorf"),
  city("leipzig", "de", 51.3397, 12.3731, "secondary", "Leipzig", {
    it: { name: "Lipsia", slug: "lipsia" },
  }),
  city("dortmund", "de", 51.5136, 7.4653, "secondary", "Dortmund"),
  city("essen", "de", 51.4556, 7.0116, "secondary", "Essen"),
  city("bremen", "de", 53.0793, 8.8017, "secondary", "Bremen", {
    es: { name: "Bremen" },
    fr: { name: "Brême", slug: "breme" },
    it: { name: "Brema", slug: "brema" },
  }),
  city("dresden", "de", 51.0504, 13.7373, "secondary", "Dresden", {
    fr: { name: "Dresde", slug: "dresde" },
    it: { name: "Dresda", slug: "dresda" },
  }),
  city("hannover", "de", 52.3759, 9.7320, "secondary", "Hannover", {
    en: { name: "Hanover" },
    it: { name: "Hannover" },
  }),
  city("nuremberg", "de", 49.4521, 11.0767, "secondary", "Nuremberg", {
    de: { name: "Nürnberg", slug: "nuernberg" },
    fr: { name: "Nuremberg" },
    it: { name: "Norimberga", slug: "norimberga" },
  }),
  city("duisburg", "de", 51.4344, 6.7623, "secondary", "Duisburg"),
  city("bochum", "de", 51.4818, 7.2162, "tertiary", "Bochum"),
  city("wuppertal", "de", 51.2562, 7.1508, "tertiary", "Wuppertal"),
  city("bielefeld", "de", 52.0302, 8.5325, "tertiary", "Bielefeld"),
  city("bonn", "de", 50.7374, 7.0982, "tertiary", "Bonn"),
  city("munster", "de", 51.9607, 7.6261, "tertiary", "Münster"),
  city("karlsruhe", "de", 49.0069, 8.4037, "tertiary", "Karlsruhe"),
  city("mannheim", "de", 49.4875, 8.4660, "tertiary", "Mannheim"),
  city("augsburg", "de", 48.3705, 10.8978, "tertiary", "Augsburg", {
    it: { name: "Augusta", slug: "augusta" },
  }),
  city("wiesbaden", "de", 50.0782, 8.2398, "tertiary", "Wiesbaden"),
  city("aachen", "de", 50.7753, 6.0839, "tertiary", "Aachen", {
    fr: { name: "Aix-la-Chapelle", slug: "aix-la-chapelle" },
    it: { name: "Aquisgrana", slug: "aquisgrana" },
  }),
  city("braunschweig", "de", 52.2689, 10.5268, "tertiary", "Braunschweig", {
    en: { name: "Brunswick" },
  }),
  city("kiel", "de", 54.3233, 10.1228, "tertiary", "Kiel"),
  city("chemnitz", "de", 50.8278, 12.9214, "tertiary", "Chemnitz"),
  city("magdeburg", "de", 52.1205, 11.6276, "tertiary", "Magdeburg"),
  city("freiburg", "de", 47.9990, 7.8421, "tertiary", "Freiburg"),

  // ─────────── Spain (30) ───────────
  city("madrid", "es", 40.4168, -3.7038, "primary", "Madrid"),
  city("barcelona", "es", 41.3851, 2.1734, "primary", "Barcelona", {
    fr: { name: "Barcelone", slug: "barcelone" },
    it: { name: "Barcellona", slug: "barcellona" },
  }),
  city("valencia", "es", 39.4699, -0.3763, "secondary", "Valencia", {
    fr: { name: "Valence", slug: "valence" },
  }),
  city("seville", "es", 37.3886, -5.9823, "primary", "Seville", {
    es: { name: "Sevilla", slug: "sevilla" },
    fr: { name: "Séville", slug: "seville" },
    de: { name: "Sevilla", slug: "sevilla" },
    pt: { name: "Sevilha", slug: "sevilha" },
    it: { name: "Siviglia", slug: "siviglia" },
  }),
  city("zaragoza", "es", 41.6488, -0.8891, "secondary", "Zaragoza", {
    en: { name: "Zaragoza" },
    fr: { name: "Saragosse", slug: "saragosse" },
    it: { name: "Saragozza", slug: "saragozza" },
  }),
  city("malaga", "es", 36.7213, -4.4214, "secondary", "Málaga"),
  city("murcia", "es", 37.9922, -1.1307, "secondary", "Murcia", {
    it: { name: "Murcia" },
  }),
  city("palma", "es", 39.5696, 2.6502, "secondary", "Palma"),
  city("las-palmas", "es", 28.1235, -15.4363, "secondary", "Las Palmas"),
  city("bilbao", "es", 43.2630, -2.9350, "secondary", "Bilbao"),
  city("alicante", "es", 38.3452, -0.4810, "secondary", "Alicante"),
  city("cordoba", "es", 37.8882, -4.7794, "tertiary", "Córdoba", {
    fr: { name: "Cordoue", slug: "cordoue" },
    it: { name: "Cordova", slug: "cordova" },
  }),
  city("valladolid", "es", 41.6523, -4.7245, "tertiary", "Valladolid"),
  city("vigo", "es", 42.2406, -8.7207, "tertiary", "Vigo"),
  city("gijon", "es", 43.5453, -5.6619, "tertiary", "Gijón"),
  city("a-coruna", "es", 43.3623, -8.4115, "tertiary", "A Coruña"),
  city("granada", "es", 37.1773, -3.5986, "tertiary", "Granada", {
    fr: { name: "Grenade", slug: "grenade" },
  }),
  city("vitoria-gasteiz", "es", 42.8467, -2.6716, "tertiary", "Vitoria-Gasteiz"),
  city("elche", "es", 38.2655, -0.6983, "tertiary", "Elche"),
  city("oviedo", "es", 43.3614, -5.8593, "tertiary", "Oviedo"),
  city("santa-cruz-de-tenerife", "es", 28.4636, -16.2518, "tertiary", "Santa Cruz de Tenerife"),
  city("pamplona", "es", 42.8125, -1.6458, "tertiary", "Pamplona", {
    fr: { name: "Pampelune", slug: "pampelune" },
  }),
  city("almeria", "es", 36.8340, -2.4637, "tertiary", "Almería"),
  city("san-sebastian", "es", 43.3183, -1.9812, "tertiary", "San Sebastián", {
    fr: { name: "Saint-Sébastien", slug: "saint-sebastien" },
  }),
  city("burgos", "es", 42.3439, -3.6970, "tertiary", "Burgos"),
  city("santander", "es", 43.4623, -3.8099, "tertiary", "Santander"),
  city("castellon", "es", 39.9864, -0.0513, "tertiary", "Castellón de la Plana"),
  city("logrono", "es", 42.4627, -2.4449, "tertiary", "Logroño"),
  city("badajoz", "es", 38.8794, -6.9707, "tertiary", "Badajoz"),
  city("salamanca", "es", 40.9701, -5.6635, "tertiary", "Salamanca", {
    fr: { name: "Salamanque", slug: "salamanque" },
  }),

  // ─────────── Italy (30) ───────────
  city("rome", "it", 41.9028, 12.4964, "primary", "Rome", {
    es: { name: "Roma", slug: "roma" },
    de: { name: "Rom", slug: "rom" },
    pt: { name: "Roma", slug: "roma" },
    it: { name: "Roma", slug: "roma" },
  }),
  city("milan", "it", 45.4642, 9.1900, "primary", "Milan", {
    es: { name: "Milán" },
    de: { name: "Mailand", slug: "mailand" },
    pt: { name: "Milão", slug: "milao" },
    it: { name: "Milano", slug: "milano" },
  }),
  city("naples", "it", 40.8518, 14.2681, "primary", "Naples", {
    es: { name: "Nápoles", slug: "napoles" },
    de: { name: "Neapel", slug: "neapel" },
    pt: { name: "Nápoles", slug: "napoles" },
    it: { name: "Napoli", slug: "napoli" },
  }),
  city("turin", "it", 45.0703, 7.6869, "primary", "Turin", {
    es: { name: "Turín", slug: "turin" },
    fr: { name: "Turin" },
    de: { name: "Turin" },
    pt: { name: "Turim", slug: "turim" },
    it: { name: "Torino", slug: "torino" },
  }),
  city("palermo", "it", 38.1157, 13.3615, "secondary", "Palermo", {
    fr: { name: "Palerme", slug: "palerme" },
  }),
  city("genoa", "it", 44.4056, 8.9463, "secondary", "Genoa", {
    es: { name: "Génova", slug: "genova" },
    fr: { name: "Gênes", slug: "genes" },
    de: { name: "Genua", slug: "genua" },
    pt: { name: "Génova", slug: "genova" },
    it: { name: "Genova", slug: "genova" },
  }),
  city("bologna", "it", 44.4949, 11.3426, "secondary", "Bologna", {
    fr: { name: "Bologne", slug: "bologne" },
  }),
  city("florence", "it", 43.7696, 11.2558, "secondary", "Florence", {
    es: { name: "Florencia", slug: "florencia" },
    de: { name: "Florenz", slug: "florenz" },
    pt: { name: "Florença", slug: "florenca" },
    it: { name: "Firenze", slug: "firenze" },
  }),
  city("bari", "it", 41.1171, 16.8719, "secondary", "Bari"),
  city("catania", "it", 37.5079, 15.0830, "secondary", "Catania"),
  city("venice", "it", 45.4408, 12.3155, "secondary", "Venice", {
    es: { name: "Venecia", slug: "venecia" },
    fr: { name: "Venise", slug: "venise" },
    de: { name: "Venedig", slug: "venedig" },
    pt: { name: "Veneza", slug: "veneza" },
    it: { name: "Venezia", slug: "venezia" },
  }),
  city("verona", "it", 45.4384, 10.9916, "secondary", "Verona", {
    fr: { name: "Vérone", slug: "verone" },
    de: { name: "Verona" },
  }),
  city("messina", "it", 38.1938, 15.5540, "tertiary", "Messina"),
  city("padua", "it", 45.4064, 11.8768, "tertiary", "Padua", {
    es: { name: "Padua" },
    fr: { name: "Padoue", slug: "padoue" },
    de: { name: "Padua" },
    pt: { name: "Pádua", slug: "padua" },
    it: { name: "Padova", slug: "padova" },
  }),
  city("trieste", "it", 45.6495, 13.7768, "tertiary", "Trieste"),
  city("brescia", "it", 45.5416, 10.2118, "tertiary", "Brescia"),
  city("taranto", "it", 40.4644, 17.2470, "tertiary", "Taranto"),
  city("parma", "it", 44.8015, 10.3279, "tertiary", "Parma"),
  city("prato", "it", 43.8777, 11.1023, "tertiary", "Prato"),
  city("modena", "it", 44.6471, 10.9252, "tertiary", "Modena"),
  city("reggio-calabria", "it", 38.1147, 15.6500, "tertiary", "Reggio Calabria"),
  city("reggio-emilia", "it", 44.6982, 10.6306, "tertiary", "Reggio Emilia"),
  city("perugia", "it", 43.1107, 12.3908, "tertiary", "Perugia", {
    fr: { name: "Pérouse", slug: "perouse" },
  }),
  city("livorno", "it", 43.5485, 10.3106, "tertiary", "Livorno"),
  city("ravenna", "it", 44.4173, 12.1965, "tertiary", "Ravenna", {
    fr: { name: "Ravenne", slug: "ravenne" },
  }),
  city("cagliari", "it", 39.2238, 9.1217, "tertiary", "Cagliari"),
  city("foggia", "it", 41.4621, 15.5444, "tertiary", "Foggia"),
  city("rimini", "it", 44.0594, 12.5683, "tertiary", "Rimini"),
  city("salerno", "it", 40.6824, 14.7681, "tertiary", "Salerno"),
  city("ferrara", "it", 44.8378, 11.6195, "tertiary", "Ferrara", {
    fr: { name: "Ferrare", slug: "ferrare" },
  }),

  // ─────────── Portugal (25) ───────────
  city("lisbon", "pt", 38.7223, -9.1393, "primary", "Lisbon", {
    es: { name: "Lisboa", slug: "lisboa" },
    fr: { name: "Lisbonne", slug: "lisbonne" },
    de: { name: "Lissabon", slug: "lissabon" },
    pt: { name: "Lisboa", slug: "lisboa" },
    it: { name: "Lisbona", slug: "lisbona" },
  }),
  city("porto", "pt", 41.1579, -8.6291, "primary", "Porto", {
    es: { name: "Oporto", slug: "oporto" },
  }),
  city("vila-nova-de-gaia", "pt", 41.1239, -8.6118, "secondary", "Vila Nova de Gaia"),
  city("amadora", "pt", 38.7536, -9.2302, "secondary", "Amadora"),
  city("braga", "pt", 41.5454, -8.4265, "secondary", "Braga"),
  city("funchal", "pt", 32.6669, -16.9241, "secondary", "Funchal"),
  city("coimbra", "pt", 40.2033, -8.4103, "secondary", "Coimbra", {
    fr: { name: "Coïmbre", slug: "coimbre" },
  }),
  city("setubal", "pt", 38.5244, -8.8882, "secondary", "Setúbal"),
  city("almada", "pt", 38.6791, -9.1581, "tertiary", "Almada"),
  city("queluz", "pt", 38.7565, -9.2566, "tertiary", "Queluz"),
  city("aveiro", "pt", 40.6405, -8.6538, "tertiary", "Aveiro"),
  city("viseu", "pt", 40.6610, -7.9097, "tertiary", "Viseu"),
  city("guimaraes", "pt", 41.4419, -8.2918, "tertiary", "Guimarães"),
  city("evora", "pt", 38.5713, -7.9135, "tertiary", "Évora"),
  city("faro", "pt", 37.0194, -7.9304, "tertiary", "Faro"),
  city("leiria", "pt", 39.7437, -8.8071, "tertiary", "Leiria"),
  city("loures", "pt", 38.8307, -9.1683, "tertiary", "Loures"),
  city("odivelas", "pt", 38.7958, -9.1842, "tertiary", "Odivelas"),
  city("matosinhos", "pt", 41.1796, -8.6907, "tertiary", "Matosinhos"),
  city("barreiro", "pt", 38.6634, -9.0723, "tertiary", "Barreiro"),
  city("cascais", "pt", 38.6968, -9.4215, "tertiary", "Cascais"),
  city("sintra", "pt", 38.8029, -9.3817, "tertiary", "Sintra"),
  city("ponta-delgada", "pt", 37.7412, -25.6756, "tertiary", "Ponta Delgada"),
  city("viana-do-castelo", "pt", 41.6918, -8.8345, "tertiary", "Viana do Castelo"),
  city("braganca", "pt", 41.8061, -6.7567, "tertiary", "Bragança"),
];

export function euCitiesForCountry(country: EuCountryCode): EuCity[] {
  return euCities.filter((c) => c.country === country);
}

export function getEuCityByCanonical(country: EuCountryCode, canonical: string): EuCity | undefined {
  return euCities.find((c) => c.country === country && c.canonical === canonical);
}
