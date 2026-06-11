"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const policy_states_1 = require("./states/policy-states");
class Policy {
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getPolicyNumber() {
        return this.policyNumber;
    }
    setPolicyNumber(policyNumber) {
        this.policyNumber = policyNumber;
    }
    getCustomerId() {
        return this.customerId;
    }
    setCustomerId(customerId) {
        this.customerId = customerId;
    }
    getBranch() {
        return this.branch;
    }
    setBranch(branch) {
        this.branch = branch;
    }
    getCoverage() {
        return this.coverage;
    }
    setCoverage(coverage) {
        this.coverage = coverage;
    }
    getBasePremium() {
        return this.basePremium;
    }
    setBasePremium(basePremium) {
        this.basePremium = basePremium;
    }
    getMonthlyPremium() {
        return this.monthlyPremium;
    }
    setMonthlyPremium(monthlyPremium) {
        this.monthlyPremium = monthlyPremium;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getRiskProfile() {
        return this.riskProfile;
    }
    setRiskProfile(riskProfile) {
        this.riskProfile = riskProfile;
    }
    getDurationMonths() {
        return this.durationMonths;
    }
    setDurationMonths(durationMonths) {
        this.durationMonths = durationMonths;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt;
    }
    getState() {
        return policy_states_1.PolicyStateFactory.create(this.status);
    }
    issue() {
        this.getState().issue(this);
        this.updatedAt = new Date();
    }
    activate() {
        this.getState().activate(this);
        this.updatedAt = new Date();
    }
    suspend() {
        this.getState().suspend(this);
        this.updatedAt = new Date();
    }
    cancel() {
        this.getState().cancel(this);
        this.updatedAt = new Date();
    }
}
exports.Policy = Policy;
//# sourceMappingURL=policy.domain.js.map