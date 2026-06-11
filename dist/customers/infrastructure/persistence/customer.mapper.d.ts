import { Customer } from '../../domain/customer.domain';
import { CustomerEntity } from './customer.entity';
export declare class CustomerMapper {
    static toDomain(entity: CustomerEntity): Customer;
    static toPersistence(domain: Customer): CustomerEntity;
}
