import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';


import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    @Inject('POSTGRES') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    console.log();

    return `Hello World! ${apiKey} ${db}`;
  }


  getCategories() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM categorias', (err,res) => {
        if(err) {
          reject(err);
        }
        resolve(res.rows);
    })


  })
}}
