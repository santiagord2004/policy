import { Policy } from '../../domain/policy.domain';
import { PolicyEntity } from './policy.entity';

export class PolicyMapper {
  static toDomain(entity: PolicyEntity): Policy {
    if (!entity) return null;
    
    const domain = new Policy();
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

  static toPersistence(domain: Policy): PolicyEntity {
    if (!domain) return null;
    
    const entity = new PolicyEntity();
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
