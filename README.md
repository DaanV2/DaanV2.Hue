# DaanV2.Hue

A typescript library for controlling Philips Hue lights.


## Usage

```typescript
//Get bridges on network
const bridges = await Discovery.getBridgesOnNetwork();

//Setup bridge connection
const bridge = new Bridge(bridgeId, bridgeIp);
const app = await ApplicationConnection.setupApplication(bridge, appKey);
```


## First time setup between bridge and application

The bridge needs to authorize the application before it can be used. This is done by pressing the button on the bridge and then calling the following function.

```typescript
//Setup bridge connection
const bridge = new Bridge(bridgeId, bridgeIp);
const appKey = bridge.registerDeveloper("<APP ID>#<Device Id>");

//Then setup the application connection
const app = await ApplicationConnection.setupApplication(bridge, appKey);
```
