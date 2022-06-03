import { Injectable } from '@angular/core';
import { ModuleMenu, ModuleMenuForm } from '@full-stack/api-interfaces';
import { SwHttpClientRequestMethod, SwPagination, SwStatusData } from 'sw-common';
import { SwResource, SwResourceMethodActionData, SwResourceMethodResponse, SwResourceParams, SwResourceRest } from 'sw-ng';

@Injectable({
  providedIn: 'root'
})
@SwResourceParams({
  pathPrefix: '/menus',
})
export class MenuService extends SwResource {
  /**
   * 取得模組選單列表
   * @Method GET
   * @URL api/menus
   */
  @SwResourceRest({
    method: SwHttpClientRequestMethod.GET,
    path: '',
    asResourceResponse: true
  })
  getMenu: SwResourceMethodResponse<SwPagination, {}, Array<ModuleMenu>>;

  /**
   * 新增模組選單
   * @Method POST
   * @URL api/menus/create
   */
  @SwResourceRest({
    method: SwHttpClientRequestMethod.POST,
    path: '/create',
  })
  createMenu: SwResourceMethodActionData<{}, {}, ModuleMenuForm, SwStatusData>;

  /**
   * 更新模組選單
   * @Method PUT
   * @URL api/menus/{:menuId}
   */
  @SwResourceRest({
    method: SwHttpClientRequestMethod.PUT,
    path: '/{:menuId}',
  })
  updateMenu: SwResourceMethodActionData<{}, { menuId: number }, ModuleMenuForm, SwStatusData>;

  /**
   * 刪除模組選單
   * @Method DELETE
   * @URL api/menus/{:menuId}
   */
  @SwResourceRest({
    method: SwHttpClientRequestMethod.DELETE,
    path: '/{:menuId}',
  })
  deleteMenu: SwResourceMethodActionData<{}, { menuId: number }, {}, SwStatusData>;
}
