//to handle domain layer events in application

import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../port/upsert-materialized-alarm.repository";
import { Logger } from "@nestjs/common";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler implements IEventHandler<AlarmCreatedEvent> {

  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository
  ) {}

  async handle(event: AlarmCreatedEvent) {
    this.logger.log(`Handling AlarmCreatedEvent for alarm ID: ${event.alarm.id}`);
   await this.upsertMaterializedAlarmRepository.upsert({
    id:event.alarm.id,
    name:event.alarm.name,
    severity:event.alarm.severity.value,
    triggeredAt:event.alarm.triggeredAt,
    isAcknowledged:event.alarm.isAcknowledged,
    items:event.alarm.items
   });
  }
}