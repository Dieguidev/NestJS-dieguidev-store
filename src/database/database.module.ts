import { Global, Module } from '@nestjs/common';
import config from 'src/config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//conexion a base de datos
import { Client } from 'pg';


// client.query('SELECT * FROM categorias', (err,res) => {
//   console.error(err);
//   console.log(res.rows);
// });


@Global()
@Module({
  //configuracion de TypeORM
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = ConfigService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
        };
      },
    }),
  ],
  providers: [
    //este provider realiza toda la conexion a postgres injectando por medio de useFactory
    {
      provide: 'POSTGRES',
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = ConfigService.postgres
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
  exports: ['POSTGRES', TypeOrmModule],
})
export class DatabaseModule { }
