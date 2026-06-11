import { Policy } from '../policy.domain';
export interface PolicyStatePort {
    issue(policy: Policy): void;
    activate(policy: Policy): void;
    suspend(policy: Policy): void;
    cancel(policy: Policy): void;
    getStatusName(): string;
}
