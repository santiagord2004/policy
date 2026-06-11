import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Entities
import { CustomerEntity } from './customers/infrastructure/persistence/customer.entity';
import { PolicyEntity } from './policies/infrastructure/persistence/policy.entity';

// Modules
import { CustomersModule } from './customers/customers.module';
import { PoliciesModule } from './policies/policies.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedEventsModule } from './shared/events/shared-events.module';

const isPostgres = process.env.DB_TYPE === 'postgres';

@Module({
  imports: [
    // Dynamic database selection (Postgres for docker/prod, SQLite in-memory for local development/testing)
    TypeOrmModule.forRoot(
      isPostgres
        ? {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres_pass',
            database: process.env.DB_DATABASE || 'insurance_db',
            entities: [CustomerEntity, PolicyEntity],
            synchronize: true, // For development and demo purposes
          }
        : {
            type: 'sqlite',
            database: ':memory:',
            entities: [CustomerEntity, PolicyEntity],
            synchronize: true,
            dropSchema: true,
          },
    ),

    // Local Event Emitter for fallback mode
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),

    CustomersModule,
    PoliciesModule,
    NotificationsModule,
    SharedEventsModule,
  ],
})
export class AppModule {}
