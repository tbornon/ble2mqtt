export function getTemperature(data: Buffer): number {
    return data.readInt16LE() / 100;
}

export function getHumidity(data: Buffer): number {
    return data.readInt16LE() / 100;
}