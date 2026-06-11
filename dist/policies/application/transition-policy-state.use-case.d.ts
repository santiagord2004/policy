import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { EventPublisherPort } from '../../shared/events/domain/ports/event-publisher.port';
export declare class TransitionPolicyStateUseCase {
    private readonly policyRepo;
    private readonly eventPublisher;
    constructor(policyRepo: PolicyRepositoryPort, eventPublisher: EventPublisherPort);
    execute(id: string, targetStatus: string): Promise<Policy>;
}
