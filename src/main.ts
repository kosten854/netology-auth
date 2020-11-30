import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { GlobalModule } from './globals/global.module';
import { ConfigService } from './globals/services/config.service';
import { setupSwagger } from './swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalFilters(
    new QueryFailedFilter(reflector),
  );
  const configService = app.select(GlobalModule).get(ConfigService);
  if (['development', 'demo'].includes(configService.nodeEnv)) {
    setupSwagger(app);
    app.use(morgan('combined'));
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  await app.listen(configService.port, configService.host);
  console.info(`🚀 Api documentation on http://${configService.host}:${configService.port}/documentation`);

}
bootstrap();
