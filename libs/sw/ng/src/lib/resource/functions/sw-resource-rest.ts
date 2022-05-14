
import { SwHttpClientRequestMethod } from 'sw-common';
import { SwResource, SwResourceRequest, SwResourceResponse, SwResourceResult, SwResourceSetting } from '../models';

export function SwResourceRest(resourceSetting: SwResourceSetting = {}) {

  if (resourceSetting.method === undefined) {
    resourceSetting.method = SwHttpClientRequestMethod.GET;
  }

  return function(target: SwResource, propertyKey: string) {
    (<any> target)[propertyKey] = function (...args: any[]): SwResourceResult<any> | SwResourceResult<SwResourceResponse<any>> {

      const resourceRequest: SwResourceRequest = {
        params:       (args[0]) ? args[0] : {},
        routerParams: (args[1]) ? args[1] : {},
        body:         args[2]
      };

      return this.$resourceAction(resourceRequest, {...this.getResourceOptions(), ...resourceSetting});

    };
  };

}
