import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SwBaseComponent } from '../../../../utils/models/sw-base-component';
import { SwComponentData } from '../../../table';

@Component({
  selector: 'sw-dynamic-component',
  templateUrl: './sw-dynamic.component.html',
  styleUrls: ['./sw-dynamic.component.scss']
})
export class SwDynamicComponent extends SwBaseComponent implements OnInit {

  currentComponent = null;

  @ViewChild('dynamicComponentContainer', {static: true, read: ViewContainerRef}) dynamicComponentContainer: ViewContainerRef;

  @Input() set componentData(data: SwComponentData) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    const providers = [];
    data.providers.forEach((provider) => {
      providers.push(provider);
    });
    // providers.push({
    //   provide: data.dataInjectionToken,
    //   useValue: data.data
    // });

    const resolvedProviders = Injector.create(providers);

    const componentFactory = this.resolver.resolveComponentFactory(data.component);

    const viewContainerRef = this.dynamicComponentContainer;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory, null, resolvedProviders);

    Object.keys(data.inputData).forEach((key) => {
      componentRef.instance[key] = data.inputData[key];
    });

    Object.keys(data.outputData).forEach((key) => {
      componentRef.instance[key].pipe(
        takeUntil(this.destroyed$)
      ).subscribe( (res) => {
        data.outputData[key](res);
      });
    });


    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = componentRef;

  }

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit(): void {
  }

}
