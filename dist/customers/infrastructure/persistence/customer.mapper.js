"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMapper = void 0;
const customer_domain_1 = require("../../domain/customer.domain");
const customer_entity_1 = require("./customer.entity");
class CustomerMapper {
    static toDomain(entity) {
        if (!entity)
            return null;
        return new customer_domain_1.Customer(entity.id, entity.name, entity.email, entity.yearsAsCustomer, entity.createdAt);
    }
    static toPersistence(domain) {
        if (!domain)
            return null;
        const entity = new customer_entity_1.CustomerEntity();
        entity.id = domain.getId();
        entity.name = domain.getName();
        entity.email = domain.getEmail();
        entity.yearsAsCustomer = domain.getYearsAsCustomer();
        entity.createdAt = domain.getCreatedAt();
        return entity;
    }
}
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customer.mapper.js.map