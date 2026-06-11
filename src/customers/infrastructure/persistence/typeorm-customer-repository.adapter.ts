import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerRepositoryPort } from '../../domain/ports/customer-repository.port';
import { Customer } from '../../domain/customer.domain';
import { CustomerEntity } from './customer.entity';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class TypeOrmCustomerRepositoryAdapter implements CustomerRepositoryPort {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repo: Repository<CustomerEntity>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    const entity = CustomerMapper.toPersistence(customer);
    const saved = await this.repo.save(entity);
    return CustomerMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.repo.findOneBy({ id });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const entity = await this.repo.findOneBy({ email });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }
}
