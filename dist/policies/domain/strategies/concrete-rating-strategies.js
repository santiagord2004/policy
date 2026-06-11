"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyStrategy = exports.RiskBasedStrategy = exports.StandardStrategy = void 0;
const domain_exceptions_1 = require("../../../shared/exceptions/domain-exceptions");
class StandardStrategy {
    getName() {
        return 'STANDARD';
    }
    validate(riskProfile) {
    }
    calculatePremium(basePremium, riskProfile) {
        return basePremium;
    }
}
exports.StandardStrategy = StandardStrategy;
class RiskBasedStrategy {
    getName() {
        return 'RISK_BASED';
    }
    validate(riskProfile) {
        if (!riskProfile || typeof riskProfile.score !== 'number') {
            throw new domain_exceptions_1.DomainValidationException("RiskBasedStrategy requires 'score' in risk profile.");
        }
        const score = riskProfile.score;
        if (score < 0 || score > 100) {
            throw new domain_exceptions_1.DomainValidationException(`Risk score must be between 0 and 100. Provided score: ${score}`);
        }
    }
    calculatePremium(basePremium, riskProfile) {
        this.validate(riskProfile);
        const score = riskProfile.score;
        return basePremium * (1 + score / 100);
    }
}
exports.RiskBasedStrategy = RiskBasedStrategy;
class LoyaltyStrategy {
    getName() {
        return 'LOYALTY';
    }
    validate(riskProfile) {
        if (!riskProfile || typeof riskProfile.yearsAsCustomer !== 'number') {
            throw new domain_exceptions_1.DomainValidationException("LoyaltyStrategy requires 'yearsAsCustomer' in risk profile.");
        }
        const years = riskProfile.yearsAsCustomer;
        if (years < 2) {
            throw new domain_exceptions_1.DomainValidationException(`LoyaltyStrategy requires customer seniority of at least 2 years. Provided: ${years}`);
        }
    }
    calculatePremium(basePremium, riskProfile) {
        this.validate(riskProfile);
        return basePremium * 0.85;
    }
}
exports.LoyaltyStrategy = LoyaltyStrategy;
//# sourceMappingURL=concrete-rating-strategies.js.map