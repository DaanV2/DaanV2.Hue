import { RestClient } from "./rest-client";

/** The data returned from the discovery endpoint*/
export interface DiscoveryBridgeData {
    /** The unique id of the bridge */
    id: string;
    /** The internal ip address of the bridge on the network */
    internalipaddress: string;
    /** The port of the bridge */
    port: number;
}

export namespace Discovery {
    export function getBridgesOnNetwork(): Promise<DiscoveryBridgeData[]> {
        const client = new RestClient("https://discovery.meethue.com");

        return client.get<DiscoveryBridgeData[]>("/");
    }
}
