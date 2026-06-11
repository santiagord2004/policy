export declare class Customer {
    private id;
    private name;
    private email;
    private yearsAsCustomer;
    private createdAt;
    constructor(id: string, name: string, email: string, yearsAsCustomer: number, createdAt: Date);
    getId(): string;
    getName(): string;
    getEmail(): string;
    getYearsAsCustomer(): number;
    getCreatedAt(): Date;
}
