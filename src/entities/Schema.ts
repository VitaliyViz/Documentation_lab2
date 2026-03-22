import { Entity, PrimaryColumn, Column, ManyToOne, ChildEntity, TableInheritance, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hub {
    @PrimaryColumn() serialNumber!: string;
    @Column() ipAddress!: string;
}

@Entity()
@TableInheritance({ column: { type: "string", name: "type" } })
export abstract class Sensor {
    @PrimaryColumn() id!: string;
    @Column() batteryLevel!: number;
    
    @ManyToOne(() => Hub)
    hub!: Hub;
}

@ChildEntity("Motion")
export class MotionProtect extends Sensor {
    @Column({ type: "float", nullable: true }) sensitivity!: number;
}

@ChildEntity("Door")
export class DoorProtect extends Sensor {
    @Column({ type: "boolean", nullable: true }) isOpen!: boolean;
}