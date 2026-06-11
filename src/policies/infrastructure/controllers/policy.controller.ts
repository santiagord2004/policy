import { Controller, Post, Get, Patch, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePolicyUseCase } from '../../application/create-policy.use-case';
import { GetPolicyUseCase } from '../../application/get-policy.use-case';
import { GetCustomerPoliciesUseCase } from '../../application/get-customer-policies.use-case';
import { TransitionPolicyStateUseCase } from '../../application/transition-policy-state.use-case';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyStatusDto } from './dto/update-policy-status.dto';
import { Policy } from '../../domain/policy.domain';

@ApiTags('Policies')
@Controller('api/policies')
export class PolicyController {
  constructor(
    private readonly createPolicyUseCase: CreatePolicyUseCase,
    private readonly getPolicyUseCase: GetPolicyUseCase,
    private readonly getCustomerPoliciesUseCase: GetCustomerPoliciesUseCase,
    private readonly transitionPolicyStateUseCase: TransitionPolicyStateUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new policy quote' })
  @ApiResponse({ status: 201, description: 'Policy quote successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid risk profile or parameters.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    const policy = await this.createPolicyUseCase.execute(createPolicyDto);
    return this.mapResponse(policy);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get policy details by ID' })
  @ApiParam({ name: 'id', description: 'Policy UUID' })
  @ApiResponse({ status: 200, description: 'Policy found.' })
  @ApiResponse({ status: 404, description: 'Policy not found.' })
  async getById(@Param('id') id: string) {
    const policy = await this.getPolicyUseCase.execute(id);
    return this.mapResponse(policy);
  }

  @Get('customer/:id')
  @ApiOperation({ summary: 'Get policies for a customer' })
  @ApiParam({ name: 'id', description: 'Customer UUID' })
  @ApiResponse({ status: 200, description: 'List of customer policies.' })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  async getByCustomer(@Param('id') customerId: string) {
    const policies = await this.getCustomerPoliciesUseCase.execute(customerId);
    return policies.map(p => this.mapResponse(p));
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change policy state' })
  @ApiParam({ name: 'id', description: 'Policy UUID' })
  @ApiResponse({ status: 200, description: 'Policy status changed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid state transition.' })
  @ApiResponse({ status: 404, description: 'Policy not found.' })
  async changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdatePolicyStatusDto,
  ) {
    const policy = await this.transitionPolicyStateUseCase.execute(id, updateStatusDto.targetStatus);
    return this.mapResponse(policy);
  }

  private mapResponse(policy: Policy) {
    return {
      id: policy.getId(),
      policyNumber: policy.getPolicyNumber(),
      customerId: policy.getCustomerId(),
      branch: policy.getBranch(),
      coverage: policy.getCoverage(),
      basePremium: policy.getBasePremium(),
      monthlyPremium: policy.getMonthlyPremium(),
      status: policy.getStatus(),
      riskProfile: policy.getRiskProfile(),
      durationMonths: policy.getDurationMonths(),
      createdAt: policy.getCreatedAt(),
      updatedAt: policy.getUpdatedAt(),
    };
  }
}
