import { CreateCustomerUseCase } from '../../application/create-customer.use-case';
import { GetCustomerUseCase } from '../../application/get-customer.use-case';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomerController {
    private readonly createCustomerUseCase;
    private readonly getCustomerUseCase;
    constructor(createCustomerUseCase: CreateCustomerUseCase, getCustomerUseCase: GetCustomerUseCase);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        id: string;
        name: string;
        email: string;
        yearsAsCustomer: number;
        createdAt: Date;
    }>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        yearsAsCustomer: number;
        createdAt: Date;
    }>;
}
