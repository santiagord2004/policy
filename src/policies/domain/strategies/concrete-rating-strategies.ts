import { RatingStrategyPort } from '../ports/rating-strategy.port';
import { DomainValidationException } from '../../../shared/exceptions/domain-exceptions';

export class StandardStrategy implements RatingStrategyPort {
  getName(): string {
    return 'STANDARD';
  }

  validate(riskProfile: any): void {
    // No validations required for standard pricing
  }

  calculatePremium(basePremium: number, riskProfile: any): number {
    return basePremium;
  }
}

export class RiskBasedStrategy implements RatingStrategyPort {
  getName(): string {
    return 'RISK_BASED';
  }

  validate(riskProfile: any): void {
    const score = riskProfile?.riskScore !== undefined ? riskProfile.riskScore : riskProfile?.score;
    if (score === undefined || score === null || typeof score !== 'number') {
      throw new DomainValidationException(
        "RiskBasedStrategy requires 'riskScore' or 'score' in risk profile."
      );
    }
    if (score < 0 || score > 100) {
      throw new DomainValidationException(
        `Risk score must be between 0 and 100. Provided score: ${score}`
      );
    }
  }

  calculatePremium(basePremium: number, riskProfile: any): number {
    this.validate(riskProfile);
    const score = riskProfile?.riskScore !== undefined ? riskProfile.riskScore : riskProfile?.score;
    return basePremium * (1 + score / 100);
  }
}

export class LoyaltyStrategy implements RatingStrategyPort {
  getName(): string {
    return 'LOYALTY';
  }

  validate(riskProfile: any): void {
    const years = riskProfile?.customerSince !== undefined ? riskProfile.customerSince : riskProfile?.yearsAsCustomer;
    if (years === undefined || years === null || typeof years !== 'number') {
      throw new DomainValidationException(
        "LoyaltyStrategy requires 'customerSince' or 'yearsAsCustomer' in risk profile."
      );
    }
    if (years < 2) {
      throw new DomainValidationException(
        `LoyaltyStrategy requires customer seniority of at least 2 years. Provided: ${years}`
      );
    }
  }

  calculatePremium(basePremium: number, riskProfile: any): number {
    this.validate(riskProfile);
    return basePremium * 0.85; // 15% discount
  }
}
