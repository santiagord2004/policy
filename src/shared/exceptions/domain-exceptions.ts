export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DomainNotFoundException extends DomainException {
  constructor(entity: string, id: string) {
    super(`${entity} with identifier ${id} was not found.`);
  }
}

export class InvalidStateTransitionException extends DomainException {
  constructor(from: string, to: string) {
    super(`Cannot transition policy from state '${from}' to state '${to}'.`);
  }
}

export class DomainValidationException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}

export class DomainDuplicateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
