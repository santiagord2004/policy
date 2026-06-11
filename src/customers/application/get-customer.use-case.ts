import { Inject } from '@nestjs/common';
import { Customer } from '../domain/customer.domain';
import { CustomerRepositoryPort } from '../domain/ports/customer-repository.port';
import { DomainNotFoundException } from '../../shared/exceptions/domain-exceptions';

export class GetCustomerUseCase {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepo: CustomerRepositoryPort,
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findById(id);
    if (!customer) {
      throw new DomainNotFoundException('Customer', id);
    }
    return customer;
  }
}
