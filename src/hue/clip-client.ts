import { ClipMessage, ClipMessages } from "../messages/clip";
import { RestClient } from "./rest-client";
import { RequestInit } from "node-fetch";

export class ClipClient {
  private _client: RestClient;

  constructor(client: RestClient) {
    this._client = client;
  }

  public async get<T>(route: string, options?: RequestInit): Promise<T> {
    return this.wrap<T>(this._client.get.bind(this._client), route, options);
  }

  public async post<T>(route: string, options?: RequestInit): Promise<T> {
    return this.wrap<T>(this._client.post.bind(this._client), route, options);
  }

  public async put<T>(route: string, options?: RequestInit): Promise<T> {
    return this.wrap<T>(this._client.put.bind(this._client), route, options);
  }

  public async delete<T>(route: string, options?: RequestInit): Promise<T> {
    return this.wrap<T>(this._client.delete.bind(this._client), route, options);
  }

  private async wrap<T>(
    call: (route: string, options?: RequestInit) => Promise<ClipMessages<T>>,
    route: string,
    options?: RequestInit
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      ClipMessage.wrap(call(route, options))
        .then((clip) => {
          if (clip.error) {
            return reject(clip.error);
          }
          if (!clip.data) {
            return reject(new Error("No data returned"));
          }

          return resolve(clip.data);
        })
        .catch(reject);
    });
  }
}
