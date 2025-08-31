import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateAlarmCommand } from './create-alarm.command';
import { AlarmRepository } from '../port/alarm.repository';
import { AlarmFactory } from 'src/alarm/domain/factories/alarm.factory';
import { AlarmCreatedEvent } from 'src/alarm/domain/events/alarm-created.event';

//this decorator is used to register the command handler
@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand> { //implement Icommandhandler interface 
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}
  //original message passed as a parameter in this method 
  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(command.name, command.severity);
  const newAlarm = await this.alarmRepository.save(alarm);

  //this should be handle from aggrigate not from command handler
    this.eventBus.publish(new AlarmCreatedEvent(alarm));
    return newAlarm;
  }
}