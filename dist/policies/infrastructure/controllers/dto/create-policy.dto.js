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
exports.CreatePolicyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePolicyDto {
}
exports.CreatePolicyDto = CreatePolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Customer UUID', example: 'd3b07384-d113-49cd-a5d6-89d0cf319985' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'customerId is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Insurance branch type (AUTO, LIFE, HOME, HEALTH)', example: 'AUTO' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'branch is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rating strategy (STANDARD, RISK_BASED, LOYALTY)', example: 'RISK_BASED' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ratingStrategy is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "ratingStrategy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Risk profile data needed for rating strategies',
        example: { score: 45 },
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePolicyDto.prototype, "riskProfile", void 0);
//# sourceMappingURL=create-policy.dto.js.map