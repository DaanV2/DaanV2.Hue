import { CreateDeveloperResponse } from "../../src/messages";
import { getApp } from "./util";

describe.only("local", () => {
  test("local", async () => {
    const app = getApp();

    try {
      const data = await app?.bridge.registerDeveloper("random#randopm");

      if (CreateDeveloperResponse.is(data)) {
        console.log(data.success.username);
      } else {
        console.log(data?.description);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
