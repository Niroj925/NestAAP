import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FindAlarmRepository } from "src/alarm/application/port/find-alarm.repository";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@Injectable()
export class OrmFindAlarmRepository implements FindAlarmRepository {
    constructor(
        @InjectModel(MaterializedAlarmView.name)
        private readonly alarmModel: Model<MaterializedAlarmView>,
    ) { }

    // async findById(id: string): Promise<Alarm | null> {
    //     const entity = await this.alarmModel.findOne({ where: { id } });
    //     return entity ? AlarmMapper.toDomain(entity) : null;
    // }

    async findAll(): Promise<AlarmReadModel[]> {
        return await this.alarmModel.find();
    }
}