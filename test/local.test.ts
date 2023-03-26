import { ApplicationConnection } from "../src/hue/application";
import { Bridge } from "../src/main";

import * as fs from "fs";
import path from "path";

describe("local test", () => {
  const { bridge, app } = getData();
  if (!bridge || !app) {
    return;
  }

  it("should get all lights", async () => {
    const response = await app.getAppId();

    const appId = await response.headers.get("hue-application-id");

    console.log("Your app id", appId);
    expect(appId).toBeDefined();
    expect(response).toBeDefined();
  });
});

function getData(): { bridge: Bridge | undefined; app: ApplicationConnection | undefined } {
  //READ from environment file ../.env.private
  const filepath = path.join(__dirname, "..", ".env.private");

  if (fs.existsSync(filepath) === false) {
    return { bridge: undefined, app: undefined };
  }

  const env = fs.readFileSync(filepath, "utf8");

  //PARSE environment file
  const envMap: { [property: string]: string } = {};
  env.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    envMap[key] = value;
  });

  const { APP_KEY, BRIDGE_ID, BRIDGE_IP } = envMap;

  if (!APP_KEY || !BRIDGE_ID || !BRIDGE_IP) {
    return {
      bridge: undefined,
      app: undefined,
    };
  }

  const bridge = new Bridge(BRIDGE_ID, BRIDGE_IP);
  const app = new ApplicationConnection(bridge, APP_KEY);

  return {
    bridge,
    app,
  };
}
