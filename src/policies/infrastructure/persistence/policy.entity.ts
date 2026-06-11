import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('policies')
export class PolicyEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'policy_number', unique: true })
  policyNumber: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column()
  branch: string;

  @Column({ type: 'simple-json' })
  coverage: any;

  @Column({ name: 'base_premium', type: 'float' })
  basePremium: number;

  @Column({ name: 'monthly_premium', type: 'float' })
  monthlyPremium: number;

  @Column()
  status: string;

  @Column({ name: 'risk_profile', type: 'simple-json' })
  riskProfile: any;

  @Column({ name: 'duration_months' })
  durationMonths: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
