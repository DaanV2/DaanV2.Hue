import { Bridge } from "./bridge";
import { CreateDeveloperResponse } from "../messages";
import { LightStateRequest, StateChangeSuccess } from "../messages/lights";
import fetch, { RequestInit } from "node-fetch";
import { HttpError } from "./errors";
import { BridgeConfig } from "../types/config";
import { ClipV2Message } from "../messages/clipv2";
import { RoomConfig } from "../types/room";
import { LightConfig, LightLevelConfig } from "../types";
import { Reference } from "../types/reference";
import { GroupConfig } from "../types/groups";
import { BridgeHomeConfig } from "../types/bridge_home";
import { ZoneConfig } from "../types/zone";
import { DeviceConfig, DevicePowerConifg } from "../types/device";
import { ZigbeeConnectivity } from "../types/zigbee";
import { MotionConfig } from "../types/motion";
import { SceneConfig } from "../types/scene";
import { TemperatureConfig } from "../types/temperature";

export class Application {
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

  /** Gets the base options for the application.
   * @returns The base options for the application.*/
  private baseOptions(): RequestInit {
    return {
      headers: {
        "hue-application-id": this.appId,
        "hue-application-key": this.appkey,
      },
    };
  }

  /** Gets the application id from the bridge for this app */
  public async getAppId() {
    const options = {
      ...this.baseOptions(),
      ...this.bridge.rest.baseOptions,
    };

    return fetch(`${this.bridge.rest.baseUrl}/auth/v1`, options);
  }

  /** Gets the config from  */
  public async getConfig() {
    return this.bridge.rest.get<BridgeConfig>(`/api/${this.appkey}/config`, this.baseOptions());
  }

  /** Gets the `grouped_light` resource from the bridge.
   * @param groupId If specified, only gets the specified group.
   * @returns The `grouped_light` resource(s) from the bridge.*/
  public async getGroupedLight(groupId?: string) {
    const resource = groupId ? `/${groupId}` : "";

    return this.bridge.rest.get<ClipV2Message<GroupConfig>>(
      `/clip/v2/resource/grouped_light${resource}`,
      this.baseOptions()
    );
  }

  /** Sets the `grouped_light` resource on the bridge.
   * @param groupid The group id to set.
   * @param state The state to set.
   * @returns A status message from the bridge.*/
  public async setGroupedLight(groupid: string, state: LightStateRequest) {
    const options: RequestInit = {
      ...this.baseOptions(),
      body: JSON.stringify(state),
    };

    return this.bridge.rest.get<ClipV2Message<StateChangeSuccess>>(
      `/clip/v2/resource/grouped_light/${groupid}`,
      options
    );
  }

  /** Gets the `bridge_home` resource from the bridge.
   * @param homeid If specified, only gets the specified home.
   * @returns The `bridge_home` resource(s) from the bridge.*/
  public async getBridgeHome(homeid?: string) {
    const resource = homeid ? `/${homeid}` : "";

    return this.bridge.rest.get<ClipV2Message<BridgeHomeConfig>>(
      `/clip/v2/resource/bridge_home${resource}`,
      this.baseOptions()
    );
  }

  /** Gets the `device` resource from the bridge.
   * @param deviceid If specified, only gets the specified device.
   * @returns The `device` resource(s) from the bridge.*/
  public async getDevice(deviceid?: string) {
    const resource = deviceid ? `/${deviceid}` : "";

    return this.bridge.rest.get<ClipV2Message<DeviceConfig>>(`/clip/v2/resource/device${resource}`, this.baseOptions());
  }

  /** Gets the `device_power` resource from the bridge.
   * @param device_powerid If specified, only gets the specified device.
   * @returns The `device_power` resource(s) from the bridge.*/
  public async getDevicePower(device_powerid?: string) {
    const resource = device_powerid ? `/${device_powerid}` : "";

    return this.bridge.rest.get<ClipV2Message<DevicePowerConifg>>(
      `/clip/v2/resource/device_power${resource}`,
      this.baseOptions()
    );
  }

  /** Gets the `light` resource from the bridge.
   * @param lightid If specified, only gets the specified light.
   * @returns The `light` resource(s) from the bridge.*/
  public async getLight(lightid?: string) {
    const resource = lightid ? `/${lightid}` : "";

    return this.bridge.rest.get<ClipV2Message<LightConfig>>(`/clip/v2/resource/light${resource}`, this.baseOptions());
  }

