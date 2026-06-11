"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsConsumer = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const microservices_1 = require("@nestjs/microservices");
let NotificationsConsumer = class NotificationsConsumer {
    handleLocalEvent(payload) {
        this.processEvent('LOCAL-EVENT-EMITTER', payload);
    }
    handleKafkaIssued(data) {
        this.processEvent('KAFKA-TOPIC-ISSUED', data);
    }
    handleKafkaActivated(data) {
        this.processEvent('KAFKA-TOPIC-ACTIVATED', data);
    }
    handleKafkaSuspended(data) {
        this.processEvent('KAFKA-TOPIC-SUSPENDED', data);
    }
    handleKafkaCancelled(data) {
        this.processEvent('KAFKA-TOPIC-CANCELLED', data);
    }
    processEvent(source, payload) {
        console.log(`[NotificationsConsumer] [${source}] Enviar alerta de notificacion. Datos del evento:`, JSON.stringify(payload, null, 2));
    }
};
exports.NotificationsConsumer = NotificationsConsumer;
__decorate([
    (0, event_emitter_1.OnEvent)('policy.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsConsumer.prototype, "handleLocalEvent", null);
__decorate([
    (0, microservices_1.EventPattern)('policy.issued'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsConsumer.prototype, "handleKafkaIssued", null);
__decorate([
    (0, microservices_1.EventPattern)('policy.activated'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsConsumer.prototype, "handleKafkaActivated", null);
__decorate([
    (0, microservices_1.EventPattern)('policy.suspended'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsConsumer.prototype, "handleKafkaSuspended", null);
__decorate([
    (0, microservices_1.EventPattern)('policy.cancelled'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsConsumer.prototype, "handleKafkaCancelled", null);
exports.NotificationsConsumer = NotificationsConsumer = __decorate([
    (0, common_1.Injectable)()
], NotificationsConsumer);
//# sourceMappingURL=notifications.consumer.js.map