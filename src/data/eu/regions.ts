/**
 * EU region registry (Phase B9).
 *
 * Adds a regional hub between country and city:
 *   /lawyer-eu/{country}/region/{region}
 *
 * Region taxonomies:
 *   FR  13 métropolitaines régions
 *   DE  16 Bundesländer
 *   ES  17 comunidades autónomas
 *   IT  20 regioni
 *   PT   7 NUTS-II regiões
 *
 * Total: 73 regions × 6 locales = 438 indexable URLs.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export interface EuRegion {
  /** Canonical English ASCII slug. Unique within country. */
  canonical: string;
  country: EuCountryCode;
  name: Record<LocaleCode, string>;
  slug: Record<LocaleCode, string>;
  /** Canonical city slug of the regional capital (must exist in euCities). */
  capital: string;
  /** Cities belonging to this region (canonical slugs). */
  cities: string[];
  /** Regional bar chamber / ordem reference (informational). */
  barChamber?: { name: string; url?: string };
  /** Court of appeal serving the region. */
  courtOfAppeal?: string;
}

const ALL_LOCALES: LocaleCode[] = ["en", "es", "fr", "de", "pt", "it"];
type Overrides = Partial<Record<LocaleCode, { name?: string; slug?: string }>>;

function region(
  canonical: string,
  country: EuCountryCode,
  defaultName: string,
  capital: string,
  cities: string[],
  extras: { barChamber?: { name: string; url?: string }; courtOfAppeal?: string; overrides?: Overrides } = {},
): EuRegion {
  const name = {} as Record<LocaleCode, string>;
  const slug = {} as Record<LocaleCode, string>;
  for (const l of ALL_LOCALES) {
    name[l] = extras.overrides?.[l]?.name ?? defaultName;
    slug[l] = extras.overrides?.[l]?.slug ?? canonical;
  }
  return { canonical, country, name, slug, capital, cities, barChamber: extras.barChamber, courtOfAppeal: extras.courtOfAppeal };
}

