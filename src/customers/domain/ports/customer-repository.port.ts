import { Customer } from '../customer.domain';

export interface CustomerRepositoryPort {
  save(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
}
// Note: We also added findByEmail to check for duplicates when creating a customer.
