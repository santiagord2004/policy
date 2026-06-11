import { PolicyStatePort } from './ports/policy-state.port';
import { PolicyStateFactory } from './states/policy-states';

export class Policy {
  private id: string;
  private policyNumber: string;
  private customerId: string;
  private branch: string;
  private coverage: any;
  private basePremium: number;
  private monthlyPremium: number;
  private status: string; // "QUOTED" | "ISSUED" | "ACTIVE" | "SUSPENDED" | "CANCELLED"
  private riskProfile: any;
  private durationMonths: number;
  private createdAt: Date;
  private updatedAt: Date;

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getPolicyNumber(): string {
    return this.policyNumber;
  }

  public setPolicyNumber(policyNumber: string): void {
    this.policyNumber = policyNumber;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public setCustomerId(customerId: string): void {
    this.customerId = customerId;
  }

  public getBranch(): string {
    return this.branch;
  }

  public setBranch(branch: string): void {
    this.branch = branch;
  }

  public getCoverage(): any {
    return this.coverage;
  }

  public setCoverage(coverage: any): void {
    this.coverage = coverage;
  }

  public getBasePremium(): number {
    return this.basePremium;
  }

  public setBasePremium(basePremium: number): void {
    this.basePremium = basePremium;
  }

  public getMonthlyPremium(): number {
    return this.monthlyPremium;
  }

  public setMonthlyPremium(monthlyPremium: number): void {
    this.monthlyPremium = monthlyPremium;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public getRiskProfile(): any {
    return this.riskProfile;
  }

  public setRiskProfile(riskProfile: any): void {
    this.riskProfile = riskProfile;
  }

  public getDurationMonths(): number {
    return this.durationMonths;
  }

  public setDurationMonths(durationMonths: number): void {
    this.durationMonths = durationMonths;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  // State delegation
  public getState(): PolicyStatePort {
    return PolicyStateFactory.create(this.status);
  }

  public issue(): void {
    this.getState().issue(this);
    this.updatedAt = new Date();
  }

  public activate(): void {
    this.getState().activate(this);
    this.updatedAt = new Date();
  }

  public suspend(): void {
    this.getState().suspend(this);
    this.updatedAt = new Date();
  }

  public cancel(): void {
    this.getState().cancel(this);
    this.updatedAt = new Date();
  }
}
