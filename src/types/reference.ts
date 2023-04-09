import { Identifiable } from "./identifiable";
import { ServicesContainer } from "./service";
import { ObjectType } from "./types";

export interface Reference {
  rid: string;
  rtype: ObjectType;
}

export namespace Reference {
  export function is(value: any | Reference): value is Reference {
    return typeof value === "object" && typeof value.rid === "string" && typeof value.rtype === "string";
  }

  /** Create a reference from an identifiable object.
   * @param item The identifiable object to create a reference from.
   * @returns A reference to the identifiable object.
   */
  export function from(item: Identifiable): Reference {
    return {
      rid: item.id,
      rtype: item.type,
    };
  }

  /**
   * Extract a usable reference from an given object that allows controlling the light.
   *
   * @param item The object to extract the reference from.
   * @returns A reference to the light.
   */
  export function extract(item: ServicesContainer | Identifiable) {
    if (ServicesContainer.is(item)) {
      for (const service of item.services) {
        if (service.rtype === "grouped_light") {
          return service;
        }
      }
      return;
    }

    return from(item);
  }
}
