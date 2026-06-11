"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const policy_entity_1 = require("./infrastructure/persistence/policy.entity");
const policy_controller_1 = require("./infrastructure/controllers/policy.controller");
const typeorm_policy_repository_adapter_1 = require("./infrastructure/persistence/typeorm-policy-repository.adapter");
const create_policy_use_case_1 = require("./application/create-policy.use-case");
const get_policy_use_case_1 = require("./application/get-policy.use-case");
const get_customer_policies_use_case_1 = require("./application/get-customer-policies.use-case");
const transition_policy_state_use_case_1 = require("./application/transition-policy-state.use-case");
const policy_number_sequencer_1 = require("./application/sequencer/policy-number-sequencer");
const customers_module_1 = require("../customers/customers.module");
const concrete_policy_factories_1 = require("./domain/factories/concrete-policy-factories");
const concrete_rating_strategies_1 = require("./domain/strategies/concrete-rating-strategies");
let PoliciesModule = class PoliciesModule {
};
exports.PoliciesModule = PoliciesModule;
exports.PoliciesModule = PoliciesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([policy_entity_1.PolicyEntity]),
            customers_module_1.CustomersModule,
        ],
        controllers: [policy_controller_1.PolicyController],
        providers: [
            {
                provide: 'PolicyRepositoryPort',
                useClass: typeorm_policy_repository_adapter_1.TypeOrmPolicyRepositoryAdapter,
            },
            policy_number_sequencer_1.PolicyNumberSequencer,
            concrete_policy_factories_1.AutoPolicyFactory,
            concrete_policy_factories_1.LifePolicyFactory,
            concrete_policy_factories_1.HomePolicyFactory,
            concrete_policy_factories_1.HealthPolicyFactory,
            concrete_rating_strategies_1.StandardStrategy,
            concrete_rating_strategies_1.RiskBasedStrategy,
            concrete_rating_strategies_1.LoyaltyStrategy,
            {
                provide: 'POLICY_FACTORIES_MAP',
                useFactory: (auto, life, home, health) => {
                    const registry = new Map();
                    registry.set(auto.getBranch(), auto);
                    registry.set(life.getBranch(), life);
                    registry.set(home.getBranch(), home);
                    registry.set(health.getBranch(), health);
                    return registry;
                },
                inject: [
                    concrete_policy_factories_1.AutoPolicyFactory,
                    concrete_policy_factories_1.LifePolicyFactory,
                    concrete_policy_factories_1.HomePolicyFactory,
                    concrete_policy_factories_1.HealthPolicyFactory,
                ],
            },
            {
                provide: 'RATING_STRATEGIES_MAP',
                useFactory: (standard, risk, loyalty) => {
                    const registry = new Map();
                    registry.set(standard.getName(), standard);
                    registry.set(risk.getName(), risk);
                    registry.set(loyalty.getName(), loyalty);
                    return registry;
                },
                inject: [
                    concrete_rating_strategies_1.StandardStrategy,
                    concrete_rating_strategies_1.RiskBasedStrategy,
                    concrete_rating_strategies_1.LoyaltyStrategy,
                ],
            },
            create_policy_use_case_1.CreatePolicyUseCase,
            get_policy_use_case_1.GetPolicyUseCase,
            get_customer_policies_use_case_1.GetCustomerPoliciesUseCase,
            transition_policy_state_use_case_1.TransitionPolicyStateUseCase,
        ],
        exports: [
            'PolicyRepositoryPort',
            create_policy_use_case_1.CreatePolicyUseCase,
            get_policy_use_case_1.GetPolicyUseCase,
            get_customer_policies_use_case_1.GetCustomerPoliciesUseCase,
            transition_policy_state_use_case_1.TransitionPolicyStateUseCase,
        ],
    })
], PoliciesModule);
//# sourceMappingURL=policies.module.js.map