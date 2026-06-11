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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_customer_use_case_1 = require("../../application/create-customer.use-case");
const get_customer_use_case_1 = require("../../application/get-customer.use-case");
const create_customer_dto_1 = require("./dto/create-customer.dto");
let CustomerController = class CustomerController {
    constructor(createCustomerUseCase, getCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.getCustomerUseCase = getCustomerUseCase;
    }
    async create(createCustomerDto) {
        const customer = await this.createCustomerUseCase.execute(createCustomerDto);
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            yearsAsCustomer: customer.getYearsAsCustomer(),
            createdAt: customer.getCreatedAt(),
        };
    }
    async getById(id) {
        const customer = await this.getCustomerUseCase.execute(id);
        return {
            id: customer.getId(),
            name: customer.getName(),
            email: customer.getEmail(),
            yearsAsCustomer: customer.getYearsAsCustomer(),
            createdAt: customer.getCreatedAt(),
        };
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Customer successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already exists.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a customer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getById", null);
exports.CustomerController = CustomerController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, common_1.Controller)('api/customers'),
    __metadata("design:paramtypes", [create_customer_use_case_1.CreateCustomerUseCase,
        get_customer_use_case_1.GetCustomerUseCase])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map