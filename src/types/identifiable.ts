import { ObjectType } from "./types";

export interface Identifiable {
  id: string;
  type: ObjectType;
}

export namespace Identifiable {
  export function is(value: any | Identifiable): value is Identifiable {
    return typeof value === "object" && typeof value.id === "string" && typeof value.type === "string";
  }
}
