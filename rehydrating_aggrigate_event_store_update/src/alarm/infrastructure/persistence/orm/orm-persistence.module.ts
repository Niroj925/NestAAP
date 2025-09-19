import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { CreateAlarmRepository } from "src/alarm/application/port/create-alarm.repository";
import { OrmCreateAlarmRepository } from "./repositaries/create-alarm.repository";
import { AlarmItemEntity } from "./entities/alarm-item.entity";
import { FindAlarmRepository } from "src/alarm/application/port/find-alarm.repository";
import { OrmFindAlarmRepository } from "./repositaries/find-alarm.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/port/upsert-materialized-alarm.repository";
import { OrmUpsertMaterializedAlarmRepository } from "./repositaries/upsert-materialized-alarm.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from "./schemas/materialized-alarm-view.schema";

@Module({
    imports: [TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
        { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema }
    ])
    ],
    providers: [
        {
            provide: CreateAlarmRepository,
            useClass: OrmCreateAlarmRepository
        },
        {
            provide: FindAlarmRepository,
            useClass: OrmFindAlarmRepository
        },
        {
            provide: UpsertMaterializedAlarmRepository,
            useClass: OrmUpsertMaterializedAlarmRepository
        },
    ],
    exports: [CreateAlarmRepository, FindAlarmRepository, UpsertMaterializedAlarmRepository]
})
export class OrmAlarmPersistenceModule { }