export interface ClipError {
    type: number;
    address: string;
    description: string;
}

export namespace ClipError {
    export function is(value: any): value is ClipError {
        return (
            value &&
            typeof value.type === "number" &&
            typeof value.address === "string" &&
            typeof value.description === "string"
        );
    }
}
