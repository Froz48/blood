import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { cityModule } from '@app/city/city.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { donorModule } from './donor/donor.module';
import { authMiddleware } from './donor/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), cityModule, donorModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(authMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
