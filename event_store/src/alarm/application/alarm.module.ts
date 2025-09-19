import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmService } from './alarm.service';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmFactory, CreateAlarmCommandHandler, GetAlarmsQueryHandler, AlarmCreatedEventHandler],
})
export class AlarmModule {
  static withInfrastructure(infrastrutureModule: Type | DynamicModule) {
    return {
      module: AlarmModule,
      imports: [infrastrutureModule],
    };
  }
}
