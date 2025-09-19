import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

export abstract class FindAlarmRepository {
    // abstract findById(id: string): Promise<Alarm | null>;
    abstract findAll(): Promise<AlarmReadModel[]>;
}