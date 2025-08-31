import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.commands';
import { AlarmRepository } from './port/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmService {
  constructor(
    private readonly alarmRepository:AlarmRepository,
    private readonly alarmFactory:AlarmFactory,
  ){}
  create(createAlarmCommand: CreateAlarmCommand) {
  const alarm=this.alarmFactory.create(
    createAlarmCommand.name,
    createAlarmCommand.severity
  );
  return this.alarmRepository.save(alarm);
 
  }

  findAll() {
    return this.alarmRepository.findAll();
  }


}
