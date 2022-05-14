export interface SwResourceResponse<B = any> {
  status: number;
  headers?: any;
  body?: B;
  metadata?: { [key: string]: any};
  resource?: any;
}
