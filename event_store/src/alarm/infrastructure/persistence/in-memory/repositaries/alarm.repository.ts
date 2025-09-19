import { Injectable } from "@nestjs/common";
import { CreateAlarmRepository } from "src/alarm/application/port/create-alarm.repository";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { FindAlarmRepository } from "src/alarm/application/port/find-alarm.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/port/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@Injectable()
export class InMemoryAlarmRepository implements
  CreateAlarmRepository,
  FindAlarmRepository,
  UpsertMaterializedAlarmRepository {

  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values()).flat();
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id)!;
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>
  ): Promise<void> {
    // if (this.materializedAlarmViews.has(alarm.id)) {
    //   this.materializedAlarmViews.set(alarm.id, {
    //     ...this.materializedAlarmViews.get(alarm.id),
    //     ...alarm,
    //   });
    //   return;
    // }
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        id: alarm.id,
        name: alarm.name ?? '',
        severity: alarm.severity ?? 'low',
        triggeredAt: alarm.triggeredAt ?? new Date(),
        isAcknowledged: alarm.isAcknowledged ?? false,
        items: alarm.items ?? [],
      });
    }

    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}