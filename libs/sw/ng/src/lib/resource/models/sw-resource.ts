import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,  Subscriber } from 'rxjs';
import { SwResourceSetting } from './sw-resource-setting';
import { SwResourceResult } from './sw-resource-result';
import { map } from 'rxjs/operators';
import { SwResourceRequest } from './sw-resource-request';
import { SwResourceResponse } from './sw-resource-response';
import { SwConfigService } from '../../config/services';
import { SwBaseComponent } from '../../utils';

@Injectable()
export class SwResource extends SwBaseComponent {

  url = '';

  constructor(
    protected httpClient: HttpClient,
    protected configService: SwConfigService
  ) {
    super();
  }

  $resourceAction(resourceRequest: SwResourceRequest, resourceSetting: SwResourceSetting): SwResourceResult<any> {
    const resourceResult: SwResourceResult<any> | SwResourceResult<SwResourceResponse<any>> = {
      $resolved: null,
      $error: null
    };
    this.url = [this.configService.getConfig('SERVER'),  '/', this.configService.getConfig('SERVER_PREFIX') , resourceSetting.pathPrefix, resourceSetting.path].join('');

    // GET process
    this.preparePathParams(resourceRequest.routerParams);
    const httpParams = this.prepareSearch(resourceRequest.params);

    // form data process
    if (resourceSetting.isFormData) {
      resourceRequest.body = this.prepareFormData(resourceRequest.body);
    }

    const mainRequest = this.createRequestOptions(resourceRequest.body, httpParams, resourceSetting);
    const requestObservable = this.httpRequest(mainRequest);
    resourceResult.$observable = ( resourceSetting.isHttpEvent)
      ? requestObservable
      : this.createMainObservable(resourceResult, requestObservable, resourceSetting.asResourceResponse);
    return resourceResult;
  }

  /**
   * Default prepare search
   * @param params
   */
  prepareSearch(params: Object = {}): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).map(key => httpParams = httpParams.append(key, params[key]));
    return httpParams;
  }

  /**
   * Default Create Http Request Options
   */
  createRequestOptions(body: any, httpParams: HttpParams, resourceSetting: SwResourceSetting): HttpRequest<any> {
    let httpHeaders = new HttpHeaders();

    httpHeaders = httpHeaders.set('Authorization', `Bearer ${localStorage.getItem('TOKEN')}`);
    if (!resourceSetting.isFormData) {
      httpHeaders = httpHeaders.set('Accept', 'application/json');
      httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    }
    resourceSetting.headers = httpHeaders;
    return new HttpRequest(
      resourceSetting.method,
      this.url,
      body,
      {
        headers: resourceSetting.headers,
        params: httpParams,
        responseType: 'json',
        reportProgress: true,
        withCredentials: true
      }
    );
  }

  /**
   * Default common Http Request
   * @param {HttpRequest<any>} req
   * @return {Observable<any>}
   */
  protected httpRequest(req: HttpRequest<any>): Observable<any> {
    const requestObservable = this.httpClient.request(req);
    return requestObservable.pipe(
      map((event: HttpEvent<any>) => {
        return event;
      })
    );
  }

  /**
   * Default Create main Observable
   * @param resourceResult
   * @param {Observable<HttpResponse<any>>} requestObservable
   * @param asResourceResponse
   * @return {Observable<any>}
   */
  private createMainObservable(resourceResult: SwResourceResult<any> | SwResourceResult<SwResourceResponse<any>>,
                               requestObservable: Observable<HttpResponse<any>>, asResourceResponse: boolean): Observable<any> {
    return Observable.create((subscriber: Subscriber<any>) => {
      const subscription = requestObservable.subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.body) {
            resourceResult.$resolved = true;
            if (asResourceResponse) {
              resourceResult.body = resp.body.data;
              resourceResult.metadata = resp.body;
              subscriber.next(resourceResult);
            } else {
              subscriber.next(resp.body.data);
            }
          }
        },
        (err: any) => {
          resourceResult.$resolved = false;
          resourceResult.$error = true;
        },
        () => {
          subscriber.complete();
        }
      );
      resourceResult.$abort = () => subscription.unsubscribe();
    });
  }

  private preparePathParams(params: any) {
    const pathParams = this.url.match(/{([^}]*)}/g) || [];
    for (let i = 0; i < pathParams.length; i++) {
      let pathKey = pathParams[i].substr(1, pathParams[i].length - 2);

      pathKey = pathKey.substr(1);

      const value = params[pathKey];

      delete params[pathKey];

      if (value === undefined || value === null) {
        const consoleMsg = `Mandatory ${pathParams[i]} path parameter is missing`;
        console.warn(consoleMsg);
        throw new Error(consoleMsg);
      }
      // Replacing in the url
      this.url = this.url.replace(pathParams[i], value);
    }
  }

  private prepareFormData(body: Object | Array<any>): FormData {
    const formData = new FormData();
    Object.keys(body).map(key => {
      if (body[key] instanceof FileList) {
        Object.keys(body[key]).map(itemKey => formData.append(key, body[key].item(itemKey)));
      } else if (body[key] instanceof Array) {
        body[key].forEach(v =>  formData.append(key, v));
      } else {
        formData.append(key, body[key]);
      }
    });
    return formData;
  }

}
