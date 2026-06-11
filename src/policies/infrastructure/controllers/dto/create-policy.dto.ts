import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class CreatePolicyDto {
  @ApiProperty({ description: 'Customer UUID', example: 'd3b07384-d113-49cd-a5d6-89d0cf319985' })
  @IsNotEmpty({ message: 'customerId is required' })
  @IsString()
  customerId: string;

  @ApiProperty({ description: 'Insurance branch type (AUTO, LIFE, HOME, HEALTH)', example: 'AUTO' })
  @IsNotEmpty({ message: 'branch is required' })
  @IsString()
  branch: string;

  @ApiProperty({ description: 'Rating strategy (STANDARD, RISK_BASED, LOYALTY)', example: 'RISK_BASED' })
  @IsNotEmpty({ message: 'ratingStrategy is required' })
  @IsString()
  ratingStrategy: string;

  @ApiProperty({ 
    description: 'Risk profile data needed for rating strategies', 
    example: { score: 45 },
    required: false 
  })
  @IsOptional()
  @IsObject()
  riskProfile?: any;
}
