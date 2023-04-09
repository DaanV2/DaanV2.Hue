export interface OnState {
  on: boolean;
}

export namespace OnState {
  export function is(value: any | OnState): value is OnState {
    return typeof value === "object" && typeof value.on === "boolean";
  }
}
