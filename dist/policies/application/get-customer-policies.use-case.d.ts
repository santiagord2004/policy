import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { CustomerRepositoryPort } from '../../customers/domain/ports/customer-repository.port';
export declare class GetCustomerPoliciesUseCase {
    private readonly policyRepo;
    private readonly customerRepo;
    constructor(policyRepo: PolicyRepositoryPort, customerRepo: CustomerRepositoryPort);
    execute(customerId: string): Promise<Policy[]>;
}
