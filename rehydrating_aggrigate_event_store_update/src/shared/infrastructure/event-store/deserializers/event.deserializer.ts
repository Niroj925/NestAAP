import { Injectable, Type } from '@nestjs/common';
import { AlarmCreatedEvent } from 'src/alarm/domain/events/alarm-created.event';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-events';
import { Event } from '../schemas/event.schema';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(type: string): any {
    return EventClsRegistry.get(type);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ): T {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}