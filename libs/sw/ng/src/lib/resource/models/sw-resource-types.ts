import { SwResourceResult } from './sw-resource-result';
import { SwResourceResponse } from './sw-resource-response';

export type SwResourceMethodActionData<IP, IRP, IB, O> = (params?: IP, routerParams?: IRP, body?: IB) => SwResourceResult<O>;

export type SwResourceMethodData<IP, IRP, O> = (params?: IP, routerParams?: IRP, ) => SwResourceResult<O>;

export type SwResourceMethodResponse<IP, IRP, O> = (params?: IP, routerParams?: IRP, ) => SwResourceResult<SwResourceResponse<O>>;

export type SwResourceMethodActionResponse<IP, IRP, IB, O> = (params?: IP, routerParams?: IRP, body?: IB) => SwResourceResult<SwResourceResponse<O>>;
