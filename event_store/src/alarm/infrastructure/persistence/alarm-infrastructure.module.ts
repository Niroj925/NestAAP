import { Module } from '@nestjs/common';
import { OrmAlarmPersistenceModule } from './orm/orm-persistence.module';
import { InMemoryAlarmPersistenceModule } from './in-memory/in-memory-persistence.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[SharedModule],
  exports:[SharedModule]
})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModel =
      driver === 'orm'
        ? OrmAlarmPersistenceModule
        : InMemoryAlarmPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModel],
      exports: [persistenceModel],
    };
  }
}
