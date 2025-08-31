//to handle domain layer events in application

import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { AlarmRepository } from "../port/alarm.repository";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler implements IEventHandler<AlarmCreatedEvent> {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async handle(event: AlarmCreatedEvent) {
    // Handle the event (e.g., persist the alarm to the database)
    await this.alarmRepository.save(event.alarm);
  }
}