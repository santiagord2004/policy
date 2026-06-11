import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPublisherPort } from '../../domain/ports/event-publisher.port';

@Injectable()
export class EventEmitterPublisherAdapter implements EventPublisherPort {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(eventName: string, event: any): Promise<void> {
    this.eventEmitter.emit(eventName, event);
  }
}
