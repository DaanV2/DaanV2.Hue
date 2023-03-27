import { ClipError } from "./error";

export type ClipMessages<T> = (T | ClipError)[];

export class ClipMessage<T> {
    public readonly messages: ClipMessages<T>;

    constructor(messages: ClipMessages<T>) {
        this.messages = messages;
    }

    public get ok() {
        return !this.messages.some(ClipError.is);
    }

    public get error(): ClipError | undefined {
        return this.messages.find(ClipError.is);
    }

    public get data(): T | undefined {
        return this.messages.find((m) => !ClipError.is(m)) as T | undefined;
    }

    public static async wrap<T>(messages: Promise<ClipMessages<T>>): Promise<ClipMessage<T>> {
        return new ClipMessage(await messages);
    }
}
