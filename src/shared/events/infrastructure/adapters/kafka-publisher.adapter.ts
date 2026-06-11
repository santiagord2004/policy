import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisherPort } from '../../domain/ports/event-publisher.port';

@Injectable()
export class KafkaPublisherAdapter implements EventPublisherPort {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async publish(eventName: string, event: any): Promise<void> {
    // NestJS client.emit sends an event-style message to Kafka using the eventName as the topic
    this.client.emit(eventName, event);
    console.log(`[KafkaPublisherAdapter] Evento publicado en Kafka. Tema: '${eventName}'`);
  }
}
