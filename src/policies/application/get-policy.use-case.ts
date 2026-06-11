import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { DomainNotFoundException } from '../../shared/exceptions/domain-exceptions';

@Injectable()
export class GetPolicyUseCase {
  constructor(
    @Inject('PolicyRepositoryPort')
    private readonly policyRepo: PolicyRepositoryPort,
  ) {}

  async execute(id: string): Promise<Policy> {
    const policy = await this.policyRepo.findById(id);
    if (!policy) {
      throw new DomainNotFoundException('Policy', id);
    }
    return policy;
  }
}
