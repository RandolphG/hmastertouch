import { calculateScore } from "./index";

describe("calculateScore functionality", () => {
  beforeEach(() => {
    console.log(calculateScore(4, 14, 2, 65956));
  });

  test("returns a users high score", () => {
    const result = calculateScore(14, 4, 33, 1000);

    expect(result).toBe(2);
  });
});
