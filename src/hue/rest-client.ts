import { HttpError } from "./errors";
import https from "https";
import fetch, { RequestInit } from "node-fetch";

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
        if (this.baseOptions.agent === undefined) {
            // Hue uses a self-signed certificate, so we need to disable certificate validation
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false,
                requestCert: false,
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.baseOptions.agent = httpsAgent;
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

        return fetch(url, options).then((response) => {
            if (response.status == 429) {
                throw new HttpError("Too many requests", response);
            }
            if (!response.ok) {
                throw new HttpError(
                    `Failure on '${options.method ?? "GET"}' request to: '${url}'\n${response.status} => ${
                        response.statusText
                    }`,
                    response
                );
            }

            return response.json();
        });
    }
}
