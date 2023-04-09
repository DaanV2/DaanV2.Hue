export interface Reference {
  rid: string;
  rtype: string;
}

export namespace Reference {
  export function is(value: any | Reference): value is Reference {
    return typeof value === "object" && typeof value.rid === "string" && typeof value.rtype === "string";
  }
}
