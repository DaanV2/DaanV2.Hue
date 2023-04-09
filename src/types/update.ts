export interface UpdateState {
  /** The current state of the update */
  state: "noupdates" | "updateavailable";
  /** The last time this device got update */
  lastinstall: string;
}
