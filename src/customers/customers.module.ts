import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './infrastructure/persistence/customer.entity';
import { CustomerController } from './infrastructure/controllers/customer.controller';
import { TypeOrmCustomerRepositoryAdapter } from './infrastructure/persistence/typeorm-customer-repository.adapter';
import { CreateCustomerUseCase } from './application/create-customer.use-case';
import { GetCustomerUseCase } from './application/get-customer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'CustomerRepositoryPort',
      useClass: TypeOrmCustomerRepositoryAdapter,
    },
    CreateCustomerUseCase,
    GetCustomerUseCase,
  ],
  exports: [
    'CustomerRepositoryPort',
    CreateCustomerUseCase,
    GetCustomerUseCase,
  ],
})
export class CustomersModule {}
