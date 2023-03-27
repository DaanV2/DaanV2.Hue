import { HSV } from "../src/colors";

describe("colors", () => {
  it("Can convert HSV to RGB", () => {
    const [r, g, b] = HSV.toRGB(20, 50, 100);

    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });
});
