import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreateAlarmCommand } from './create-alarm.command';
import { AlarmFactory } from 'src/alarm/domain/factories/alarm.factory';

//this decorator is used to register the command handler
@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand> { //implement Icommandhandler interface 
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
  ) {}
  //original message passed as a parameter in this method 
  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );

    const alarm = this.alarmFactory.create(
      command.name, 
      command.severity,
      command.triggeredAt,
      command.items
    );
  this.eventPublisher.mergeObjectContext(alarm);
  alarm.commit();
  return alarm;
  }
}