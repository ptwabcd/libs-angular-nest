import { SwResourceSetting } from '../models';

export function SwResourceParams(params: SwResourceSetting = {}) {

  return function (target: any) {

    target.prototype.getResourceOptions = function () {
      return params;
    };

  };
}
