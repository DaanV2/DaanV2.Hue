import { getApp } from "./util";

describe("resource test", () => {
  const app = getApp();
  if (!app) {
    it("Skip local tests", () => {});
    return;
  }

  beforeAll(async () => {
    if (!app) return;

    return app.setup();
  });

  it("Can get the lights", async () => {
    const response = await app.getLight();

    expect(response).toBeDefined();
    expect(response.errors.length).toEqual(0);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
