import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { BrandsController } from 'src/products/controllers/brands.controller';
import { BrandsService } from 'src/products/services/brands.service';

@Module({
  controllers: [CustomerController, UsersController, BrandsController],
  providers: [CustomersService, UsersService, BrandsService]
})
export class UsersModule {}
