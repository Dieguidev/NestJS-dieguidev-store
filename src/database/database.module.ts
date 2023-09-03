import { Global, Module } from '@nestjs/common';
import config from 'src/config';
import { ConfigService, ConfigType } from '@nestjs/config';
//conexion a base de datos
import { Client } from 'pg';


// client.query('SELECT * FROM categorias', (err,res) => {
//   console.error(err);
//   console.log(res.rows);
// });


@Global()
@Module({
  providers:[
    {
      provide: 'POSTGRES',
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const {user, host, dbName, password,port} = ConfigService.postgres
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port
        });
        client.connect();
        return client;
      },
      inject: [config.KEY]
    },
  ],
  exports: ['POSTGRES'],
})
export class DatabaseModule {}
