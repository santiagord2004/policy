import { Repository } from 'typeorm';
import { CustomerRepositoryPort } from '../../domain/ports/customer-repository.port';
import { Customer } from '../../domain/customer.domain';
import { CustomerEntity } from './customer.entity';
export declare class TypeOrmCustomerRepositoryAdapter implements CustomerRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<CustomerEntity>);
    save(customer: Customer): Promise<Customer>;
    findById(id: string): Promise<Customer | null>;
    findByEmail(email: string): Promise<Customer | null>;
}
