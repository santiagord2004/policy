import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyEntity } from './infrastructure/persistence/policy.entity';
import { PolicyController } from './infrastructure/controllers/policy.controller';
import { TypeOrmPolicyRepositoryAdapter } from './infrastructure/persistence/typeorm-policy-repository.adapter';
import { CreatePolicyUseCase } from './application/create-policy.use-case';
import { GetPolicyUseCase } from './application/get-policy.use-case';
import { GetCustomerPoliciesUseCase } from './application/get-customer-policies.use-case';
import { TransitionPolicyStateUseCase } from './application/transition-policy-state.use-case';
import { PolicyNumberSequencer } from './application/sequencer/policy-number-sequencer';
import { CustomersModule } from '../customers/customers.module';

// Factory pattern concrete classes
import { 
  AutoPolicyFactory, 
  LifePolicyFactory, 
  HomePolicyFactory, 
  HealthPolicyFactory 
} from './domain/factories/concrete-policy-factories';

// Strategy pattern concrete classes
import { 
  StandardStrategy, 
  RiskBasedStrategy, 
  LoyaltyStrategy 
} from './domain/strategies/concrete-rating-strategies';
import { PolicyFactoryPort } from './domain/ports/policy-factory.port';
import { RatingStrategyPort } from './domain/ports/rating-strategy.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicyEntity]),
    CustomersModule,
  ],
  controllers: [PolicyController],
  providers: [
    {
      provide: 'PolicyRepositoryPort',
      useClass: TypeOrmPolicyRepositoryAdapter,
    },
    // Singleton sequencer
    PolicyNumberSequencer,

    // Concrete Factories
    AutoPolicyFactory,
    LifePolicyFactory,
    HomePolicyFactory,
    HealthPolicyFactory,

    // Concrete Strategies
    StandardStrategy,
    RiskBasedStrategy,
    LoyaltyStrategy,

    // OCP Factory Method Map Registry
    {
      provide: 'POLICY_FACTORIES_MAP',
      useFactory: (
        auto: AutoPolicyFactory,
        life: LifePolicyFactory,
        home: HomePolicyFactory,
        health: HealthPolicyFactory,
      ) => {
        const registry = new Map<string, PolicyFactoryPort>();
        registry.set(auto.getBranch(), auto);
        registry.set(life.getBranch(), life);
        registry.set(home.getBranch(), home);
        registry.set(health.getBranch(), health);
        return registry;
      },
      inject: [
        AutoPolicyFactory,
        LifePolicyFactory,
        HomePolicyFactory,
        HealthPolicyFactory,
      ],
    },

    // OCP Strategy Map Registry
    {
      provide: 'RATING_STRATEGIES_MAP',
      useFactory: (
        standard: StandardStrategy,
        risk: RiskBasedStrategy,
        loyalty: LoyaltyStrategy,
      ) => {
        const registry = new Map<string, RatingStrategyPort>();
        registry.set(standard.getName(), standard);
        registry.set(risk.getName(), risk);
        registry.set(loyalty.getName(), loyalty);
        return registry;
      },
      inject: [
        StandardStrategy,
        RiskBasedStrategy,
        LoyaltyStrategy,
      ],
    },

    // Use Cases
    CreatePolicyUseCase,
    GetPolicyUseCase,
    GetCustomerPoliciesUseCase,
    TransitionPolicyStateUseCase,
  ],
  exports: [
    'PolicyRepositoryPort',
    CreatePolicyUseCase,
    GetPolicyUseCase,
    GetCustomerPoliciesUseCase,
    TransitionPolicyStateUseCase,
  ],
})
export class PoliciesModule {}
