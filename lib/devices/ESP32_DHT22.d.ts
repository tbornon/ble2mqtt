import { MqttClient } from 'mqtt';
import { Peripheral, Characteristic } from '@abandonware/noble';
import BaseDevice from './BaseDevice';
export default class ESP32_DHT22 extends BaseDevice {
    constructor(mqttClient: MqttClient, peripheral: Peripheral);
    onNewData(characteristic: Characteristic): Function;
}
//# sourceMappingURL=ESP32_DHT22.d.ts.map