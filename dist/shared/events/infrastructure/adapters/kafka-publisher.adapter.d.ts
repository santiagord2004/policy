import { ClientProxy } from '@nestjs/microservices';
import { EventPublisherPort } from '../../domain/ports/event-publisher.port';
export declare class KafkaPublisherAdapter implements EventPublisherPort {
    private readonly client;
    constructor(client: ClientProxy);
    publish(eventName: string, event: any): Promise<void>;
}
