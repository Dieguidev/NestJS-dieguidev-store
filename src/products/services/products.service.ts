import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     description: 'Description 1',
  //     price: 100,
  //     image: 'image1.jpg',
  //     stock: 10,
  //   },
  // ];

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  getProducts() {
    return this.productRepository.find();
  }

  async getProduct(id: number) {
    const product =await this.productRepository.findOne({where:{id}});
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // addProduct(payload: CreateProductDto) {
  //   console.log(payload);

  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // updateProduct(id: number, payload: UpdateProductDto) {
  //   const product = this.getProduct(id);
  //   console.log(product);

  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  // deleteProduct(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }

}
