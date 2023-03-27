export interface WhitelistUser {
    /** The username of the user */
    username: string;
    /** The date and time the user was created */
    created: string;
    /** The last date and time the user was used to access the bridge */
    lastused: string;
}
