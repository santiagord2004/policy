import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicyRepositoryPort } from '../../domain/ports/policy-repository.port';
import { Policy } from '../../domain/policy.domain';
import { PolicyEntity } from './policy.entity';
import { PolicyMapper } from './policy.mapper';

@Injectable()
export class TypeOrmPolicyRepositoryAdapter implements PolicyRepositoryPort {
  constructor(
    @InjectRepository(PolicyEntity)
    private readonly repo: Repository<PolicyEntity>,
  ) {}

  async save(policy: Policy): Promise<Policy> {
    const entity = PolicyMapper.toPersistence(policy);
    const saved = await this.repo.save(entity);
    return PolicyMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Policy | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? PolicyMapper.toDomain(entity) : null;
  }

  async findByCustomerId(customerId: string): Promise<Policy[]> {
    const entities = await this.repo.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });
    return entities.map(entity => PolicyMapper.toDomain(entity));
  }
}
