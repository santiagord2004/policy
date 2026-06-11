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
exports.CreateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const customer_domain_1 = require("../domain/customer.domain");
const domain_exceptions_1 = require("../../shared/exceptions/domain-exceptions");
let CreateCustomerUseCase = class CreateCustomerUseCase {
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async execute(dto) {
        const existing = await this.customerRepo.findByEmail(dto.email);
        if (existing) {
            throw new domain_exceptions_1.DomainDuplicateException(`Customer with email ${dto.email} already exists.`);
        }
        const customer = new customer_domain_1.Customer(crypto.randomUUID(), dto.name, dto.email, dto.yearsAsCustomer, new Date());
        return this.customerRepo.save(customer);
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = __decorate([
    __param(0, (0, common_1.Inject)('CustomerRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.use-case.js.map