"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyStateFactory = exports.CancelledState = exports.SuspendedState = exports.ActiveState = exports.IssuedState = exports.QuotedState = void 0;
const domain_exceptions_1 = require("../../../shared/exceptions/domain-exceptions");
class QuotedState {
    getStatusName() {
        return 'QUOTED';
    }
    issue(policy) {
        policy.setStatus('ISSUED');
    }
    activate(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('QUOTED', 'ACTIVE');
    }
    suspend(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('QUOTED', 'SUSPENDED');
    }
    cancel(policy) {
        policy.setStatus('CANCELLED');
    }
}
exports.QuotedState = QuotedState;
class IssuedState {
    getStatusName() {
        return 'ISSUED';
    }
    issue(policy) {
    }
    activate(policy) {
        policy.setStatus('ACTIVE');
    }
    suspend(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('ISSUED', 'SUSPENDED');
    }
    cancel(policy) {
        policy.setStatus('CANCELLED');
    }
}
exports.IssuedState = IssuedState;
class ActiveState {
    getStatusName() {
        return 'ACTIVE';
    }
    issue(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('ACTIVE', 'ISSUED');
    }
    activate(policy) {
    }
    suspend(policy) {
        policy.setStatus('SUSPENDED');
    }
    cancel(policy) {
        policy.setStatus('CANCELLED');
    }
}
exports.ActiveState = ActiveState;
class SuspendedState {
    getStatusName() {
        return 'SUSPENDED';
    }
    issue(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('SUSPENDED', 'ISSUED');
    }
    activate(policy) {
        policy.setStatus('ACTIVE');
    }
    suspend(policy) {
    }
    cancel(policy) {
        policy.setStatus('CANCELLED');
    }
}
exports.SuspendedState = SuspendedState;
class CancelledState {
    getStatusName() {
        return 'CANCELLED';
    }
    issue(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('CANCELLED', 'ISSUED');
    }
    activate(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('CANCELLED', 'ACTIVE');
    }
    suspend(policy) {
        throw new domain_exceptions_1.InvalidStateTransitionException('CANCELLED', 'SUSPENDED');
    }
    cancel(policy) {
    }
}
exports.CancelledState = CancelledState;
class PolicyStateFactory {
    static create(status) {
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
exports.PolicyStateFactory = PolicyStateFactory;
//# sourceMappingURL=policy-states.js.map