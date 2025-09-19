import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAlarmRepository } from "src/alarm/application/port/create-alarm.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { Repository } from "typeorm";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository{
    constructor(
        @InjectRepository(AlarmEntity)
        private readonly alarmRepository:Repository<AlarmEntity>,
    ){}

    async save(alarm:Alarm):Promise<Alarm>{
        const persistenceModel=AlarmMapper.toPersistence(alarm);
        const newEntity=await this.alarmRepository.save(persistenceModel);
        return AlarmMapper.toDomain(newEntity);
    }

}