import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer full name', example: 'Juan Perez' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'Customer email address', example: 'juan.perez@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'Number of years as a customer', example: 3 })
  @IsNumber({}, { message: 'Years as customer must be a number' })
  @Min(0, { message: 'Years as customer cannot be negative' })
  yearsAsCustomer: number;
}
