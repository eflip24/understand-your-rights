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
  };
  population?: number;
}

export const cityData: CityData[] = [
  // Priority geo-targeting cities
  { name: "Baton Rouge", slug: "baton-rouge", state: "louisiana", lat: 30.4515, lng: -91.1871, courthouse: { name: "19th Judicial District Court", address: "300 St. Ferdinand St, Baton Rouge, LA 70801", lat: 30.4490, lng: -91.1872 }, population: 227470 },
  { name: "Lafayette", slug: "lafayette", state: "louisiana", lat: 30.2241, lng: -92.0198, courthouse: { name: "Lafayette Parish Courthouse", address: "800 S Buchanan St, Lafayette, LA 70501", lat: 30.2185, lng: -92.0193 }, population: 121374 },
  { name: "Corpus Christi", slug: "corpus-christi", state: "texas", lat: 27.8006, lng: -97.3964, courthouse: { name: "Nueces County Courthouse", address: "901 Leopard St, Corpus Christi, TX 78401", lat: 27.7986, lng: -97.3933 }, population: 317863 },
  { name: "St. Louis", slug: "st-louis", state: "missouri", lat: 38.6270, lng: -90.1994, courthouse: { name: "Civil Courts Building", address: "10 N Tucker Blvd, St. Louis, MO 63101", lat: 38.6322, lng: -90.1944 }, population: 301578 },
  { name: "Providence", slug: "providence", state: "rhode-island", lat: 41.8240, lng: -71.4128, courthouse: { name: "Providence County Superior Court", address: "250 Benefit St, Providence, RI 02903", lat: 41.8270, lng: -71.4094 }, population: 190934 },
  { name: "Provo", slug: "provo", state: "utah", lat: 40.2338, lng: -111.6585, courthouse: { name: "Utah County Justice Court", address: "75 E 80 N, Provo, UT 84601", lat: 40.2360, lng: -111.6585 }, population: 115162 },

  // Top 50 US cities by population
  { name: "New York City", slug: "new-york-city", state: "new-york", lat: 40.7128, lng: -74.0060, courthouse: { name: "New York County Supreme Court", address: "60 Centre St, New York, NY 10007", lat: 40.7143, lng: -74.0018 }, population: 8336817 },
  { name: "Los Angeles", slug: "los-angeles", state: "california", lat: 34.0522, lng: -118.2437, courthouse: { name: "Stanley Mosk Courthouse", address: "111 N Hill St, Los Angeles, CA 90012", lat: 34.0550, lng: -118.2468 }, population: 3979576 },
  { name: "Chicago", slug: "chicago", state: "illinois", lat: 41.8781, lng: -87.6298, courthouse: { name: "Richard J. Daley Center", address: "50 W Washington St, Chicago, IL 60602", lat: 41.8843, lng: -87.6299 }, population: 2693976 },
  { name: "Houston", slug: "houston", state: "texas", lat: 29.7604, lng: -95.3698, courthouse: { name: "Harris County Civil Courthouse", address: "201 Caroline St, Houston, TX 77002", lat: 29.7604, lng: -95.3617 }, population: 2320268 },
  { name: "Phoenix", slug: "phoenix", state: "arizona", lat: 33.4484, lng: -112.0740, courthouse: { name: "Maricopa County Superior Court", address: "201 W Jefferson St, Phoenix, AZ 85003", lat: 33.4472, lng: -112.0766 }, population: 1680992 },
  { name: "Philadelphia", slug: "philadelphia", state: "pennsylvania", lat: 39.9526, lng: -75.1652, courthouse: { name: "Philadelphia City Hall", address: "1401 John F Kennedy Blvd, Philadelphia, PA 19107", lat: 39.9524, lng: -75.1636 }, population: 1603797 },
  { name: "San Antonio", slug: "san-antonio", state: "texas", lat: 29.4241, lng: -98.4936, courthouse: { name: "Bexar County Courthouse", address: "100 Dolorosa St, San Antonio, TX 78205", lat: 29.4228, lng: -98.4934 }, population: 1547253 },
  { name: "San Diego", slug: "san-diego", state: "california", lat: 32.7157, lng: -117.1611, courthouse: { name: "San Diego County Superior Court", address: "330 W Broadway, San Diego, CA 92101", lat: 32.7186, lng: -117.1644 }, population: 1423851 },
  { name: "Dallas", slug: "dallas", state: "texas", lat: 32.7767, lng: -96.7970, courthouse: { name: "George L. Allen Sr. Courts Building", address: "600 Commerce St, Dallas, TX 75202", lat: 32.7792, lng: -96.7992 }, population: 1343573 },
  { name: "San Jose", slug: "san-jose", state: "california", lat: 37.3382, lng: -121.8863, courthouse: { name: "Santa Clara County Superior Court", address: "191 N 1st St, San Jose, CA 95113", lat: 37.3388, lng: -121.8898 }, population: 1021795 },
  { name: "Austin", slug: "austin", state: "texas", lat: 30.2672, lng: -97.7431, courthouse: { name: "Travis County Civil & Family Courts", address: "1700 Guadalupe St, Austin, TX 78701", lat: 30.2753, lng: -97.7440 }, population: 978908 },
  { name: "Jacksonville", slug: "jacksonville", state: "florida", lat: 30.3322, lng: -81.6557, courthouse: { name: "Duval County Courthouse", address: "501 W Adams St, Jacksonville, FL 32202", lat: 30.3282, lng: -81.6608 }, population: 949611 },
  { name: "Fort Worth", slug: "fort-worth", state: "texas", lat: 32.7555, lng: -97.3308, courthouse: { name: "Tarrant County Civil Courts", address: "100 N Calhoun St, Fort Worth, TX 76196", lat: 32.7576, lng: -97.3291 }, population: 918915 },
  { name: "Columbus", slug: "columbus", state: "ohio", lat: 39.9612, lng: -82.9988, courthouse: { name: "Franklin County Court of Common Pleas", address: "345 S High St, Columbus, OH 43215", lat: 39.9576, lng: -82.9990 }, population: 905748 },
  { name: "Charlotte", slug: "charlotte", state: "north-carolina", lat: 35.2271, lng: -80.8431, courthouse: { name: "Mecklenburg County Courthouse", address: "832 E 4th St, Charlotte, NC 28202", lat: 35.2249, lng: -80.8370 }, population: 874579 },
  { name: "Indianapolis", slug: "indianapolis", state: "indiana", lat: 39.7684, lng: -86.1581, courthouse: { name: "Marion County Superior Court", address: "200 E Washington St, Indianapolis, IN 46204", lat: 39.7689, lng: -86.1571 }, population: 887642 },
  { name: "San Francisco", slug: "san-francisco", state: "california", lat: 37.7749, lng: -122.4194, courthouse: { name: "San Francisco Superior Court", address: "400 McAllister St, San Francisco, CA 94102", lat: 37.7797, lng: -122.4168 }, population: 873965 },
  { name: "Seattle", slug: "seattle", state: "washington", lat: 47.6062, lng: -122.3321, courthouse: { name: "King County Superior Court", address: "516 3rd Ave, Seattle, WA 98104", lat: 47.6027, lng: -122.3312 }, population: 737015 },
  { name: "Denver", slug: "denver", state: "colorado", lat: 39.7392, lng: -104.9903, courthouse: { name: "Denver District Court", address: "1437 Bannock St, Denver, CO 80202", lat: 39.7376, lng: -104.9897 }, population: 715522 },
  { name: "Nashville", slug: "nashville", state: "tennessee", lat: 36.1627, lng: -86.7816, courthouse: { name: "Davidson County Courthouse", address: "1 Public Square, Nashville, TN 37201", lat: 36.1632, lng: -86.7773 }, population: 689447 },
  { name: "Oklahoma City", slug: "oklahoma-city", state: "oklahoma", lat: 35.4676, lng: -97.5164, courthouse: { name: "Oklahoma County Courthouse", address: "321 Park Ave, Oklahoma City, OK 73102", lat: 35.4695, lng: -97.5145 }, population: 681054 },
  { name: "El Paso", slug: "el-paso", state: "texas", lat: 31.7619, lng: -106.4850, courthouse: { name: "El Paso County Courthouse", address: "500 E San Antonio Ave, El Paso, TX 79901", lat: 31.7596, lng: -106.4448 }, population: 678815 },
  { name: "Boston", slug: "boston", state: "massachusetts", lat: 42.3601, lng: -71.0589, courthouse: { name: "Suffolk County Superior Court", address: "3 Pemberton Square, Boston, MA 02108", lat: 42.3590, lng: -71.0615 }, population: 675647 },
  { name: "Portland", slug: "portland", state: "oregon", lat: 45.5152, lng: -122.6784, courthouse: { name: "Multnomah County Circuit Court", address: "1021 SW 4th Ave, Portland, OR 97204", lat: 45.5150, lng: -122.6793 }, population: 652503 },
  { name: "Las Vegas", slug: "las-vegas", state: "nevada", lat: 36.1699, lng: -115.1398, courthouse: { name: "Clark County District Court", address: "200 Lewis Ave, Las Vegas, NV 89155", lat: 36.1632, lng: -115.1430 }, population: 641903 },
  { name: "Memphis", slug: "memphis", state: "tennessee", lat: 35.1495, lng: -90.0490, courthouse: { name: "Shelby County Circuit Court", address: "140 Adams Ave, Memphis, TN 38103", lat: 35.1498, lng: -90.0502 }, population: 633104 },
  { name: "Louisville", slug: "louisville", state: "kentucky", lat: 38.2527, lng: -85.7585, courthouse: { name: "Jefferson County Hall of Justice", address: "700 W Jefferson St, Louisville, KY 40202", lat: 38.2557, lng: -85.7589 }, population: 633045 },
  { name: "Baltimore", slug: "baltimore", state: "maryland", lat: 39.2904, lng: -76.6122, courthouse: { name: "Baltimore City Circuit Court", address: "111 N Calvert St, Baltimore, MD 21202", lat: 39.2906, lng: -76.6123 }, population: 585708 },
  { name: "Milwaukee", slug: "milwaukee", state: "wisconsin", lat: 43.0389, lng: -87.9065, courthouse: { name: "Milwaukee County Courthouse", address: "901 N 9th St, Milwaukee, WI 53233", lat: 43.0403, lng: -87.9247 }, population: 577222 },
  { name: "Albuquerque", slug: "albuquerque", state: "new-mexico", lat: 35.0844, lng: -106.6504, courthouse: { name: "Bernalillo County Metropolitan Court", address: "401 Lomas Blvd NW, Albuquerque, NM 87102", lat: 35.0877, lng: -106.6490 }, population: 564559 },
  { name: "Tucson", slug: "tucson", state: "arizona", lat: 32.2226, lng: -110.9747, courthouse: { name: "Pima County Superior Court", address: "110 W Congress St, Tucson, AZ 85701", lat: 32.2222, lng: -110.9716 }, population: 542629 },
  { name: "Fresno", slug: "fresno", state: "california", lat: 36.7378, lng: -119.7871, courthouse: { name: "Fresno County Superior Court", address: "1100 Van Ness Ave, Fresno, CA 93724", lat: 36.7360, lng: -119.7870 }, population: 542107 },
  { name: "Mesa", slug: "mesa", state: "arizona", lat: 33.4152, lng: -111.8315, courthouse: { name: "Mesa Municipal Court", address: "245 W 2nd St, Mesa, AZ 85201", lat: 33.4147, lng: -111.8367 }, population: 504258 },
  { name: "Sacramento", slug: "sacramento", state: "california", lat: 38.5816, lng: -121.4944, courthouse: { name: "Sacramento County Superior Court", address: "720 9th St, Sacramento, CA 95814", lat: 38.5818, lng: -121.4952 }, population: 524943 },
  { name: "Atlanta", slug: "atlanta", state: "georgia", lat: 33.7490, lng: -84.3880, courthouse: { name: "Fulton County Superior Court", address: "136 Pryor St SW, Atlanta, GA 30303", lat: 33.7521, lng: -84.3906 }, population: 498715 },
  { name: "Kansas City", slug: "kansas-city", state: "missouri", lat: 39.0997, lng: -94.5786, courthouse: { name: "Jackson County Courthouse", address: "415 E 12th St, Kansas City, MO 64106", lat: 39.0991, lng: -94.5771 }, population: 508090 },
  { name: "Omaha", slug: "omaha", state: "nebraska", lat: 41.2565, lng: -95.9345, courthouse: { name: "Douglas County Courthouse", address: "1701 Farnam St, Omaha, NE 68183", lat: 41.2561, lng: -95.9345 }, population: 486051 },
  { name: "Miami", slug: "miami", state: "florida", lat: 25.7617, lng: -80.1918, courthouse: { name: "Miami-Dade County Courthouse", address: "73 W Flagler St, Miami, FL 33130", lat: 25.7742, lng: -80.1936 }, population: 442241 },
  { name: "Tampa", slug: "tampa", state: "florida", lat: 27.9506, lng: -82.4572, courthouse: { name: "Hillsborough County Courthouse", address: "800 E Twiggs St, Tampa, FL 33602", lat: 27.9475, lng: -82.4539 }, population: 384959 },
  { name: "New Orleans", slug: "new-orleans", state: "louisiana", lat: 29.9511, lng: -90.0715, courthouse: { name: "Orleans Parish Civil District Court", address: "421 Loyola Ave, New Orleans, LA 70112", lat: 29.9531, lng: -90.0762 }, population: 383997 },
  { name: "Cleveland", slug: "cleveland", state: "ohio", lat: 41.4993, lng: -81.6944, courthouse: { name: "Cuyahoga County Court of Common Pleas", address: "1 W Lakeside Ave, Cleveland, OH 44113", lat: 41.5020, lng: -81.6934 }, population: 372624 },
  { name: "Minneapolis", slug: "minneapolis", state: "minnesota", lat: 44.9778, lng: -93.2650, courthouse: { name: "Hennepin County Government Center", address: "300 S 6th St, Minneapolis, MN 55487", lat: 44.9768, lng: -93.2679 }, population: 429954 },
  { name: "Orlando", slug: "orlando", state: "florida", lat: 28.5383, lng: -81.3792, courthouse: { name: "Orange County Courthouse", address: "425 N Orange Ave, Orlando, FL 32801", lat: 28.5444, lng: -81.3790 }, population: 307573 },
  { name: "Raleigh", slug: "raleigh", state: "north-carolina", lat: 35.7796, lng: -78.6382, courthouse: { name: "Wake County Courthouse", address: "316 Fayetteville St, Raleigh, NC 27601", lat: 35.7784, lng: -78.6382 }, population: 467665 },
  { name: "Detroit", slug: "detroit", state: "michigan", lat: 42.3314, lng: -83.0458, courthouse: { name: "Wayne County Circuit Court", address: "2 Woodward Ave, Detroit, MI 48226", lat: 42.3296, lng: -83.0452 }, population: 639111 },
  { name: "Pittsburgh", slug: "pittsburgh", state: "pennsylvania", lat: 40.4406, lng: -79.9959, courthouse: { name: "Allegheny County Courthouse", address: "436 Grant St, Pittsburgh, PA 15219", lat: 40.4386, lng: -79.9963 }, population: 302971 },
  { name: "Salt Lake City", slug: "salt-lake-city", state: "utah", lat: 40.7608, lng: -111.8910, courthouse: { name: "Scott M. Matheson Courthouse", address: "450 S State St, Salt Lake City, UT 84111", lat: 40.7601, lng: -111.8882 }, population: 200133 },
  { name: "Birmingham", slug: "birmingham", state: "alabama", lat: 33.5207, lng: -86.8025, courthouse: { name: "Jefferson County Courthouse", address: "716 Richard Arrington Jr Blvd N, Birmingham, AL 35203", lat: 33.5183, lng: -86.8090 }, population: 200733 },
  { name: "Richmond", slug: "richmond", state: "virginia", lat: 37.5407, lng: -77.4360, courthouse: { name: "Richmond Circuit Court", address: "400 N 9th St, Richmond, VA 23219", lat: 37.5424, lng: -77.4353 }, population: 226610 },
  { name: "Hartford", slug: "hartford", state: "connecticut", lat: 41.7658, lng: -72.6734, courthouse: { name: "Hartford Superior Court", address: "95 Washington St, Hartford, CT 06106", lat: 41.7642, lng: -72.6778 }, population: 121054 },
  { name: "Des Moines", slug: "des-moines", state: "iowa", lat: 41.5868, lng: -93.6250, courthouse: { name: "Polk County Courthouse", address: "500 Mulberry St, Des Moines, IA 50309", lat: 41.5858, lng: -93.6256 }, population: 214133 },
  { name: "Little Rock", slug: "little-rock", state: "arkansas", lat: 34.7465, lng: -92.2896, courthouse: { name: "Pulaski County Courthouse", address: "401 W Markham St, Little Rock, AR 72201", lat: 34.7480, lng: -92.2820 }, population: 202591 },
  { name: "Jackson", slug: "jackson", state: "mississippi", lat: 32.2988, lng: -90.1848, courthouse: { name: "Hinds County Courthouse", address: "407 E Pascagoula St, Jackson, MS 39201", lat: 32.2984, lng: -90.1833 }, population: 153701 },
  { name: "Wilmington", slug: "wilmington", state: "delaware", lat: 39.7391, lng: -75.5398, courthouse: { name: "New Castle County Courthouse", address: "500 N King St, Wilmington, DE 19801", lat: 39.7433, lng: -75.5487 }, population: 70898 },
  { name: "Honolulu", slug: "honolulu", state: "hawaii", lat: 21.3069, lng: -157.8583, courthouse: { name: "Circuit Court of the First Circuit", address: "777 Punchbowl St, Honolulu, HI 96813", lat: 21.3070, lng: -157.8578 }, population: 350964 },
  { name: "Anchorage", slug: "anchorage", state: "alaska", lat: 61.2181, lng: -149.9003, courthouse: { name: "Nesbett Courthouse", address: "825 W 4th Ave, Anchorage, AK 99501", lat: 61.2172, lng: -149.8961 }, population: 291247 },
  { name: "Boise", slug: "boise", state: "idaho", lat: 43.6150, lng: -116.2023, courthouse: { name: "Ada County Courthouse", address: "200 W Front St, Boise, ID 83702", lat: 43.6161, lng: -116.2035 }, population: 228959 },
  { name: "Billings", slug: "billings", state: "montana", lat: 45.7833, lng: -108.5007, courthouse: { name: "Yellowstone County Courthouse", address: "217 N 27th St, Billings, MT 59101", lat: 45.7832, lng: -108.5078 }, population: 117116 },
  { name: "Wichita", slug: "wichita", state: "kansas", lat: 37.6872, lng: -97.3301, courthouse: { name: "Sedgwick County Courthouse", address: "525 N Main St, Wichita, KS 67203", lat: 37.6928, lng: -97.3368 }, population: 397532 },
  { name: "Sioux Falls", slug: "sioux-falls", state: "south-dakota", lat: 43.5446, lng: -96.7311, courthouse: { name: "Minnehaha County Courthouse", address: "425 N Dakota Ave, Sioux Falls, SD 57104", lat: 43.5490, lng: -96.7268 }, population: 192517 },
  { name: "Fargo", slug: "fargo", state: "north-dakota", lat: 46.8772, lng: -96.7898, courthouse: { name: "Cass County Courthouse", address: "211 9th St S, Fargo, ND 58103", lat: 46.8724, lng: -96.7882 }, population: 125990 },
  { name: "Burlington", slug: "burlington", state: "vermont", lat: 44.4759, lng: -73.2121, courthouse: { name: "Chittenden County Superior Court", address: "175 Main St, Burlington, VT 05401", lat: 44.4776, lng: -73.2133 }, population: 44743 },
  { name: "Charleston", slug: "charleston", state: "west-virginia", lat: 38.3498, lng: -81.6326, courthouse: { name: "Kanawha County Courthouse", address: "111 Court St, Charleston, WV 25301", lat: 38.3509, lng: -81.6349 }, population: 48006 },
  { name: "Manchester", slug: "manchester", state: "new-hampshire", lat: 42.9956, lng: -71.4548, courthouse: { name: "Hillsborough County Superior Court", address: "300 Chestnut St, Manchester, NH 03101", lat: 42.9926, lng: -71.4632 }, population: 115644 },
  { name: "Portland", slug: "portland-me", state: "maine", lat: 43.6591, lng: -70.2568, courthouse: { name: "Cumberland County Courthouse", address: "205 Newbury St, Portland, ME 04101", lat: 43.6547, lng: -70.2596 }, population: 68408 },
  { name: "Cheyenne", slug: "cheyenne", state: "wyoming", lat: 41.1400, lng: -104.8202, courthouse: { name: "Laramie County Courthouse", address: "309 W 20th St, Cheyenne, WY 82001", lat: 41.1388, lng: -104.8207 }, population: 65132 },
  { name: "Charleston", slug: "charleston-sc", state: "south-carolina", lat: 32.7765, lng: -79.9311, courthouse: { name: "Charleston County Courthouse", address: "100 Broad St, Charleston, SC 29401", lat: 32.7764, lng: -79.9310 }, population: 150227 },
  { name: "Virginia Beach", slug: "virginia-beach", state: "virginia", lat: 36.8529, lng: -75.9780, courthouse: { name: "Virginia Beach Circuit Court", address: "2425 Nimmo Pkwy, Virginia Beach, VA 23456", lat: 36.7740, lng: -76.0730 }, population: 459470 },
  { name: "Tulsa", slug: "tulsa", state: "oklahoma", lat: 36.1540, lng: -95.9928, courthouse: { name: "Tulsa County Courthouse", address: "500 S Denver Ave, Tulsa, OK 74103", lat: 36.1495, lng: -95.9933 }, population: 413066 },
  { name: "Lincoln", slug: "lincoln", state: "nebraska", lat: 40.8136, lng: -96.7026, courthouse: { name: "Lancaster County Courthouse", address: "575 S 10th St, Lincoln, NE 68508", lat: 40.8093, lng: -96.7013 }, population: 291082 },
  { name: "Reno", slug: "reno", state: "nevada", lat: 39.5296, lng: -119.8138, courthouse: { name: "Washoe County Courthouse", address: "75 Court St, Reno, NV 89501", lat: 39.5295, lng: -119.8137 }, population: 264165 },
  { name: "Madison", slug: "madison", state: "wisconsin", lat: 43.0731, lng: -89.4012, courthouse: { name: "Dane County Courthouse", address: "215 S Hamilton St, Madison, WI 53703", lat: 43.0723, lng: -89.3840 }, population: 269840 },
];

export function getCitiesByState(stateSlug: string): CityData[] {
  return cityData.filter((c) => c.state === stateSlug);
}

export function getCityBySlug(stateSlug: string, citySlug: string): CityData | undefined {
  return cityData.find((c) => c.state === stateSlug && c.slug === citySlug);
}
