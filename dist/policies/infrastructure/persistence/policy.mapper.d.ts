import { Policy } from '../../domain/policy.domain';
import { PolicyEntity } from './policy.entity';
export declare class PolicyMapper {
    static toDomain(entity: PolicyEntity): Policy;
    static toPersistence(domain: Policy): PolicyEntity;
}
