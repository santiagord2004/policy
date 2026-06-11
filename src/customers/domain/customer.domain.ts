export class Customer {
  private id: string;
  private name: string;
  private email: string;
  private yearsAsCustomer: number;
  private createdAt: Date;

  constructor(id: string, name: string, email: string, yearsAsCustomer: number, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.yearsAsCustomer = yearsAsCustomer;
    this.createdAt = createdAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getYearsAsCustomer(): number {
    return this.yearsAsCustomer;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
