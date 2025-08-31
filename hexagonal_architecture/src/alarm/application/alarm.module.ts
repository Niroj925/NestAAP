import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmService } from './alarm.service';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmFactory],
})
export class AlarmModule {
  static withInfrastructure(infrastrutureModule: Type | DynamicModule) {
    return {
      module: AlarmModule,
      imports: [infrastrutureModule],
    };
  }
}
