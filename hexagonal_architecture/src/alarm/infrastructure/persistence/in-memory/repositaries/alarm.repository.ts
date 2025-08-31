import { Injectable } from "@nestjs/common";
import { AlarmRepository } from "src/alarm/application/port/alarm.repository";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository{
  
 private readonly alarms=new Map<string,AlarmEntity>();

    async findAll(): Promise<Alarm[]> {
        const entities=Array.from(this.alarms.values());
        return entities.map((item)=>AlarmMapper.toDomain(item));
   }

    // async save(alarm:Alarm):Promise<Alarm>{
    //     const persistenceModel=AlarmMapper.toPersistence(alarm);
    //     this.alarms.set(persistenceModel.id,persistenceModel);
    //     const newEntity=this.alarms.get(persistenceModel.id);
    //     return AlarmMapper.toDomain(newEntity)
    // }

    async save(alarm: Alarm): Promise<Alarm> {
  const persistenceModel = AlarmMapper.toPersistence(alarm);
  this.alarms.set(persistenceModel.id, persistenceModel);
  return AlarmMapper.toDomain(persistenceModel);
}

}