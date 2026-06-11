"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(id, name, email, yearsAsCustomer, createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.yearsAsCustomer = yearsAsCustomer;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getYearsAsCustomer() {
        return this.yearsAsCustomer;
    }
    getCreatedAt() {
        return this.createdAt;
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.domain.js.map