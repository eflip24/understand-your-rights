export interface StateLegalData {
  name: string;
  slug: string;
  abbreviation: string;
  personalInjurySOL: string;
  propertyDamageSOL: string;
  negligenceRule: "pure comparative" | "modified comparative (50%)" | "modified comparative (51%)" | "contributory";
  minAutoInsurance: string;
  noFault: boolean;
}

export const stateData: StateLegalData[] = [
  { name: "Alabama", slug: "alabama", abbreviation: "AL", personalInjurySOL: "2 years", propertyDamageSOL: "6 years", negligenceRule: "contributory", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Alaska", slug: "alaska", abbreviation: "AK", personalInjurySOL: "2 years", propertyDamageSOL: "6 years", negligenceRule: "pure comparative", minAutoInsurance: "50/100/25", noFault: false },
  { name: "Arizona", slug: "arizona", abbreviation: "AZ", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/15", noFault: false },
  { name: "Arkansas", slug: "arkansas", abbreviation: "AR", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "California", slug: "california", abbreviation: "CA", personalInjurySOL: "2 years", propertyDamageSOL: "3 years", negligenceRule: "pure comparative", minAutoInsurance: "15/30/5", noFault: false },
  { name: "Colorado", slug: "colorado", abbreviation: "CO", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/15", noFault: false },
  { name: "Connecticut", slug: "connecticut", abbreviation: "CT", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Delaware", slug: "delaware", abbreviation: "DE", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/10", noFault: false },
  { name: "Florida", slug: "florida", abbreviation: "FL", personalInjurySOL: "4 years", propertyDamageSOL: "4 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "10/20/10", noFault: true },
  { name: "Georgia", slug: "georgia", abbreviation: "GA", personalInjurySOL: "2 years", propertyDamageSOL: "4 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Hawaii", slug: "hawaii", abbreviation: "HI", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "20/40/10", noFault: true },
  { name: "Idaho", slug: "idaho", abbreviation: "ID", personalInjurySOL: "2 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/15", noFault: false },
  { name: "Illinois", slug: "illinois", abbreviation: "IL", personalInjurySOL: "2 years", propertyDamageSOL: "5 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/20", noFault: false },
  { name: "Indiana", slug: "indiana", abbreviation: "IN", personalInjurySOL: "2 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Iowa", slug: "iowa", abbreviation: "IA", personalInjurySOL: "2 years", propertyDamageSOL: "5 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "20/40/15", noFault: false },
  { name: "Kansas", slug: "kansas", abbreviation: "KS", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: true },
  { name: "Kentucky", slug: "kentucky", abbreviation: "KY", personalInjurySOL: "1 year", propertyDamageSOL: "2 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/25", noFault: true },
  { name: "Louisiana", slug: "louisiana", abbreviation: "LA", personalInjurySOL: "1 year", propertyDamageSOL: "1 year", negligenceRule: "pure comparative", minAutoInsurance: "15/30/25", noFault: false },
  { name: "Maine", slug: "maine", abbreviation: "ME", personalInjurySOL: "6 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "50/100/25", noFault: false },
  { name: "Maryland", slug: "maryland", abbreviation: "MD", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "contributory", minAutoInsurance: "30/60/15", noFault: false },
  { name: "Massachusetts", slug: "massachusetts", abbreviation: "MA", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "20/40/5", noFault: true },
  { name: "Michigan", slug: "michigan", abbreviation: "MI", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "50/100/10", noFault: true },
  { name: "Minnesota", slug: "minnesota", abbreviation: "MN", personalInjurySOL: "6 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "30/60/10", noFault: true },
  { name: "Mississippi", slug: "mississippi", abbreviation: "MS", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Missouri", slug: "missouri", abbreviation: "MO", personalInjurySOL: "5 years", propertyDamageSOL: "5 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Montana", slug: "montana", abbreviation: "MT", personalInjurySOL: "3 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/20", noFault: false },
  { name: "Nebraska", slug: "nebraska", abbreviation: "NE", personalInjurySOL: "4 years", propertyDamageSOL: "4 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Nevada", slug: "nevada", abbreviation: "NV", personalInjurySOL: "2 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/20", noFault: false },
  { name: "New Hampshire", slug: "new-hampshire", abbreviation: "NH", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "New Jersey", slug: "new-jersey", abbreviation: "NJ", personalInjurySOL: "2 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "15/30/5", noFault: true },
  { name: "New Mexico", slug: "new-mexico", abbreviation: "NM", personalInjurySOL: "3 years", propertyDamageSOL: "4 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/10", noFault: false },
  { name: "New York", slug: "new-york", abbreviation: "NY", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/10", noFault: true },
  { name: "North Carolina", slug: "north-carolina", abbreviation: "NC", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "contributory", minAutoInsurance: "30/60/25", noFault: false },
  { name: "North Dakota", slug: "north-dakota", abbreviation: "ND", personalInjurySOL: "6 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: true },
  { name: "Ohio", slug: "ohio", abbreviation: "OH", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Oklahoma", slug: "oklahoma", abbreviation: "OK", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Oregon", slug: "oregon", abbreviation: "OR", personalInjurySOL: "2 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/20", noFault: false },
  { name: "Pennsylvania", slug: "pennsylvania", abbreviation: "PA", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "15/30/5", noFault: true },
  { name: "Rhode Island", slug: "rhode-island", abbreviation: "RI", personalInjurySOL: "3 years", propertyDamageSOL: "10 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/25", noFault: false },
  { name: "South Carolina", slug: "south-carolina", abbreviation: "SC", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "South Dakota", slug: "south-dakota", abbreviation: "SD", personalInjurySOL: "3 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Tennessee", slug: "tennessee", abbreviation: "TN", personalInjurySOL: "1 year", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/15", noFault: false },
  { name: "Texas", slug: "texas", abbreviation: "TX", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "30/60/25", noFault: false },
  { name: "Utah", slug: "utah", abbreviation: "UT", personalInjurySOL: "4 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/65/15", noFault: true },
  { name: "Vermont", slug: "vermont", abbreviation: "VT", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/10", noFault: false },
  { name: "Virginia", slug: "virginia", abbreviation: "VA", personalInjurySOL: "2 years", propertyDamageSOL: "5 years", negligenceRule: "contributory", minAutoInsurance: "30/60/20", noFault: false },
  { name: "Washington", slug: "washington", abbreviation: "WA", personalInjurySOL: "3 years", propertyDamageSOL: "3 years", negligenceRule: "pure comparative", minAutoInsurance: "25/50/10", noFault: false },
  { name: "West Virginia", slug: "west-virginia", abbreviation: "WV", personalInjurySOL: "2 years", propertyDamageSOL: "2 years", negligenceRule: "modified comparative (50%)", minAutoInsurance: "25/50/25", noFault: false },
  { name: "Wisconsin", slug: "wisconsin", abbreviation: "WI", personalInjurySOL: "3 years", propertyDamageSOL: "6 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/10", noFault: false },
  { name: "Wyoming", slug: "wyoming", abbreviation: "WY", personalInjurySOL: "4 years", propertyDamageSOL: "4 years", negligenceRule: "modified comparative (51%)", minAutoInsurance: "25/50/20", noFault: false },
];

export function getStateBySlug(slug: string): StateLegalData | undefined {
  return stateData.find((s) => s.slug === slug);
}

export function getStateByAbbreviation(abbr: string): StateLegalData | undefined {
  return stateData.find((s) => s.abbreviation === abbr.toUpperCase());
}
