import { PolicyFactoryPort } from '../ports/policy-factory.port';
export declare class AutoPolicyFactory implements PolicyFactoryPort {
    getBranch(): string;
    createDefaultCoverage(): {
        coverageAmount: number;
        deductible: number;
        description: string;
    };
    getBasePremium(): number;
    getDefaultDurationMonths(): number;
}
export declare class LifePolicyFactory implements PolicyFactoryPort {
    getBranch(): string;
    createDefaultCoverage(): {
        coverageAmount: number;
        deductible: number;
        description: string;
    };
    getBasePremium(): number;
    getDefaultDurationMonths(): number;
}
export declare class HomePolicyFactory implements PolicyFactoryPort {
    getBranch(): string;
    createDefaultCoverage(): {
        coverageAmount: number;
        deductible: number;
        description: string;
    };
    getBasePremium(): number;
    getDefaultDurationMonths(): number;
}
export declare class HealthPolicyFactory implements PolicyFactoryPort {
    getBranch(): string;
    createDefaultCoverage(): {
        coverageAmount: number;
        deductible: number;
        description: string;
    };
    getBasePremium(): number;
    getDefaultDurationMonths(): number;
}
