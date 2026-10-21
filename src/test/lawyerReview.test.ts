import { describe, it, expect } from "vitest";
import { irishStatutoryRedundancy } from "@/data/lawyerReview";

describe("Irish statutory redundancy", () => {
  it("pays 2 weeks per year plus 1 week", () => {
    expect(irishStatutoryRedundancy(500, 10)).toBe(10500);
  });
  it("caps weekly pay at €600", () => {
    expect(irishStatutoryRedundancy(1000, 5)).toBe(6600);
  });
  it("pays nothing under 2 years' service", () => {
    expect(irishStatutoryRedundancy(800, 1.9)).toBe(0);
  });
});
