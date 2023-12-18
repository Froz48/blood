import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { donationModule } from '@app/donation/donation.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { donorModule } from './donor/donor.module';
import { authMiddleware } from './donor/middlewares/auth.middleware';
import { facilityModule } from './facility/facility.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), donationModule, donorModule, facilityModule],
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
