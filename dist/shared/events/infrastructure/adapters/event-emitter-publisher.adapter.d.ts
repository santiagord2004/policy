import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPublisherPort } from '../../domain/ports/event-publisher.port';
export declare class EventEmitterPublisherAdapter implements EventPublisherPort {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    publish(eventName: string, event: any): Promise<void>;
}
