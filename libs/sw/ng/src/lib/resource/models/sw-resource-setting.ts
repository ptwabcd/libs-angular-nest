import { HttpHeaders } from '@angular/common/http';
import { SwHttpClientRequestMethod } from 'sw-common';

/**
 * 資源共用參數屬性介面
 */
export class SwResourceSetting {

  pathPrefix?: string;

  /**
   *
   * Ex: /users/{id}
   *
   * Ex2: /users/{!id}
   *
   * Ex3: /users/{:id}
   *
   * Ex4: /users/{!:id}
   * @type {string}
   */
  path?: string;

  headers?: HttpHeaders;

  method?: SwHttpClientRequestMethod;

  asResourceResponse?: boolean;

  /**
   * 是否使用為HttpEvent
   */
  isHttpEvent?: boolean;

  /**
   * 是否為formData
   */
  isFormData?: boolean;

}
