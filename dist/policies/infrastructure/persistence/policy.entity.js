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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyEntity = void 0;
const typeorm_1 = require("typeorm");
let PolicyEntity = class PolicyEntity {
};
exports.PolicyEntity = PolicyEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PolicyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'policy_number', unique: true }),
    __metadata("design:type", String)
], PolicyEntity.prototype, "policyNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", String)
], PolicyEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PolicyEntity.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Object)
], PolicyEntity.prototype, "coverage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_premium', type: 'float' }),
    __metadata("design:type", Number)
], PolicyEntity.prototype, "basePremium", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_premium', type: 'float' }),
    __metadata("design:type", Number)
], PolicyEntity.prototype, "monthlyPremium", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PolicyEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risk_profile', type: 'simple-json' }),
    __metadata("design:type", Object)
], PolicyEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_months' }),
    __metadata("design:type", Number)
], PolicyEntity.prototype, "durationMonths", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PolicyEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PolicyEntity.prototype, "updatedAt", void 0);
exports.PolicyEntity = PolicyEntity = __decorate([
    (0, typeorm_1.Entity)('policies')
], PolicyEntity);
//# sourceMappingURL=policy.entity.js.map