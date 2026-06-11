import { RatingStrategyPort } from '../ports/rating-strategy.port';
export declare class StandardStrategy implements RatingStrategyPort {
    getName(): string;
    validate(riskProfile: any): void;
    calculatePremium(basePremium: number, riskProfile: any): number;
}
export declare class RiskBasedStrategy implements RatingStrategyPort {
    getName(): string;
    validate(riskProfile: any): void;
    calculatePremium(basePremium: number, riskProfile: any): number;
}
export declare class LoyaltyStrategy implements RatingStrategyPort {
    getName(): string;
    validate(riskProfile: any): void;
    calculatePremium(basePremium: number, riskProfile: any): number;
}
