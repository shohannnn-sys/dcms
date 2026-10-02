import { describe, expect, it } from "vitest";

const calculateDue = (totalPoisha: number, paidPoisha: number): number => Math.max(0, totalPoisha - paidPoisha);

describe("money invariants", () => {
  it("keeps BDT arithmetic in integer poisha", () => {
    expect(calculateDue(125050, 25050)).toBe(100000);
    expect(Number.isInteger(calculateDue(1, 0))).toBe(true);
  });

  it("never produces a negative due", () => {
    expect(calculateDue(100, 200)).toBe(0);
  });
});
