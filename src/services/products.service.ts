import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image: 'image1.jpg',
      stock: 10,
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
  getProduct(id: number): Product {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: Product): Product {
    product.id = this.counterId++;
    this.products.push(product);
    return product;
  }

  updateProduct(id: number,payload: any) {
    const product = this.getProduct(id);
    console.log(product);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id!== id);
  }


}
