import { Pipe, PipeTransform } from '@angular/core';
import { SwComponentData } from '../../../ui-kits';

@Pipe({
  name: 'swObj2ComponentData'
})
export class SwObj2ComponentDataPipe implements PipeTransform {

  transform(componentData: SwComponentData, obj?: any): SwComponentData {
    return {
      component: componentData.component,
      providers: (componentData.providers) ? componentData.providers : [],
      inputData: {
        ...componentData.inputData,
        data: obj
      },
      outputData: {
        ...componentData.outputData
      }
    };
  }

}
