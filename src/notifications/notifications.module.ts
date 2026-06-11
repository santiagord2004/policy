import { Module } from '@nestjs/common';
import { NotificationsConsumer } from './infrastructure/consumers/notifications.consumer';
import { AuditConsumer } from './infrastructure/consumers/audit.consumer';

@Module({
  providers: [
    NotificationsConsumer,
    AuditConsumer,
  ],
})
export class NotificationsModule {}
