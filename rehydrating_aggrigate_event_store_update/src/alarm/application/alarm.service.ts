import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';
import { AcknowledgeAlarmCommand } from './commands/acknowledge-alarm.command';

@Injectable()
export class AlarmService {
  constructor(
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

  acknowledge(id:string){
    return this.commandBus.execute(new AcknowledgeAlarmCommand(id))
  }
}