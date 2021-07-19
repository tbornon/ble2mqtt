"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDevice_1 = __importDefault(require("./BaseDevice"));
const Converters_1 = require("../helpers/Converters");
const characteristics_uuid_json_1 = __importDefault(require("../characteristics_uuid.json"));
class ESP32_DHT22 extends BaseDevice_1.default {
    constructor(mqttClient, peripheral) {
        super(mqttClient, peripheral);
        this.characteristics = [
            characteristics_uuid_json_1.default.TEMPERATURE,
            characteristics_uuid_json_1.default.HUMIDITY
        ];
    }
    onNewData(characteristic) {
        return (data) => {
            if (characteristic.uuid == characteristics_uuid_json_1.default.TEMPERATURE)
                this.publish('temperature', Converters_1.getTemperature(data));
            else if (characteristic.uuid == characteristics_uuid_json_1.default.HUMIDITY)
                this.publish('humidity', Converters_1.getHumidity(data));
        };
    }
}
exports.default = ESP32_DHT22;
//# sourceMappingURL=ESP32_DHT22.js.map