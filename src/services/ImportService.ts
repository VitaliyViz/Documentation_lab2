import fs from 'fs';
import { IHubRepository } from "../repositories/IHubRepository";
import { ISensorRepository } from "../repositories/ISensorRepository";
import { Hub, MotionProtect, DoorProtect } from "../entities/Schema";

export class ImportService {
    constructor(
        private hubRepo: IHubRepository,
        private sensorRepo: ISensorRepository
    ) {}

    async runImport(filePath: string) {
        if (!fs.existsSync(filePath)) {
            console.error(" Файл не знайдено!");
            return;
        }
        const lines = fs.readFileSync(filePath, 'utf-8').split('\n').slice(1);
        
        for (const line of lines) {
            if (!line.trim()) continue;
            const [sn, ip, sId, bat, type, extra] = line.split(',');

            let hub = await this.hubRepo.findOne(sn);
            if (!hub) {
                hub = new Hub();
                hub.serialNumber = sn;
                hub.ipAddress = ip;
                await this.hubRepo.save(hub);
            }

            let sensor;
            if (type === 'Motion') {
                sensor = new MotionProtect();
                sensor.sensitivity = parseFloat(extra);
            } else {
                sensor = new DoorProtect();
                sensor.isOpen = extra === 'true';
            }
            sensor.id = sId;
            sensor.batteryLevel = parseInt(bat);
            sensor.hub = hub;

            await this.sensorRepo.save(sensor);
        }
        console.log("Дані успішно імпортовані в SQLite!");
    }
}