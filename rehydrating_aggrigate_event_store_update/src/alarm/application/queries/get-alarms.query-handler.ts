import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";
import { FindAlarmRepository } from "../port/find-alarm.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler 
implements IQueryHandler<GetAlarmsQuery,AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmRepository) {}

  async execute(query: GetAlarmsQuery):Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
