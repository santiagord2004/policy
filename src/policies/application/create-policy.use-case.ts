import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '../domain/policy.domain';
import { PolicyRepositoryPort } from '../domain/ports/policy-repository.port';
import { CustomerRepositoryPort } from '../../customers/domain/ports/customer-repository.port';
import { PolicyFactoryPort } from '../domain/ports/policy-factory.port';
import { RatingStrategyPort } from '../domain/ports/rating-strategy.port';
import { PolicyNumberSequencer } from './sequencer/policy-number-sequencer';
import { PolicyBuilder } from './builders/policy.builder';
import { DomainNotFoundException, DomainValidationException } from '../../shared/exceptions/domain-exceptions';

@Injectable()
export class CreatePolicyUseCase {
  constructor(
    @Inject('PolicyRepositoryPort')
    private readonly policyRepo: PolicyRepositoryPort,
    @Inject('CustomerRepositoryPort')
    private readonly customerRepo: CustomerRepositoryPort,
    @Inject('POLICY_FACTORIES_MAP')
    private readonly factories: Map<string, PolicyFactoryPort>,
    @Inject('RATING_STRATEGIES_MAP')
    private readonly strategies: Map<string, RatingStrategyPort>,
    private readonly sequencer: PolicyNumberSequencer,
  ) {}

  async execute(dto: {
    customerId: string;
    branch: string;
    ratingStrategy: string;
    riskProfile?: any;
  }): Promise<Policy> {
    // 1. Verify customer exists
    const customer = await this.customerRepo.findById(dto.customerId);
    if (!customer) {
      throw new DomainNotFoundException('Customer', dto.customerId);
    }

    // 2. Resolve Factory Method
    const branchUpper = (dto.branch || '').toUpperCase();
    const factory = this.factories.get(branchUpper);
    if (!factory) {
      throw new DomainValidationException(
        `Branch '${dto.branch}' is not supported. Available: ${Array.from(this.factories.keys()).join(', ')}`
      );
    }

    // 3. Resolve Rating Strategy
    const strategyUpper = (dto.ratingStrategy || '').toUpperCase();
    const strategy = this.strategies.get(strategyUpper);
    if (!strategy) {
      throw new DomainValidationException(
        `Strategy '${dto.ratingStrategy}' is not supported. Available: ${Array.from(this.strategies.keys()).join(', ')}`
      );
    }

    // 4. Calculate default variables
    const basePremium = factory.getBasePremium();
    const coverage = factory.createDefaultCoverage();
    const durationMonths = factory.getDefaultDurationMonths();

    // Prepare risk profile merging database details
    const inputRiskProfile = dto.riskProfile || {};
    const finalRiskProfile = {
      ...inputRiskProfile,
      yearsAsCustomer: customer.getYearsAsCustomer(),
    };

    // 5. Validate and calculate premium using Strategy pattern
    strategy.validate(finalRiskProfile);
    const monthlyPremium = strategy.calculatePremium(basePremium, finalRiskProfile);

    // 6. Generate sequential policy number using Singleton Sequencer
    const policyNumber = this.sequencer.getNext();

    // 7. Construct policy using fluid Builder
    const policy = new PolicyBuilder()
      .customerId(dto.customerId)
      .branch(branchUpper)
      .coverage(coverage)
      .basePremium(basePremium)
      .monthlyPremium(monthlyPremium)
      .riskProfile(finalRiskProfile)
      .durationMonths(durationMonths)
      .policyNumber(policyNumber)
      .build();

    // 8. Persist the quoted policy
    return this.policyRepo.save(policy);
  }
}
