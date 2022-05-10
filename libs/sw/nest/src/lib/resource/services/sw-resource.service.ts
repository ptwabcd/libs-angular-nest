import { Injectable } from '@nestjs/common';
import { SwResponseMessageType } from '../enums';
import { SwLogService } from '../../log';
import { SwPagination, SwPaginationRequest } from 'sw-common';

@Injectable()
export class SwResourceService {

  constructor(
    private swLogService: SwLogService,
  ) {}

  /**
   * 將資料封裝成data format
   * @CusParamInt {{} | Array<{}>} data
   * @returns {{}}
   */
  wrapData(data: {} | Array<{}>): {} {
    return {
      data: data
    };
  }

  /**
   * 將資料封裝成data format with pagination
   */
  wrapPageData(data: {} | Array<{}>, pagination: SwPaginationRequest, total: number): {} {
    return {
      data: data,
      pagination: new SwPagination(pagination, total)
    };
  }

  /**
   * 將資料封裝成data format with cus pagination
   */
  wrapCusPageData(data: Array<{}>, pagination: SwPaginationRequest): {} {
    const {perPage, currentPage} = pagination;
    return {
      data: data.slice((currentPage - 1) * perPage, currentPage * perPage),
      pagination: new SwPagination(pagination, data.length)
    };
  }


  /**
   * 將資料封裝成data format with status
   */
  wrapStatusData(data: {} | Array<{}>, isSuccess: boolean, responseMessageType: SwResponseMessageType | string = '', err?: string): {} {
    if (!isSuccess && err) {
      this.swLogService.error(err);
    }
    return {
      data: {
        ...data,
        isSuccess: isSuccess,
        message: responseMessageType !== '' ? SwResponseMessageType[responseMessageType] : ''
      }
    };
  }

  wrapCustomStatusData(data: {} | Array<{}>, isSuccess: boolean, message: string, err?: string): {} {
    if (!isSuccess && err) {
      this.swLogService.error(err);
    }
    return {
      data: {
        ...data,
        isSuccess,
        message
      }
    };
  }

}
