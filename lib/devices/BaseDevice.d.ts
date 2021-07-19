import { MqttClient } from 'mqtt';
import { Peripheral, Characteristic } from '@abandonware/noble';
export default class BaseDevice {
    mqttClient: MqttClient;
    peripheral: Peripheral;
    characteristics: string[];
    constructor(mqttClient: MqttClient, peripheral: Peripheral);
    init(): Promise<void>;
    onNewData(characteristic: Characteristic): Function;
    publish(topic: string, data: string | number): void;
}
//# sourceMappingURL=BaseDevice.d.ts.map