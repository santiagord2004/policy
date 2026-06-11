import { Customer } from '../../domain/customer.domain';
import { CustomerEntity } from './customer.entity';

export class CustomerMapper {
  static toDomain(entity: CustomerEntity): Customer {
    if (!entity) return null;
    return new Customer(
      entity.id,
      entity.name,
      entity.email,
      entity.yearsAsCustomer,
      entity.createdAt
    );
  }

  static toPersistence(domain: Customer): CustomerEntity {
    if (!domain) return null;
    const entity = new CustomerEntity();
    entity.id = domain.getId();
    entity.name = domain.getName();
    entity.email = domain.getEmail();
    entity.yearsAsCustomer = domain.getYearsAsCustomer();
    entity.createdAt = domain.getCreatedAt();
    return entity;
  }
}
