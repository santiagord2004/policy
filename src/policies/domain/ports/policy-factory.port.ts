export interface PolicyFactoryPort {
  getBranch(): string;
  createDefaultCoverage(): any;
  getBasePremium(): number;
  getDefaultDurationMonths(): number;
}
