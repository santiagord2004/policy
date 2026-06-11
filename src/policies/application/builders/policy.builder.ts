import * as crypto from 'crypto';
import { Policy } from '../../domain/policy.domain';
import { DomainValidationException } from '../../../shared/exceptions/domain-exceptions';

export class PolicyBuilder {
  private _id?: string;
  private _policyNumber?: string;
  private _customerId?: string;
  private _branch?: string;
  private _coverage?: any;
  private _basePremium?: number;
  private _monthlyPremium?: number;
  private _riskProfile?: any;
  private _durationMonths?: number;

  public id(id: string): this {
    this._id = id;
    return this;
  }

  public policyNumber(policyNumber: string): this {
    this._policyNumber = policyNumber;
    return this;
  }

  public customerId(customerId: string): this {
    this._customerId = customerId;
    return this;
  }

  public branch(branch: string): this {
    this._branch = branch;
    return this;
  }

  public coverage(coverage: any): this {
    this._coverage = coverage;
    return this;
  }

  public basePremium(basePremium: number): this {
    this._basePremium = basePremium;
    return this;
  }

  public monthlyPremium(monthlyPremium: number): this {
    this._monthlyPremium = monthlyPremium;
    return this;
  }

  public riskProfile(riskProfile: any): this {
    this._riskProfile = riskProfile;
    return this;
  }

  public durationMonths(durationMonths: number): this {
    this._durationMonths = durationMonths;
    return this;
  }

  public build(): Policy {
    // Required fields validation
    if (!this._customerId) {
      throw new DomainValidationException('customerId is required to build a policy.');
    }
    if (!this._branch) {
      throw new DomainValidationException('branch is required to build a policy.');
    }
    if (!this._coverage) {
      throw new DomainValidationException('coverage is required to build a policy.');
    }
    if (this._monthlyPremium === undefined || this._monthlyPremium === null) {
      throw new DomainValidationException('monthlyPremium is required to build a policy.');
    }

    const policy = new Policy();
    policy.setId(this._id || crypto.randomUUID());
    policy.setPolicyNumber(this._policyNumber || '');
    policy.setCustomerId(this._customerId);
    policy.setBranch(this._branch);
    policy.setCoverage(this._coverage);
    policy.setBasePremium(this._basePremium || 0);
    policy.setMonthlyPremium(this._monthlyPremium);
    policy.setRiskProfile(this._riskProfile || {});
    policy.setDurationMonths(this._durationMonths || 12);
    
    // Strict initial state assignment
    policy.setStatus('QUOTED');
    
    const now = new Date();
    policy.setCreatedAt(now);
    policy.setUpdatedAt(now);

    return policy;
  }
}
