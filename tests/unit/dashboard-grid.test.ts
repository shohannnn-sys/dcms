import { describe, expect, it } from "vitest";

const chooseColumns = (count: number, maxColumns: number): number => {
  for (let columns = Math.min(count, maxColumns); columns >= 1; columns -= 1) {
    if (count % columns === 0) return columns;
  }
  return 1;
};

describe("dashboard grid invariant", () => {
  it("never creates ragged rows", () => {
    expect(chooseColumns(6, 4)).toBe(3);
    expect(chooseColumns(4, 4)).toBe(4);
    expect(chooseColumns(5, 4)).toBe(1);
    expect(chooseColumns(3, 4)).toBe(3);
  });
});
