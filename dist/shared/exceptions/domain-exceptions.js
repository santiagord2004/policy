"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDuplicateException = exports.DomainValidationException = exports.InvalidStateTransitionException = exports.DomainNotFoundException = exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DomainException = DomainException;
class DomainNotFoundException extends DomainException {
    constructor(entity, id) {
        super(`${entity} with identifier ${id} was not found.`);
    }
}
exports.DomainNotFoundException = DomainNotFoundException;
class InvalidStateTransitionException extends DomainException {
    constructor(from, to) {
        super(`Cannot transition policy from state '${from}' to state '${to}'.`);
    }
}
exports.InvalidStateTransitionException = InvalidStateTransitionException;
class DomainValidationException extends DomainException {
    constructor(message) {
        super(message);
    }
}
exports.DomainValidationException = DomainValidationException;
class DomainDuplicateException extends DomainException {
    constructor(message) {
        super(message);
    }
}
exports.DomainDuplicateException = DomainDuplicateException;
//# sourceMappingURL=domain-exceptions.js.map