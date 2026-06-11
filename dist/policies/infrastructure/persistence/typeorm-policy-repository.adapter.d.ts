import { Repository } from 'typeorm';
import { PolicyRepositoryPort } from '../../domain/ports/policy-repository.port';
import { Policy } from '../../domain/policy.domain';
import { PolicyEntity } from './policy.entity';
export declare class TypeOrmPolicyRepositoryAdapter implements PolicyRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<PolicyEntity>);
    save(policy: Policy): Promise<Policy>;
    findById(id: string): Promise<Policy | null>;
    findByCustomerId(customerId: string): Promise<Policy[]>;
}
