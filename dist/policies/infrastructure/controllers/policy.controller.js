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
exports.PolicyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_policy_use_case_1 = require("../../application/create-policy.use-case");
const get_policy_use_case_1 = require("../../application/get-policy.use-case");
const get_customer_policies_use_case_1 = require("../../application/get-customer-policies.use-case");
const transition_policy_state_use_case_1 = require("../../application/transition-policy-state.use-case");
const create_policy_dto_1 = require("./dto/create-policy.dto");
const update_policy_status_dto_1 = require("./dto/update-policy-status.dto");
let PolicyController = class PolicyController {
    constructor(createPolicyUseCase, getPolicyUseCase, getCustomerPoliciesUseCase, transitionPolicyStateUseCase) {
        this.createPolicyUseCase = createPolicyUseCase;
        this.getPolicyUseCase = getPolicyUseCase;
        this.getCustomerPoliciesUseCase = getCustomerPoliciesUseCase;
        this.transitionPolicyStateUseCase = transitionPolicyStateUseCase;
    }
    async create(createPolicyDto) {
        const policy = await this.createPolicyUseCase.execute(createPolicyDto);
        return this.mapResponse(policy);
    }
    async getById(id) {
        const policy = await this.getPolicyUseCase.execute(id);
        return this.mapResponse(policy);
    }
    async getByCustomer(customerId) {
        const policies = await this.getCustomerPoliciesUseCase.execute(customerId);
        return policies.map(p => this.mapResponse(p));
    }
    async changeStatus(id, updateStatusDto) {
        const policy = await this.transitionPolicyStateUseCase.execute(id, updateStatusDto.targetStatus);
        return this.mapResponse(policy);
    }
    mapResponse(policy) {
        return {
            id: policy.getId(),
            policyNumber: policy.getPolicyNumber(),
            customerId: policy.getCustomerId(),
            branch: policy.getBranch(),
            coverage: policy.getCoverage(),
            basePremium: policy.getBasePremium(),
            monthlyPremium: policy.getMonthlyPremium(),
            status: policy.getStatus(),
            riskProfile: policy.getRiskProfile(),
            durationMonths: policy.getDurationMonths(),
            createdAt: policy.getCreatedAt(),
            updatedAt: policy.getUpdatedAt(),
        };
    }
};
exports.PolicyController = PolicyController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new policy quote' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Policy quote successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid risk profile or parameters.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_policy_dto_1.CreatePolicyDto]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get policy details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Policy found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Policy not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get policies for a customer' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of customer policies.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "getByCustomer", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Change policy state' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Policy UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Policy status changed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid state transition.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Policy not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_policy_status_dto_1.UpdatePolicyStatusDto]),
    __metadata("design:returntype", Promise)
], PolicyController.prototype, "changeStatus", null);
exports.PolicyController = PolicyController = __decorate([
    (0, swagger_1.ApiTags)('Policies'),
    (0, common_1.Controller)('api/policies'),
    __metadata("design:paramtypes", [create_policy_use_case_1.CreatePolicyUseCase,
        get_policy_use_case_1.GetPolicyUseCase,
        get_customer_policies_use_case_1.GetCustomerPoliciesUseCase,
        transition_policy_state_use_case_1.TransitionPolicyStateUseCase])
], PolicyController);
//# sourceMappingURL=policy.controller.js.map