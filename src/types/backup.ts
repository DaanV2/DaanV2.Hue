export interface BackUpState {
    /** The current state of the backup */
    state: "idle" | "inprogress";
    /** The last time this device got backup */
    errorcode: number;
}
