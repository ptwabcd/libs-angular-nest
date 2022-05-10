import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SwCovert } from 'sw-common';

export const SwCurrentUser = createParamDecorator((data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user);

export const SwCusParamBoolean = createParamDecorator((key: string, ctx: ExecutionContext) => Boolean(ctx.switchToHttp().getRequest().params[key]));

export const SwCusParamInt = createParamDecorator((key: string, ctx: ExecutionContext) => Number(ctx.switchToHttp().getRequest().params[key]));

export const SwCusQueryInt = createParamDecorator((key: string, ctx: ExecutionContext) => Number(ctx.switchToHttp().getRequest().query[key]));

export const SwArrayBody = createParamDecorator((data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().body.map(item => new data(item)));

export const SwCusBody = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  Object.keys(req.body).forEach(key => {
    req.body[key] = new SwCovert(req.body[key]).toValue();
  });
  return new data(req.body);
});

export const SwCusQuery = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  Object.keys(req.query).forEach(key => {
    req.query[key] = new SwCovert(req.body[key]).toValue();
  });
  return new data(req.query);
});
