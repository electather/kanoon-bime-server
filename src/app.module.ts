import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { BodyInsuranceModule } from './modules/bodyInsurance/bodyInsurance.module';
import { FileModule } from './modules/files/file.module';
import { ThirdPartyModule } from './modules/thirdParty/thirdParty.module';
import { UserModule } from './modules/user/user.module';
import { UserInfoModule } from './modules/userInfo/userInfo.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FileModule,
    UserInfoModule,
    VehicleModule,
    ThirdPartyModule,
    BodyInsuranceModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
