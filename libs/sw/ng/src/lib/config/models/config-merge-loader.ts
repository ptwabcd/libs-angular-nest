import { ConfigLoader } from './config-loader';
import { from as fromPromise, onErrorResumeNext } from 'rxjs';
import { mergeWith } from 'lodash-es';
import { filter, merge, reduce, share } from 'rxjs/operators';
import { ConfigStaticLoader } from './config-static-loader';

const mergeWithFn = (object: any, source: Array<any>): any => {
  return mergeWith(object, source, (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
};

const mergeSeries = (merged: any, current: Promise<any>): any => {
  return current.then((res: any) => mergeWithFn(merged, res));
};

/**
 * The Config Merge Loader Class
 * @implements ConfigLoader
 */
export class ConfigMergeLoader implements ConfigLoader {
  private nextLoader: Function;

  constructor(private readonly loaders: Array<ConfigLoader> = []) {
  }

  loadSettings(): any {
    if (this.nextLoader) {
      return this.mergeParallel()
        .then((res: any) => mergeSeries(res, this.nextLoader(res).loadSettings()));
    }
    return this.mergeParallel();
  }

  private mergeParallel(): Promise<any> {
    const loaders: Array<ConfigLoader> = [new ConfigStaticLoader(), ...this.loaders];
    const mergedSettings = onErrorResumeNext(
      loaders.map((loader: ConfigLoader) => fromPromise(loader.loadSettings()))
    ).pipe(filter((res: any) => res), share());

    return new Promise((resolve, reject) => {
      mergedSettings
        .pipe(
          merge(mergedSettings),
          reduce((merged: any, current: any) => mergeWith(merged, current), {})
        )
        .subscribe((res: any) => resolve(res), () => reject('Loaders unreachable!'));
    });
  }
}
