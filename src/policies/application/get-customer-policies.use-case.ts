import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { CustomerRepositoryPort } from '../../customers/domain/ports/customer-repository.port';
import { DomainNotFoundException } from '../../shared/exceptions/domain-exceptions';

@Injectable()
export class GetCustomerPoliciesUseCase {
  constructor(
    @Inject('PolicyRepositoryPort')
    private readonly policyRepo: PolicyRepositoryPort,
    @Inject('CustomerRepositoryPort')
    private readonly customerRepo: CustomerRepositoryPort,
  ) {}

  async execute(customerId: string): Promise<Policy[]> {
    const customer = await this.customerRepo.findById(customerId);
    if (!customer) {
      throw new DomainNotFoundException('Customer', customerId);
    }
    return this.policyRepo.findByCustomerId(customerId);
  }
}
