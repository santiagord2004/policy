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
exports.CreatePolicyUseCase = void 0;
const common_1 = require("@nestjs/common");
const policy_number_sequencer_1 = require("./sequencer/policy-number-sequencer");
const policy_builder_1 = require("./builders/policy.builder");
const domain_exceptions_1 = require("../../shared/exceptions/domain-exceptions");
let CreatePolicyUseCase = class CreatePolicyUseCase {
    constructor(policyRepo, customerRepo, factories, strategies, sequencer) {
        this.policyRepo = policyRepo;
        this.customerRepo = customerRepo;
        this.factories = factories;
        this.strategies = strategies;
        this.sequencer = sequencer;
    }
    async execute(dto) {
        const customer = await this.customerRepo.findById(dto.customerId);
        if (!customer) {
            throw new domain_exceptions_1.DomainNotFoundException('Customer', dto.customerId);
        }
        const branchUpper = (dto.branch || '').toUpperCase();
        const factory = this.factories.get(branchUpper);
        if (!factory) {
            throw new domain_exceptions_1.DomainValidationException(`Branch '${dto.branch}' is not supported. Available: ${Array.from(this.factories.keys()).join(', ')}`);
        }
        const strategyUpper = (dto.ratingStrategy || '').toUpperCase();
        const strategy = this.strategies.get(strategyUpper);
        if (!strategy) {
            throw new domain_exceptions_1.DomainValidationException(`Strategy '${dto.ratingStrategy}' is not supported. Available: ${Array.from(this.strategies.keys()).join(', ')}`);
        }
        const basePremium = factory.getBasePremium();
        const coverage = factory.createDefaultCoverage();
        const durationMonths = factory.getDefaultDurationMonths();
        const inputRiskProfile = dto.riskProfile || {};
        const finalRiskProfile = {
            ...inputRiskProfile,
            yearsAsCustomer: customer.getYearsAsCustomer(),
        };
        strategy.validate(finalRiskProfile);
        const monthlyPremium = strategy.calculatePremium(basePremium, finalRiskProfile);
        const policyNumber = this.sequencer.getNext();
        const policy = new policy_builder_1.PolicyBuilder()
            .customerId(dto.customerId)
            .branch(branchUpper)
            .coverage(coverage)
            .basePremium(basePremium)
            .monthlyPremium(monthlyPremium)
            .riskProfile(finalRiskProfile)
            .durationMonths(durationMonths)
            .policyNumber(policyNumber)
            .build();
        return this.policyRepo.save(policy);
    }
};
exports.CreatePolicyUseCase = CreatePolicyUseCase;
exports.CreatePolicyUseCase = CreatePolicyUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PolicyRepositoryPort')),
    __param(1, (0, common_1.Inject)('CustomerRepositoryPort')),
    __param(2, (0, common_1.Inject)('POLICY_FACTORIES_MAP')),
    __param(3, (0, common_1.Inject)('RATING_STRATEGIES_MAP')),
    __metadata("design:paramtypes", [Object, Object, Map,
        Map,
        policy_number_sequencer_1.PolicyNumberSequencer])
], CreatePolicyUseCase);
//# sourceMappingURL=create-policy.use-case.js.map