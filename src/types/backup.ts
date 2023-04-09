export interface BackUpState {
  /** The current state of the backup */
  state: "idle" | "inprogress";
  /** The last time this device got backup */
  errorcode: number;
}

export namespace BackUpState {
  export function is(value: any | BackUpState): value is BackUpState {
    return typeof value === "object" && typeof value.state === "string" && typeof value.errorcode === "number";
  }
}
