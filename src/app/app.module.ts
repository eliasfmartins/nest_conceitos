import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Como o banco está no Docker, 'localhost' ainda é válido
      port: 5432, // Mapeado para a porta 5432 no Docker
      username: 'docker', // Usando o username do Docker Compose
      password: 'docker', // Usando a senha do Docker Compose
      database: 'apisolid', // Usando o banco definido no Docker Compose
      autoLoadEntities: true, // Carregar entidades automaticamente
      synchronize: true, // Sincroniza com o banco de dados (não use em produção)
    }),
    RecadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
