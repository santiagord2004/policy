export interface RatingStrategyPort {
    getName(): string;
    validate(riskProfile: any): void;
    calculatePremium(basePremium: number, riskProfile: any): number;
}
