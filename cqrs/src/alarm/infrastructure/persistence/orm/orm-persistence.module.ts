import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { AlarmRepository } from "src/alarm/application/port/alarm.repository";
import { OrmAlarmRepository } from "./repositaries/alarm.repository";

@Module({
    imports:[TypeOrmModule.forFeature([AlarmEntity])],
    providers:[
        {
            //using alarmrepository token  here this use to another module too that's why it bind port and adaptor  
            provide:AlarmRepository,
            useClass:OrmAlarmRepository
        },
    ],
    exports:[AlarmRepository]
})
export class OrmAlarmPersistenceModule{}