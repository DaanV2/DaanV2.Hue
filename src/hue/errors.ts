import { Response } from "node-fetch";

export class HttpError extends Error {
    public readonly response: Response;

    public get status(): number {
        return this.response.status;
    }

    public get statusText(): string {
        return this.response.statusText;
    }

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}
