import { Policy } from '../../domain/policy.domain';
export declare class PolicyBuilder {
    private _id?;
    private _policyNumber?;
    private _customerId?;
    private _branch?;
    private _coverage?;
    private _basePremium?;
    private _monthlyPremium?;
    private _riskProfile?;
    private _durationMonths?;
    id(id: string): this;
    policyNumber(policyNumber: string): this;
    customerId(customerId: string): this;
    branch(branch: string): this;
    coverage(coverage: any): this;
    basePremium(basePremium: number): this;
    monthlyPremium(monthlyPremium: number): this;
    riskProfile(riskProfile: any): this;
    durationMonths(durationMonths: number): this;
    build(): Policy;
}
