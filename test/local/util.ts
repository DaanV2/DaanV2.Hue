import { Bridge, Application } from "../../src/main";

import * as fs from "fs";
import path from "path";

export function getApp(): Application | undefined {
  //READ from environment file ../.env.private
  const filepath = path.join(__dirname, "..", "..", ".env.private");

  if (fs.existsSync(filepath) === false) {
    return undefined;
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
    return undefined;
  }

  const bridge = new Bridge(BRIDGE_ID, BRIDGE_IP);
  const app = new Application(bridge, APP_KEY);

  return app;
}
