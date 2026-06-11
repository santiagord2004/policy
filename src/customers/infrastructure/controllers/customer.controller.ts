import { Controller, Post, Get, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '../../application/create-customer.use-case';
import { GetCustomerUseCase } from '../../application/get-customer.use-case';
import { CreateCustomerDto } from './dto/create-customer.dto';

@ApiTags('Customers')
@Controller('api/customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerUseCase: GetCustomerUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.createCustomerUseCase.execute(createCustomerDto);
    return {
      id: customer.getId(),
      name: customer.getName(),
      email: customer.getEmail(),
      yearsAsCustomer: customer.getYearsAsCustomer(),
      createdAt: customer.getCreatedAt(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer UUID' })
  @ApiResponse({ status: 200, description: 'Customer found.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async getById(@Param('id') id: string) {
    const customer = await this.getCustomerUseCase.execute(id);
    return {
      id: customer.getId(),
      name: customer.getName(),
      email: customer.getEmail(),
      yearsAsCustomer: customer.getYearsAsCustomer(),
      createdAt: customer.getCreatedAt(),
    };
  }
}
// Note: We map the output rich Domain Entity to a plain response object.
// This preserves the separation of concerns and avoids exposing domain methods.
