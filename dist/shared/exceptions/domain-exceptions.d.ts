export declare abstract class DomainException extends Error {
    constructor(message: string);
}
export declare class DomainNotFoundException extends DomainException {
    constructor(entity: string, id: string);
}
export declare class InvalidStateTransitionException extends DomainException {
    constructor(from: string, to: string);
}
export declare class DomainValidationException extends DomainException {
    constructor(message: string);
}
export declare class DomainDuplicateException extends DomainException {
    constructor(message: string);
}
