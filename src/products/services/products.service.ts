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

  addProduct(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: number, changes: UpdateProductDto) {
    const product =await this.productRepository.findOne({where:{id}});
    //merge se encarga de sobreescribir los datos
    //pero no de guardarlos a la base de datos
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product)
  }


  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }

}
