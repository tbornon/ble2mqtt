"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumidity = exports.getTemperature = void 0;
function getTemperature(data) {
    return data.readInt16LE() / 100;
}
exports.getTemperature = getTemperature;
function getHumidity(data) {
    return data.readInt16LE() / 100;
}
exports.getHumidity = getHumidity;
//# sourceMappingURL=Converters.js.map