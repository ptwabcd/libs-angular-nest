import { SwDateRequestInterface } from './interface';
import { SwCovert } from '../covert';

export class SwBaseDateRequest {
  startDate: Date;
  endDate: Date;

  constructor(data: SwDateRequestInterface) {
    this.startDate = new SwCovert(data.startDate).toDate();
    this.endDate = new SwCovert(data.endDate).toDate();
  }
}
