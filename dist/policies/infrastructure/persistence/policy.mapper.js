"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyMapper = void 0;
const policy_domain_1 = require("../../domain/policy.domain");
const policy_entity_1 = require("./policy.entity");
class PolicyMapper {
    static toDomain(entity) {
        if (!entity)
            return null;
        const domain = new policy_domain_1.Policy();
        domain.setId(entity.id);
        domain.setPolicyNumber(entity.policyNumber);
        domain.setCustomerId(entity.customerId);
        domain.setBranch(entity.branch);
        domain.setCoverage(entity.coverage);
        domain.setBasePremium(entity.basePremium);
        domain.setMonthlyPremium(entity.monthlyPremium);
        domain.setStatus(entity.status);
        domain.setRiskProfile(entity.riskProfile);
        domain.setDurationMonths(entity.durationMonths);
        domain.setCreatedAt(entity.createdAt);
        domain.setUpdatedAt(entity.updatedAt);
        return domain;
    }
    static toPersistence(domain) {
        if (!domain)
            return null;
        const entity = new policy_entity_1.PolicyEntity();
        entity.id = domain.getId();
        entity.policyNumber = domain.getPolicyNumber();
        entity.customerId = domain.getCustomerId();
        entity.branch = domain.getBranch();
        entity.coverage = domain.getCoverage();
        entity.basePremium = domain.getBasePremium();
        entity.monthlyPremium = domain.getMonthlyPremium();
        entity.status = domain.getStatus();
        entity.riskProfile = domain.getRiskProfile();
        entity.durationMonths = domain.getDurationMonths();
        entity.createdAt = domain.getCreatedAt();
        entity.updatedAt = domain.getUpdatedAt();
        return entity;
    }
}
exports.PolicyMapper = PolicyMapper;
//# sourceMappingURL=policy.mapper.js.map