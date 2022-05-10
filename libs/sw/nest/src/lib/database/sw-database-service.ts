import * as sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SwConfigService } from '../config';
import { SwDate, SwPaginationRequest, SwSortDirection } from 'sw-common';

export class SwDatabaseService {

  OP = {
    and: Op.and,
    or: Op.or,
    between: Op.between,
    like: Op.like,
    in: Op.in,
    gte: Op.gte,
    lte: Op.lte,
    gt: Op.gt,
    lt: Op.lt,
    ne: Op.ne,
    eq: Op.eq,
    not: Op.not
  };

  ALL = -1;

  COLUMN = (key: string) => Sequelize.col(key);

  LITERAL = (value) => Sequelize.literal(value);

  FN = (functionName: string, value) => Sequelize.fn(functionName, value);

  INCREMENT = (key: string, count: number) => {
    return {
      [key]: Sequelize.literal(`${key} +${count}`)
    };
  }

  DECREMENT = (key: string, count: number) => {
    return {
      [key]: Sequelize.literal(`${key} -${count}`)
    };
  }

  ORDER = (sortKey: string, sortDirection: SwSortDirection) => ({ order: this.LITERAL(`${sortKey} ${sortDirection}`)});

  PAGINATION = (request: SwPaginationRequest, isSort = true) => {
    const order = (request.sortKey && request.sortDirection && isSort)
      ? this.ORDER(request.sortKey, request.sortDirection)
      : {};
    const pagination = !request.currentPage
      ? {}
      : {
          offset: (request.currentPage - 1) * request.perPage,
          limit: request.perPage
        };
    return {
      ...order,
      ...pagination,
      distinct: true
    };
  }

  DATE_BETWEEN = (startDate: Date | string, endDate: Date | string) => {
    const dateService = new SwDate();
    if (!startDate) {
      startDate = new Date('2017/1/1');
    }
    if (!endDate) {
      endDate = dateService.getNow();
    }
    return {
      [this.OP.between]: [
        new Date(dateService.covertDate(startDate).setHours(0, 0, 0, 0)),
        new Date(dateService.covertDate(endDate).setHours(23, 59, 59, 999))
      ]
    };
  }

  INT_TO_STRING_SORT = (column: string) => {
    const config = new SwConfigService().getConfig();
    if (config.dbDialect === 'postgres') {
      return {
        order: this.LITERAL(`(substring("${column}", '^[0-9]+'))::int,coalesce(substring("${column}", '[^0-9_].*$'),'')`)
      };
    } else {
      return {
        order: this.LITERAL(`CAST(${column} AS INTEGER)`)
      };
    }
  }

  iLike(column: string, value: string) {
    return sequelize.where(this.FN('LOWER', sequelize.col(column)), 'LIKE', this.FN('LOWER', value));
  }
}
