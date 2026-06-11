import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePolicyStatusDto {
  @ApiProperty({ description: 'Target state status (ISSUED, ACTIVE, SUSPENDED, CANCELLED)', example: 'ISSUED' })
  @IsNotEmpty({ message: 'targetStatus is required' })
  @IsString()
  targetStatus: string;
}