  /** Gets the `light_level` resource from the bridge.
   * @param ligth_levelid If specified, only gets the specified zone.
   * @returns The `light_level` resource(s) from the bridge.*/
  public async getLightLevel(ligth_levelid?: string) {
    const resource = ligth_levelid ? `/${ligth_levelid}` : "";

    return this.bridge.rest.get<ClipV2Message<LightLevelConfig>>(
      `/clip/v2/resource/light_level${resource}`,
      this.baseOptions()
    );
  }

  /** Sets the `light` resource on the bridge.
   * @param lightId The light id to set.
   * @param state The state to set.
   * @returns A status message from the bridge.*/
  public async setLight(lightId: string, state: LightStateRequest) {
    const options: RequestInit = {
      ...this.baseOptions(),
      body: JSON.stringify(state),
    };

    return this.bridge.rest.get<ClipV2Message<Reference>>(`/clip/v2/resource/light/${lightId}`, options);
  }

  /** Gets the `motion` resource from the bridge.
   * @param motionid If specified, only gets the specified motion.
   * @returns The `motion` resource(s) from the bridge.*/
  public async getMotionSensor(motionid?: string) {
    const resource = motionid ? `/${motionid}` : "";

    return this.bridge.rest.get<ClipV2Message<MotionConfig>>(`/clip/v2/resource/motion${resource}`, this.baseOptions());
  }

  /** Gets the `room` resource from the bridge.
   * @param roomid If specified, only gets the specified room.
   * @returns The `room` resource(s) from the bridge.*/
  public async getRoom(roomid?: string) {
    const resource = roomid ? `/${roomid}` : "";

    return this.bridge.rest.get<ClipV2Message<RoomConfig>>(`/clip/v2/resource/room${resource}`, this.baseOptions());
  }

  /** Gets the `scene` resource from the bridge.
   * @param sceneid If specified, only gets the specified scene.
   * @returns The `scene` resource(s) from the bridge.*/
  public async getScene(sceneid?: string) {
    const resource = sceneid ? `/${sceneid}` : "";

    return this.bridge.rest.get<ClipV2Message<SceneConfig>>(`/clip/v2/resource/scene${resource}`, this.baseOptions());
  }

  /** Gets the `temperature` resource from the bridge.
   * @param temperatureid If specified, only gets the specified temperature.
   * @returns The `temperature` resource(s) from the bridge.*/
  public async getTemperature(temperatureid?: string) {
    const resource = temperatureid ? `/${temperatureid}` : "";

    return this.bridge.rest.get<ClipV2Message<TemperatureConfig>>(
      `/clip/v2/resource/temperature${resource}`,
      this.baseOptions()
    );
  }

  /** Gets the `zone` resource from the bridge.
   * @param zoneid If specified, only gets the specified zone.
   * @returns The `zone` resource(s) from the bridge.*/
  public async getZone(zoneid?: string) {
    const resource = zoneid ? `/${zoneid}` : "";

    return this.bridge.rest.get<ClipV2Message<ZoneConfig>>(`/clip/v2/resource/zone${resource}`, this.baseOptions());
  }

  /** Gets the `zigbee_connectivity` resource from the bridge.
   * @param zigbeeid If specified, only gets the specified zigbee connectivity.
   * @returns The `zigbee_connectivity` resource(s) from the bridge.*/
  public async getZigbeeConnectivity(zigbeeid?: string) {
    const resource = zigbeeid ? `/${zigbeeid}` : "";

    return this.bridge.rest.get<ClipV2Message<ZigbeeConnectivity>>(
      `/clip/v2/resource/zigbee_connectivity${resource}`,
      this.baseOptions()
    );
  }

  /**Setups the app with the bridge*/
  public async setup() {
    const response = await this.getAppId();

    const appId = response.headers.get("hue-application-id") ?? "";
    if (!response.ok || appId === "") {
      throw new HttpError("No application id", response);
    }

    this.appId = appId;
  }

  /** Setup a new application on the bridge. assumes the bridge and app_id is already authenticated.
   * @param bridge The bridge to setup the application on.
   * @param appkey The appkey to use for the application.
   * @returns The application object.*/
  public static async setupApplication(bridge: Bridge, appkey: string | CreateDeveloperResponse) {
    const app = new Application(bridge, appkey);
    await app.setup();

    return app;
  }
}
