import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
export declare class GetPolicyUseCase {
    private readonly policyRepo;
    constructor(policyRepo: PolicyRepositoryPort);
    execute(id: string): Promise<Policy>;
}
