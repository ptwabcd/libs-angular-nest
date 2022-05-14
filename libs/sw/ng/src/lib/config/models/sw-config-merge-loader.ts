import { from as fromPromise, onErrorResumeNext } from 'rxjs';
import { filter, merge, reduce, share } from 'rxjs/operators';
import { SwConfigLoader } from './sw-config-loader';
import { SwConfigStaticLoader } from './sw-config-static-loader';


export class SwConfigMergeLoader implements SwConfigLoader {

  constructor(private readonly loaders: Array<SwConfigLoader> = []) {
  }

  loadSettings(): any {
    return this.mergeParallel();
  }

  private mergeParallel(): Promise<any> {
    const loaders: Array<SwConfigLoader> = [new SwConfigStaticLoader(), ...this.loaders];
    const mergedSettings = onErrorResumeNext(
      loaders.map((loader: SwConfigLoader) => fromPromise(loader.loadSettings()))
    ).pipe(filter((res: any) => res), share());

    return new Promise((resolve, reject) => {
      mergedSettings
        .pipe(
          merge(mergedSettings),
          reduce((merged, current) => Object.assign(merged, current), {}),
        )
        .subscribe((res: any) => {
          return resolve(res);
        }, () => reject('Loaders unreachable!'));
    });
  }
}
