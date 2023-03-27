export interface CreateDeveloperResponse {
    success: {
        username: string;
    };
}

export namespace CreateDeveloperResponse {
    export function is(value: any): value is CreateDeveloperResponse {
        return value && typeof value.success === "object" && typeof value.success.username === "string";
    }
}
