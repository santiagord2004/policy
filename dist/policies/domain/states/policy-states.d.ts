import { Policy } from '../policy.domain';
import { PolicyStatePort } from '../ports/policy-state.port';
export declare class QuotedState implements PolicyStatePort {
    getStatusName(): string;
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
}
export declare class IssuedState implements PolicyStatePort {
    getStatusName(): string;
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
}
export declare class ActiveState implements PolicyStatePort {
    getStatusName(): string;
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
}
export declare class SuspendedState implements PolicyStatePort {
    getStatusName(): string;
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
}
export declare class CancelledState implements PolicyStatePort {
    getStatusName(): string;
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
}
export declare class PolicyStateFactory {
    static create(status: string): PolicyStatePort;
}
