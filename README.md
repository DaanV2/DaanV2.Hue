# DaanV2.Hue

[![🔍 PR](https://github.com/DaanV2/DaanV2.Hue/actions/workflows/pull-request.yml/badge.svg)](https://github.com/DaanV2/DaanV2.Hue/actions/workflows/pull-request.yml)
![npm](https://img.shields.io/npm/v/%40daanv2%2Fhue)
![npm](https://img.shields.io/npm/dw/%40daanv2%2Fhue)

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
