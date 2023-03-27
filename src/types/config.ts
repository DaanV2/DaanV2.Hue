import { UpdateState } from "./update";
import { BackUpState } from "./backup";
import { WhitelistUser } from "./user";

export interface BridgeConfig {
    /**The name of the bridge*/
    name: string;
    /**The zigbee channel the bridge is using*/
    zigbeechannel: number;
    /**The bridge id*/
    bridgeid: string;
    /**The mac address of the bridge*/
    mac: string;
    /**Whether the bridge is using dhcp*/
    dhcp: boolean;
    /**The ip address of the bridge*/
    ipaddress: string;
    /**The netmask of the bridge*/
    netmask: string;
    /**The gateway of the bridge*/
    gateway: string;
    /**The proxy address of the bridge*/
    proxyaddress: string;
    /**The proxy port of the bridge*/
    proxyport: number;
    /**The UTC time of the bridge*/
    UTC: string;
    /**The local time of the bridge*/
    localtime: string;
    /**The timezone of the bridge*/
    timezone: string;
    /**The model id of the bridge*/
    modelid: string;
    /**The data store version of the bridge*/
    datastoreversion: string;
    /**The software version of the bridge*/
    swversion: string;
    /**The api version of the bridge*/
    apiversion: string;
    /**The software update version of the bridge*/
    swupdate2: BridgeSoftwareUpdate;
    /**Whether the link button is pressed*/
    linkbutton: boolean;
    /**Whether the portal services are enabled*/
    portalservices: boolean;
    /**The portal connection state*/
    portalconnection: "connected" | "disconnected";
    /**The portal state*/
    portalstate: PortalState;
    /**The internet services*/
    internetservices: InternetServices;
    /**Whether the bridge is factory new*/
    factorynew: boolean;
    /**The bridge id that this bridge replaces*/
    replacesbridgeid: string | null;
    /**The backup state*/
    backup: BackUpState;
    /**The starter kit id*/
    starterkitid: string;
    /**The whitelist*/
    whitelist: {
        [username: string]: WhitelistUser;
    };
}

export interface BridgeSoftwareUpdate {
    /**Whether the bridge is checking for updates*/
    checkforupdate: boolean;
    /**The last change date of the bridge*/
    lastchange: string;
    /**The bridge software update*/
    bridge: UpdateState;
}

export interface PortalState {
    /**Whether the bridge is signed on*/
    signedon: boolean;
    /**Whether the bridge is incoming*/
    incoming: boolean;
    /**Whether the bridge is outgoing*/
    outgoing: boolean;
    /**Whether the bridge is communication*/
    communication: "disconnected" | "connected";
}

export interface InternetServices {
    /**Whether the internet services are enabled*/
    internet: "disconnected" | "connected";
    /**Whether the remote access is enabled*/
    remoteaccess: "disconnected" | "connected";
    /**Whether the time is enabled*/
    time: "disconnected" | "connected";
    /**Whether the swupdate is enabled*/
    swupdate: "disconnected" | "connected";
}
