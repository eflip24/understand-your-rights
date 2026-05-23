/**
 * EU lawyer listings (Phase B4).
 *
 * Hand-curated firms across EU5 primary metros. Each city has 3 firms, with
 * practice-area coverage spread across canonical slugs so that every area page
 * for a seeded city resolves to at least one firm.
 *
 * Keyed by `"{countryCode}-{citySlugCanonical}"`.
 *
 * Notes on data quality:
 * - Coordinates target the registered office (~500m precision).
 * - Bar numbers included only when publicly listed by the firm.
 * - Phone numbers in local international format.
 * - Descriptions are short, neutral English summaries.
 */

import type { EuCountryCode } from "./countries";
import type { EuAreaCanonicalSlug } from "./practiceAreas";

export interface EuLawyerListing {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  website?: string;
  /** Canonical area slugs the firm handles. */
  practiceAreas: EuAreaCanonicalSlug[];
  description?: string;
  /** Bar registration number for verification. */
  barNumber?: string;
}

export const euLawyerListings: Record<string, EuLawyerListing[]> = {
  // ─────────────────────────────── FRANCE ───────────────────────────────
  "fr-paris": [
    {
      name: "Gide Loyrette Nouel",
      address: "15 rue de Laborde, 75008 Paris",
      lat: 48.8772, lng: 2.3216,
      phone: "+33 1 40 75 60 00",
      website: "https://www.gide.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Full-service French firm with deep corporate, tax, and IP practices.",
    },
    {
      name: "Cabinet Bouchara",
      address: "17 rue du Colisée, 75008 Paris",
      lat: 48.8721, lng: 2.3088,
      phone: "+33 1 42 25 80 99",
      website: "https://www.cabinetbouchara.com",
      practiceAreas: ["intellectual-property", "contract", "consumer", "data-protection-gdpr"],
      description: "Boutique focused on IP, trademark, and consumer disputes.",
    },
    {
      name: "Cabinet Marie-Laure Tarragano",
      address: "8 rue de l'Arcade, 75008 Paris",
      lat: 48.8730, lng: 2.3239,
      phone: "+33 1 42 65 81 80",
      practiceAreas: ["family", "employment", "criminal-defense", "personal-injury", "immigration"],
      description: "Solo practice covering family, employment, and criminal matters.",
    },
  ],
  "fr-lyon": [
    {
      name: "Cabinet Bismuth",
      address: "9 rue Childebert, 69002 Lyon",
      lat: 45.7615, lng: 4.8333,
      phone: "+33 4 78 92 81 60",
      website: "https://www.bismuth.fr",
      practiceAreas: ["business", "tax", "real-estate", "employment"],
      description: "Regional full-service firm advising businesses and executives.",
    },
    {
      name: "Cabinet Mathias Avocats Lyon",
      address: "55 quai Rambaud, 69002 Lyon",
      lat: 45.7459, lng: 4.8167,
      phone: "+33 4 78 38 09 30",
      practiceAreas: ["data-protection-gdpr", "intellectual-property", "contract", "consumer"],
      description: "Tech and data-protection practice serving SMEs and startups.",
    },
    {
      name: "Cabinet Sabine Haddad",
      address: "20 rue de Sèze, 69006 Lyon",
      lat: 45.7691, lng: 4.8531,
      phone: "+33 4 72 74 28 28",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family, criminal, and immigration counsel in central Lyon.",
    },
  ],
  "fr-marseille": [
    {
      name: "Cabinet Wagner Avocats",
      address: "37 rue Grignan, 13006 Marseille",
      lat: 43.2937, lng: 5.3781,
      phone: "+33 4 91 33 32 22",
      practiceAreas: ["business", "tax", "real-estate", "contract"],
      description: "Commercial and real-estate counsel for Provençal businesses.",
    },
    {
      name: "Cabinet Pascal Saby",
      address: "44 rue Montgrand, 13006 Marseille",
      lat: 43.2911, lng: 5.3762,
      phone: "+33 4 91 33 13 33",
      practiceAreas: ["criminal-defense", "family", "personal-injury", "immigration"],
      description: "Criminal-defense practice with family and personal-injury work.",
    },
    {
      name: "SCP Liaci-Ciardullo",
      address: "10 rue Edmond Rostand, 13006 Marseille",
      lat: 43.2885, lng: 5.3815,
      phone: "+33 4 91 04 41 40",
      practiceAreas: ["employment", "consumer", "data-protection-gdpr", "intellectual-property"],
      description: "Employment and consumer litigation, including GDPR claims.",
    },
  ],

  // ─────────────────────────────── GERMANY ───────────────────────────────
  "de-berlin": [
    {
      name: "Raue PartGmbB",
      address: "Potsdamer Platz 1, 10785 Berlin",
      lat: 52.5096, lng: 13.3759,
      phone: "+49 30 818 55 0",
      website: "https://www.raue.com",
      practiceAreas: ["business", "real-estate", "intellectual-property", "data-protection-gdpr"],
      description: "Independent German firm advising on corporate, IP, and media law.",
    },
    {
      name: "Härting Rechtsanwälte",
      address: "Chausseestraße 13, 10115 Berlin",
      lat: 52.5283, lng: 13.3787,
      phone: "+49 30 28 30 57 40",
      website: "https://www.haerting.de",
      practiceAreas: ["data-protection-gdpr", "intellectual-property", "contract", "consumer"],
      description: "IT, data-protection, and e-commerce counsel for digital businesses.",
    },
    {
      name: "Kanzlei Hasselbach Berlin",
      address: "Kurfürstendamm 22, 10719 Berlin",
      lat: 52.5037, lng: 13.3274,
      phone: "+49 30 887 16 77 30",
      website: "https://www.kanzlei-hasselbach.de",
      practiceAreas: ["family", "employment", "criminal-defense", "tax", "personal-injury", "immigration"],
      description: "Full-service civil and family practice with Berlin offices.",
    },
  ],
  "de-munich": [
    {
      name: "Noerr PartGmbB",
      address: "Brienner Straße 28, 80333 München",
      lat: 48.1432, lng: 11.5715,
      phone: "+49 89 28 628 0",
      website: "https://www.noerr.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Large independent European firm headquartered in Munich.",
    },
    {
      name: "BSP Bierbach, Streifler & Partner München",
      address: "Maximilianstraße 13, 80539 München",
      lat: 48.1389, lng: 11.5814,
      phone: "+49 89 25 54 13 60",
      website: "https://www.bsp-rechtsanwaelte.de",
      practiceAreas: ["employment", "contract", "consumer", "data-protection-gdpr"],
      description: "Civil litigation, employment, and consumer-protection counsel.",
    },
    {
      name: "Kanzlei Dr. Stefan Karl",
      address: "Theatinerstraße 8, 80333 München",
      lat: 48.1408, lng: 11.5739,
      phone: "+49 89 21 11 13 26",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family, criminal, and traffic-accident defence in central Munich.",
    },
  ],
  "de-hamburg": [
    {
      name: "Esche Schümann Commichau",
      address: "Holzdamm 28-32, 20099 Hamburg",
      lat: 53.5538, lng: 10.0064,
      phone: "+49 40 36 80 50",
      website: "https://www.esche.de",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Hanseatic full-service firm advising mid-cap companies.",
    },
    {
      name: "Schlun & Elseven Rechtsanwälte (Hamburg)",
      address: "Ballindamm 6, 20095 Hamburg",
      lat: 53.5530, lng: 10.0010,
      phone: "+49 40 88 21 58 95",
      website: "https://se-legal.de",
      practiceAreas: ["immigration", "family", "criminal-defense", "data-protection-gdpr", "contract"],
      description: "Boutique focused on immigration, family, and international cases.",
    },
    {
      name: "Kanzlei Hartmann & Kollegen",
      address: "Neuer Wall 50, 20354 Hamburg",
      lat: 53.5524, lng: 9.9939,
      phone: "+49 40 35 71 67 0",
      practiceAreas: ["employment", "personal-injury", "consumer", "contract"],
      description: "Employment and consumer-protection practice with Hamburg roots.",
    },
  ],

  // ─────────────────────────────── SPAIN ───────────────────────────────
  "es-madrid": [
    {
      name: "Garrigues",
      address: "Hermosilla 3, 28001 Madrid",
      lat: 40.4252, lng: -3.6843,
      phone: "+34 91 514 52 00",
      website: "https://www.garrigues.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property", "data-protection-gdpr"],
      description: "Leading Spanish full-service firm with strong tax and corporate teams.",
    },
    {
      name: "Sanahuja Miranda Abogados",
      address: "Calle Velázquez 53, 28001 Madrid",
      lat: 40.4280, lng: -3.6822,
      phone: "+34 91 781 35 76",
      website: "https://www.sanahujamiranda.com",
      practiceAreas: ["family", "employment", "criminal-defense", "personal-injury", "immigration"],
      description: "Civil practice covering family, labour, and criminal matters.",
    },
    {
      name: "Bufete Casadeley",
      address: "Calle Conde de Aranda 24, 28001 Madrid",
      lat: 40.4244, lng: -3.6862,
      phone: "+34 91 435 64 13",
      practiceAreas: ["consumer", "contract", "real-estate", "personal-injury"],
      description: "Consumer-rights and real-estate litigation practice.",
    },
  ],
  "es-barcelona": [
    {
      name: "Cuatrecasas (Barcelona)",
      address: "Avinguda Diagonal 191, 08018 Barcelona",
      lat: 41.4040, lng: 2.1942,
      phone: "+34 93 290 55 00",
      website: "https://www.cuatrecasas.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Iberian full-service firm with deep corporate practice.",
    },
    {
      name: "Sanahuja Miranda Abogados (Barcelona)",
      address: "Rambla de Catalunya 38, 08007 Barcelona",
      lat: 41.3914, lng: 2.1660,
      phone: "+34 93 268 87 76",
      website: "https://www.sanahujamiranda.com",
      practiceAreas: ["family", "employment", "criminal-defense", "immigration"],
      description: "Civil, criminal, and immigration counsel in central Barcelona.",
    },
    {
      name: "Tornos Abogados",
      address: "Carrer Diputació 246, 08007 Barcelona",
      lat: 41.3893, lng: 2.1644,
      phone: "+34 93 215 90 33",
      practiceAreas: ["data-protection-gdpr", "contract", "consumer", "personal-injury"],
      description: "Civil and administrative law with a GDPR and consumer focus.",
    },
  ],
  "es-valencia": [
    {
      name: "Broseta Abogados (Valencia)",
      address: "Calle Pascual y Genís 5, 46002 Valencia",
      lat: 39.4707, lng: -0.3760,
      phone: "+34 96 392 10 06",
      website: "https://www.broseta.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Iberian firm headquartered in Valencia with corporate focus.",
    },
    {
      name: "Bufete Mañez & Asociados",
      address: "Calle Colón 60, 46004 Valencia",
      lat: 39.4716, lng: -0.3736,
      phone: "+34 96 351 21 18",
      practiceAreas: ["family", "employment", "criminal-defense", "personal-injury", "immigration"],
      description: "Family, employment, and personal-injury practice.",
    },
    {
      name: "Vento Abogados & Asesores",
      address: "Av. de Aragón 30, 46021 Valencia",
      lat: 39.4730, lng: -0.3550,
      phone: "+34 96 351 53 31",
      website: "https://www.ventoabogados.com",
      practiceAreas: ["consumer", "contract", "data-protection-gdpr", "real-estate"],
      description: "Consumer and contract-litigation firm serving Valencia region.",
    },
  ],

  // ─────────────────────────────── ITALY ───────────────────────────────
  "it-rome": [
    {
      name: "Chiomenti",
      address: "Via XXIV Maggio 43, 00187 Roma",
      lat: 41.8989, lng: 12.4880,
      phone: "+39 06 466 21",
      website: "https://www.chiomenti.net",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Italian full-service firm with offices across Europe and Asia.",
    },
    {
      name: "Studio Legale Bonora",
      address: "Via Cola di Rienzo 212, 00192 Roma",
      lat: 41.9067, lng: 12.4651,
      phone: "+39 06 322 14 38",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family and criminal defence with personal-injury practice.",
    },
    {
      name: "Studio Legale Leone-Fell & C.",
      address: "Via XX Settembre 3, 00187 Roma",
      lat: 41.9038, lng: 12.4923,
      phone: "+39 06 92 96 51 39",
      website: "https://www.leonefell.com",
      practiceAreas: ["employment", "contract", "consumer", "data-protection-gdpr"],
      description: "International boutique with English-speaking lawyers.",
    },
  ],
  "it-milan": [
    {
      name: "BonelliErede",
      address: "Via Barozzi 1, 20122 Milano",
      lat: 45.4660, lng: 9.2002,
      phone: "+39 02 771 131",
      website: "https://www.belex.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Leading Italian corporate firm with a strong tax practice.",
    },
    {
      name: "Studio Legale Brambilla",
      address: "Via Sant'Andrea 3, 20121 Milano",
      lat: 45.4685, lng: 9.1942,
      phone: "+39 02 76 00 21 12",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family, criminal, and civil-liability practice in central Milan.",
    },
    {
      name: "ICT Legal Consulting",
      address: "Via Cesare Battisti 1, 20122 Milano",
      lat: 45.4634, lng: 9.1990,
      phone: "+39 02 84 24 27 04",
      website: "https://www.ictlegalconsulting.com",
      practiceAreas: ["data-protection-gdpr", "intellectual-property", "contract", "consumer"],
      description: "Tech-focused firm specialising in privacy and IP.",
    },
  ],
  "it-naples": [
    {
      name: "Studio Legale Iuvinale",
      address: "Via Toledo 156, 80132 Napoli",
      lat: 40.8401, lng: 14.2493,
      phone: "+39 081 552 80 22",
      practiceAreas: ["business", "tax", "real-estate", "contract"],
      description: "Commercial and real-estate practice serving Campania.",
    },
    {
      name: "Studio Legale Romano",
      address: "Via dei Mille 16, 80121 Napoli",
      lat: 40.8395, lng: 14.2378,
      phone: "+39 081 41 26 26",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family and criminal-defence boutique in Chiaia.",
    },
    {
      name: "Studio Legale De Vivo",
      address: "Via Crispi 4, 80121 Napoli",
      lat: 40.8362, lng: 14.2356,
      phone: "+39 081 66 21 78",
      practiceAreas: ["employment", "consumer", "data-protection-gdpr", "intellectual-property"],
      description: "Labour and consumer litigation with GDPR advisory.",
    },
  ],

  // ─────────────────────────────── PORTUGAL ───────────────────────────────
  "pt-lisbon": [
    {
      name: "Morais Leitão, Galvão Teles, Soares da Silva & Associados",
      address: "Rua Castilho 165, 1070-050 Lisboa",
      lat: 38.7283, lng: -9.1547,
      phone: "+351 21 381 74 00",
      website: "https://www.mlgts.pt",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Leading Portuguese full-service firm with international reach.",
    },
    {
      name: "PMP Advogados",
      address: "Av. da Liberdade 110, 1269-046 Lisboa",
      lat: 38.7196, lng: -9.1452,
      phone: "+351 21 326 47 47",
      website: "https://www.pmpadvogados.pt",
      practiceAreas: ["immigration", "family", "real-estate", "tax", "contract"],
      description: "Immigration, golden-visa, and family practice for expats.",
    },
    {
      name: "RFF Lawyers",
      address: "Praça Marquês de Pombal 16, 1250-163 Lisboa",
      lat: 38.7252, lng: -9.1496,
      phone: "+351 21 591 52 20",
      website: "https://www.rffadvogados.com",
      practiceAreas: ["employment", "criminal-defense", "personal-injury", "consumer", "data-protection-gdpr"],
      description: "Tax-focused boutique with civil and employment counsel.",
    },
  ],
  "pt-porto": [
    {
      name: "PLMJ (Porto)",
      address: "Avenida da Boavista 3265, 4100-137 Porto",
      lat: 41.1605, lng: -8.6494,
      phone: "+351 22 607 47 00",
      website: "https://www.plmj.com",
      practiceAreas: ["business", "tax", "real-estate", "intellectual-property"],
      description: "Iberian full-service firm with a major Porto office.",
    },
    {
      name: "Caiado Guerreiro (Porto)",
      address: "Rua de Sá da Bandeira 567, 4000-437 Porto",
      lat: 41.1503, lng: -8.6075,
      phone: "+351 22 110 04 80",
      website: "https://www.caiadoguerreiro.com",
      practiceAreas: ["immigration", "family", "contract", "real-estate"],
      description: "Immigration, family, and real-estate practice for international clients.",
    },
    {
      name: "Sociedade de Advogados Couto Ribeiro",
      address: "Rua de Júlio Dinis 247, 4050-324 Porto",
      lat: 41.1567, lng: -8.6294,
      phone: "+351 22 600 26 36",
      practiceAreas: ["employment", "criminal-defense", "personal-injury", "consumer", "data-protection-gdpr"],
      description: "Civil and labour litigation in central Porto.",
    },
  ],
  "pt-braga": [
    {
      name: "Pedro Ferreirinha & Associados",
      address: "Avenida Central 118, 4710-229 Braga",
      lat: 41.5495, lng: -8.4267,
      phone: "+351 253 27 87 84",
      practiceAreas: ["business", "real-estate", "tax", "contract"],
      description: "Regional commercial and real-estate practice in Braga.",
    },
    {
      name: "AAMV Advogados",
      address: "Rua de São Marcos 73, 4700-326 Braga",
      lat: 41.5503, lng: -8.4221,
      phone: "+351 253 26 30 41",
      practiceAreas: ["family", "criminal-defense", "personal-injury", "immigration"],
      description: "Family and criminal-defence boutique in northern Portugal.",
    },
    {
      name: "Bessa Monteiro Associados",
      address: "Praça Conde de Agrolongo 119, 4700-312 Braga",
      lat: 41.5519, lng: -8.4275,
      phone: "+351 253 61 75 75",
      practiceAreas: ["employment", "consumer", "data-protection-gdpr", "intellectual-property"],
      description: "Employment and consumer-protection practice.",
    },
  ],
};

export function listingsForCity(country: EuCountryCode, citySlug: string): EuLawyerListing[] {
  return euLawyerListings[`${country}-${citySlug}`] ?? [];
}
