import { Module } from '@nestjs/common';
import { CreateAlarmRepository } from 'src/alarm/application/port/create-alarm.repository';
import { InMemoryAlarmRepository } from './repositaries/alarm.repository';
import { FindAlarmRepository } from 'src/alarm/application/port/find-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarm/application/port/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: FindAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository,
    }
  ],
  exports: [CreateAlarmRepository, FindAlarmRepository, UpsertMaterializedAlarmRepository],
})
export class InMemoryAlarmPersistenceModule { }
