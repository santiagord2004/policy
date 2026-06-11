import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { EventPublisherPort } from '../../shared/events/domain/ports/event-publisher.port';
import { 
  DomainNotFoundException, 
  DomainValidationException 
} from '../../shared/exceptions/domain-exceptions';

@Injectable()
export class TransitionPolicyStateUseCase {
  constructor(
    @Inject('PolicyRepositoryPort')
    private readonly policyRepo: PolicyRepositoryPort,
    @Inject('EventPublisherPort')
    private readonly eventPublisher: EventPublisherPort,
  ) {}

  async execute(id: string, targetStatus: string): Promise<Policy> {
    // 1. Retrieve policy
    const policy = await this.policyRepo.findById(id);
    if (!policy) {
      throw new DomainNotFoundException('Policy', id);
    }

    const oldStatus = policy.getStatus();
    const statusUpper = (targetStatus || '').toUpperCase();

    // 2. Delegate state transition based on input targetStatus
    switch (statusUpper) {
      case 'ISSUED':
        policy.issue();
        break;
      case 'ACTIVE':
        policy.activate();
        break;
      case 'SUSPENDED':
        policy.suspend();
        break;
      case 'CANCELLED':
        policy.cancel();
        break;
      default:
        throw new DomainValidationException(
          `Target status '${targetStatus}' is invalid. Supported: ISSUED, ACTIVE, SUSPENDED, CANCELLED`
        );
    }

    // 3. Persist the updated policy in database
    const saved = await this.policyRepo.save(policy);

    // 4. Publish event if the transition actually changed the state (or if it was a valid operation)
    // Even if idempotent, if status is same, we might not publish, but let's publish if it's a successful change
    if (oldStatus !== saved.getStatus()) {
      const eventName = `policy.${saved.getStatus().toLowerCase()}`;
      await this.eventPublisher.publish(eventName, {
        policyId: saved.getId(),
        policyNumber: saved.getPolicyNumber(),
        customerId: saved.getCustomerId(),
        oldStatus: oldStatus,
        newStatus: saved.getStatus(),
        timestamp: new Date().toISOString(),
      });
    }

    return saved;
  }
}
