import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class NotificationsConsumer {
  // Support local event emitter fallback
  @OnEvent('policy.*')
  handleLocalEvent(payload: any) {
    this.processEvent('LOCAL-EVENT-EMITTER', payload);
  }

  // Support Kafka topics if Kafka microservice is booted
  @EventPattern('policy.issued')
  handleKafkaIssued(@Payload() data: any) {
    this.processEvent('KAFKA-TOPIC-ISSUED', data);
  }

  @EventPattern('policy.activated')
  handleKafkaActivated(@Payload() data: any) {
    this.processEvent('KAFKA-TOPIC-ACTIVATED', data);
  }

  @EventPattern('policy.suspended')
  handleKafkaSuspended(@Payload() data: any) {
    this.processEvent('KAFKA-TOPIC-SUSPENDED', data);
  }

  @EventPattern('policy.cancelled')
  handleKafkaCancelled(@Payload() data: any) {
    this.processEvent('KAFKA-TOPIC-CANCELLED', data);
  }

  private processEvent(source: string, payload: any) {
    console.log(
      `[NotificationsConsumer] [${source}] Enviar alerta de notificacion. Datos del evento:`, 
      JSON.stringify(payload, null, 2)
    );
  }
}
