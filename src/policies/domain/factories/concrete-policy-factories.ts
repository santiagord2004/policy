import { PolicyFactoryPort } from '../ports/policy-factory.port';

export class AutoPolicyFactory implements PolicyFactoryPort {
  getBranch(): string {
    return 'AUTO';
  }

  createDefaultCoverage() {
    return {
      coverageAmount: 80000000,
      deductible: 1000000,
      description: 'Auto Insurance Standard Coverage'
    };
  }

  getBasePremium(): number {
    return 120000;
  }

  getDefaultDurationMonths(): number {
    return 12;
  }
}

export class LifePolicyFactory implements PolicyFactoryPort {
  getBranch(): string {
    return 'LIFE';
  }

  createDefaultCoverage() {
    return {
      coverageAmount: 150000000,
      deductible: 0,
      description: 'Life Insurance Term Coverage'
    };
  }

  getBasePremium(): number {
    return 250000;
  }

  getDefaultDurationMonths(): number {
    return 24;
  }
}

export class HomePolicyFactory implements PolicyFactoryPort {
  getBranch(): string {
    return 'HOME';
  }

  createDefaultCoverage() {
    return {
      coverageAmount: 200000000,
      deductible: 2000000,
      description: 'Home Protection Coverage'
    };
  }

  getBasePremium(): number {
    return 180000;
  }

  getDefaultDurationMonths(): number {
    return 12;
  }
}

export class HealthPolicyFactory implements PolicyFactoryPort {
  getBranch(): string {
    return 'HEALTH';
  }

  createDefaultCoverage() {
    return {
      coverageAmount: 100000000,
      deductible: 500000,
      description: 'Comprehensive Health Coverage'
    };
  }

  getBasePremium(): number {
    return 150000;
  }

  getDefaultDurationMonths(): number {
    return 12;
  }
}
