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
    if (!riskProfile || typeof riskProfile.score !== 'number') {
      throw new DomainValidationException(
        "RiskBasedStrategy requires 'score' in risk profile."
      );
    }
    const score = riskProfile.score;
    if (score < 0 || score > 100) {
      throw new DomainValidationException(
        `Risk score must be between 0 and 100. Provided score: ${score}`
      );
    }
  }

  calculatePremium(basePremium: number, riskProfile: any): number {
    this.validate(riskProfile);
    const score = riskProfile.score;
    return basePremium * (1 + score / 100);
  }
}

export class LoyaltyStrategy implements RatingStrategyPort {
  getName(): string {
    return 'LOYALTY';
  }

  validate(riskProfile: any): void {
    if (!riskProfile || typeof riskProfile.yearsAsCustomer !== 'number') {
      throw new DomainValidationException(
        "LoyaltyStrategy requires 'yearsAsCustomer' in risk profile."
      );
    }
    const years = riskProfile.yearsAsCustomer;
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
