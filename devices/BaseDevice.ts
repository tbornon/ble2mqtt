import { MqttClient } from 'mqtt';
import { Peripheral, Characteristic } from '@abandonware/noble'
import { isNonNullChain } from 'typescript';

export default class BaseDevice {
    mqttClient: MqttClient;
    peripheral: Peripheral;
    characteristics: string[] = [];

    constructor(mqttClient: MqttClient, peripheral: Peripheral) {
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
            })
    }

    onNewData(characteristic: Characteristic): Function {
        return (data: Buffer) => {
            throw new Error("Not implemented");
        }
    }

    publish(topic: string, data: string | number) {
        this.mqttClient.publish(`ble2mqtt/${this.peripheral.uuid}/${topic}`, JSON.stringify({ value: data }));
    }
}