import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'years_as_customer' })
  yearsAsCustomer: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
