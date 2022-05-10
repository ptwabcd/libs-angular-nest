import { DynamicModule, Global, Module } from '@nestjs/common';
import { SwAuthService } from './services/sw-auth.service';
import { SwJwtStrategy } from './strategies/sw-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

@Global()
@Module({})
export class SwAuthModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    // tslint:disable-next-line:no-shadowed-variable
    const jwtStrategyProviders = (options) => [
      {
        provide: 'JWT_STRATEGY',
        useFactory: async () => {
          return new SwJwtStrategy(options.secret);
        },
      },
    ];
    return {
      module: SwAuthModule,
      imports: [
        PassportModule,
        JwtModule.register(options),
      ],
      providers: [SwAuthService, ...jwtStrategyProviders(options)],
      exports: [SwAuthService, ...jwtStrategyProviders(options)],
    };
  }
}
