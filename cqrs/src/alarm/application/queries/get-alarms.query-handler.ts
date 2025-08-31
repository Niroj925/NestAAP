import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmRepository } from "../port/alarm.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler 
implements IQueryHandler<GetAlarmsQuery>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(query: GetAlarmsQuery):Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
