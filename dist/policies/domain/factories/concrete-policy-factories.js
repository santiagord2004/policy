"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthPolicyFactory = exports.HomePolicyFactory = exports.LifePolicyFactory = exports.AutoPolicyFactory = void 0;
class AutoPolicyFactory {
    getBranch() {
        return 'AUTO';
    }
    createDefaultCoverage() {
        return {
            coverageAmount: 80000000,
            deductible: 1000000,
            description: 'Auto Insurance Standard Coverage'
        };
    }
    getBasePremium() {
        return 120000;
    }
    getDefaultDurationMonths() {
        return 12;
    }
}
exports.AutoPolicyFactory = AutoPolicyFactory;
class LifePolicyFactory {
    getBranch() {
        return 'LIFE';
    }
    createDefaultCoverage() {
        return {
            coverageAmount: 150000000,
            deductible: 0,
            description: 'Life Insurance Term Coverage'
        };
    }
    getBasePremium() {
        return 250000;
    }
    getDefaultDurationMonths() {
        return 24;
    }
}
exports.LifePolicyFactory = LifePolicyFactory;
class HomePolicyFactory {
    getBranch() {
        return 'HOME';
    }
    createDefaultCoverage() {
        return {
            coverageAmount: 200000000,
            deductible: 2000000,
            description: 'Home Protection Coverage'
        };
    }
    getBasePremium() {
        return 180000;
    }
    getDefaultDurationMonths() {
        return 12;
    }
}
exports.HomePolicyFactory = HomePolicyFactory;
class HealthPolicyFactory {
    getBranch() {
        return 'HEALTH';
    }
    createDefaultCoverage() {
        return {
            coverageAmount: 100000000,
            deductible: 500000,
            description: 'Comprehensive Health Coverage'
        };
    }
    getBasePremium() {
        return 150000;
    }
    getDefaultDurationMonths() {
        return 12;
    }
}
exports.HealthPolicyFactory = HealthPolicyFactory;
//# sourceMappingURL=concrete-policy-factories.js.map