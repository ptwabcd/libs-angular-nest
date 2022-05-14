import { SwResourceResult } from './sw-resource-result';
import { SwResourceResponse } from './sw-resource-response';

export type ResourceMethodActionData<IP, IRP, IB, O> = (params?: IP, routerParams?: IRP, body?: IB) => SwResourceResult<O>;

export type ResourceMethodData<IP, IRP, O> = (params?: IP, routerParams?: IRP, ) => SwResourceResult<O>;

export type ResourceMethodResponse<IP, IRP, O> = (params?: IP, routerParams?: IRP, ) => SwResourceResult<SwResourceResponse<O>>;

export type ResourceMethodActionResponse<IP, IRP, IB, O> = (params?: IP, routerParams?: IRP, body?: IB) => SwResourceResult<SwResourceResponse<O>>;
