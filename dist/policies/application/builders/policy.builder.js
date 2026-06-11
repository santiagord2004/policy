"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyBuilder = void 0;
const crypto = require("crypto");
const policy_domain_1 = require("../../domain/policy.domain");
const domain_exceptions_1 = require("../../../shared/exceptions/domain-exceptions");
class PolicyBuilder {
    id(id) {
        this._id = id;
        return this;
    }
    policyNumber(policyNumber) {
        this._policyNumber = policyNumber;
        return this;
    }
    customerId(customerId) {
        this._customerId = customerId;
        return this;
    }
    branch(branch) {
        this._branch = branch;
        return this;
    }
    coverage(coverage) {
        this._coverage = coverage;
        return this;
    }
    basePremium(basePremium) {
        this._basePremium = basePremium;
        return this;
    }
    monthlyPremium(monthlyPremium) {
        this._monthlyPremium = monthlyPremium;
        return this;
    }
    riskProfile(riskProfile) {
        this._riskProfile = riskProfile;
        return this;
    }
    durationMonths(durationMonths) {
        this._durationMonths = durationMonths;
        return this;
    }
    build() {
        if (!this._customerId) {
            throw new domain_exceptions_1.DomainValidationException('customerId is required to build a policy.');
        }
        if (!this._branch) {
            throw new domain_exceptions_1.DomainValidationException('branch is required to build a policy.');
        }
        if (!this._coverage) {
            throw new domain_exceptions_1.DomainValidationException('coverage is required to build a policy.');
        }
        if (this._monthlyPremium === undefined || this._monthlyPremium === null) {
            throw new domain_exceptions_1.DomainValidationException('monthlyPremium is required to build a policy.');
        }
        const policy = new policy_domain_1.Policy();
        policy.setId(this._id || crypto.randomUUID());
        policy.setPolicyNumber(this._policyNumber || '');
        policy.setCustomerId(this._customerId);
        policy.setBranch(this._branch);
        policy.setCoverage(this._coverage);
        policy.setBasePremium(this._basePremium || 0);
        policy.setMonthlyPremium(this._monthlyPremium);
        policy.setRiskProfile(this._riskProfile || {});
        policy.setDurationMonths(this._durationMonths || 12);
        policy.setStatus('QUOTED');
        const now = new Date();
        policy.setCreatedAt(now);
        policy.setUpdatedAt(now);
        return policy;
    }
}
exports.PolicyBuilder = PolicyBuilder;
//# sourceMappingURL=policy.builder.js.map