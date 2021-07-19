"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseDevice {
    constructor(mqttClient, peripheral) {
        this.characteristics = [];
        this.mqttClient = mqttClient;
        this.peripheral = peripheral;
    }
    async init() {
        await this.peripheral.connectAsync();
        const { characteristics } = await this.peripheral.discoverAllServicesAndCharacteristicsAsync();
        characteristics
            .filter(c => this.characteristics.indexOf(c.uuid) != -1)
            .forEach(async (c) => {
            await c.subscribeAsync();
            c.on('data', this.onNewData(c));
        });
    }
    onNewData(characteristic) {
        return (data) => {
            throw new Error("Not implemented");
        };
    }
    publish(topic, data) {
        this.mqttClient.publish(`ble2mqtt/${this.peripheral.uuid}/${topic}`, JSON.stringify({ value: data }));
    }
}
exports.default = BaseDevice;
//# sourceMappingURL=BaseDevice.js.map