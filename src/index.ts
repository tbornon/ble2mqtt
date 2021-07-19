import noble, { Characteristic } from "@abandonware/noble";
import mqtt from "mqtt";

import BaseDevice from '../devices/BaseDevice';

import config from "../config.json";
import { devices } from "../devices.json";



async function main() {
    let loadedDevices = loadDevices();

    const mqttClient = mqtt.connect(`mqtt://${config.mqtt.host}:${config.mqtt.port}`);

    mqttClient.on('connect', () => {
        console.log("Connected to MQTT server");
    });

    mqttClient.on('reconnect', () => {
        console.log("Connection lost, trying to reconnect to MQTT server");
    });

    mqttClient.on('error', err => {
        console.error(err);
        process.exit(-1);
    });

    noble.on('stateChange', async (state) => {
        if (state == "poweredOn") {
            console.log("Start scanning");
            await noble.startScanningAsync([]);
        }
    });

    noble.on('discover', async (peripheral) => {
        // Search for device that are loaded and that isn't already connected
        let device = loadedDevices.find(d => d.mac.toLowerCase() == peripheral.address && !d.connected);

        if (device) {
            await noble.stopScanningAsync();

            console.log("Device found");

            let Device = new device.template(mqttClient, peripheral);
            await Device.init();
        }
    });
}

/**
* Foreach device, load the template which to bind with.
* Template is first looked for in cache and then in the devices folder
*/
function loadDevices() {
    let loadedDevices: {
        mac: string,
        template: (new (mqttClient: mqtt.MqttClient, peripheral: noble.Peripheral) => BaseDevice),
        connected: boolean
    }[] = [];
    let templates: (new (mqttClient: mqtt.MqttClient, peripheral: noble.Peripheral) => BaseDevice)[] = [];

    devices.forEach(device => {
        // Search template in cache
        let indexOfTemplate = templates.findIndex(t => t.name == device.templateName);
        let Template: (new (mqttClient: mqtt.MqttClient, peripheral: noble.Peripheral) => BaseDevice);

        if (indexOfTemplate == -1) {
            // If template isn't in cache, try to load it from devices folder
            try {
                Template = require('../devices/' + device.templateName).default;
            } catch (e) {
                if (e.code == "MODULE_NOT_FOUND")
                    console.error("Please ensure all templates names inside devices.json are valid");

                throw e;
            }

            // Add template to cache
            templates.push(Template);
            console.log("New template saved", Template.name);
        } else {
            Template = templates[indexOfTemplate];
        }

        loadedDevices.push({
            mac: device.mac,
            template: Template,
            connected: false
        });
        console.log(`Device ${device.mac} bound to ${Template.name}`);
    });

    return loadedDevices;
}

main();