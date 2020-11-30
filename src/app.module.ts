import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalModule } from './globals/global.module';
import { ConfigService } from './globals/services/config.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './modules/user/user.module';



@Module({
  exports: [PassportModule.register({ defaultStrategy: 'local' })],
  providers: [LocalStrategy],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [GlobalModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
  ],
})
export class AppModule { }
