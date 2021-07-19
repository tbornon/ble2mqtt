import { MqttClient } from 'mqtt';
import { Peripheral, Characteristic } from '@abandonware/noble'

import BaseDevice from './BaseDevice';
import { getHumidity, getTemperature } from '../helpers/Converters';
import CHARACTERISTICS_UUID from '../characteristics_uuid.json';

export default class ESP32_DHT22 extends BaseDevice {
    constructor(mqttClient: MqttClient, peripheral: Peripheral) {
        super(mqttClient, peripheral);

        // The characteristics you want to subscribe to
        this.characteristics = [
            CHARACTERISTICS_UUID.TEMPERATURE,
            CHARACTERISTICS_UUID.HUMIDITY
        ];
    }

    // What to do when you receive new datas ?
    onNewData(characteristic: Characteristic, data: Buffer, isNotification: boolean) {
        if (characteristic.uuid == CHARACTERISTICS_UUID.TEMPERATURE)
            this.publish('temperature', getTemperature(data));
        else if (characteristic.uuid == CHARACTERISTICS_UUID.HUMIDITY)
            this.publish('humidity', getHumidity(data));
    }
}