import { Inject } from '@nestjs/common';
import * as crypto from 'crypto';
import { Customer } from '../domain/customer.domain';
import { CustomerRepositoryPort } from '../domain/ports/customer-repository.port';
import { DomainDuplicateException } from '../../shared/exceptions/domain-exceptions';

export class CreateCustomerUseCase {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepo: CustomerRepositoryPort,
  ) {}

  async execute(dto: { name: string; email: string; yearsAsCustomer: number }): Promise<Customer> {
    const existing = await this.customerRepo.findByEmail(dto.email);
    if (existing) {
      throw new DomainDuplicateException(`Customer with email ${dto.email} already exists.`);
    }

    const customer = new Customer(
      crypto.randomUUID(),
      dto.name,
      dto.email,
      dto.yearsAsCustomer,
      new Date()
    );

    return this.customerRepo.save(customer);
  }
}
