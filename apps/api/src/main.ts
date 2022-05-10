/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import {
  ErrorFilter,
  SwAuthService,
  SwConfigService,
  SwLogService,
  SwResourceService,
  SwRoleGuard
} from 'sw-nest/src/lib';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  // get config
  const config = new SwConfigService().getConfig();
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (config.accessControlAllowOrigin.split(',').includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
    methods: config.accessControlAllowMethods,
    allowedHeaders: config.accessControlAllowHeaders,
    credentials: config.credentials
  };

  // create app
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: corsOptions,
    logger: new SwLogService(),
  });

  app.use(bodyParser.json({limit: '50mb'}));

  // setting assets
  app.useStaticAssets(join(__dirname, config.assetsRootPath, 'uploads'), {
    prefix: '/assets/'
  });

  app.useStaticAssets('uploads', {
    prefix: '/uploads/'
  });

  // setting global guards
  const reflector = app.get( Reflector );
  const authService = app.get( SwAuthService );
  const logService = app.get( SwLogService );
  const resourceService = app.get( SwResourceService );
  app.useGlobalGuards(new SwRoleGuard(reflector, authService));

  // setting global prefix url
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ErrorFilter(logService, resourceService));

  // const userService = app.get( UserService );

  // const user = await userService.findOne();

  // if (!user) {
  //   await userService.createAdm();
  // }

  // swagger
  const options = new DocumentBuilder()
    .setTitle('教材網')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    }
  };
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(config.serverPort);

}

bootstrap();