export const euRegions: EuRegion[] = [
  // ─────────── France — 13 régions métropolitaines ───────────
  region("ile-de-france", "fr", "Île-de-France", "paris",
    ["paris"],
    { courtOfAppeal: "Cour d'appel de Paris", barChamber: { name: "Barreau de Paris", url: "https://www.avocatparis.org" } }),
  region("auvergne-rhone-alpes", "fr", "Auvergne-Rhône-Alpes", "lyon",
    ["lyon", "saint-etienne", "grenoble", "clermont-ferrand"],
    { courtOfAppeal: "Cour d'appel de Lyon" }),
  region("provence-alpes-cote-dazur", "fr", "Provence-Alpes-Côte d'Azur", "marseille",
    ["marseille", "nice", "toulon", "aix-en-provence"],
    { courtOfAppeal: "Cour d'appel d'Aix-en-Provence" }),
  region("occitanie", "fr", "Occitanie", "toulouse",
    ["toulouse", "montpellier", "nimes", "perpignan"],
    { courtOfAppeal: "Cour d'appel de Toulouse" }),
  region("nouvelle-aquitaine", "fr", "Nouvelle-Aquitaine", "bordeaux",
    ["bordeaux", "limoges"],
    { courtOfAppeal: "Cour d'appel de Bordeaux" }),
  region("hauts-de-france", "fr", "Hauts-de-France", "lille",
    ["lille", "amiens"],
    { courtOfAppeal: "Cour d'appel de Douai" }),
  region("grand-est", "fr", "Grand Est", "strasbourg",
    ["strasbourg", "reims", "metz"],
    { courtOfAppeal: "Cour d'appel de Colmar" }),
  region("pays-de-la-loire", "fr", "Pays de la Loire", "nantes",
    ["nantes", "angers"],
    { courtOfAppeal: "Cour d'appel de Rennes" }),
  region("bretagne", "fr", "Bretagne", "rennes",
    ["rennes", "brest"],
    { courtOfAppeal: "Cour d'appel de Rennes",
      overrides: { en: { name: "Brittany" }, es: { name: "Bretaña" }, it: { name: "Bretagna" }, pt: { name: "Bretanha" } } }),
  region("normandie", "fr", "Normandie", "rouen",
    ["rouen", "le-havre"],
    { courtOfAppeal: "Cour d'appel de Rouen",
      overrides: { en: { name: "Normandy" }, es: { name: "Normandía" }, it: { name: "Normandia" }, pt: { name: "Normandia" } } }),
  region("bourgogne-franche-comte", "fr", "Bourgogne-Franche-Comté", "dijon",
    ["dijon", "besancon"],
    { courtOfAppeal: "Cour d'appel de Dijon" }),
  region("centre-val-de-loire", "fr", "Centre-Val de Loire", "orleans",
    ["orleans", "tours"],
    { courtOfAppeal: "Cour d'appel d'Orléans" }),
  region("corse", "fr", "Corse", "ile-de-france",
    [],
    { courtOfAppeal: "Cour d'appel de Bastia",
      overrides: { en: { name: "Corsica" }, es: { name: "Córcega" }, it: { name: "Corsica" }, pt: { name: "Córsega" }, de: { name: "Korsika" } } }),

  // ─────────── Germany — 16 Bundesländer ───────────
  region("baden-wuerttemberg", "de", "Baden-Württemberg", "stuttgart",
    ["stuttgart", "karlsruhe", "mannheim", "freiburg"],
    { courtOfAppeal: "Oberlandesgericht Stuttgart", barChamber: { name: "Rechtsanwaltskammer Stuttgart", url: "https://www.rak-stuttgart.de" } }),
  region("bayern", "de", "Bayern", "munich",
    ["munich", "nuremberg", "augsburg"],
    { courtOfAppeal: "Oberlandesgericht München",
      overrides: { en: { name: "Bavaria" }, es: { name: "Baviera" }, fr: { name: "Bavière" }, pt: { name: "Baviera" }, it: { name: "Baviera" } } }),
  region("berlin-region", "de", "Berlin", "berlin",
    ["berlin"],
    { courtOfAppeal: "Kammergericht Berlin", barChamber: { name: "Rechtsanwaltskammer Berlin", url: "https://www.rak-berlin.de" } }),
  region("brandenburg", "de", "Brandenburg", "berlin",
    [],
    { courtOfAppeal: "Brandenburgisches Oberlandesgericht",
      overrides: { fr: { name: "Brandebourg" }, es: { name: "Brandeburgo" }, it: { name: "Brandeburgo" }, pt: { name: "Brandemburgo" } } }),
  region("bremen-region", "de", "Bremen", "bremen",
    ["bremen"],
    { courtOfAppeal: "Hanseatisches Oberlandesgericht in Bremen",
      overrides: { fr: { name: "Brême" }, it: { name: "Brema" } } }),
  region("hamburg-region", "de", "Hamburg", "hamburg",
    ["hamburg"],
    { courtOfAppeal: "Hanseatisches Oberlandesgericht Hamburg",
      overrides: { fr: { name: "Hambourg" }, es: { name: "Hamburgo" }, pt: { name: "Hamburgo" }, it: { name: "Amburgo" } } }),
  region("hessen", "de", "Hessen", "frankfurt",
    ["frankfurt", "wiesbaden"],
    { courtOfAppeal: "Oberlandesgericht Frankfurt am Main",
      overrides: { en: { name: "Hesse" }, fr: { name: "Hesse" }, es: { name: "Hesse" }, pt: { name: "Hesse" }, it: { name: "Assia" } } }),
  region("mecklenburg-vorpommern", "de", "Mecklenburg-Vorpommern", "berlin",
    [],
    { courtOfAppeal: "Oberlandesgericht Rostock",
      overrides: { en: { name: "Mecklenburg-Western Pomerania" } } }),
  region("niedersachsen", "de", "Niedersachsen", "hannover",
    ["hannover", "braunschweig"],
    { courtOfAppeal: "Oberlandesgericht Celle",
      overrides: { en: { name: "Lower Saxony" }, fr: { name: "Basse-Saxe" }, es: { name: "Baja Sajonia" }, it: { name: "Bassa Sassonia" }, pt: { name: "Baixa Saxônia" } } }),
  region("nordrhein-westfalen", "de", "Nordrhein-Westfalen", "dusseldorf",
    ["cologne", "dusseldorf", "dortmund", "essen", "duisburg", "bochum", "wuppertal", "bielefeld", "bonn", "munster", "aachen"],
    { courtOfAppeal: "Oberlandesgericht Düsseldorf",
      overrides: { en: { name: "North Rhine-Westphalia" }, fr: { name: "Rhénanie-du-Nord-Westphalie" }, es: { name: "Renania del Norte-Westfalia" }, it: { name: "Renania Settentrionale-Vestfalia" }, pt: { name: "Renânia do Norte-Vestfália" } } }),
  region("rheinland-pfalz", "de", "Rheinland-Pfalz", "frankfurt",
    [],
    { courtOfAppeal: "Oberlandesgericht Koblenz",
      overrides: { en: { name: "Rhineland-Palatinate" }, fr: { name: "Rhénanie-Palatinat" }, es: { name: "Renania-Palatinado" }, it: { name: "Renania-Palatinato" } } }),
  region("saarland", "de", "Saarland", "frankfurt",
    [],
    { courtOfAppeal: "Saarländisches Oberlandesgericht",
      overrides: { fr: { name: "Sarre" }, it: { name: "Saarland" } } }),
  region("sachsen", "de", "Sachsen", "dresden",
    ["dresden", "leipzig", "chemnitz"],
    { courtOfAppeal: "Oberlandesgericht Dresden",
      overrides: { en: { name: "Saxony" }, fr: { name: "Saxe" }, es: { name: "Sajonia" }, it: { name: "Sassonia" }, pt: { name: "Saxônia" } } }),
  region("sachsen-anhalt", "de", "Sachsen-Anhalt", "magdeburg",
    ["magdeburg"],
    { courtOfAppeal: "Oberlandesgericht Naumburg",
      overrides: { en: { name: "Saxony-Anhalt" } } }),
  region("schleswig-holstein", "de", "Schleswig-Holstein", "kiel",
    ["kiel"],
    { courtOfAppeal: "Schleswig-Holsteinisches Oberlandesgericht" }),
  region("thueringen", "de", "Thüringen", "leipzig",
    [],
    { courtOfAppeal: "Thüringer Oberlandesgericht",
      overrides: { en: { name: "Thuringia" }, fr: { name: "Thuringe" }, es: { name: "Turingia" }, it: { name: "Turingia" }, pt: { name: "Turíngia" } } }),

  // ─────────── Spain — 17 comunidades autónomas ───────────
  region("andalucia", "es", "Andalucía", "seville",
    ["seville", "malaga", "cordoba", "granada", "almeria"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Andalucía",
      overrides: { en: { name: "Andalusia" }, fr: { name: "Andalousie" }, it: { name: "Andalusia" }, pt: { name: "Andaluzia" } } }),
  region("aragon", "es", "Aragón", "zaragoza",
    ["zaragoza"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Aragón" }),
  region("asturias", "es", "Asturias", "oviedo",
    ["oviedo", "gijon"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Asturias",
      overrides: { fr: { name: "Asturies" } } }),
  region("baleares", "es", "Islas Baleares", "palma",
    ["palma"],
    { courtOfAppeal: "Tribunal Superior de Justicia de las Islas Baleares",
      overrides: { en: { name: "Balearic Islands" }, fr: { name: "Îles Baléares" }, it: { name: "Isole Baleari" }, pt: { name: "Ilhas Baleares" }, de: { name: "Balearen" } } }),
  region("canarias", "es", "Islas Canarias", "las-palmas",
    ["las-palmas", "santa-cruz-de-tenerife"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Canarias",
      overrides: { en: { name: "Canary Islands" }, fr: { name: "Îles Canaries" }, it: { name: "Isole Canarie" }, pt: { name: "Ilhas Canárias" }, de: { name: "Kanarische Inseln" } } }),
  region("cantabria", "es", "Cantabria", "santander",
    ["santander"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Cantabria",
      overrides: { fr: { name: "Cantabrie" } } }),
  region("castilla-la-mancha", "es", "Castilla-La Mancha", "madrid",
    [],
    { courtOfAppeal: "Tribunal Superior de Justicia de Castilla-La Mancha" }),
  region("castilla-y-leon", "es", "Castilla y León", "valladolid",
    ["valladolid", "burgos", "salamanca"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Castilla y León" }),
  region("cataluna", "es", "Cataluña", "barcelona",
    ["barcelona"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Cataluña",
      overrides: { en: { name: "Catalonia" }, fr: { name: "Catalogne" }, it: { name: "Catalogna" }, pt: { name: "Catalunha" }, de: { name: "Katalonien" } } }),
  region("extremadura", "es", "Extremadura", "badajoz",
    ["badajoz"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Extremadura",
      overrides: { fr: { name: "Estrémadure" } } }),
  region("galicia", "es", "Galicia", "vigo",
    ["vigo", "a-coruna"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Galicia",
      overrides: { fr: { name: "Galice" }, it: { name: "Galizia" }, pt: { name: "Galiza" } } }),
  region("la-rioja", "es", "La Rioja", "logrono",
    ["logrono"],
    { courtOfAppeal: "Tribunal Superior de Justicia de La Rioja" }),
  region("madrid-region", "es", "Comunidad de Madrid", "madrid",
    ["madrid"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Madrid",
      overrides: { en: { name: "Community of Madrid" }, fr: { name: "Communauté de Madrid" }, it: { name: "Comunità di Madrid" }, pt: { name: "Comunidade de Madrid" }, de: { name: "Madrid" } } }),
  region("murcia-region", "es", "Región de Murcia", "murcia",
    ["murcia"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Murcia",
      overrides: { en: { name: "Region of Murcia" }, fr: { name: "Région de Murcie" } } }),
  region("navarra", "es", "Navarra", "pamplona",
    ["pamplona"],
    { courtOfAppeal: "Tribunal Superior de Justicia de Navarra",
      overrides: { en: { name: "Navarre" }, fr: { name: "Navarre" } } }),
  region("pais-vasco", "es", "País Vasco", "bilbao",
    ["bilbao", "vitoria-gasteiz", "san-sebastian"],
    { courtOfAppeal: "Tribunal Superior de Justicia del País Vasco",
      overrides: { en: { name: "Basque Country" }, fr: { name: "Pays basque" }, it: { name: "Paesi Baschi" }, pt: { name: "País Basco" }, de: { name: "Baskenland" } } }),
  region("comunidad-valenciana", "es", "Comunidad Valenciana", "valencia",
    ["valencia", "alicante", "elche", "castellon"],
    { courtOfAppeal: "Tribunal Superior de Justicia de la Comunidad Valenciana",
      overrides: { en: { name: "Valencian Community" }, fr: { name: "Communauté valencienne" }, it: { name: "Comunità Valenciana" }, pt: { name: "Comunidade Valenciana" } } }),

  // ─────────── Italy — 20 regioni ───────────
  region("abruzzo", "it", "Abruzzo", "rome",
    [],
    { courtOfAppeal: "Corte d'Appello dell'Aquila" }),
  region("basilicata", "it", "Basilicata", "naples",
    [],
    { courtOfAppeal: "Corte d'Appello di Potenza" }),
  region("calabria", "it", "Calabria", "reggio-calabria",
    ["reggio-calabria"],
    { courtOfAppeal: "Corte d'Appello di Catanzaro",
      overrides: { fr: { name: "Calabre" }, es: { name: "Calabria" } } }),
  region("campania", "it", "Campania", "naples",
    ["naples", "salerno"],
    { courtOfAppeal: "Corte d'Appello di Napoli",
      overrides: { fr: { name: "Campanie" }, es: { name: "Campania" } } }),
  region("emilia-romagna", "it", "Emilia-Romagna", "bologna",
    ["bologna", "parma", "modena", "reggio-emilia", "ravenna", "rimini", "ferrara"],
    { courtOfAppeal: "Corte d'Appello di Bologna" }),
  region("friuli-venezia-giulia", "it", "Friuli-Venezia Giulia", "trieste",
    ["trieste"],
    { courtOfAppeal: "Corte d'Appello di Trieste",
      overrides: { fr: { name: "Frioul-Vénétie julienne" } } }),
  region("lazio", "it", "Lazio", "rome",
    ["rome"],
    { courtOfAppeal: "Corte d'Appello di Roma",
      overrides: { en: { name: "Lazio" }, fr: { name: "Latium" } } }),
  region("liguria", "it", "Liguria", "genoa",
    ["genoa"],
    { courtOfAppeal: "Corte d'Appello di Genova",
      overrides: { fr: { name: "Ligurie" }, es: { name: "Liguria" } } }),
  region("lombardia", "it", "Lombardia", "milan",
    ["milan", "brescia"],
    { courtOfAppeal: "Corte d'Appello di Milano",
      overrides: { en: { name: "Lombardy" }, fr: { name: "Lombardie" }, es: { name: "Lombardía" }, pt: { name: "Lombardia" }, de: { name: "Lombardei" } } }),
  region("marche", "it", "Marche", "rome",
    [],
    { courtOfAppeal: "Corte d'Appello di Ancona",
      overrides: { en: { name: "Marche" }, fr: { name: "Marches" } } }),
  region("molise", "it", "Molise", "rome",
    [],
    { courtOfAppeal: "Corte d'Appello di Campobasso" }),
  region("piemonte", "it", "Piemonte", "turin",
    ["turin"],
    { courtOfAppeal: "Corte d'Appello di Torino",
      overrides: { en: { name: "Piedmont" }, fr: { name: "Piémont" }, es: { name: "Piamonte" }, pt: { name: "Piemonte" } } }),
  region("puglia", "it", "Puglia", "bari",
    ["bari", "taranto", "foggia"],
    { courtOfAppeal: "Corte d'Appello di Bari",
      overrides: { en: { name: "Apulia" }, fr: { name: "Pouilles" }, es: { name: "Apulia" } } }),
  region("sardegna", "it", "Sardegna", "cagliari",
    ["cagliari"],
    { courtOfAppeal: "Corte d'Appello di Cagliari",
      overrides: { en: { name: "Sardinia" }, fr: { name: "Sardaigne" }, es: { name: "Cerdeña" }, pt: { name: "Sardenha" }, de: { name: "Sardinien" } } }),
  region("sicilia", "it", "Sicilia", "palermo",
    ["palermo", "catania", "messina"],
    { courtOfAppeal: "Corte d'Appello di Palermo",
      overrides: { en: { name: "Sicily" }, fr: { name: "Sicile" }, pt: { name: "Sicília" }, de: { name: "Sizilien" } } }),
  region("toscana", "it", "Toscana", "florence",
    ["florence", "prato", "livorno"],
    { courtOfAppeal: "Corte d'Appello di Firenze",
      overrides: { en: { name: "Tuscany" }, fr: { name: "Toscane" }, es: { name: "Toscana" }, pt: { name: "Toscana" }, de: { name: "Toskana" } } }),
  region("trentino-alto-adige", "it", "Trentino-Alto Adige", "milan",
    [],
    { courtOfAppeal: "Corte d'Appello di Trento" }),
  region("umbria", "it", "Umbria", "perugia",
    ["perugia"],
    { courtOfAppeal: "Corte d'Appello di Perugia",
      overrides: { en: { name: "Umbria" }, fr: { name: "Ombrie" }, es: { name: "Umbría" } } }),
  region("valle-daosta", "it", "Valle d'Aosta", "turin",
    [],
    { courtOfAppeal: "Corte d'Appello di Torino",
      overrides: { en: { name: "Aosta Valley" }, fr: { name: "Vallée d'Aoste" } } }),
  region("veneto", "it", "Veneto", "venice",
    ["venice", "verona", "padua"],
    { courtOfAppeal: "Corte d'Appello di Venezia",
      overrides: { en: { name: "Veneto" }, fr: { name: "Vénétie" }, es: { name: "Véneto" } } }),

  // ─────────── Portugal — 7 NUTS-II regiões ───────────
  region("norte", "pt", "Norte", "porto",
    ["porto", "vila-nova-de-gaia", "braga", "guimaraes", "matosinhos", "viana-do-castelo", "braganca"],
    { courtOfAppeal: "Tribunal da Relação do Porto",
      overrides: { en: { name: "Norte (Northern Portugal)" }, fr: { name: "Nord (Portugal)" }, es: { name: "Norte (Portugal)" }, it: { name: "Nord (Portogallo)" } } }),
  region("centro", "pt", "Centro", "coimbra",
    ["coimbra", "aveiro", "viseu", "leiria"],
    { courtOfAppeal: "Tribunal da Relação de Coimbra",
      overrides: { en: { name: "Centro (Central Portugal)" }, fr: { name: "Centre (Portugal)" }, es: { name: "Centro (Portugal)" }, it: { name: "Centro (Portogallo)" } } }),
  region("lisboa-region", "pt", "Área Metropolitana de Lisboa", "lisbon",
    ["lisbon", "amadora", "setubal", "almada", "queluz", "loures", "odivelas", "barreiro", "cascais", "sintra"],
    { courtOfAppeal: "Tribunal da Relação de Lisboa",
      overrides: { en: { name: "Lisbon Metropolitan Area" }, fr: { name: "Aire métropolitaine de Lisbonne" }, es: { name: "Área Metropolitana de Lisboa" }, it: { name: "Area Metropolitana di Lisbona" }, de: { name: "Metropolregion Lissabon" } } }),
  region("alentejo", "pt", "Alentejo", "evora",
    ["evora"],
    { courtOfAppeal: "Tribunal da Relação de Évora" }),
  region("algarve", "pt", "Algarve", "faro",
    ["faro"],
    { courtOfAppeal: "Tribunal da Relação de Évora" }),
  region("acores", "pt", "Açores", "ponta-delgada",
    ["ponta-delgada"],
    { courtOfAppeal: "Tribunal da Relação de Lisboa",
      overrides: { en: { name: "Azores" }, fr: { name: "Açores" }, es: { name: "Azores" }, it: { name: "Azzorre" }, de: { name: "Azoren" } } }),
  region("madeira", "pt", "Madeira", "funchal",
    ["funchal"],
    { courtOfAppeal: "Tribunal da Relação de Lisboa" }),
];

export function euRegionsForCountry(country: EuCountryCode): EuRegion[] {
  return euRegions.filter((r) => r.country === country);
}

export function getEuRegion(country: EuCountryCode, canonical: string): EuRegion | undefined {
  return euRegions.find((r) => r.country === country && r.canonical === canonical);
}

export function euRegionForCity(country: EuCountryCode, cityCanonical: string): EuRegion | undefined {
  return euRegions.find((r) => r.country === country && r.cities.includes(cityCanonical));
}
