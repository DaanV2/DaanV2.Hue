import { Reference } from "./reference";

export interface ServicesContainer {
  services: Reference[];
}

export namespace ServicesContainer {
  export function is(value: any | ServicesContainer): value is ServicesContainer {
    return typeof value === "object" && Array.isArray(value.services) && value.services.every(Reference.is);
  }
}
