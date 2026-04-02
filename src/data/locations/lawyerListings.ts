export interface LawyerListing {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  practiceAreas: string[];
  description?: string;
}

// Keyed by "stateSlug-citySlug"
export const lawyerListings: Record<string, LawyerListing[]> = {
  // Louisiana
  "louisiana-baton-rouge": [
    { name: "Gordon McKernan Injury Attorneys", address: "5656 Hilton Ave, Baton Rouge, LA 70808", lat: 30.4295, lng: -91.1560, phone: "(225) 888-8888", website: "https://www.gordonmckernan.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "One of Louisiana's largest personal injury firms with decades of experience." },
    { name: "Babcock Injury Lawyers", address: "1755 Nicholson Dr, Baton Rouge, LA 70802", lat: 30.4140, lng: -91.1740, phone: "(225) 926-3636", website: "https://www.babcockinjurylawyers.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Car Accident"], description: "Dedicated personal injury practice serving the greater Baton Rouge area." },
  ],
  "louisiana-lafayette": [
    { name: "Broussard & David", address: "505 W University Ave, Lafayette, LA 70506", lat: 30.2180, lng: -92.0250, phone: "(337) 233-2323", website: "https://www.bdfirm.com", practiceAreas: ["Personal Injury", "Maritime Law", "Car Accident"], description: "Full-service trial firm handling serious injury cases across Acadiana." },
    { name: "Galloway Jefcoat", address: "907 S Hugh Wallis Rd, Lafayette, LA 70508", lat: 30.1950, lng: -92.0050, phone: "(337) 984-8020", website: "https://www.gallowayjefcoat.com", practiceAreas: ["Personal Injury", "Insurance Claims", "Workers' Compensation"], description: "Experienced trial attorneys fighting for injured clients in Lafayette." },
  ],
  // Texas
  "texas-corpus-christi": [
    { name: "Herrman & Herrman", address: "1201 Third St, Corpus Christi, TX 78404", lat: 27.7890, lng: -97.3960, phone: "(361) 882-4357", website: "https://www.herrmanandherrman.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "South Texas personal injury firm with a proven track record." },
    { name: "Thomas J. Henry Law", address: "521 Starr St, Corpus Christi, TX 78401", lat: 27.7950, lng: -97.3930, phone: "(361) 985-0600", website: "https://www.thomasjhenrylaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Product Liability"], description: "Nationally recognized firm with strong roots in Corpus Christi." },
  ],
  "texas-houston": [
    { name: "Abraham Watkins", address: "800 Commerce St, Houston, TX 77002", lat: 29.7610, lng: -95.3610, phone: "(713) 222-7211", website: "https://www.abrahamwatkins.com", practiceAreas: ["Personal Injury", "Car Accident", "Industrial Accidents"], description: "Texas' oldest personal injury firm, serving Houston since 1951." },
    { name: "The Stephens Law Firm", address: "1300 Guadalupe St, Houston, TX 77009", lat: 29.7800, lng: -95.3620, phone: "(713) 629-7900", website: "https://www.stephenslawfirm.com", practiceAreas: ["Truck Accident", "Car Accident", "Personal Injury"], description: "Board-certified trial attorneys handling catastrophic injury cases." },
  ],
  "texas-san-antonio": [
    { name: "Carabin Shaw", address: "630 Broadway St, San Antonio, TX 78215", lat: 29.4350, lng: -98.4880, phone: "(210) 222-2288", website: "https://www.carabinshaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Decades of experience representing injured clients in San Antonio." },
    { name: "Maloney & Campolo", address: "926 Chulie Dr, San Antonio, TX 78216", lat: 29.5070, lng: -98.4890, phone: "(210) 361-7311", website: "https://www.maloneycampolo.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Client-focused injury firm with strong trial experience." },
  ],
  "texas-dallas": [
    { name: "Thompson Law", address: "3300 Oak Lawn Ave, Dallas, TX 75219", lat: 32.8090, lng: -96.8040, phone: "(844) 308-8180", website: "https://www.thompson-law.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Award-winning Dallas injury firm with no upfront fees." },
    { name: "Rasansky Law Firm", address: "2525 McKinnon St, Dallas, TX 75201", lat: 32.7920, lng: -96.8010, phone: "(214) 651-6100", website: "https://www.jrlawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Top-rated Dallas personal injury attorneys since 1992." },
  ],
  "texas-austin": [
    { name: "FVF Law", address: "3600 N Capital of TX Hwy, Austin, TX 78746", lat: 30.3430, lng: -97.7970, phone: "(512) 640-2146", website: "https://www.fvflawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Insurance Claims"], description: "Austin personal injury firm focused on client-first advocacy." },
    { name: "Loewy Law Firm", address: "901 S Mopac Expy, Austin, TX 78746", lat: 30.2580, lng: -97.7960, phone: "(512) 280-0800", website: "https://www.adamloewy.com", practiceAreas: ["Personal Injury", "Truck Accident", "Wrongful Death"], description: "Board-certified personal injury trial lawyer in Austin." },
  ],
  "texas-fort-worth": [
    { name: "Anderson Injury Lawyers", address: "819 Taylor St, Fort Worth, TX 76102", lat: 32.7540, lng: -97.3320, phone: "(817) 294-1900", website: "https://www.andersoninjurylawyers.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Fort Worth injury attorneys with a strong litigation track record." },
    { name: "Varghese Summersett", address: "307 W 7th St, Fort Worth, TX 76102", lat: 32.7535, lng: -97.3300, phone: "(817) 203-2220", website: "https://www.versustexas.com", practiceAreas: ["Criminal Defense", "Personal Injury", "DWI"], description: "Full-service law firm with a reputation for aggressive defense." },
  ],
  "texas-el-paso": [
    { name: "Gonzalez Law Group", address: "301 E Main Dr, El Paso, TX 79901", lat: 31.7600, lng: -106.4450, phone: "(915) 585-2266", website: "https://www.gonzalezlawgroup.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "El Paso injury firm dedicated to fighting for fair compensation." },
    { name: "Ruhmann Law Firm", address: "127 Pioneer Plaza, El Paso, TX 79901", lat: 31.7590, lng: -106.4440, phone: "(915) 533-0500", website: "https://www.ruhmannlaw.com", practiceAreas: ["Personal Injury", "Truck Accident", "Product Liability"], description: "Experienced trial attorneys serving the El Paso community." },
  ],
  // Missouri
  "missouri-st-louis": [
    { name: "The Simon Law Firm", address: "800 Market St, St. Louis, MO 63101", lat: 38.6275, lng: -90.1917, phone: "(314) 241-2929", website: "https://www.simonlawpc.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Premier St. Louis trial firm handling complex injury litigation." },
    { name: "Brown & Crouppen", address: "211 N Broadway, St. Louis, MO 63102", lat: 38.6310, lng: -90.1890, phone: "(314) 222-2222", website: "https://www.getbc.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "One of Missouri's most recognized personal injury law firms." },
  ],
  "missouri-kansas-city": [
    { name: "Dollar Burns & Becker", address: "1100 Main St, Kansas City, MO 64105", lat: 39.1020, lng: -94.5820, phone: "(816) 876-2600", website: "https://www.dollar-law.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Kansas City trial lawyers focused on maximizing client recovery." },
    { name: "Wendt Law Firm", address: "4600 Madison Ave, Kansas City, MO 64112", lat: 39.0470, lng: -94.5880, phone: "(816) 531-2900", website: "https://www.wendtlawfirm.com", practiceAreas: ["Personal Injury", "Truck Accident", "Wrongful Death"], description: "Experienced Kansas City personal injury attorneys." },
  ],
  // Rhode Island
  "rhode-island-providence": [
    { name: "Slepkow Slepkow & Associates", address: "670 N Main St, Providence, RI 02904", lat: 41.8340, lng: -71.4130, phone: "(401) 437-1100", website: "https://www.slepkowlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "Rhode Island personal injury firm with over 80 years of experience." },
    { name: "Marasco & Nesselbush", address: "685 Westminster St, Providence, RI 02903", lat: 41.8210, lng: -71.4220, phone: "(401) 274-7400", website: "https://www.m-n-law.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Social Security Disability"], description: "Full-service injury law firm serving all of Rhode Island." },
  ],
  // Utah
  "utah-provo": [
    { name: "Craig Swapp & Associates", address: "3269 N University Ave, Provo, UT 84604", lat: 40.2620, lng: -111.6570, phone: "(801) 375-1112", website: "https://www.craigswapp.com", practiceAreas: ["Personal Injury", "Car Accident", "Dog Bite"], description: "Utah personal injury attorneys with multiple state locations." },
    { name: "Howard Lewis & Petersen", address: "120 E 300 N, Provo, UT 84606", lat: 40.2380, lng: -111.6560, phone: "(801) 373-6345", website: "https://www.hlplawfirm.com", practiceAreas: ["Personal Injury", "Employment Law", "Business Litigation"], description: "Full-service Provo law firm with a strong community presence." },
  ],
  "utah-salt-lake-city": [
    { name: "Siegfried & Jensen", address: "5664 S Green St, Salt Lake City, UT 84123", lat: 40.6660, lng: -111.8960, phone: "(801) 845-9000", website: "https://www.siegfriedandjensen.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "One of Utah's largest personal injury practices." },
    { name: "Robert J. DeBry & Associates", address: "4252 S 700 E, Salt Lake City, UT 84107", lat: 40.6910, lng: -111.8720, phone: "(801) 888-8888", website: "https://www.robertdebry.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Utah's longest-running personal injury firm." },
  ],
  // New York
  "new-york-new-york-city": [
    { name: "Morgan & Morgan", address: "28 Liberty St, New York, NY 10005", lat: 40.7092, lng: -74.0095, phone: "(212) 564-4568", website: "https://www.forthepeople.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "America's largest injury law firm with a major New York presence." },
    { name: "Cellino Law", address: "420 Lexington Ave, New York, NY 10170", lat: 40.7527, lng: -73.9762, phone: "(800) 555-5555", website: "https://www.cellinolaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Well-known New York personal injury attorneys." },
    { name: "Block O'Toole & Murphy", address: "132 Nassau St, New York, NY 10038", lat: 40.7104, lng: -74.0055, phone: "(212) 736-5300", website: "https://www.blockotoole.com", practiceAreas: ["Construction Accident", "Personal Injury", "Wrongful Death"], description: "Award-winning NYC trial firm specializing in construction injuries." },
  ],
  // California
  "california-los-angeles": [
    { name: "Panish | Shea | Ravipudi", address: "11111 Santa Monica Blvd, Los Angeles, CA 90025", lat: 34.0430, lng: -118.4530, phone: "(310) 477-1700", website: "https://www.psblaw.com", practiceAreas: ["Personal Injury", "Wrongful Death", "Product Liability"], description: "Top-ranked Los Angeles trial attorneys handling catastrophic injury cases." },
    { name: "The Barnes Firm", address: "633 W 5th St, Los Angeles, CA 90071", lat: 34.0510, lng: -118.2550, phone: "(800) 800-0000", website: "https://www.thebarnesfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Nationally recognized injury firm with deep LA roots." },
  ],
  "california-san-diego": [
    { name: "CaseyGerry", address: "110 Laurel St, San Diego, CA 92101", lat: 32.7230, lng: -117.1690, phone: "(619) 238-1811", website: "https://www.caseygerry.com", practiceAreas: ["Personal Injury", "Product Liability", "Aviation Accidents"], description: "San Diego's premier trial firm since 1947." },
    { name: "Gomez Trial Attorneys", address: "655 W Broadway, San Diego, CA 92101", lat: 32.7150, lng: -117.1660, phone: "(619) 237-3490", website: "https://www.gomeztriallawyers.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Award-winning San Diego trial attorneys." },
  ],
  "california-san-jose": [
    { name: "Bohn & Fletcher", address: "777 N 1st St, San Jose, CA 95112", lat: 37.3480, lng: -121.8940, phone: "(408) 279-4222", website: "https://www.bohnfletcher.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "San Jose personal injury attorneys with decades of trial experience." },
    { name: "Corsiglia McMahon & Allard", address: "96 N 3rd St, San Jose, CA 95112", lat: 37.3390, lng: -121.8920, phone: "(408) 289-1417", website: "https://www.cabornelaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Leading Silicon Valley personal injury trial lawyers." },
  ],
  "california-san-francisco": [
    { name: "Dolan Law Firm", address: "1438 Market St, San Francisco, CA 94102", lat: 37.7755, lng: -122.4190, phone: "(415) 421-2800", website: "https://www.dolanlawfirm.com", practiceAreas: ["Personal Injury", "Employment Law", "Car Accident"], description: "Top-rated San Francisco personal injury and employment law firm." },
    { name: "Walkup Melodia Kelly & Schoenberger", address: "650 California St, San Francisco, CA 94108", lat: 37.7926, lng: -122.4064, phone: "(415) 981-7210", website: "https://www.walkuplawoffice.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Premier San Francisco trial firm with a national reputation." },
  ],
  "california-fresno": [
    { name: "Chain Cohn Clark", address: "1430 Truxtun Ave, Fresno, CA 93721", lat: 36.7400, lng: -119.7850, phone: "(559) 233-4800", website: "https://www.chaincohnclark.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Car Accident"], description: "Central Valley personal injury firm with decades of service." },
    { name: "Tomassian Pimentel & Shapazian", address: "7522 N Colonial Ave, Fresno, CA 93711", lat: 36.8210, lng: -119.8020, phone: "(559) 277-7300", website: "https://www.tpslawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Fresno trial attorneys focused on serious injury cases." },
  ],
  "california-sacramento": [
    { name: "Demas Law Group", address: "3232 Ramos Cir, Sacramento, CA 95827", lat: 38.5650, lng: -121.4190, phone: "(916) 444-0100", website: "https://www.dabornelaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Bicycle Accident"], description: "Sacramento personal injury attorneys advocating for accident victims." },
    { name: "Arnold Law Firm", address: "865 Howe Ave, Sacramento, CA 95825", lat: 38.5720, lng: -121.4080, phone: "(916) 777-7777", website: "https://www.arnoldlawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Experienced Sacramento trial lawyers fighting for justice." },
  ],
  // Illinois
  "illinois-chicago": [
    { name: "Salvi Schostok & Pritchard", address: "55 W Monroe St, Chicago, IL 60603", lat: 41.8809, lng: -87.6298, phone: "(312) 372-1227", website: "https://www.salvilaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Car Accident"], description: "Premier Chicago trial firm with record-setting verdicts." },
    { name: "Clifford Law Offices", address: "120 N LaSalle St, Chicago, IL 60602", lat: 41.8827, lng: -87.6324, phone: "(312) 899-9090", website: "https://www.cliffordlaw.com", practiceAreas: ["Personal Injury", "Aviation Accidents", "Wrongful Death"], description: "Nationally recognized Chicago trial firm." },
  ],
  // Arizona
  "arizona-phoenix": [
    { name: "Breyer Law Offices", address: "3840 E Ray Rd, Phoenix, AZ 85044", lat: 33.3690, lng: -111.9780, phone: "(602) 267-1280", website: "https://www.breyerlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Phoenix personal injury lawyers with a focus on auto accidents." },
    { name: "Knapp & Roberts", address: "8777 N Gainey Center Dr, Scottsdale, AZ 85258", lat: 33.5480, lng: -111.9260, phone: "(480) 991-7677", website: "https://www.knappandroberts.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Board-certified injury specialists in the Phoenix metro." },
  ],
  "arizona-tucson": [
    { name: "Grabb & Durando", address: "2400 N Tucson Blvd, Tucson, AZ 85716", lat: 32.2520, lng: -110.9410, phone: "(520) 616-1000", website: "https://www.grabbanddurando.com", practiceAreas: ["Personal Injury", "Car Accident", "Motorcycle Accident"], description: "Tucson injury firm known for compassionate, aggressive representation." },
    { name: "Benavidez Law Group", address: "177 N Church Ave, Tucson, AZ 85701", lat: 32.2240, lng: -110.9740, phone: "(520) 623-4300", website: "https://www.benavidezlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Tucson attorneys dedicated to protecting injury victims' rights." },
  ],
  "arizona-mesa": [
    { name: "Sargon Law Group", address: "1 E Washington St, Mesa, AZ 85201", lat: 33.4160, lng: -111.8350, phone: "(623) 300-2727", website: "https://www.sargonlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "Mesa personal injury attorneys providing free consultations." },
    { name: "Hastings & Hastings", address: "1846 E Innovation Park Dr, Mesa, AZ 85201", lat: 33.4140, lng: -111.8280, phone: "(480) 706-1100", website: "https://www.hastingsandhastings.com", practiceAreas: ["Personal Injury", "Car Accident", "Dog Bite"], description: "Arizona's discount injury attorneys serving the East Valley." },
  ],
  // Pennsylvania
  "pennsylvania-philadelphia": [
    { name: "Kline & Specter", address: "1525 Locust St, Philadelphia, PA 19102", lat: 39.9475, lng: -75.1670, phone: "(215) 772-1000", website: "https://www.klinespecter.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Philadelphia's powerhouse trial firm with record verdicts." },
    { name: "Ross Feller Casey", address: "1845 Walnut St, Philadelphia, PA 19103", lat: 39.9505, lng: -75.1728, phone: "(215) 525-9745", website: "https://www.rossfellercasey.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Award-winning Philadelphia personal injury attorneys." },
  ],
  "pennsylvania-pittsburgh": [
    { name: "Edgar Snyder & Associates", address: "1 PPG Pl, Pittsburgh, PA 15222", lat: 40.4411, lng: -80.0022, phone: "(412) 394-1000", website: "https://www.edgarsnyder.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "One of western Pennsylvania's most recognized injury firms." },
    { name: "Berger & Green", address: "310 Grant St, Pittsburgh, PA 15219", lat: 40.4382, lng: -79.9958, phone: "(412) 661-1400", website: "https://www.bergerandgreen.com", practiceAreas: ["Personal Injury", "Slip and Fall", "Medical Malpractice"], description: "Pittsburgh injury attorneys with a client-first approach." },
  ],
  // Florida
  "florida-jacksonville": [
    { name: "Harrell & Harrell", address: "4735 Yachtsman Ct, Jacksonville, FL 32225", lat: 30.3600, lng: -81.5430, phone: "(904) 251-1111", website: "https://www.hhrlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Northeast Florida's trusted personal injury firm." },
    { name: "Edwards & Ragatz", address: "501 Riverside Ave, Jacksonville, FL 32202", lat: 30.3230, lng: -81.6640, phone: "(904) 399-1609", website: "https://www.edwardsragatz.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Jacksonville trial lawyers with a history of significant verdicts." },
  ],
  "florida-miami": [
    { name: "Steinger Greene & Feiner", address: "801 Brickell Ave, Miami, FL 33131", lat: 25.7660, lng: -80.1900, phone: "(305) 615-2403", website: "https://www.injurylawyers.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "South Florida's premier personal injury law firm." },
    { name: "The Perazzo Law Firm", address: "17070 Collins Ave, Miami, FL 33160", lat: 25.9450, lng: -80.1230, phone: "(786) 529-7411", website: "https://www.perazzolaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Bilingual injury attorneys serving the Miami-Dade community." },
  ],
  "florida-tampa": [
    { name: "Catania & Catania", address: "363 Harbour Pointe Way, Tampa, FL 33602", lat: 27.9520, lng: -82.4500, phone: "(813) 222-8545", website: "https://www.catanialaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Tampa Bay trial attorneys with decades of courtroom experience." },
    { name: "Hancock Injury Attorneys", address: "4019 W Spruce St, Tampa, FL 33607", lat: 27.9460, lng: -82.4950, phone: "(813) 915-1110", website: "https://www.hancockinjuryattorneys.com", practiceAreas: ["Personal Injury", "Car Accident", "Motorcycle Accident"], description: "Aggressive Tampa injury attorneys fighting for maximum recovery." },
  ],
  "florida-orlando": [
    { name: "Morgan & Morgan", address: "20 N Orange Ave, Orlando, FL 32801", lat: 28.5410, lng: -81.3790, phone: "(407) 420-1414", website: "https://www.forthepeople.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Headquarters of America's largest personal injury firm." },
    { name: "The Umansky Law Firm", address: "1945 E Michigan St, Orlando, FL 32806", lat: 28.5310, lng: -81.3640, phone: "(407) 228-3838", website: "https://www.thelawman.net", practiceAreas: ["Criminal Defense", "Personal Injury", "DUI"], description: "Orlando criminal defense and personal injury attorneys." },
  ],
  // Ohio
  "ohio-columbus": [
    { name: "Schottenstein Zox & Dunn", address: "250 W St, Columbus, OH 43215", lat: 39.9600, lng: -83.0020, phone: "(614) 462-2700", website: "https://www.szd.com", practiceAreas: ["Personal Injury", "Business Litigation", "Employment Law"], description: "Full-service Columbus law firm with experienced trial counsel." },
    { name: "Tyack Law Firm", address: "536 S High St, Columbus, OH 43215", lat: 39.9530, lng: -82.9990, phone: "(614) 221-1341", website: "https://www.tyacklaw.com", practiceAreas: ["Personal Injury", "Criminal Defense", "Family Law"], description: "Longstanding Columbus firm with deep community ties." },
  ],
  "ohio-cleveland": [
    { name: "Landskroner Grieco Merriman", address: "1360 W 9th St, Cleveland, OH 44113", lat: 41.4970, lng: -81.6970, phone: "(216) 522-9000", website: "https://www.lgmlawyers.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Top Cleveland trial firm achieving record verdicts for clients." },
    { name: "Spangenberg Shibley & Liber", address: "1001 Lakeside Ave E, Cleveland, OH 44114", lat: 41.5050, lng: -81.6900, phone: "(216) 696-3232", website: "https://www.spanglaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "One of Ohio's most respected trial law firms." },
  ],
  // North Carolina
  "north-carolina-charlotte": [
    { name: "Rosensteel Fleishman", address: "132 N McDowell St, Charlotte, NC 28204", lat: 35.2260, lng: -80.8370, phone: "(704) 714-1450", website: "https://www.rflaw.net", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Charlotte injury attorneys with a reputation for results." },
    { name: "DeMayo Law Offices", address: "1211 E Morehead St, Charlotte, NC 28204", lat: 35.2170, lng: -80.8320, phone: "(704) 343-4100", website: "https://www.demayolaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "One of Charlotte's largest personal injury practices." },
  ],
  "north-carolina-raleigh": [
    { name: "Whitley Law Firm", address: "3301 Benson Dr, Raleigh, NC 27609", lat: 35.8110, lng: -78.6320, phone: "(919) 785-5000", website: "https://www.whitleylawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Raleigh personal injury firm with a client-first philosophy." },
    { name: "Zahra & Zahra Law Firm", address: "5540 Centerview Dr, Raleigh, NC 27606", lat: 35.7780, lng: -78.7120, phone: "(919) 480-7355", website: "https://www.zahralawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Experienced Raleigh attorneys dedicated to injury victims." },
  ],
  // Indiana
  "indiana-indianapolis": [
    { name: "Isaacs & Isaacs", address: "201 N Illinois St, Indianapolis, IN 46204", lat: 39.7710, lng: -86.1580, phone: "(317) 672-0888", website: "https://www.isaacsandisaacs.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Major Midwest personal injury firm with Indianapolis offices." },
    { name: "Wilson Kehoe Winingham", address: "2859 N Meridian St, Indianapolis, IN 46208", lat: 39.7940, lng: -86.1570, phone: "(317) 920-6400", website: "https://www.wkw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Indianapolis trial lawyers handling complex injury cases." },
  ],
  // Washington
  "washington-seattle": [
    { name: "Davis Law Group", address: "2101 4th Ave, Seattle, WA 98121", lat: 47.6150, lng: -122.3410, phone: "(206) 727-4000", website: "https://www.injurytriallawyer.com", practiceAreas: ["Personal Injury", "Car Accident", "Bicycle Accident"], description: "Award-winning Seattle personal injury trial attorneys." },
    { name: "Wiener & Lambka", address: "1000 2nd Ave, Seattle, WA 98104", lat: 47.6050, lng: -122.3340, phone: "(206) 388-4276", website: "https://www.wl-attorneys.com", practiceAreas: ["Personal Injury", "Car Accident", "Pedestrian Accident"], description: "Seattle injury lawyers focused on maximum client recovery." },
  ],
  // Colorado
  "colorado-denver": [
    { name: "Zaner Harden Law", address: "1610 Wynkoop St, Denver, CO 80202", lat: 39.7540, lng: -104.9998, phone: "(720) 613-9706", website: "https://www.zanerhardenlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Denver injury attorneys known for personalized case attention." },
    { name: "Fuicelli & Lee", address: "1731 Gilpin St, Denver, CO 80218", lat: 39.7440, lng: -104.9650, phone: "(303) 355-7202", website: "https://www.coloradoinjurylaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Top-rated Denver personal injury law firm." },
  ],
  // Tennessee
  "tennessee-nashville": [
    { name: "Rocky McElhaney Law Firm", address: "414 Union St, Nashville, TN 37219", lat: 36.1640, lng: -86.7800, phone: "(615) 246-5549", website: "https://www.rockylawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Nashville's 'Rocky' — aggressive injury representation." },
    { name: "The Law Offices of John Day", address: "425 W Main St, Nashville, TN 37206", lat: 36.1620, lng: -86.7750, phone: "(615) 742-4880", website: "https://www.johndaylegal.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Board-certified Nashville trial attorneys." },
  ],
  "tennessee-memphis": [
    { name: "Bailey & Greer", address: "1880 Union Ave, Memphis, TN 38104", lat: 35.1530, lng: -90.0190, phone: "(901) 680-9777", website: "https://www.baileygreer.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Memphis trial lawyers dedicated to justice for injury victims." },
    { name: "Reaves Law Firm", address: "6060 Primacy Pkwy, Memphis, TN 38119", lat: 35.0980, lng: -89.8970, phone: "(901) 209-9500", website: "https://www.reabornelaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Experienced Memphis attorneys handling all types of injury claims." },
  ],
  // Oklahoma
  "oklahoma-oklahoma-city": [
    { name: "Abel Law Firm", address: "695 S Cincinnati Ave, Oklahoma City, OK 73109", lat: 35.4490, lng: -97.5120, phone: "(405) 239-7046", website: "https://www.abellaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Oklahoma City trial firm with significant verdict history." },
    { name: "Carr & Carr Attorneys", address: "10441 S Reno Ave, Oklahoma City, OK 73173", lat: 35.3750, lng: -97.5680, phone: "(405) 691-7575", website: "https://www.carrandcarr.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Oklahoma's injury attorneys with over 40 years of experience." },
  ],
  "oklahoma-tulsa": [
    { name: "Gorospe & Smith", address: "1507 S Boulder Ave, Tulsa, OK 74119", lat: 36.1460, lng: -95.9930, phone: "(918) 582-7775", website: "https://www.gorospeandsmith.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Tulsa trial attorneys committed to fighting for injury victims." },
    { name: "Richardson Richardson Boudreaux", address: "5801 E 41st St, Tulsa, OK 74135", lat: 36.1150, lng: -95.9270, phone: "(918) 492-7674", website: "https://www.rrbok.com", practiceAreas: ["Personal Injury", "Truck Accident", "Oil Field Accidents"], description: "Tulsa firm specializing in catastrophic injury litigation." },
  ],
  // Massachusetts
  "massachusetts-boston": [
    { name: "Sweeney Merrigan Law", address: "268 Summer St, Boston, MA 02210", lat: 42.3510, lng: -71.0570, phone: "(617) 391-9001", website: "https://www.sweeneymerrigan.com", practiceAreas: ["Personal Injury", "Car Accident", "Construction Accident"], description: "Boston trial attorneys focused on serious injury claims." },
    { name: "Finkelstein & Partners", address: "1 Beacon St, Boston, MA 02108", lat: 42.3585, lng: -71.0620, phone: "(617) 580-3144", website: "https://www.lawampm.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "Experienced Boston personal injury lawyers with a strong track record." },
  ],
  // Oregon
  "oregon-portland": [
    { name: "Rizk Law", address: "5800 Meadows Rd, Lake Oswego, OR 97035", lat: 45.4120, lng: -122.7230, phone: "(503) 245-5677", website: "https://www.rizk-law.com", practiceAreas: ["Personal Injury", "Car Accident", "Bicycle Accident"], description: "Portland-area injury firm focused on advocacy and results." },
    { name: "Paulson Coletti Trial Attorneys", address: "1022 NW Marshall St, Portland, OR 97209", lat: 45.5300, lng: -122.6870, phone: "(503) 226-6361", website: "https://www.paulsoncoletti.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Oregon's award-winning trial attorneys." },
  ],
  // Nevada
  "nevada-las-vegas": [
    { name: "Richard Harris Personal Injury Law Firm", address: "801 S 4th St, Las Vegas, NV 89101", lat: 36.1640, lng: -115.1470, phone: "(702) 444-4444", website: "https://www.richardharrislaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Las Vegas' most recognized personal injury law firm." },
    { name: "Benson & Bingham", address: "11441 Allerton Park Dr, Las Vegas, NV 89135", lat: 36.1560, lng: -115.3350, phone: "(702) 382-9797", website: "https://www.bensonbingham.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Top-rated Las Vegas injury attorneys." },
  ],
  "nevada-reno": [
    { name: "Viloria Oliphant Oster & Aman", address: "38 S Arlington Ave, Reno, NV 89501", lat: 39.5280, lng: -119.8160, phone: "(775) 227-2280", website: "https://www.viloria.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Reno trial attorneys known for aggressive client advocacy." },
    { name: "Matt Dion & Associates", address: "380 Galletti Way, Reno, NV 89512", lat: 39.5410, lng: -119.7950, phone: "(775) 737-4500", website: "https://www.mattdionlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Experienced Reno personal injury lawyers." },
  ],
  // Kentucky
  "kentucky-louisville": [
    { name: "Dolt Thompson Shepherd & Conway", address: "101 N 7th St, Louisville, KY 40202", lat: 38.2560, lng: -85.7520, phone: "(502) 244-7772", website: "https://www.doltthompson.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Louisville trial firm with significant jury verdict experience." },
    { name: "Sam Aguiar Injury Lawyers", address: "1781 Bardstown Rd, Louisville, KY 40205", lat: 38.2350, lng: -85.7160, phone: "(502) 888-8888", website: "https://www.samisyourlawyer.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Louisville injury attorney known for client-focused representation." },
  ],
  // Maryland
  "maryland-baltimore": [
    { name: "Miller & Zois", address: "1 South St, Baltimore, MD 21202", lat: 39.2890, lng: -76.6130, phone: "(410) 779-4600", website: "https://www.millerandzois.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Baltimore personal injury lawyers with a data-driven approach." },
    { name: "Rice Murtha & Psoras", address: "120 E Baltimore St, Baltimore, MD 21202", lat: 39.2900, lng: -76.6100, phone: "(410) 694-7291", website: "https://www.ricemurtha.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Experienced Baltimore trial attorneys." },
  ],
  // Wisconsin
  "wisconsin-milwaukee": [
    { name: "Habush Habush & Rottier", address: "777 E Wisconsin Ave, Milwaukee, WI 53202", lat: 43.0395, lng: -87.9070, phone: "(414) 271-0900", website: "https://www.habush.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Wisconsin's largest personal injury law firm." },
    { name: "Hupy and Abraham", address: "111 E Wisconsin Ave, Milwaukee, WI 53202", lat: 43.0399, lng: -87.9085, phone: "(414) 223-4800", website: "https://www.hupy.com", practiceAreas: ["Personal Injury", "Car Accident", "Motorcycle Accident"], description: "Well-known Milwaukee injury firm serving all of Wisconsin." },
  ],
  "wisconsin-madison": [
    { name: "Habush Habush & Rottier", address: "44 E Mifflin St, Madison, WI 53703", lat: 43.0745, lng: -89.3820, phone: "(608) 255-6663", website: "https://www.habush.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Wisconsin's largest personal injury firm with a Madison office." },
    { name: "Eisenberg Law Offices", address: "308 E Washington Ave, Madison, WI 53703", lat: 43.0770, lng: -89.3800, phone: "(608) 256-8356", website: "https://www.eisenberglaw.org", practiceAreas: ["Personal Injury", "Criminal Defense", "Family Law"], description: "Trusted Madison attorneys with a broad practice." },
  ],
  // New Mexico
  "new-mexico-albuquerque": [
    { name: "Parnall Law Firm", address: "2025 San Pedro Dr NE, Albuquerque, NM 87110", lat: 35.1010, lng: -106.5910, phone: "(505) 268-6500", website: "https://www.hurtcallbert.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Albuquerque injury attorneys with aggressive trial skills." },
    { name: "Fine Law Firm", address: "1111 Lomas Blvd NW, Albuquerque, NM 87102", lat: 35.0890, lng: -106.6540, phone: "(505) 243-4541", website: "https://www.finelawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "New Mexico's experienced injury and workers' comp attorneys." },
  ],
  // Georgia
  "georgia-atlanta": [
    { name: "Bader Scott Injury Lawyers", address: "1230 Peachtree St NE, Atlanta, GA 30309", lat: 33.7870, lng: -84.3840, phone: "(404) 888-8888", website: "https://www.baderscott.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Atlanta personal injury firm handling cases across Georgia." },
    { name: "The Millar Law Firm", address: "101 Marietta St NW, Atlanta, GA 30303", lat: 33.7570, lng: -84.3930, phone: "(770) 400-0000", website: "https://www.millarlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Experienced Atlanta trial lawyers fighting for fair settlements." },
  ],
  // Nebraska
  "nebraska-omaha": [
    { name: "Hauptman O'Brien Wolf & Lathrop", address: "1005 Farnam St, Omaha, NE 68102", lat: 41.2565, lng: -95.9340, phone: "(402) 390-9000", website: "https://www.hauptman.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Workers' Compensation"], description: "Omaha's premier personal injury law firm." },
    { name: "Friedman Law Offices", address: "8720 Frederick St, Omaha, NE 68124", lat: 41.2340, lng: -96.0150, phone: "(402) 391-1400", website: "https://www.friedmanlawomaha.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "Experienced Omaha trial attorneys." },
  ],
  "nebraska-lincoln": [
    { name: "Roper Jorgensen", address: "7941 O St, Lincoln, NE 68510", lat: 40.8050, lng: -96.6240, phone: "(402) 476-7600", website: "https://www.roperjorgensen.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Lincoln trial lawyers with years of injury case experience." },
    { name: "Berry Law Firm", address: "6940 O St, Lincoln, NE 68510", lat: 40.8050, lng: -96.6350, phone: "(402) 466-8444", website: "https://www.berrylaw.com", practiceAreas: ["Criminal Defense", "Personal Injury", "Veterans' Law"], description: "Lincoln law firm with a veteran-focused practice." },
  ],
  // Louisiana (additional)
  "louisiana-new-orleans": [
    { name: "Morris Bart", address: "909 Poydras St, New Orleans, LA 70112", lat: 29.9490, lng: -90.0730, phone: "(504) 525-8000", website: "https://www.morrisbart.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "One of Louisiana's best-known personal injury law firms." },
    { name: "Cueria Law Firm", address: "700 Camp St, New Orleans, LA 70130", lat: 29.9460, lng: -90.0700, phone: "(504) 525-5211", website: "https://www.cuerialaw.com", practiceAreas: ["Personal Injury", "Maritime Law", "Car Accident"], description: "New Orleans firm specializing in injury and maritime cases." },
  ],
  // Minnesota
  "minnesota-minneapolis": [
    { name: "Robins Kaplan", address: "800 LaSalle Ave, Minneapolis, MN 55402", lat: 44.9750, lng: -93.2710, phone: "(612) 349-8500", website: "https://www.robinskaplan.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Business Litigation"], description: "National powerhouse trial firm headquartered in Minneapolis." },
    { name: "SiebenCarey", address: "225 S 6th St, Minneapolis, MN 55402", lat: 44.9770, lng: -93.2690, phone: "(612) 333-4500", website: "https://www.knowyourrights.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Minnesota's largest personal injury law firm." },
  ],
  // Michigan
  "michigan-detroit": [
    { name: "Fieger Law", address: "19390 W 10 Mile Rd, Southfield, MI 48075", lat: 42.4750, lng: -83.2680, phone: "(248) 355-5555", website: "https://www.fiegerlaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Michigan's most prominent personal injury law firm." },
    { name: "Mike Morse Injury Law Firm", address: "24901 Northwestern Hwy, Southfield, MI 48075", lat: 42.4860, lng: -83.2430, phone: "(855) 645-3946", website: "https://www.855mikewins.com", practiceAreas: ["Personal Injury", "Car Accident", "Dog Bite"], description: "Detroit-area firm known for aggressive injury representation." },
  ],
  // Virginia
  "virginia-richmond": [
    { name: "Allen Allen Allen & Allen", address: "1809 Staples Mill Rd, Richmond, VA 23230", lat: 37.5870, lng: -77.4800, phone: "(804) 353-1200", website: "https://www.allenandallen.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Virginia's premier personal injury law firm since 1910." },
    { name: "Marks & Harrison", address: "1500 Forest Ave, Richmond, VA 23229", lat: 37.5750, lng: -77.5020, phone: "(804) 282-0999", website: "https://www.marksandharrison.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Richmond attorneys with deep Virginia roots." },
  ],
  "virginia-virginia-beach": [
    { name: "Rutter Mills", address: "160 W Brambleton Ave, Norfolk, VA 23510", lat: 36.8580, lng: -76.2920, phone: "(757) 622-5000", website: "https://www.ruttermills.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Hampton Roads injury firm serving Virginia Beach and surrounding areas." },
    { name: "Shapiro Washburn & Sharp", address: "1007 N Main St, Suffolk, VA 23434", lat: 36.7300, lng: -76.5840, phone: "(757) 204-5765", website: "https://www.shapiroanddavidson.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Experienced trial attorneys in the Virginia Beach metro area." },
  ],
  // Connecticut
  "connecticut-hartford": [
    { name: "Carter Mario Law Firm", address: "1 Audubon St, New Haven, CT 06511", lat: 41.3080, lng: -72.9310, phone: "(203) 876-2711", website: "https://www.cartermario.com", practiceAreas: ["Personal Injury", "Car Accident", "Medical Malpractice"], description: "Connecticut's trusted personal injury law firm." },
    { name: "Trantolo & Trantolo", address: "999 Asylum Ave, Hartford, CT 06105", lat: 41.7690, lng: -72.6930, phone: "(860) 257-9191", website: "https://www.trantolo.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Well-known Connecticut injury firm with Hartford headquarters." },
  ],
  // Iowa
  "iowa-des-moines": [
    { name: "RSH Legal", address: "600 17th St, Des Moines, IA 50309", lat: 41.5840, lng: -93.6230, phone: "(515) 262-0000", website: "https://www.rshlegal.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Des Moines injury attorneys focused on Iowa families." },
    { name: "Stoltze & Stoltze", address: "699 Walnut St, Des Moines, IA 50309", lat: 41.5870, lng: -93.6280, phone: "(515) 989-8529", website: "https://www.stoltzlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Local Des Moines personal injury attorneys." },
  ],
  // Arkansas
  "arkansas-little-rock": [
    { name: "Rainwater Holt & Sexton", address: "500 W Markham St, Little Rock, AR 72201", lat: 34.7485, lng: -92.2830, phone: "(501) 414-0526", website: "https://www.rainfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Arkansas' go-to injury law firm." },
    { name: "Taylor King Law", address: "4201 Woodland Heights Rd, Little Rock, AR 72212", lat: 34.7880, lng: -92.3740, phone: "(501) 758-5000", website: "https://www.taylorkinglaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Well-known Arkansas personal injury attorneys." },
  ],
  // Mississippi
  "mississippi-jackson": [
    { name: "Coxwell & Associates", address: "500 E Capitol St, Jackson, MS 39201", lat: 32.2990, lng: -90.1800, phone: "(601) 948-1600", website: "https://www.coxwelllaw.com", practiceAreas: ["Personal Injury", "Criminal Defense", "Medical Malpractice"], description: "Jackson trial attorneys with a legacy of courtroom success." },
    { name: "Chinn & Associates", address: "300 Lamar St, Jackson, MS 39201", lat: 32.2960, lng: -90.1860, phone: "(601) 366-4410", website: "https://www.chinnandassociates.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Mississippi personal injury attorneys serving Jackson." },
  ],
  // Delaware
  "delaware-wilmington": [
    { name: "Jacobs & Crumplar", address: "750 Shipyard Dr, Wilmington, DE 19801", lat: 39.7390, lng: -75.5470, phone: "(302) 656-5445", website: "https://www.jcdelaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Delaware's leading personal injury trial firm." },
    { name: "Edelstein Martin & Nelson", address: "3 Mill Rd, Wilmington, DE 19806", lat: 39.7470, lng: -75.5640, phone: "(302) 295-5050", website: "https://www.emn-law.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Experienced Wilmington injury attorneys." },
  ],
  // Hawaii
  "hawaii-honolulu": [
    { name: "Davis Levin Livingston", address: "400 Hobron Ln, Honolulu, HI 96815", lat: 21.2830, lng: -157.8320, phone: "(808) 740-0633", website: "https://www.davislevin.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Car Accident"], description: "Hawaii's premier personal injury law firm." },
    { name: "Recovery Law Center", address: "2800 Woodlawn Dr, Honolulu, HI 96822", lat: 21.3030, lng: -157.8130, phone: "(808) 543-0123", website: "https://www.recoverylawcenter.com", practiceAreas: ["Personal Injury", "Car Accident", "Slip and Fall"], description: "Honolulu injury attorneys fighting for fair compensation." },
  ],
  // Alaska
  "alaska-anchorage": [
    { name: "Prior Prior & Langenborg", address: "1127 W 7th Ave, Anchorage, AK 99501", lat: 61.2140, lng: -149.8910, phone: "(907) 222-4prior", website: "https://www.prior.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Anchorage injury firm with deep Alaska experience." },
    { name: "Friedman Rubin", address: "500 L St, Anchorage, AK 99501", lat: 61.2170, lng: -149.8870, phone: "(907) 272-1491", website: "https://www.friedmanrubin.com", practiceAreas: ["Personal Injury", "Product Liability", "Medical Malpractice"], description: "Experienced Alaska trial attorneys." },
  ],
  // Idaho
  "idaho-boise": [
    { name: "Hepworth Holzer", address: "537 W Bannock St, Boise, ID 83702", lat: 43.6150, lng: -116.2050, phone: "(208) 343-7510", website: "https://www.hepworthholzer.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Car Accident"], description: "Idaho's leading personal injury trial firm." },
    { name: "Craig Swapp & Associates", address: "6126 W State St, Boise, ID 83703", lat: 43.6220, lng: -116.2490, phone: "(208) 955-0505", website: "https://www.craigswapp.com", practiceAreas: ["Personal Injury", "Car Accident", "Dog Bite"], description: "Multi-state injury firm with a Boise office." },
  ],
  // Montana
  "montana-billings": [
    { name: "Odegaard Braukmann Miller", address: "2603 1st Ave N, Billings, MT 59101", lat: 45.7850, lng: -108.5010, phone: "(406) 252-1100", website: "https://www.obmlaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Product Liability"], description: "Billings trial firm serving injury clients across Montana." },
    { name: "Bishop & Heenan", address: "1631 Zimmerman Trail, Billings, MT 59102", lat: 45.7710, lng: -108.5360, phone: "(406) 259-4100", website: "https://www.bishopheenan.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Car Accident"], description: "Experienced Montana injury attorneys." },
  ],
  // Kansas
  "kansas-wichita": [
    { name: "DeVaughn James Injury Lawyers", address: "100 N Broadway, Wichita, KS 67202", lat: 37.6900, lng: -97.3360, phone: "(316) 687-6270", website: "https://www.devaughnjames.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Wichita's dedicated personal injury law firm." },
    { name: "Hutton & Hutton Law Firm", address: "8100 E 22nd St N, Wichita, KS 67226", lat: 37.7200, lng: -97.2600, phone: "(316) 688-1166", website: "https://www.huttonandlarison.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Kansas trial attorneys with a proven track record." },
  ],
  // South Dakota
  "south-dakota-sioux-falls": [
    { name: "Turbak Law Office", address: "501 S Main Ave, Sioux Falls, SD 57104", lat: 43.5440, lng: -96.7280, phone: "(605) 336-2880", website: "https://www.turbaklaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Sioux Falls injury attorneys with a client-first approach." },
    { name: "Ronayne Law Firm", address: "224 S Phillips Ave, Sioux Falls, SD 57104", lat: 43.5470, lng: -96.7250, phone: "(605) 858-9141", website: "https://www.ronaynelaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Experienced South Dakota personal injury lawyers." },
  ],
  // North Dakota
  "north-dakota-fargo": [
    { name: "Sand Law", address: "4630 18th Ave SW, Fargo, ND 58103", lat: 46.8480, lng: -96.8320, phone: "(701) 609-1510", website: "https://www.sandlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Fargo personal injury firm serving North Dakota and Minnesota." },
    { name: "Pringle & Herigstad", address: "10 Roberts St, Fargo, ND 58102", lat: 46.8750, lng: -96.7870, phone: "(701) 232-3241", website: "https://www.pringlelaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Insurance Claims"], description: "North Dakota trial attorneys with decades of experience." },
  ],
  // Vermont
  "vermont-burlington": [
    { name: "Langrock Sperry & Wool", address: "111 S Pleasant St, Middlebury, VT 05753", lat: 44.0140, lng: -73.1680, phone: "(802) 388-6356", website: "https://www.langrock.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Employment Law"], description: "Vermont's respected trial firm serving the Burlington area." },
    { name: "Jarvis & Associates", address: "137 Elm St, Burlington, VT 05401", lat: 44.4760, lng: -73.2130, phone: "(802) 862-0077", website: "https://www.jarvisandassociates.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "Burlington personal injury attorneys." },
  ],
  // West Virginia
  "west-virginia-charleston": [
    { name: "Tiano O'Dell", address: "300 Kanawha Blvd E, Charleston, WV 25301", lat: 38.3490, lng: -81.6280, phone: "(304) 720-6700", website: "https://www.tianolaw.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Workers' Compensation"], description: "Charleston trial attorneys dedicated to injury victims." },
    { name: "Masters Law Group", address: "181 Summers St, Charleston, WV 25301", lat: 38.3500, lng: -81.6330, phone: "(304) 342-3106", website: "https://www.mastersattorneys.com", practiceAreas: ["Personal Injury", "Car Accident", "Wrongful Death"], description: "West Virginia personal injury lawyers." },
  ],
  // New Hampshire
  "new-hampshire-manchester": [
    { name: "Tenn And Tenn", address: "15 N Main St, Concord, NH 03301", lat: 43.2070, lng: -71.5380, phone: "(603) 614-5055", website: "https://www.tennandtenn.com", practiceAreas: ["Personal Injury", "Car Accident", "Dog Bite"], description: "New Hampshire personal injury attorneys." },
    { name: "Bouchard Kleinman & Wright", address: "33 N Main St, Manchester, NH 03104", lat: 42.9960, lng: -71.4560, phone: "(603) 625-2610", website: "https://www.bouchardkleinmanwright.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Workers' Compensation"], description: "Manchester injury firm with a strong regional reputation." },
  ],
  // Maine
  "maine-portland-me": [
    { name: "Berman & Simmons", address: "129 Lisbon St, Lewiston, ME 04240", lat: 44.1000, lng: -70.2150, phone: "(207) 784-3576", website: "https://www.bermansimmons.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Maine's preeminent personal injury law firm." },
    { name: "Hardy Wolf & Downing", address: "94 Main St, Auburn, ME 04210", lat: 44.0830, lng: -70.2310, phone: "(207) 783-2745", website: "https://www.hwdlaw.com", practiceAreas: ["Personal Injury", "Car Accident", "Workers' Compensation"], description: "Experienced Maine injury attorneys." },
  ],
  // Wyoming
  "wyoming-cheyenne": [
    { name: "Hirst Applegate", address: "1720 Carey Ave, Cheyenne, WY 82001", lat: 41.1410, lng: -104.8200, phone: "(307) 632-0541", website: "https://www.hirstapplegate.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Business Litigation"], description: "Cheyenne's trusted trial firm." },
    { name: "Davis & Cannon", address: "422 W 26th St, Cheyenne, WY 82001", lat: 41.1450, lng: -104.8230, phone: "(307) 634-3210", website: "https://www.daviscannon.com", practiceAreas: ["Personal Injury", "Car Accident", "Energy Law"], description: "Wyoming attorneys with deep local expertise." },
  ],
  // South Carolina
  "south-carolina-charleston-sc": [
    { name: "Joye Law Firm", address: "4 Carriage Ln, Charleston, SC 29407", lat: 32.7840, lng: -79.9710, phone: "(843) 225-1309", website: "https://www.joyelawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "South Carolina's experienced personal injury attorneys." },
    { name: "Steinberg Law Firm", address: "6881 Rivers Ave, North Charleston, SC 29406", lat: 32.8580, lng: -80.0140, phone: "(843) 720-2800", website: "https://www.steinberglawfirm.com", practiceAreas: ["Personal Injury", "Workers' Compensation", "Car Accident"], description: "Charleston injury firm with a focus on client results." },
  ],
  // Alabama
  "alabama-birmingham": [
    { name: "Norris Injury Lawyers", address: "300 Richard Arrington Jr Blvd N, Birmingham, AL 35203", lat: 33.5190, lng: -86.8080, phone: "(205) 383-7377", website: "https://www.norrislawfirm.com", practiceAreas: ["Personal Injury", "Car Accident", "Truck Accident"], description: "Birmingham injury attorneys with a passion for justice." },
    { name: "Marsh Rickard & Bryan", address: "800 Shades Creek Pkwy, Birmingham, AL 35209", lat: 33.4870, lng: -86.7970, phone: "(205) 879-5020", website: "https://www.marshrickard.com", practiceAreas: ["Personal Injury", "Medical Malpractice", "Wrongful Death"], description: "Experienced Birmingham trial attorneys." },
  ],
};

export function getLawyerListings(stateSlug: string, citySlug: string): LawyerListing[] {
  return lawyerListings[`${stateSlug}-${citySlug}`] || [];
}
