import { Module } from '@nestjs/common';
import { AlarmRepository } from 'src/alarm/application/port/alarm.repository';
import { InMemoryAlarmRepository } from './repositaries/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      //using alarmrepository token  here this use to another module too that's why it bind port and adaptor
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class InMemoryAlarmPersistenceModule {}
