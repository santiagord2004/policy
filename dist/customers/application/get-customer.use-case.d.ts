import { Customer } from '../domain/customer.domain';
import { CustomerRepositoryPort } from '../domain/ports/customer-repository.port';
export declare class GetCustomerUseCase {
    private readonly customerRepo;
    constructor(customerRepo: CustomerRepositoryPort);
    execute(id: string): Promise<Customer>;
}
