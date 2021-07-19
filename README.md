# BLE2MQTT

The goal of that service is to forward messages coming from BLE devices to a MQTT server.

## Tested with 
* NodeJS 14.x

## Install

```
git clone git@github.com:tbornon/ble2mqtt.git
cd ble2mqtt
npm install
npm run build
```

Please note that each time you change configs in the project, you must rebuild it with `npm run build`

## Start

```
npm start
```

## Structure

* characteristics_uuid.json lists characteristics uuids has defined in the BLE specifications (https://www.bluetooth.com/specifications/assigned-numbers/) (W.I.P)
* config.json holds configs relative to the connection to MQTT server (username, password, host, base topic, ...)
* device.json holds configs relative to devices. Which devices should use which template ?

## Adding a new template

Rules :
* The template must be placed inside devices folder.
* The template filename must be the same as the classname.
* It must extend the BaseDevice class.
* It must implement onNewData function.

In constructor, you list characteristics UUIDs (lowercase, without 0x at the beginning) you want to subscribe to.

In onNewData, you process your datas as you want to and then you publish them to the desired MQTT topic.