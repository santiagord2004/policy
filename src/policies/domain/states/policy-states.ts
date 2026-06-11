import { Policy } from '../policy.domain';
import { PolicyStatePort } from '../ports/policy-state.port';
import { InvalidStateTransitionException } from '../../../shared/exceptions/domain-exceptions';

export class QuotedState implements PolicyStatePort {
  getStatusName(): string {
    return 'QUOTED';
  }

  issue(policy: Policy): void {
    policy.setStatus('ISSUED');
  }

  activate(policy: Policy): void {
    throw new InvalidStateTransitionException('QUOTED', 'ACTIVE');
  }

  suspend(policy: Policy): void {
    throw new InvalidStateTransitionException('QUOTED', 'SUSPENDED');
  }

  cancel(policy: Policy): void {
    policy.setStatus('CANCELLED');
  }
}

export class IssuedState implements PolicyStatePort {
  getStatusName(): string {
    return 'ISSUED';
  }

  issue(policy: Policy): void {
    // Idempotent
  }

  activate(policy: Policy): void {
    policy.setStatus('ACTIVE');
  }

  suspend(policy: Policy): void {
    throw new InvalidStateTransitionException('ISSUED', 'SUSPENDED');
  }

  cancel(policy: Policy): void {
    policy.setStatus('CANCELLED');
  }
}

export class ActiveState implements PolicyStatePort {
  getStatusName(): string {
    return 'ACTIVE';
  }

  issue(policy: Policy): void {
    throw new InvalidStateTransitionException('ACTIVE', 'ISSUED');
  }

  activate(policy: Policy): void {
    // Idempotent
  }

  suspend(policy: Policy): void {
    policy.setStatus('SUSPENDED');
  }

  cancel(policy: Policy): void {
    policy.setStatus('CANCELLED');
  }
}

export class SuspendedState implements PolicyStatePort {
  getStatusName(): string {
    return 'SUSPENDED';
  }

  issue(policy: Policy): void {
    throw new InvalidStateTransitionException('SUSPENDED', 'ISSUED');
  }

  activate(policy: Policy): void {
    policy.setStatus('ACTIVE');
  }

  suspend(policy: Policy): void {
    // Idempotent
  }

  cancel(policy: Policy): void {
    policy.setStatus('CANCELLED');
  }
}

export class CancelledState implements PolicyStatePort {
  getStatusName(): string {
    return 'CANCELLED';
  }

  issue(policy: Policy): void {
    throw new InvalidStateTransitionException('CANCELLED', 'ISSUED');
  }

  activate(policy: Policy): void {
    throw new InvalidStateTransitionException('CANCELLED', 'ACTIVE');
  }

  suspend(policy: Policy): void {
    throw new InvalidStateTransitionException('CANCELLED', 'SUSPENDED');
  }

  cancel(policy: Policy): void {
    // Idempotent
  }
}

export class PolicyStateFactory {
  static create(status: string): PolicyStatePort {
    switch (status) {
      case 'QUOTED':
        return new QuotedState();
      case 'ISSUED':
        return new IssuedState();
      case 'ACTIVE':
        return new ActiveState();
      case 'SUSPENDED':
        return new SuspendedState();
      case 'CANCELLED':
        return new CancelledState();
      default:
        throw new Error(`State ${status} not registered.`);
    }
  }
}
