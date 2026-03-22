import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hub, Sensor, MotionProtect, DoorProtect } from "./entities/Schema";
import { ImportService } from "./services/ImportService";
import { IHubRepository } from "./repositories/IHubRepository";
import { ISensorRepository } from "./repositories/ISensorRepository";

// 1. Налаштування підключення до SQLite
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, // Автоматично створить таблиці на основі класів
    entities: [Hub, Sensor, MotionProtect, DoorProtect],
});

// 2. Реалізація репозиторіїв (те, що вимагає лаба)
const HubRepo: IHubRepository = {
    async save(hub) { await AppDataSource.getRepository(Hub).save(hub); },
    async findOne(sn) { return await AppDataSource.getRepository(Hub).findOneBy({ serialNumber: sn }); }
};

const SensorRepo: ISensorRepository = {
    async save(sensor) { await AppDataSource.getRepository(Sensor).save(sensor); }
};

// 3. Запуск
AppDataSource.initialize().then(async () => {
    console.log("💾 База даних готова!");

    const importService = new ImportService(HubRepo, SensorRepo);
    await importService.runImport("data.csv");

}).catch(error => console.log("Помилка БД: ", error));