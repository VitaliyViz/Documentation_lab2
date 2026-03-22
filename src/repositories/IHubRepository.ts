import { Hub } from "../entities/Schema";
export interface IHubRepository {
    save(hub: Hub): Promise<void>;
    findOne(sn: string): Promise<Hub | null>;
}