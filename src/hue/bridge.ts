import { ClipClient } from "./clip-client";
import { CreateDeveloperResponse } from "../messages";
import { RestClient } from "./rest-client";
import { RequestInit } from "node-fetch";

/**
 * Represents a connection to a hue bridge
 */
export class Bridge {
  public readonly bridgeId: string;
  public readonly bridgeIp: string;

  private _client: RestClient;
  private _clipClient: ClipClient;

  /**Gets the clip api client*/
  public get clip(): ClipClient {
    return this._clipClient;
  }

  /**Gets the rest api client*/
  public get rest(): RestClient {
    return this._client;
  }

  constructor(bridgeId: string, bridgeIp: string) {
    this.bridgeId = bridgeId;
    this.bridgeIp = bridgeIp;

    this._client = new RestClient(`https://${this.bridgeIp}`);
    this._clipClient = new ClipClient(this._client);
  }

  /** Register a new developer with the bridge. NOTE: The push link button must be pressed on the bridge before calling this method.
   * @param developerId The username to register @example "my_hue_app#my_pc"
   * @returns The response from the bridge*/
  public async registerDeveloper(developerId: string): Promise<CreateDeveloperResponse> {
    const options: RequestInit = {
      body: JSON.stringify({ devicetype: developerId }),
    };

    return this.clip.post<CreateDeveloperResponse>("", options);
  }
}
