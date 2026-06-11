import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { CustomerRepositoryPort } from '../../customers/domain/ports/customer-repository.port';
import { PolicyFactoryPort } from '../domain/ports/policy-factory.port';
import { RatingStrategyPort } from '../domain/ports/rating-strategy.port';
import { PolicyNumberSequencer } from './sequencer/policy-number-sequencer';
export declare class CreatePolicyUseCase {
    private readonly policyRepo;
    private readonly customerRepo;
    private readonly factories;
    private readonly strategies;
    private readonly sequencer;
    constructor(policyRepo: PolicyRepositoryPort, customerRepo: CustomerRepositoryPort, factories: Map<string, PolicyFactoryPort>, strategies: Map<string, RatingStrategyPort>, sequencer: PolicyNumberSequencer);
    execute(dto: {
        customerId: string;
        branch: string;
        ratingStrategy: string;
        riskProfile?: any;
    }): Promise<Policy>;
}
