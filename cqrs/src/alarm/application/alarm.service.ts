import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './port/alarm.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(createAlarmCommand: CreateAlarmCommand) {
    //command handle implementation
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    //query handle implementation
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}