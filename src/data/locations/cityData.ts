export interface CityData {
  name: string;
  slug: string;
  state: string; // state slug
  lat: number;
  lng: number;
  courthouse: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    phone?: string;
    website?: string;
  };
  population?: number;
}

export const cityData: CityData[] = [
  // Priority geo-targeting cities
  { name: "Baton Rouge", slug: "baton-rouge", state: "louisiana", lat: 30.4515, lng: -91.1871, courthouse: { name: "19th Judicial District Court", address: "300 St. Ferdinand St, Baton Rouge, LA 70801", lat: 30.4490, lng: -91.1872, phone: "(225) 389-3950", website: "https://www.19jdc.org" }, population: 227470 },
  { name: "Lafayette", slug: "lafayette", state: "louisiana", lat: 30.2241, lng: -92.0198, courthouse: { name: "Lafayette Parish Courthouse", address: "800 S Buchanan St, Lafayette, LA 70501", lat: 30.2185, lng: -92.0193, phone: "(337) 291-6400", website: "https://www.lafayetteclerk.com" }, population: 121374 },
  { name: "Corpus Christi", slug: "corpus-christi", state: "texas", lat: 27.8006, lng: -97.3964, courthouse: { name: "Nueces County Courthouse", address: "901 Leopard St, Corpus Christi, TX 78401", lat: 27.7986, lng: -97.3933, phone: "(361) 888-0580", website: "https://www.nuecesco.com" }, population: 317863 },
  { name: "St. Louis", slug: "st-louis", state: "missouri", lat: 38.6270, lng: -90.1994, courthouse: { name: "Civil Courts Building", address: "10 N Tucker Blvd, St. Louis, MO 63101", lat: 38.6322, lng: -90.1944, phone: "(314) 622-4405", website: "https://www.stlouiscitycircuitcourt.com" }, population: 301578 },
  { name: "Providence", slug: "providence", state: "rhode-island", lat: 41.8240, lng: -71.4128, courthouse: { name: "Providence County Superior Court", address: "250 Benefit St, Providence, RI 02903", lat: 41.8270, lng: -71.4094, phone: "(401) 222-3250", website: "https://www.courts.ri.gov" }, population: 190934 },
  { name: "Provo", slug: "provo", state: "utah", lat: 40.2338, lng: -111.6585, courthouse: { name: "Utah County Justice Court", address: "75 E 80 N, Provo, UT 84601", lat: 40.2360, lng: -111.6585, phone: "(801) 429-1000", website: "https://www.utcourts.gov" }, population: 115162 },

  // Top 50 US cities by population
  { name: "New York City", slug: "new-york-city", state: "new-york", lat: 40.7128, lng: -74.0060, courthouse: { name: "New York County Supreme Court", address: "60 Centre St, New York, NY 10007", lat: 40.7143, lng: -74.0018, phone: "(646) 386-3600", website: "https://ww2.nycourts.gov/courts/1jd/supctmanh" }, population: 8336817 },
  { name: "Los Angeles", slug: "los-angeles", state: "california", lat: 34.0522, lng: -118.2437, courthouse: { name: "Stanley Mosk Courthouse", address: "111 N Hill St, Los Angeles, CA 90012", lat: 34.0550, lng: -118.2468, phone: "(213) 830-0803", website: "https://www.lacourt.org" }, population: 3979576 },
  { name: "Chicago", slug: "chicago", state: "illinois", lat: 41.8781, lng: -87.6298, courthouse: { name: "Richard J. Daley Center", address: "50 W Washington St, Chicago, IL 60602", lat: 41.8843, lng: -87.6299, phone: "(312) 603-5030", website: "https://www.cookcountycourt.org" }, population: 2693976 },
  { name: "Houston", slug: "houston", state: "texas", lat: 29.7604, lng: -95.3698, courthouse: { name: "Harris County Civil Courthouse", address: "201 Caroline St, Houston, TX 77002", lat: 29.7604, lng: -95.3617, phone: "(713) 755-6421", website: "https://www.justex.net" }, population: 2320268 },
  { name: "Phoenix", slug: "phoenix", state: "arizona", lat: 33.4484, lng: -112.0740, courthouse: { name: "Maricopa County Superior Court", address: "201 W Jefferson St, Phoenix, AZ 85003", lat: 33.4472, lng: -112.0766, phone: "(602) 506-3204", website: "https://superiorcourt.maricopa.gov" }, population: 1680992 },
  { name: "Philadelphia", slug: "philadelphia", state: "pennsylvania", lat: 39.9526, lng: -75.1652, courthouse: { name: "Philadelphia City Hall", address: "1401 John F Kennedy Blvd, Philadelphia, PA 19107", lat: 39.9524, lng: -75.1636, phone: "(215) 686-7000", website: "https://www.courts.phila.gov" }, population: 1603797 },
  { name: "San Antonio", slug: "san-antonio", state: "texas", lat: 29.4241, lng: -98.4936, courthouse: { name: "Bexar County Courthouse", address: "100 Dolorosa St, San Antonio, TX 78205", lat: 29.4228, lng: -98.4934, phone: "(210) 335-2011", website: "https://www.bexar.org/courts" }, population: 1547253 },
  { name: "San Diego", slug: "san-diego", state: "california", lat: 32.7157, lng: -117.1611, courthouse: { name: "San Diego County Superior Court", address: "330 W Broadway, San Diego, CA 92101", lat: 32.7186, lng: -117.1644, phone: "(619) 450-7070", website: "https://www.sdcourt.ca.gov" }, population: 1423851 },
  { name: "Dallas", slug: "dallas", state: "texas", lat: 32.7767, lng: -96.7970, courthouse: { name: "George L. Allen Sr. Courts Building", address: "600 Commerce St, Dallas, TX 75202", lat: 32.7792, lng: -96.7992, phone: "(214) 653-7011", website: "https://www.dallascounty.org/government/courts" }, population: 1343573 },
  { name: "San Jose", slug: "san-jose", state: "california", lat: 37.3382, lng: -121.8863, courthouse: { name: "Santa Clara County Superior Court", address: "191 N 1st St, San Jose, CA 95113", lat: 37.3388, lng: -121.8898, phone: "(408) 882-2100", website: "https://www.scscourt.org" }, population: 1021795 },
  { name: "Austin", slug: "austin", state: "texas", lat: 30.2672, lng: -97.7431, courthouse: { name: "Travis County Civil & Family Courts", address: "1700 Guadalupe St, Austin, TX 78701", lat: 30.2753, lng: -97.7440, phone: "(512) 854-9457", website: "https://www.traviscountytx.gov/courts" }, population: 978908 },
  { name: "Jacksonville", slug: "jacksonville", state: "florida", lat: 30.3322, lng: -81.6557, courthouse: { name: "Duval County Courthouse", address: "501 W Adams St, Jacksonville, FL 32202", lat: 30.3282, lng: -81.6608, phone: "(904) 255-1100", website: "https://www.duvalclerk.com" }, population: 949611 },
  { name: "Fort Worth", slug: "fort-worth", state: "texas", lat: 32.7555, lng: -97.3308, courthouse: { name: "Tarrant County Civil Courts", address: "100 N Calhoun St, Fort Worth, TX 76196", lat: 32.7576, lng: -97.3291, phone: "(817) 884-1240", website: "https://www.tarrantcounty.com/en/courts.html" }, population: 918915 },
  { name: "Columbus", slug: "columbus", state: "ohio", lat: 39.9612, lng: -82.9988, courthouse: { name: "Franklin County Court of Common Pleas", address: "345 S High St, Columbus, OH 43215", lat: 39.9576, lng: -82.9990, phone: "(614) 525-3600", website: "https://www.franklincountyohio.gov/commissioners/courts" }, population: 905748 },
  { name: "Charlotte", slug: "charlotte", state: "north-carolina", lat: 35.2271, lng: -80.8431, courthouse: { name: "Mecklenburg County Courthouse", address: "832 E 4th St, Charlotte, NC 28202", lat: 35.2249, lng: -80.8370, phone: "(704) 686-0400", website: "https://www.nccourts.gov/locations/mecklenburg-county" }, population: 874579 },
  { name: "Indianapolis", slug: "indianapolis", state: "indiana", lat: 39.7684, lng: -86.1581, courthouse: { name: "Marion County Superior Court", address: "200 E Washington St, Indianapolis, IN 46204", lat: 39.7689, lng: -86.1571, phone: "(317) 327-4740", website: "https://www.indy.gov/agency/marion-superior-court" }, population: 887642 },
  { name: "San Francisco", slug: "san-francisco", state: "california", lat: 37.7749, lng: -122.4194, courthouse: { name: "San Francisco Superior Court", address: "400 McAllister St, San Francisco, CA 94102", lat: 37.7797, lng: -122.4168, phone: "(415) 551-4000", website: "https://www.sfsuperiorcourt.org" }, population: 873965 },
  { name: "Seattle", slug: "seattle", state: "washington", lat: 47.6062, lng: -122.3321, courthouse: { name: "King County Superior Court", address: "516 3rd Ave, Seattle, WA 98104", lat: 47.6027, lng: -122.3312, phone: "(206) 477-1600", website: "https://www.kingcounty.gov/courts/superior-court" }, population: 737015 },
  { name: "Denver", slug: "denver", state: "colorado", lat: 39.7392, lng: -104.9903, courthouse: { name: "Denver District Court", address: "1437 Bannock St, Denver, CO 80202", lat: 39.7376, lng: -104.9897, phone: "(720) 865-8301", website: "https://www.courts.state.co.us/Courts/District/Index.cfm?District_ID=2" }, population: 715522 },
  { name: "Nashville", slug: "nashville", state: "tennessee", lat: 36.1627, lng: -86.7816, courthouse: { name: "Davidson County Courthouse", address: "1 Public Square, Nashville, TN 37201", lat: 36.1632, lng: -86.7773, phone: "(615) 862-5181", website: "https://www.nashville.gov/departments/law/courts" }, population: 689447 },
  { name: "Oklahoma City", slug: "oklahoma-city", state: "oklahoma", lat: 35.4676, lng: -97.5164, courthouse: { name: "Oklahoma County Courthouse", address: "321 Park Ave, Oklahoma City, OK 73102", lat: 35.4695, lng: -97.5145, phone: "(405) 713-1705", website: "https://www.oklahomacounty.org/courthouse" }, population: 681054 },
  { name: "El Paso", slug: "el-paso", state: "texas", lat: 31.7619, lng: -106.4850, courthouse: { name: "El Paso County Courthouse", address: "500 E San Antonio Ave, El Paso, TX 79901", lat: 31.7596, lng: -106.4448, phone: "(915) 546-2021", website: "https://www.epcounty.com/courts" }, population: 678815 },
  { name: "Boston", slug: "boston", state: "massachusetts", lat: 42.3601, lng: -71.0589, courthouse: { name: "Suffolk County Superior Court", address: "3 Pemberton Square, Boston, MA 02108", lat: 42.3590, lng: -71.0615, phone: "(617) 788-8175", website: "https://www.mass.gov/orgs/suffolk-county-superior-court" }, population: 675647 },
  { name: "Portland", slug: "portland", state: "oregon", lat: 45.5152, lng: -122.6784, courthouse: { name: "Multnomah County Circuit Court", address: "1021 SW 4th Ave, Portland, OR 97204", lat: 45.5150, lng: -122.6793, phone: "(503) 988-3022", website: "https://www.courts.oregon.gov/courts/multnomah" }, population: 652503 },
  { name: "Las Vegas", slug: "las-vegas", state: "nevada", lat: 36.1699, lng: -115.1398, courthouse: { name: "Clark County District Court", address: "200 Lewis Ave, Las Vegas, NV 89155", lat: 36.1632, lng: -115.1430, phone: "(702) 455-4011", website: "https://www.clarkcountycourts.us" }, population: 641903 },
  { name: "Memphis", slug: "memphis", state: "tennessee", lat: 35.1495, lng: -90.0490, courthouse: { name: "Shelby County Circuit Court", address: "140 Adams Ave, Memphis, TN 38103", lat: 35.1498, lng: -90.0502, phone: "(901) 222-3500", website: "https://www.shelbycountytn.gov/162/Circuit-Court" }, population: 633104 },
  { name: "Louisville", slug: "louisville", state: "kentucky", lat: 38.2527, lng: -85.7585, courthouse: { name: "Jefferson County Hall of Justice", address: "700 W Jefferson St, Louisville, KY 40202", lat: 38.2557, lng: -85.7589, phone: "(502) 595-4500", website: "https://www.jeffersoncountyclerk.org" }, population: 633045 },
  { name: "Baltimore", slug: "baltimore", state: "maryland", lat: 39.2904, lng: -76.6122, courthouse: { name: "Baltimore City Circuit Court", address: "111 N Calvert St, Baltimore, MD 21202", lat: 39.2906, lng: -76.6123, phone: "(410) 333-3722", website: "https://www.baltimorecitycourt.org" }, population: 585708 },
  { name: "Milwaukee", slug: "milwaukee", state: "wisconsin", lat: 43.0389, lng: -87.9065, courthouse: { name: "Milwaukee County Courthouse", address: "901 N 9th St, Milwaukee, WI 53233", lat: 43.0403, lng: -87.9247, phone: "(414) 278-5362", website: "https://www.wicourts.gov/courts/circuit/milwaukee.htm" }, population: 577222 },
  { name: "Albuquerque", slug: "albuquerque", state: "new-mexico", lat: 35.0844, lng: -106.6504, courthouse: { name: "Bernalillo County Metropolitan Court", address: "401 Lomas Blvd NW, Albuquerque, NM 87102", lat: 35.0877, lng: -106.6490, phone: "(505) 841-8151", website: "https://metro.nmcourts.gov" }, population: 564559 },
  { name: "Tucson", slug: "tucson", state: "arizona", lat: 32.2226, lng: -110.9747, courthouse: { name: "Pima County Superior Court", address: "110 W Congress St, Tucson, AZ 85701", lat: 32.2222, lng: -110.9716, phone: "(520) 724-3171", website: "https://www.sc.pima.gov" }, population: 542629 },
  { name: "Fresno", slug: "fresno", state: "california", lat: 36.7378, lng: -119.7871, courthouse: { name: "Fresno County Superior Court", address: "1100 Van Ness Ave, Fresno, CA 93724", lat: 36.7360, lng: -119.7870, phone: "(559) 457-2000", website: "https://www.fresno.courts.ca.gov" }, population: 542107 },
  { name: "Mesa", slug: "mesa", state: "arizona", lat: 33.4152, lng: -111.8315, courthouse: { name: "Mesa Municipal Court", address: "245 W 2nd St, Mesa, AZ 85201", lat: 33.4147, lng: -111.8367, phone: "(480) 644-2255", website: "https://www.mesaaz.gov/government/courts" }, population: 504258 },
  { name: "Sacramento", slug: "sacramento", state: "california", lat: 38.5816, lng: -121.4944, courthouse: { name: "Sacramento County Superior Court", address: "720 9th St, Sacramento, CA 95814", lat: 38.5818, lng: -121.4952, phone: "(916) 874-5522", website: "https://www.saccourt.ca.gov" }, population: 524943 },
  { name: "Atlanta", slug: "atlanta", state: "georgia", lat: 33.7490, lng: -84.3880, courthouse: { name: "Fulton County Superior Court", address: "136 Pryor St SW, Atlanta, GA 30303", lat: 33.7521, lng: -84.3906, phone: "(404) 613-5313", website: "https://www.fultoncourt.org" }, population: 498715 },
  { name: "Kansas City", slug: "kansas-city", state: "missouri", lat: 39.0997, lng: -94.5786, courthouse: { name: "Jackson County Courthouse", address: "415 E 12th St, Kansas City, MO 64106", lat: 39.0991, lng: -94.5771, phone: "(816) 881-3526", website: "https://www.16thcircuit.org" }, population: 508090 },
  { name: "Omaha", slug: "omaha", state: "nebraska", lat: 41.2565, lng: -95.9345, courthouse: { name: "Douglas County Courthouse", address: "1701 Farnam St, Omaha, NE 68183", lat: 41.2561, lng: -95.9345, phone: "(402) 444-7018", website: "https://www.douglascounty-ne.gov/courts" }, population: 486051 },
  { name: "Miami", slug: "miami", state: "florida", lat: 25.7617, lng: -80.1918, courthouse: { name: "Miami-Dade County Courthouse", address: "73 W Flagler St, Miami, FL 33130", lat: 25.7742, lng: -80.1936, phone: "(305) 275-1155", website: "https://www.jud11.flcourts.org" }, population: 442241 },
  { name: "Tampa", slug: "tampa", state: "florida", lat: 27.9506, lng: -82.4572, courthouse: { name: "Hillsborough County Courthouse", address: "800 E Twiggs St, Tampa, FL 33602", lat: 27.9475, lng: -82.4539, phone: "(813) 276-8100", website: "https://www.hillsclerk.com" }, population: 384959 },
  { name: "New Orleans", slug: "new-orleans", state: "louisiana", lat: 29.9511, lng: -90.0715, courthouse: { name: "Orleans Parish Civil District Court", address: "421 Loyola Ave, New Orleans, LA 70112", lat: 29.9531, lng: -90.0762, phone: "(504) 407-0000", website: "https://www.orleanscdc.com" }, population: 383997 },
  { name: "Cleveland", slug: "cleveland", state: "ohio", lat: 41.4993, lng: -81.6944, courthouse: { name: "Cuyahoga County Court of Common Pleas", address: "1 W Lakeside Ave, Cleveland, OH 44113", lat: 41.5020, lng: -81.6934, phone: "(216) 443-8560", website: "https://cp.cuyahogacounty.us" }, population: 372624 },
  { name: "Minneapolis", slug: "minneapolis", state: "minnesota", lat: 44.9778, lng: -93.2650, courthouse: { name: "Hennepin County Government Center", address: "300 S 6th St, Minneapolis, MN 55487", lat: 44.9768, lng: -93.2679, phone: "(612) 348-2040", website: "https://www.mncourts.gov/Find-Courts/Hennepin" }, population: 429954 },
  { name: "Orlando", slug: "orlando", state: "florida", lat: 28.5383, lng: -81.3792, courthouse: { name: "Orange County Courthouse", address: "425 N Orange Ave, Orlando, FL 32801", lat: 28.5444, lng: -81.3790, phone: "(407) 836-2000", website: "https://www.ninthcircuit.org" }, population: 307573 },
  { name: "Raleigh", slug: "raleigh", state: "north-carolina", lat: 35.7796, lng: -78.6382, courthouse: { name: "Wake County Courthouse", address: "316 Fayetteville St, Raleigh, NC 27601", lat: 35.7784, lng: -78.6382, phone: "(919) 792-4000", website: "https://www.nccourts.gov/locations/wake-county" }, population: 467665 },
  { name: "Detroit", slug: "detroit", state: "michigan", lat: 42.3314, lng: -83.0458, courthouse: { name: "Wayne County Circuit Court", address: "2 Woodward Ave, Detroit, MI 48226", lat: 42.3296, lng: -83.0452, phone: "(313) 224-5261", website: "https://www.3rdcc.org" }, population: 639111 },
  { name: "Pittsburgh", slug: "pittsburgh", state: "pennsylvania", lat: 40.4406, lng: -79.9959, courthouse: { name: "Allegheny County Courthouse", address: "436 Grant St, Pittsburgh, PA 15219", lat: 40.4386, lng: -79.9963, phone: "(412) 350-5300", website: "https://www.alleghenycourts.us" }, population: 302971 },
  { name: "Salt Lake City", slug: "salt-lake-city", state: "utah", lat: 40.7608, lng: -111.8910, courthouse: { name: "Scott M. Matheson Courthouse", address: "450 S State St, Salt Lake City, UT 84111", lat: 40.7601, lng: -111.8882, phone: "(801) 578-3800", website: "https://www.utcourts.gov" }, population: 200133 },
  { name: "Birmingham", slug: "birmingham", state: "alabama", lat: 33.5207, lng: -86.8025, courthouse: { name: "Jefferson County Courthouse", address: "716 Richard Arrington Jr Blvd N, Birmingham, AL 35203", lat: 33.5183, lng: -86.8090, phone: "(205) 325-5355", website: "https://www.jeffcoclerk.com" }, population: 200733 },
  { name: "Richmond", slug: "richmond", state: "virginia", lat: 37.5407, lng: -77.4360, courthouse: { name: "Richmond Circuit Court", address: "400 N 9th St, Richmond, VA 23219", lat: 37.5424, lng: -77.4353, phone: "(804) 646-6505", website: "https://www.courts.state.va.us/courts/circuit/Richmond" }, population: 226610 },
  { name: "Hartford", slug: "hartford", state: "connecticut", lat: 41.7658, lng: -72.6734, courthouse: { name: "Hartford Superior Court", address: "95 Washington St, Hartford, CT 06106", lat: 41.7642, lng: -72.6778, phone: "(860) 548-2700", website: "https://www.jud.ct.gov/directory/court/super_ha.htm" }, population: 121054 },
  { name: "Des Moines", slug: "des-moines", state: "iowa", lat: 41.5868, lng: -93.6250, courthouse: { name: "Polk County Courthouse", address: "500 Mulberry St, Des Moines, IA 50309", lat: 41.5858, lng: -93.6256, phone: "(515) 286-3772", website: "https://www.iowacourts.gov/courts-and-judges/court-directory/polk-county" }, population: 214133 },
  { name: "Little Rock", slug: "little-rock", state: "arkansas", lat: 34.7465, lng: -92.2896, courthouse: { name: "Pulaski County Courthouse", address: "401 W Markham St, Little Rock, AR 72201", lat: 34.7480, lng: -92.2820, phone: "(501) 340-8500", website: "https://www.arcourts.gov/courts/circuit-courts/6th-circuit" }, population: 202591 },
  { name: "Jackson", slug: "jackson", state: "mississippi", lat: 32.2988, lng: -90.1848, courthouse: { name: "Hinds County Courthouse", address: "407 E Pascagoula St, Jackson, MS 39201", lat: 32.2984, lng: -90.1833, phone: "(601) 968-6508", website: "https://www.hindscountyms.com" }, population: 153701 },
  { name: "Wilmington", slug: "wilmington", state: "delaware", lat: 39.7391, lng: -75.5398, courthouse: { name: "New Castle County Courthouse", address: "500 N King St, Wilmington, DE 19801", lat: 39.7433, lng: -75.5487, phone: "(302) 255-0800", website: "https://courts.delaware.gov/superior" }, population: 70898 },
  { name: "Honolulu", slug: "honolulu", state: "hawaii", lat: 21.3069, lng: -157.8583, courthouse: { name: "Circuit Court of the First Circuit", address: "777 Punchbowl St, Honolulu, HI 96813", lat: 21.3070, lng: -157.8578, phone: "(808) 539-4300", website: "https://www.courts.state.hi.us" }, population: 350964 },
  { name: "Anchorage", slug: "anchorage", state: "alaska", lat: 61.2181, lng: -149.9003, courthouse: { name: "Nesbett Courthouse", address: "825 W 4th Ave, Anchorage, AK 99501", lat: 61.2172, lng: -149.8961, phone: "(907) 264-0371", website: "https://courts.alaska.gov/main/ctdir-anchorage.htm" }, population: 291247 },
  { name: "Boise", slug: "boise", state: "idaho", lat: 43.6150, lng: -116.2023, courthouse: { name: "Ada County Courthouse", address: "200 W Front St, Boise, ID 83702", lat: 43.6161, lng: -116.2035, phone: "(208) 287-6900", website: "https://www.isc.idaho.gov" }, population: 228959 },
  { name: "Billings", slug: "billings", state: "montana", lat: 45.7833, lng: -108.5007, courthouse: { name: "Yellowstone County Courthouse", address: "217 N 27th St, Billings, MT 59101", lat: 45.7832, lng: -108.5078, phone: "(406) 256-2851", website: "https://www.yellowstonecountymt.gov/districtcourt" }, population: 117116 },
  { name: "Wichita", slug: "wichita", state: "kansas", lat: 37.6872, lng: -97.3301, courthouse: { name: "Sedgwick County Courthouse", address: "525 N Main St, Wichita, KS 67203", lat: 37.6928, lng: -97.3368, phone: "(316) 660-5800", website: "https://www.dc18.org" }, population: 397532 },
  { name: "Sioux Falls", slug: "sioux-falls", state: "south-dakota", lat: 43.5446, lng: -96.7311, courthouse: { name: "Minnehaha County Courthouse", address: "425 N Dakota Ave, Sioux Falls, SD 57104", lat: 43.5490, lng: -96.7268, phone: "(605) 367-5920", website: "https://ujs.sd.gov" }, population: 192517 },
  { name: "Fargo", slug: "fargo", state: "north-dakota", lat: 46.8772, lng: -96.7898, courthouse: { name: "Cass County Courthouse", address: "211 9th St S, Fargo, ND 58103", lat: 46.8724, lng: -96.7882, phone: "(701) 241-5615", website: "https://www.ndcourts.gov" }, population: 125990 },
  { name: "Burlington", slug: "burlington", state: "vermont", lat: 44.4759, lng: -73.2121, courthouse: { name: "Chittenden County Superior Court", address: "175 Main St, Burlington, VT 05401", lat: 44.4776, lng: -73.2133, phone: "(802) 863-3467", website: "https://www.vermontjudiciary.org/courts/chittenden" }, population: 44743 },
  { name: "Charleston", slug: "charleston", state: "west-virginia", lat: 38.3498, lng: -81.6326, courthouse: { name: "Kanawha County Courthouse", address: "111 Court St, Charleston, WV 25301", lat: 38.3509, lng: -81.6349, phone: "(304) 357-0130", website: "https://www.courtswv.gov" }, population: 48006 },
  { name: "Manchester", slug: "manchester", state: "new-hampshire", lat: 42.9956, lng: -71.4548, courthouse: { name: "Hillsborough County Superior Court", address: "300 Chestnut St, Manchester, NH 03101", lat: 42.9926, lng: -71.4632, phone: "(603) 669-7410", website: "https://www.courts.nh.gov" }, population: 115644 },
  { name: "Portland", slug: "portland-me", state: "maine", lat: 43.6591, lng: -70.2568, courthouse: { name: "Cumberland County Courthouse", address: "205 Newbury St, Portland, ME 04101", lat: 43.6547, lng: -70.2596, phone: "(207) 871-8380", website: "https://www.courts.maine.gov" }, population: 68408 },
  { name: "Cheyenne", slug: "cheyenne", state: "wyoming", lat: 41.1400, lng: -104.8202, courthouse: { name: "Laramie County Courthouse", address: "309 W 20th St, Cheyenne, WY 82001", lat: 41.1388, lng: -104.8207, phone: "(307) 633-4270", website: "https://www.courts.state.wy.us" }, population: 65132 },
  { name: "Charleston", slug: "charleston-sc", state: "south-carolina", lat: 32.7765, lng: -79.9311, courthouse: { name: "Charleston County Courthouse", address: "100 Broad St, Charleston, SC 29401", lat: 32.7764, lng: -79.9310, phone: "(843) 958-5000", website: "https://www.sccourts.org" }, population: 150227 },
  { name: "Virginia Beach", slug: "virginia-beach", state: "virginia", lat: 36.8529, lng: -75.9780, courthouse: { name: "Virginia Beach Circuit Court", address: "2425 Nimmo Pkwy, Virginia Beach, VA 23456", lat: 36.7740, lng: -76.0730, phone: "(757) 385-4181", website: "https://www.vbgov.com/government/departments/courts" }, population: 459470 },
  { name: "Tulsa", slug: "tulsa", state: "oklahoma", lat: 36.1540, lng: -95.9928, courthouse: { name: "Tulsa County Courthouse", address: "500 S Denver Ave, Tulsa, OK 74103", lat: 36.1495, lng: -95.9933, phone: "(918) 596-5000", website: "https://www.tulsacounty.org/courts" }, population: 413066 },
  { name: "Lincoln", slug: "lincoln", state: "nebraska", lat: 40.8136, lng: -96.7026, courthouse: { name: "Lancaster County Courthouse", address: "575 S 10th St, Lincoln, NE 68508", lat: 40.8093, lng: -96.7013, phone: "(402) 441-7281", website: "https://www.lancaster.ne.gov/courts" }, population: 291082 },
  { name: "Reno", slug: "reno", state: "nevada", lat: 39.5296, lng: -119.8138, courthouse: { name: "Washoe County Courthouse", address: "75 Court St, Reno, NV 89501", lat: 39.5295, lng: -119.8137, phone: "(775) 328-3110", website: "https://www.washoecourts.com" }, population: 264165 },
  { name: "Madison", slug: "madison", state: "wisconsin", lat: 43.0731, lng: -89.4012, courthouse: { name: "Dane County Courthouse", address: "215 S Hamilton St, Madison, WI 53703", lat: 43.0723, lng: -89.3840, phone: "(608) 266-4311", website: "https://www.wicourts.gov/courts/circuit/dane.htm" }, population: 269840 },

  // New Jersey (NEW — was missing entirely)
  { name: "Newark", slug: "newark", state: "new-jersey", lat: 40.7357, lng: -74.1724, courthouse: { name: "Essex County Historic Courthouse", address: "470 Dr Martin Luther King Jr Blvd, Newark, NJ 07102", lat: 40.7410, lng: -74.1710, phone: "(973) 776-9300", website: "https://www.njcourts.gov" }, population: 311549 },
  { name: "Jersey City", slug: "jersey-city", state: "new-jersey", lat: 40.7178, lng: -74.0431, courthouse: { name: "Hudson County Courthouse", address: "595 Newark Ave, Jersey City, NJ 07306", lat: 40.7340, lng: -74.0630, phone: "(201) 748-4400", website: "https://www.njcourts.gov" }, population: 292449 },

  // Additional cities for single-city states
  // New York
  { name: "Buffalo", slug: "buffalo", state: "new-york", lat: 42.8864, lng: -78.8784, courthouse: { name: "Erie County Hall", address: "92 Franklin St, Buffalo, NY 14202", lat: 42.8868, lng: -78.8770, phone: "(716) 845-9301", website: "https://ww2.nycourts.gov/courts/8jd" }, population: 278349 },
  { name: "Albany", slug: "albany", state: "new-york", lat: 42.6526, lng: -73.7562, courthouse: { name: "Albany County Courthouse", address: "16 Eagle St, Albany, NY 12207", lat: 42.6496, lng: -73.7538, phone: "(518) 285-8989", website: "https://ww2.nycourts.gov/courts/3jd" }, population: 99224 },

  // Illinois
  { name: "Springfield", slug: "springfield", state: "illinois", lat: 39.7817, lng: -89.6501, courthouse: { name: "Sangamon County Courthouse", address: "200 S 9th St, Springfield, IL 62701", lat: 39.7980, lng: -89.6480, phone: "(217) 753-6674", website: "https://www.sangamoncountycircuitclerk.org" }, population: 114394 },
  { name: "Rockford", slug: "rockford", state: "illinois", lat: 42.2711, lng: -89.0940, courthouse: { name: "Winnebago County Courthouse", address: "400 W State St, Rockford, IL 61101", lat: 42.2730, lng: -89.0960, phone: "(815) 319-4500", website: "https://www.illinois17th.com" }, population: 148655 },

  // Indiana
  { name: "Fort Wayne", slug: "fort-wayne", state: "indiana", lat: 41.0793, lng: -85.1394, courthouse: { name: "Allen County Courthouse", address: "715 S Calhoun St, Fort Wayne, IN 46802", lat: 41.0770, lng: -85.1390, phone: "(260) 449-7245", website: "https://www.allencounty.us/courts" }, population: 263886 },

  // Washington
  { name: "Spokane", slug: "spokane", state: "washington", lat: 47.6588, lng: -117.4260, courthouse: { name: "Spokane County Courthouse", address: "1116 W Broadway Ave, Spokane, WA 99260", lat: 47.6580, lng: -117.4270, phone: "(509) 477-2211", website: "https://www.spokanecounty.org/courts" }, population: 228989 },
  { name: "Tacoma", slug: "tacoma", state: "washington", lat: 47.2529, lng: -122.4443, courthouse: { name: "Pierce County Superior Court", address: "930 Tacoma Ave S, Tacoma, WA 98402", lat: 47.2510, lng: -122.4430, phone: "(253) 798-7455", website: "https://www.piercecountywa.gov/courts" }, population: 219346 },

  // Colorado
  { name: "Colorado Springs", slug: "colorado-springs", state: "colorado", lat: 38.8339, lng: -104.8214, courthouse: { name: "El Paso County Combined Courts", address: "270 S Tejon St, Colorado Springs, CO 80903", lat: 38.8310, lng: -104.8240, phone: "(719) 452-5000", website: "https://www.courts.state.co.us/Courts/District/Index.cfm?District_ID=4" }, population: 478961 },

  // Massachusetts
  { name: "Worcester", slug: "worcester", state: "massachusetts", lat: 42.2626, lng: -71.8023, courthouse: { name: "Worcester Superior Court", address: "225 Main St, Worcester, MA 01608", lat: 42.2630, lng: -71.8020, phone: "(508) 831-2000", website: "https://www.mass.gov/orgs/worcester-county-superior-court" }, population: 206518 },
  { name: "Springfield", slug: "springfield-ma", state: "massachusetts", lat: 42.1015, lng: -72.5898, courthouse: { name: "Hampden County Superior Court", address: "50 State St, Springfield, MA 01103", lat: 42.1040, lng: -72.5900, phone: "(413) 748-7740", website: "https://www.mass.gov/orgs/hampden-county-superior-court" }, population: 155929 },

  // Oregon
  { name: "Eugene", slug: "eugene", state: "oregon", lat: 44.0521, lng: -123.0868, courthouse: { name: "Lane County Circuit Court", address: "125 E 8th Ave, Eugene, OR 97401", lat: 44.0510, lng: -123.0870, phone: "(541) 682-4020", website: "https://www.courts.oregon.gov/courts/lane" }, population: 176654 },

  // New Mexico
  { name: "Las Cruces", slug: "las-cruces", state: "new-mexico", lat: 32.3199, lng: -106.7637, courthouse: { name: "Third Judicial District Court", address: "201 W Picacho Ave, Las Cruces, NM 88005", lat: 32.3430, lng: -106.7560, phone: "(575) 523-8200", website: "https://www.nmcourts.gov" }, population: 111385 },

  // Georgia
  { name: "Savannah", slug: "savannah", state: "georgia", lat: 32.0809, lng: -81.0912, courthouse: { name: "Chatham County Courthouse", address: "133 Montgomery St, Savannah, GA 31401", lat: 32.0800, lng: -81.0940, phone: "(912) 652-7200", website: "https://www.chathamcounty.org/Courts" }, population: 147780 },
  { name: "Augusta", slug: "augusta", state: "georgia", lat: 33.4735, lng: -81.9748, courthouse: { name: "Richmond County Courthouse", address: "735 James Brown Blvd, Augusta, GA 30901", lat: 33.4730, lng: -81.9680, phone: "(706) 821-2460", website: "https://www.augustaga.gov/courts" }, population: 202081 },

  // Minnesota
  { name: "St. Paul", slug: "st-paul", state: "minnesota", lat: 44.9537, lng: -93.0900, courthouse: { name: "Ramsey County Courthouse", address: "15 W Kellogg Blvd, St. Paul, MN 55102", lat: 44.9460, lng: -93.0960, phone: "(651) 266-8100", website: "https://www.mncourts.gov/Find-Courts/Ramsey" }, population: 311527 },

  // Michigan
  { name: "Grand Rapids", slug: "grand-rapids", state: "michigan", lat: 42.9634, lng: -85.6681, courthouse: { name: "Kent County Courthouse", address: "180 Ottawa Ave NW, Grand Rapids, MI 49503", lat: 42.9680, lng: -85.6710, phone: "(616) 632-5480", website: "https://www.accesskent.com/Courts" }, population: 198917 },

  // Kentucky
  { name: "Lexington", slug: "lexington", state: "kentucky", lat: 38.0406, lng: -84.5037, courthouse: { name: "Fayette County Circuit Court", address: "120 N Limestone, Lexington, KY 40507", lat: 38.0500, lng: -84.4960, phone: "(859) 246-2231", website: "https://kcoj.kycourts.net" }, population: 322570 },

  // Maryland
  { name: "Annapolis", slug: "annapolis", state: "maryland", lat: 38.9784, lng: -76.4922, courthouse: { name: "Anne Arundel County Circuit Court", address: "8 Church Circle, Annapolis, MD 21401", lat: 38.9788, lng: -76.4910, phone: "(410) 222-1397", website: "https://www.mdcourts.gov/circuit/anne-arundel" }, population: 40812 },

  // Alabama
  { name: "Huntsville", slug: "huntsville", state: "alabama", lat: 34.7304, lng: -86.5861, courthouse: { name: "Madison County Courthouse", address: "100 Northside Square, Huntsville, AL 35801", lat: 34.7300, lng: -86.5860, phone: "(256) 532-3300", website: "https://www.madisoncountyal.gov/courts" }, population: 215006 },
  { name: "Mobile", slug: "mobile", state: "alabama", lat: 30.6954, lng: -88.0399, courthouse: { name: "Mobile County Courthouse", address: "205 Government St, Mobile, AL 36602", lat: 30.6890, lng: -88.0430, phone: "(251) 574-8400", website: "https://www.mobilecountyal.gov/courts" }, population: 187041 },

  // Connecticut
  { name: "New Haven", slug: "new-haven", state: "connecticut", lat: 41.3083, lng: -72.9279, courthouse: { name: "New Haven Superior Court", address: "235 Church St, New Haven, CT 06510", lat: 41.3070, lng: -72.9270, phone: "(203) 503-6800", website: "https://www.jud.ct.gov" }, population: 134023 },

  // Iowa
  { name: "Cedar Rapids", slug: "cedar-rapids", state: "iowa", lat: 41.9779, lng: -91.6656, courthouse: { name: "Linn County Courthouse", address: "51 3rd Ave Bridge, Cedar Rapids, IA 52401", lat: 41.9770, lng: -91.6660, phone: "(319) 398-3411", website: "https://www.iowacourts.gov" }, population: 137710 },

  // Arkansas
  { name: "Fayetteville", slug: "fayetteville", state: "arkansas", lat: 36.0626, lng: -94.1574, courthouse: { name: "Washington County Circuit Court", address: "280 N College Ave, Fayetteville, AR 72701", lat: 36.0660, lng: -94.1640, phone: "(479) 444-1538", website: "https://www.arcourts.gov" }, population: 93949 },

  // Mississippi
  { name: "Gulfport", slug: "gulfport", state: "mississippi", lat: 30.3674, lng: -89.0928, courthouse: { name: "Harrison County Courthouse", address: "1801 23rd Ave, Gulfport, MS 39501", lat: 30.3710, lng: -89.0930, phone: "(228) 865-4072", website: "https://www.co.harrison.ms.us/courts" }, population: 72076 },

  // Delaware
  { name: "Dover", slug: "dover", state: "delaware", lat: 39.1582, lng: -75.5244, courthouse: { name: "Kent County Courthouse", address: "38 The Green, Dover, DE 19901", lat: 39.1580, lng: -75.5240, phone: "(302) 735-1900", website: "https://courts.delaware.gov/superior" }, population: 39403 },

  // Hawaii
  { name: "Hilo", slug: "hilo", state: "hawaii", lat: 19.7241, lng: -155.0868, courthouse: { name: "Hilo Circuit Court", address: "777 Kilauea Ave, Hilo, HI 96720", lat: 19.7170, lng: -155.0810, phone: "(808) 961-7470", website: "https://www.courts.state.hi.us" }, population: 46704 },

  // Alaska
  { name: "Fairbanks", slug: "fairbanks", state: "alaska", lat: 64.8378, lng: -147.7164, courthouse: { name: "Fairbanks Superior Court", address: "101 Lacey St, Fairbanks, AK 99701", lat: 64.8400, lng: -147.7210, phone: "(907) 452-9277", website: "https://courts.alaska.gov/main/ctdir-fairbanks.htm" }, population: 32515 },

  // Idaho
  { name: "Nampa", slug: "nampa", state: "idaho", lat: 43.5407, lng: -116.5635, courthouse: { name: "Canyon County Courthouse", address: "1115 Albany St, Caldwell, ID 83605", lat: 43.6630, lng: -116.6870, phone: "(208) 454-7300", website: "https://www.isc.idaho.gov" }, population: 100200 },

  // Montana
  { name: "Missoula", slug: "missoula", state: "montana", lat: 46.8721, lng: -113.9940, courthouse: { name: "Missoula County Courthouse", address: "200 W Broadway, Missoula, MT 59802", lat: 46.8720, lng: -113.9930, phone: "(406) 258-4780", website: "https://www.missoulacounty.us/courts" }, population: 75516 },

  // Kansas
  { name: "Overland Park", slug: "overland-park", state: "kansas", lat: 38.9822, lng: -94.6708, courthouse: { name: "Johnson County Courthouse", address: "100 N Kansas Ave, Olathe, KS 66061", lat: 38.8840, lng: -94.8180, phone: "(913) 715-3300", website: "https://www.jocogov.org/department/district-court" }, population: 197238 },

  // South Dakota
  { name: "Rapid City", slug: "rapid-city", state: "south-dakota", lat: 44.0805, lng: -103.2310, courthouse: { name: "Pennington County Courthouse", address: "315 St. Joseph St, Rapid City, SD 57701", lat: 44.0810, lng: -103.2300, phone: "(605) 394-2575", website: "https://ujs.sd.gov" }, population: 74703 },

  // North Dakota
  { name: "Bismarck", slug: "bismarck", state: "north-dakota", lat: 46.8083, lng: -100.7837, courthouse: { name: "Burleigh County Courthouse", address: "514 E Thayer Ave, Bismarck, ND 58501", lat: 46.8080, lng: -100.7830, phone: "(701) 222-6690", website: "https://www.ndcourts.gov" }, population: 73622 },

  // Vermont
  { name: "Rutland", slug: "rutland", state: "vermont", lat: 43.6106, lng: -72.9726, courthouse: { name: "Rutland Superior Court", address: "83 Center St, Rutland, VT 05701", lat: 43.6100, lng: -72.9720, phone: "(802) 786-5887", website: "https://www.vermontjudiciary.org/courts/rutland" }, population: 15807 },

  // West Virginia
  { name: "Huntington", slug: "huntington", state: "west-virginia", lat: 38.4192, lng: -82.4452, courthouse: { name: "Cabell County Courthouse", address: "750 5th Ave, Huntington, WV 25701", lat: 38.4190, lng: -82.4450, phone: "(304) 526-8625", website: "https://www.courtswv.gov" }, population: 46048 },

  // New Hampshire
  { name: "Nashua", slug: "nashua", state: "new-hampshire", lat: 42.7654, lng: -71.4676, courthouse: { name: "Hillsborough County Superior Court South", address: "30 Spring St, Nashua, NH 03060", lat: 42.7640, lng: -71.4680, phone: "(603) 594-3080", website: "https://www.courts.nh.gov" }, population: 91322 },

  // Maine
  { name: "Bangor", slug: "bangor", state: "maine", lat: 44.8012, lng: -68.7778, courthouse: { name: "Penobscot County Courthouse", address: "97 Hammond St, Bangor, ME 04401", lat: 44.7980, lng: -68.7760, phone: "(207) 561-2300", website: "https://www.courts.maine.gov" }, population: 32029 },

  // Wyoming
  { name: "Casper", slug: "casper", state: "wyoming", lat: 42.8666, lng: -106.3131, courthouse: { name: "Natrona County Courthouse", address: "200 N Center St, Casper, WY 82601", lat: 42.8670, lng: -106.3130, phone: "(307) 235-9244", website: "https://www.courts.state.wy.us" }, population: 58610 },

  // South Carolina
  { name: "Columbia", slug: "columbia", state: "south-carolina", lat: 34.0007, lng: -81.0348, courthouse: { name: "Richland County Courthouse", address: "1701 Main St, Columbia, SC 29201", lat: 34.0050, lng: -81.0340, phone: "(803) 576-1950", website: "https://www.sccourts.org" }, population: 136632 },
  { name: "Greenville", slug: "greenville", state: "south-carolina", lat: 34.8526, lng: -82.3940, courthouse: { name: "Greenville County Courthouse", address: "305 E North St, Greenville, SC 29601", lat: 34.8540, lng: -82.3940, phone: "(864) 467-7175", website: "https://www.sccourts.org" }, population: 72095 },

  // Rhode Island
  { name: "Warwick", slug: "warwick", state: "rhode-island", lat: 41.7001, lng: -71.4162, courthouse: { name: "Kent County Courthouse", address: "222 Quaker Ln, Warwick, RI 02886", lat: 41.6990, lng: -71.4470, phone: "(401) 822-1311", website: "https://www.courts.ri.gov" }, population: 82823 },
];

export function getCitiesByState(stateSlug: string): CityData[] {
  return cityData.filter((c) => c.state === stateSlug);
}

export function getCityBySlug(stateSlug: string, citySlug: string): CityData | undefined {
  return cityData.find((c) => c.state === stateSlug && c.slug === citySlug);
}
