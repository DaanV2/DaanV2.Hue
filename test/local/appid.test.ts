import { getApp } from "./util";

describe("local test", () => {
  const app = getApp();
  if (!app) {
    it("Skip local tests", () => {});
    return;
  }

  it("Should be able to get the app id", async () => {
    const response = await app.getAppId();

    const appId = await response.headers.get("hue-application-id");

    console.log("Your app id", appId);
    expect(appId).toBeDefined();
    expect(response).toBeDefined();
  });
});
