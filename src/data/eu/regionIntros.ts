/**
 * Region intro copy (Phase B9).
 *
 * Two-three sentences of editorial context per region: legal infrastructure,
 * regional bar chamber, court of appeal, headline industries. Authored in
 * English first; per-locale translations can be fanned out via the B8
 * translation pipeline (scripts/translate-country-pillars.mjs pattern).
 *
 * When a locale entry is missing, the page falls back to English.
 */

import type { EuCountryCode, LocaleCode } from "./countries";

export interface RegionIntro {
  /** Required: English baseline. Other locales fall back to this. */
  en: string;
  es?: string;
  fr?: string;
  de?: string;
  pt?: string;
  it?: string;
}

type RegionIntroMap = Partial<Record<string, RegionIntro>>;

/** intros[country][regionCanonical] -> RegionIntro */
export const REGION_INTROS: Record<EuCountryCode, RegionIntroMap> = {
  fr: {
    "ile-de-france": {
      en: "Île-de-France is France's economic and judicial heart, home to the Paris Bar (the largest in Europe with ~32,000 avocats) and the Cour d'appel de Paris, which hears commercial, IP and high-profile criminal appeals from across the region. Most international firms and specialised counsel for finance, M&A and arbitration are based here.",
      fr: "L'Île-de-France constitue le cœur économique et judiciaire de la France. Elle abrite le Barreau de Paris (le plus important d'Europe avec environ 32 000 avocats) et la Cour d'appel de Paris, qui connaît des recours en matière commerciale, de propriété intellectuelle et pénale médiatique. La plupart des cabinets internationaux et des conseils spécialisés en finance, M&A et arbitrage y sont installés.",
    },
    "auvergne-rhone-alpes": {
      en: "Auvergne-Rhône-Alpes spans Lyon, Grenoble, Saint-Étienne and Clermont-Ferrand. The Cour d'appel de Lyon serves the Rhône-Alpes part, while Riom covers Auvergne. Strong local bars in Lyon and Grenoble specialise in industrial, pharma and tech disputes tied to the region's manufacturing and research clusters.",
    },
    "provence-alpes-cote-dazur": {
      en: "Provence-Alpes-Côte d'Azur (PACA) covers Marseille, Nice, Toulon and Aix-en-Provence. The Cour d'appel d'Aix-en-Provence is among the busiest in France, with significant maritime, real-estate and cross-border family caseload driven by the Mediterranean coast and the Italian border.",
    },
    "occitanie": {
      en: "Occitanie groups Toulouse, Montpellier, Nîmes and Perpignan. Toulouse hosts an active bar serving the aerospace and digital sectors; Montpellier specialises in agricultural and environmental law. The Cours d'appel de Toulouse, Montpellier and Nîmes share the region's judicial workload.",
    },
    "nouvelle-aquitaine": {
      en: "Nouvelle-Aquitaine, with Bordeaux as its anchor, runs from the Atlantic to the Spanish border. The Cour d'appel de Bordeaux handles wine-industry, cross-border family and Spanish-tied commercial disputes. Limoges and Pau host secondary appellate jurisdictions.",
    },
    "hauts-de-france": {
      en: "Hauts-de-France (Lille, Amiens) sits at the Belgian border and the Channel. The Cour d'appel de Douai is the regional appellate court; the Lille bar is the largest outside Île-de-France and handles heavy logistics, transport and cross-Channel commercial litigation.",
    },
    "grand-est": {
      en: "Grand Est covers Strasbourg, Reims, Metz and Nancy. Strasbourg's bar is unique in France: avocats can plead before the European Court of Human Rights, and local courts apply a particular droit local d'Alsace-Moselle inherited from the German civil code in Bas-Rhin, Haut-Rhin and Moselle.",
    },
    "pays-de-la-loire": {
      en: "Pays de la Loire is anchored by Nantes and Angers. The Cour d'appel de Rennes covers the region together with Brittany. Strong specialisms in shipping, agribusiness and aerospace component manufacturing.",
    },
    "bretagne": {
      en: "Brittany (Bretagne) covers Rennes, Brest, Quimper and Saint-Brieuc. The Cour d'appel de Rennes is the regional appellate court; the Rennes bar handles a heavy public-law and university-research caseload, while Brest specialises in maritime and naval matters.",
    },
    "normandie": {
      en: "Normandy (Normandie) spans Rouen, Caen and Le Havre. The Cour d'appel de Rouen handles commercial and maritime appeals; Le Havre is one of France's largest container ports, generating significant transport and customs litigation.",
    },
    "bourgogne-franche-comte": {
      en: "Bourgogne-Franche-Comté joins the Burgundy and Franche-Comté regions around Dijon and Besançon. The Cour d'appel de Dijon serves most of the territory, with viticulture, watchmaking (near the Swiss border) and university disputes dominating the docket.",
    },
    "centre-val-de-loire": {
      en: "Centre-Val de Loire (Orléans, Tours, Bourges) is served by the Cour d'appel d'Orléans. Smaller bars handle agribusiness, pharmaceuticals (Tours) and historic-monument property disputes around the Loire valley châteaux.",
    },
    "corse": {
      en: "Corsica (Corse) has its own Cour d'appel de Bastia. Local bars in Ajaccio and Bastia handle a high proportion of real-estate and family-law matters tied to the island's land-tenure history (the 'arrêté Miot' and continuing indivision).",
    },
  },

  de: {
    "baden-wuerttemberg": {
      en: "Baden-Württemberg covers Stuttgart, Karlsruhe, Mannheim and Freiburg. The Oberlandesgericht Stuttgart hears appeals for most of the state, with Karlsruhe additionally hosting both the Bundesgerichtshof (Federal Court of Justice) and the Bundesverfassungsgericht (Federal Constitutional Court).",
      de: "Baden-Württemberg umfasst Stuttgart, Karlsruhe, Mannheim und Freiburg. Das Oberlandesgericht Stuttgart entscheidet über Berufungen für den größten Teil des Landes; in Karlsruhe haben zudem der Bundesgerichtshof und das Bundesverfassungsgericht ihren Sitz.",
    },
    "bayern": {
      en: "Bavaria (Bayern) is anchored by Munich, Nuremberg and Augsburg. The Oberlandesgericht München handles upper-Bavarian appeals, with separate OLGs in Nuremberg and Bamberg. Munich hosts the German Patent and Trademark Office and the Bundespatentgericht, giving the Munich bar deep IP expertise.",
      de: "Bayern ist von München, Nürnberg und Augsburg geprägt. Das Oberlandesgericht München entscheidet über oberbayerische Berufungen; daneben bestehen die Oberlandesgerichte Nürnberg und Bamberg. In München sind das Deutsche Patent- und Markenamt sowie das Bundespatentgericht ansässig, was den Münchner IP-Markt prägt.",
    },
    "berlin-region": {
      en: "Berlin operates as both a city and a Bundesland. The Kammergericht is its appellate court (uniquely retaining the historic name). The Berlin bar is the second-largest in Germany and specialises in administrative, constitutional and start-up matters.",
      de: "Berlin ist zugleich Stadt und Bundesland. Berufungsgericht ist das Kammergericht (das historisch seinen Namen behalten hat). Die Rechtsanwaltskammer Berlin ist die zweitgrößte Deutschlands und bündelt verwaltungs-, verfassungs- und Start-up-rechtliche Expertise.",
    },
    "brandenburg": {
      en: "Brandenburg surrounds Berlin and is served by the Brandenburgisches Oberlandesgericht in Brandenburg an der Havel. The Potsdam bar handles many cross-border cases with Polish counterparties given the region's eastern frontier.",
    },
    "bremen-region": {
      en: "Bremen (with Bremerhaven) is one of Germany's three city-states. The Hanseatisches Oberlandesgericht in Bremen has long-standing maritime and trade-law expertise tied to the historic Hanseatic port.",
    },
    "hamburg-region": {
      en: "Hamburg is a city-state and Germany's largest port. The Hanseatisches Oberlandesgericht Hamburg leads on maritime, transport and media-law matters; the Hamburg bar is among the country's most active in shipping and intellectual property.",
    },
    "hessen": {
      en: "Hesse (Hessen) is dominated by Frankfurt am Main, Germany's financial capital. The Oberlandesgericht Frankfurt handles a heavy banking, securities and corporate caseload; the European Central Bank and Deutsche Börse are headquartered here.",
    },
    "mecklenburg-vorpommern": {
      en: "Mecklenburg-Vorpommern, on Germany's Baltic coast, is served by the Oberlandesgericht Rostock. The Rostock bar specialises in maritime, tourism and renewable-energy matters tied to offshore wind farms.",
    },
    "niedersachsen": {
      en: "Lower Saxony (Niedersachsen) is anchored by Hannover, Braunschweig and Osnabrück. The Oberlandesgericht Celle and the OLG Braunschweig divide the appellate workload; automotive (Volkswagen) and agricultural disputes dominate.",
    },
    "nordrhein-westfalen": {
      en: "North Rhine-Westphalia is Germany's most populous state, covering Cologne, Düsseldorf, Dortmund and the Ruhr conurbation. It hosts three Oberlandesgerichte (Düsseldorf, Köln, Hamm); Düsseldorf is especially strong in patent litigation, with the busiest patent docket in Europe.",
    },
    "rheinland-pfalz": {
      en: "Rhineland-Palatinate (Rheinland-Pfalz) covers Mainz, Koblenz and Trier. The Oberlandesgericht Koblenz handles appeals; the region's specialisms include viticulture, chemicals (BASF in Ludwigshafen is just over the border) and luxury manufacturing.",
    },
    "saarland": {
      en: "Saarland borders France and shares strong cross-border legal practice with Lorraine. The Saarländisches Oberlandesgericht in Saarbrücken handles regional appeals; many local avocats and Rechtsanwälte hold dual qualifications.",
    },
    "sachsen": {
      en: "Saxony (Sachsen) covers Dresden, Leipzig and Chemnitz. The Oberlandesgericht Dresden is the regional appellate court; Leipzig hosts the Bundesverwaltungsgericht (Federal Administrative Court) and the Federal Court of Justice's fifth criminal senate.",
    },
    "sachsen-anhalt": {
      en: "Saxony-Anhalt (Magdeburg, Halle) is served by the Oberlandesgericht Naumburg. Local bars handle agribusiness, chemicals (Leuna-Buna industrial cluster) and post-reunification property matters.",
    },
    "schleswig-holstein": {
      en: "Schleswig-Holstein, on the Danish border, is served by the Schleswig-Holsteinisches Oberlandesgericht in Schleswig. Kiel hosts the Federal Audit Office and specialises in maritime, shipbuilding and Danish cross-border family disputes.",
    },
    "thueringen": {
      en: "Thuringia (Thüringen) covers Erfurt, Jena and Weimar. The Thüringer Oberlandesgericht in Jena handles appeals; Erfurt additionally hosts the Bundesarbeitsgericht (Federal Labour Court), giving the Erfurt bar deep employment-law expertise.",
    },
  },

  es: {
    "andalucia": {
      en: "Andalusia (Andalucía) is Spain's most populous autonomous community, with major bars in Seville, Málaga, Granada and Córdoba. The Tribunal Superior de Justicia de Andalucía sits in Granada and acts as final regional authority on Andalusian civil and administrative matters.",
      es: "Andalucía es la comunidad autónoma más poblada de España, con colegios destacados en Sevilla, Málaga, Granada y Córdoba. El Tribunal Superior de Justicia de Andalucía tiene su sede en Granada y actúa como última instancia regional en materia civil y administrativa propias de la comunidad.",
    },
    "aragon": {
      en: "Aragón centres on Zaragoza. The Tribunal Superior de Justicia de Aragón applies both the Código civil and the distinctive Derecho civil aragonés (with its own rules on family, succession and matrimonial property).",
    },
    "asturias": {
      en: "Asturias is served by the Tribunal Superior de Justicia in Oviedo. The Oviedo and Gijón bars specialise in mining-legacy, industrial and rural-property matters tied to the principality's traditional economy.",
    },
    "baleares": {
      en: "The Balearic Islands (Mallorca, Menorca, Ibiza, Formentera) host the Tribunal Superior de Justicia de las Islas Baleares in Palma. Mallorca's bar handles a high volume of tourism, real-estate and cross-border (German and British) inheritance work.",
    },
    "canarias": {
      en: "The Canary Islands are served by the Tribunal Superior de Justicia de Canarias, split between Las Palmas de Gran Canaria and Santa Cruz de Tenerife. The Canaries operate under the Régimen Económico y Fiscal (REF), creating specialised tax and customs practice.",
    },
    "cantabria": {
      en: "Cantabria (Santander) is served by the Tribunal Superior de Justicia de Cantabria. The Santander bar specialises in banking and shipping matters tied to the regional port and the historic seat of Banco Santander.",
    },
    "castilla-la-mancha": {
      en: "Castilla-La Mancha (Toledo, Albacete, Ciudad Real) is served by the Tribunal Superior de Justicia in Albacete. Regional bars handle agricultural, renewable-energy (solar and wind) and Manchego designation-of-origin disputes.",
    },
    "castilla-y-leon": {
      en: "Castilla y León is Spain's largest community by area. The Tribunal Superior de Justicia sits in Burgos. Valladolid, Salamanca and Burgos all host active bars with university-town academic and administrative-law specialisms.",
    },
    "cataluna": {
      en: "Catalonia (Cataluña) has its own Tribunal Superior de Justicia in Barcelona and applies a distinctive Derecho civil catalán covering family, succession and contracts. The Barcelona bar (Il·lustre Col·legi de l'Advocacia de Barcelona) is among Europe's largest.",
      es: "Cataluña dispone de Tribunal Superior de Justicia con sede en Barcelona y aplica un Derecho civil catalán propio en materia de familia, sucesiones y contratos. El Ilustre Colegio de la Abogacía de Barcelona es uno de los mayores de Europa.",
    },
    "extremadura": {
      en: "Extremadura (Mérida, Badajoz, Cáceres) is served by the Tribunal Superior de Justicia in Cáceres. The regional bars handle a substantial agricultural, environmental and Portuguese cross-border caseload.",
    },
    "galicia": {
      en: "Galicia is served by the Tribunal Superior de Justicia in A Coruña. The region applies its own Derecho civil de Galicia (especially for foros, montes vecinales and succession). The Vigo and A Coruña bars specialise in fisheries, shipping and Portuguese cross-border matters.",
    },
    "la-rioja": {
      en: "La Rioja (Logroño) is served by the Tribunal Superior de Justicia de La Rioja. The Logroño bar handles a heavy viticulture, designation-of-origin and agricultural caseload.",
    },
    "madrid-region": {
      en: "The Community of Madrid is Spain's economic and judicial centre. The Tribunal Superior de Justicia de Madrid sits in the capital, alongside the Tribunal Supremo, the Audiencia Nacional and most major institutional regulators. The Madrid bar (ICAM) is the country's largest.",
    },
    "murcia-region": {
      en: "The Region of Murcia is served by the Tribunal Superior de Justicia de Murcia. Local bars handle agribusiness (huerta), petrochemicals (Cartagena) and Mar Menor environmental litigation.",
    },
    "navarra": {
      en: "Navarra applies its own Fuero Nuevo (Compilación del Derecho Civil Foral de Navarra), one of the most extensive forales in Spain. The Tribunal Superior de Justicia de Navarra sits in Pamplona and frequently applies these distinctive succession and family rules.",
    },
    "pais-vasco": {
      en: "The Basque Country (País Vasco / Euskadi) is served by the Tribunal Superior de Justicia del País Vasco in Bilbao. The region applies its own Derecho civil foral vasco (Fuero Civil de Bizkaia y Álava) and operates under a distinctive Concierto Económico tax regime.",
    },
    "comunidad-valenciana": {
      en: "The Valencian Community covers Valencia, Alicante, Elche and Castellón. The Tribunal Superior de Justicia de la Comunidad Valenciana sits in Valencia. Strong specialisms in real-estate (especially British and Northern-European retiree property), agricultural and tourism law.",
    },
  },

  it: {
    "abruzzo": {
      en: "Abruzzo (L'Aquila, Pescara, Chieti) is served by the Corte d'Appello dell'Aquila. Local bars handle a substantial post-earthquake reconstruction and public-procurement caseload alongside agribusiness and tourism matters.",
    },
    "basilicata": {
      en: "Basilicata (Potenza, Matera) is served by the Corte d'Appello di Potenza. Local advocates specialise in energy (Val d'Agri oil), agricultural and UNESCO heritage-site property disputes around Matera.",
    },
    "calabria": {
      en: "Calabria is served by the Corte d'Appello di Catanzaro, with sezioni distaccate at Reggio Calabria. The regional bars handle significant anti-mafia, public-procurement and agricultural litigation.",
      it: "La Calabria fa capo alla Corte d'Appello di Catanzaro, con sezioni distaccate a Reggio Calabria. I fori locali trattano un contenzioso significativo in materia antimafia, di appalti pubblici e di diritto agrario.",
    },
    "campania": {
      en: "Campania, anchored by Naples and Salerno, is served by the Corti d'Appello di Napoli e Salerno. The Naples bar is one of Italy's largest and traditionally strong in civil, commercial and criminal litigation.",
    },
    "emilia-romagna": {
      en: "Emilia-Romagna (Bologna, Parma, Modena, Reggio Emilia, Ravenna, Rimini, Ferrara) is served by the Corte d'Appello di Bologna. The regional bars are highly specialised in food-and-wine (parmigiano, prosciutto, Lambrusco) and ceramic-tile industrial disputes.",
    },
    "friuli-venezia-giulia": {
      en: "Friuli-Venezia Giulia (Trieste, Udine) is served by the Corte d'Appello di Trieste. The Trieste bar handles maritime, insurance and Central-European cross-border matters tied to the historic Habsburg trade routes.",
    },
    "lazio": {
      en: "Lazio, dominated by Rome, hosts the Corte d'Appello di Roma alongside the Corte Suprema di Cassazione, the Consiglio di Stato and most major regulators. The Rome bar (Ordine degli Avvocati di Roma) is Italy's largest with over 25,000 members.",
      it: "Il Lazio, con Roma come capoluogo, ospita la Corte d'Appello di Roma accanto alla Corte Suprema di Cassazione, al Consiglio di Stato e alla maggior parte delle autorità regolatorie. L'Ordine degli Avvocati di Roma, con oltre 25.000 iscritti, è il più grande d'Italia.",
    },
    "liguria": {
      en: "Liguria (Genoa, La Spezia, Savona) is served by the Corte d'Appello di Genova. The Genoese bar has deep specialisms in maritime, insurance and port-logistics law, befitting Italy's largest seaport.",
    },
    "lombardia": {
      en: "Lombardy (Milan, Brescia, Bergamo) is Italy's economic powerhouse. The Corte d'Appello di Milano handles a heavy banking, M&A, IP and competition caseload; the Milan bar is the country's centre for international commercial and arbitration practice.",
    },
    "marche": {
      en: "Marche (Ancona, Pesaro, Macerata) is served by the Corte d'Appello di Ancona. Local advocates specialise in footwear, white-goods and fishing-industry matters tied to the region's industrial districts.",
    },
    "molise": {
      en: "Molise (Campobasso, Isernia) is served by the Corte d'Appello di Campobasso. As Italy's second-smallest region, the bar is correspondingly compact, with a focus on agricultural and public-administration matters.",
    },
    "piemonte": {
      en: "Piedmont (Turin, Alessandria, Novara) is served by the Corte d'Appello di Torino. Strong specialisms in automotive (FCA/Stellantis), aerospace and luxury food-and-wine (Barolo, Barbaresco) sectors.",
    },
    "puglia": {
      en: "Apulia (Puglia) covers Bari, Taranto, Foggia and Lecce. The Corte d'Appello di Bari handles most appeals, with a sezione distaccata in Taranto. Heavy specialisms in steel-industry (Ilva/Acciaierie d'Italia) and agricultural disputes.",
    },
    "sardegna": {
      en: "Sardinia (Sardegna) is served by the Corte d'Appello di Cagliari, with a sezione distaccata in Sassari. The regional bars handle tourism, mining-legacy and a distinctive Sardinian-statute land-tenure caseload.",
    },
    "sicilia": {
      en: "Sicily (Sicilia) covers Palermo, Catania and Messina. The Corte d'Appello di Palermo handles western-Sicily appeals; Catania and Messina serve the east. Sicily operates under a special statute (Statuto Siciliano) with additional regional legislative powers.",
    },
    "toscana": {
      en: "Tuscany (Toscana) is served by the Corte d'Appello di Firenze. The Florence and Pisa bars handle art-law, wine-industry and historic-property restoration disputes characteristic of the region.",
    },
    "trentino-alto-adige": {
      en: "Trentino-Alto Adige / Südtirol is a bilingual autonomous region served by the Corte d'Appello di Trento, with a sezione distaccata in Bolzano. South Tyrolean lawyers practise in both Italian and German under a distinctive linguistic-parity statute.",
    },
    "umbria": {
      en: "Umbria (Perugia, Terni) is served by the Corte d'Appello di Perugia. Local bars specialise in agribusiness, religious-foundation (Assisi) and historic-property matters.",
    },
    "valle-daosta": {
      en: "Valle d'Aosta / Vallée d'Aoste is a bilingual autonomous region; appeals are heard by the Corte d'Appello di Torino. The local bar in Aosta operates in both Italian and French and handles distinctive cross-border (French) family and succession matters.",
    },
    "veneto": {
      en: "Veneto (Venice, Verona, Padua, Vicenza, Treviso) is served by the Corte d'Appello di Venezia. The regional bars handle a heavy fashion (Benetton, Diesel), wine (Prosecco, Amarone) and port-Adriatic caseload.",
    },
  },

  pt: {
    "norte": {
      en: "Northern Portugal (Norte) covers Porto, Braga, Guimarães, Viana do Castelo and Bragança. The Tribunal da Relação do Porto is the regional appellate court; the Ordem dos Advogados Conselho Regional do Porto is the second-largest in the country and specialises in textiles, wine (Vinho Verde, Port) and Spanish cross-border matters.",
      pt: "O Norte de Portugal abrange Porto, Braga, Guimarães, Viana do Castelo e Bragança. O Tribunal da Relação do Porto é a instância regional de recurso. O Conselho Regional do Porto da Ordem dos Advogados é o segundo maior do país, com especial enfoque em têxteis, vinhos (Vinho Verde e Vinho do Porto) e relações transfronteiriças com Espanha.",
    },
    "centro": {
      en: "Central Portugal (Centro) covers Coimbra, Aveiro, Leiria and Viseu. The Tribunal da Relação de Coimbra serves the region; Coimbra's historic law faculty (founded 1290) continues to shape Portuguese legal academia and the regional bar.",
    },
    "lisboa-region": {
      en: "The Lisbon Metropolitan Area is Portugal's judicial and economic capital. The Tribunal da Relação de Lisboa, the Supremo Tribunal de Justiça and the Tribunal Constitucional are all based here. The Conselho Regional de Lisboa da Ordem dos Advogados is the country's largest.",
      pt: "A Área Metropolitana de Lisboa é o centro judicial e económico de Portugal. Aqui têm sede o Tribunal da Relação de Lisboa, o Supremo Tribunal de Justiça e o Tribunal Constitucional. O Conselho Regional de Lisboa da Ordem dos Advogados é o maior do país.",
    },
    "alentejo": {
      en: "The Alentejo (Évora, Beja, Portalegre) is served by the Tribunal da Relação de Évora. Local advocates handle a heavy agricultural, cork-industry and Spanish cross-border caseload, given the region's long border with Extremadura.",
    },
    "algarve": {
      en: "The Algarve (Faro, Portimão, Albufeira) is served by the Tribunal da Relação de Évora. Local bars handle a high volume of tourism, real-estate and cross-border (British, Dutch, Irish) inheritance and rental disputes.",
    },
    "acores": {
      en: "The Azores (Açores) is an autonomous region served by the Tribunal da Relação de Lisboa with a comarca structure across the nine islands. The Ponta Delgada bar handles distinctive fisheries, tourism and US-tied (large Azorean diaspora) family matters.",
    },
    "madeira": {
      en: "Madeira is an autonomous region. Appellate matters reach the Tribunal da Relação de Lisboa. The Funchal bar specialises in tourism, shipping (Madeira International Ship Register) and the International Business Centre tax-regime work.",
    },
  },
};

/**
 * Pick the best-available locale intro, falling back to English.
 * Returns `{ text, locale }` so the page can render a "shown in English" note.
 */
export function pickRegionIntro(
  country: EuCountryCode,
  region: string,
  locale: LocaleCode,
): { text: string; locale: LocaleCode } | null {
  const intro = REGION_INTROS[country]?.[region];
  if (!intro) return null;
  const text = intro[locale];
  if (text) return { text, locale };
  return { text: intro.en, locale: "en" };
}
