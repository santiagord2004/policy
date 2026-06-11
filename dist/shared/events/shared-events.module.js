"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedEventsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const event_emitter_publisher_adapter_1 = require("./infrastructure/adapters/event-emitter-publisher.adapter");
const kafka_publisher_adapter_1 = require("./infrastructure/adapters/kafka-publisher.adapter");
const kafkaBootstrap = process.env.KAFKA_BOOTSTRAP_SERVERS;
let SharedEventsModule = class SharedEventsModule {
};
exports.SharedEventsModule = SharedEventsModule;
exports.SharedEventsModule = SharedEventsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: kafkaBootstrap
            ? [
                microservices_1.ClientsModule.register([
                    {
                        name: 'KAFKA_SERVICE',
                        transport: microservices_1.Transport.KAFKA,
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
            event_emitter_publisher_adapter_1.EventEmitterPublisherAdapter,
            ...(kafkaBootstrap ? [kafka_publisher_adapter_1.KafkaPublisherAdapter] : []),
            {
                provide: 'EventPublisherPort',
                useClass: kafkaBootstrap ? kafka_publisher_adapter_1.KafkaPublisherAdapter : event_emitter_publisher_adapter_1.EventEmitterPublisherAdapter,
            },
        ],
        exports: ['EventPublisherPort'],
    })
], SharedEventsModule);
//# sourceMappingURL=shared-events.module.js.map