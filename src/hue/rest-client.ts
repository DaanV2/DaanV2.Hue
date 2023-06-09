import { HttpError } from "./errors";
import https from "https";
import fetch, { RequestInit } from "node-fetch";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * A simple client for making json REST requests
 */
export class RestClient {
  public readonly baseUrl: string;
  //Fetch types are wrong, this is a valid option
  public readonly baseOptions: RequestInit;

  constructor(baseUrl: string, baseOptions?: RequestInit) {
    this.baseUrl = baseUrl;
    this.baseOptions = baseOptions ?? {};

    if (this.baseUrl.endsWith("/")) {
      this.baseUrl = this.baseUrl.slice(0, -1);
    }

    // Add a default agent
    if (this.baseOptions.agent === undefined && this.baseUrl.startsWith("https://")) {
      // Hue uses a self-signed certificate, so we need to disable certificate validation
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        enableTrace: true,
        checkServerIdentity: (hostname, cert) => {
          if (hostname === "Phillips-hue") {
            return undefined;
          }
          return new Error("Invalid server certificate");
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.baseOptions.agent = httpsAgent;
    }

    if (this.baseOptions.headers === undefined) {
      this.baseOptions.headers = {
        "User-Agent": "daanv2@hue",
      };
    }

    if (!this.baseOptions.timeout) {
      this.baseOptions.timeout = 5000;
    }
  }

  public async get<T>(route: string, options?: RequestInit): Promise<T> {
    const opts = this.createOptions(
      {
        method: "GET",
      },
      options
    );

    return this.execute<T>(route, opts);
  }

  public async post<T>(route: string, options?: RequestInit): Promise<T> {
    const opts = this.createOptions(
      {
        method: "POST",
      },
      options
    );

    return this.execute<T>(route, opts);
  }

  public async put<T>(route: string, options?: RequestInit): Promise<T> {
    const opts = this.createOptions(
      {
        method: "PUT",
      },
      options
    );

    return this.execute<T>(route, opts);
  }

  public async delete<T>(route: string, options?: RequestInit): Promise<T> {
    const opts = this.createOptions(
      {
        method: "DELETE",
      },
      options
    );

    return this.execute<T>(route, opts);
  }

  private createOptions(options: RequestInit, overlap?: RequestInit): RequestInit {
    return {
      ...this.baseOptions,
      ...options,
      ...(overlap ?? {}),
    };
  }

  private execute<T>(route: string, options: RequestInit): Promise<T> {
    const url = this.baseUrl + route;

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (response.status == 429) {
            const err = new HttpError("Too many requests", response);
            return reject(err);
          }
          if (!response.ok) {
            reject(
              new HttpError(
                `Failure on '${options.method ?? "GET"}' request to: '${url}'\n${response.status} => ${
                  response.statusText
                }`,
                response
              )
            );
            return;
          }

          resolve(response.json());
        })
        .catch((e) => {
          reject(new HttpError(`Failure on '${options.method ?? "GET"}' request to: '${url}'\n${e.message}`, e));
        });
    });
  }
}
