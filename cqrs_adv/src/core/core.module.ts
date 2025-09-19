import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    //if user select driver orm it's user postgres to write else mongo to read
    //inmemory collection for read and write both 
    const imports = options.driver === 'orm'
      ? [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'thapa123',
          username: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
        MongooseModule.forRoot('mongodb://localhost/vf-read-db'),
      ]
      : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
