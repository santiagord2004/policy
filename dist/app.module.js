"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const customer_entity_1 = require("./customers/infrastructure/persistence/customer.entity");
const policy_entity_1 = require("./policies/infrastructure/persistence/policy.entity");
const customers_module_1 = require("./customers/customers.module");
const policies_module_1 = require("./policies/policies.module");
const notifications_module_1 = require("./notifications/notifications.module");
const shared_events_module_1 = require("./shared/events/shared-events.module");
const isPostgres = process.env.DB_TYPE === 'postgres';
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(isPostgres
                ? {
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    username: process.env.DB_USERNAME || 'postgres',
                    password: process.env.DB_PASSWORD || 'postgres_pass',
                    database: process.env.DB_DATABASE || 'insurance_db',
                    entities: [customer_entity_1.CustomerEntity, policy_entity_1.PolicyEntity],
                    synchronize: true,
                }
                : {
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [customer_entity_1.CustomerEntity, policy_entity_1.PolicyEntity],
                    synchronize: true,
                    dropSchema: true,
                }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
            }),
            customers_module_1.CustomersModule,
            policies_module_1.PoliciesModule,
            notifications_module_1.NotificationsModule,
            shared_events_module_1.SharedEventsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map