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
exports.GetCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const domain_exceptions_1 = require("../../shared/exceptions/domain-exceptions");
let GetCustomerUseCase = class GetCustomerUseCase {
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async execute(id) {
        const customer = await this.customerRepo.findById(id);
        if (!customer) {
            throw new domain_exceptions_1.DomainNotFoundException('Customer', id);
        }
        return customer;
    }
};
exports.GetCustomerUseCase = GetCustomerUseCase;
exports.GetCustomerUseCase = GetCustomerUseCase = __decorate([
    __param(0, (0, common_1.Inject)('CustomerRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], GetCustomerUseCase);
//# sourceMappingURL=get-customer.use-case.js.map