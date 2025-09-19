import { Alarm } from "../alarm";

//event sourcing pattern 

//there are two types of events in event sourcing: domain events and integration events
//domain events are used to model the state changes within the application
//integration events are used to communicate state changes to other systems
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}