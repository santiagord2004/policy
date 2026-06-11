import { Customer } from '../domain/customer.domain';
import { CustomerRepositoryPort } from '../domain/ports/customer-repository.port';
export declare class CreateCustomerUseCase {
    private readonly customerRepo;
    constructor(customerRepo: CustomerRepositoryPort);
    execute(dto: {
        name: string;
        email: string;
        yearsAsCustomer: number;
    }): Promise<Customer>;
}
