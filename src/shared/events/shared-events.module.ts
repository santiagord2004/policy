import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterPublisherAdapter } from './infrastructure/adapters/event-emitter-publisher.adapter';
import { KafkaPublisherAdapter } from './infrastructure/adapters/kafka-publisher.adapter';

const kafkaBootstrap = process.env.KAFKA_BOOTSTRAP_SERVERS;

@Global()
@Module({
  imports: kafkaBootstrap
    ? [
        ClientsModule.register([
          {
            name: 'KAFKA_SERVICE',
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'insurance-publisher',
                brokers: [kafkaBootstrap],
              },
            },
          },
        ]),
      ]
    : [],
  providers: [
    EventEmitterPublisherAdapter,
    ...(kafkaBootstrap ? [KafkaPublisherAdapter] : []),
    {
      provide: 'EventPublisherPort',
      useClass: kafkaBootstrap ? KafkaPublisherAdapter : EventEmitterPublisherAdapter,
    },
  ],
  exports: ['EventPublisherPort'],
})
export class SharedEventsModule {}
