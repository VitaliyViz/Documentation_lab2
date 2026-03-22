import { Sensor } from "../entities/Schema";
export interface ISensorRepository {
    save(sensor: Sensor): Promise<void>;
}