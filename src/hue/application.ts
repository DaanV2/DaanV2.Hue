import { Bridge } from "./bridge";
import { CreateDeveloperResponse } from "./messages";
import { LightStateRequest, StateChangeSuccess } from "./messages/lights";
import { BridgeConfig } from "./types/config";
import { GroupConfigMap } from "./types/groups";
import { LightConfig, LightConfigMap } from "./types/lights";
import fetch, { RequestInit } from "node-fetch";
import { HttpError } from "./errors";

export class ApplicationConnection {
  public readonly bridge: Bridge;
  public appkey: string;
  public appId: string;

  constructor(bridge: Bridge, appkey: string | CreateDeveloperResponse) {
    this.bridge = bridge;

    if (typeof appkey !== "string") {
      appkey = appkey.success.username;
    }

    this.appkey = appkey;
    this.appId = "";
  }

  private baseOptions(): RequestInit {
    return {
      headers: {
        "hue-application-id": this.appId,
        "hue-application-key": this.appkey,
      },
    };
  }

  public async getAppId() {
    const options = {
      ...this.baseOptions(),
      ...this.bridge.rest.baseOptions,
    };

    return fetch(`${this.bridge.rest.baseUrl}/auth/v1`, options);
  }

  public async getConfig() {
    return this.bridge.rest.get<BridgeConfig>(`${this.appkey}/config`, this.baseOptions());
  }

  public async getGroups() {
    return this.bridge.rest.get<GroupConfigMap>(`${this.appkey}/groups`, this.baseOptions());
  }

  public async getGroup(groupId: string) {
    return this.bridge.rest.get<GroupConfigMap>(`${this.appkey}/groups/${groupId}`, this.baseOptions());
  }

  public async getLights() {
    return this.bridge.rest.get<LightConfigMap>(`${this.appkey}/lights`, this.baseOptions());
  }

  public async getLight(lightId: string) {
    return this.bridge.rest.get<LightConfig>(`${this.appkey}/lights/${lightId}`, this.baseOptions());
  }

  public async setLight(lightId: string, state: LightStateRequest) {
    const options: RequestInit = {
      ...this.baseOptions(),
      body: JSON.stringify(state),
    };

    return this.bridge.rest.get<StateChangeSuccess>(`${this.appkey}/lights/${lightId}/state`, options);
  }

  public static async setupApplication(bridge: Bridge, appkey: string | CreateDeveloperResponse) {
    const app = new ApplicationConnection(bridge, appkey);

    const response = await app.getAppId();

    const appId = response.headers.get("hue-application-id") ?? "";
    if (!response.ok || appId === "") {
      throw new HttpError("No application id", response);
    }

    app.appId = appId;

    return app;
  }
}
