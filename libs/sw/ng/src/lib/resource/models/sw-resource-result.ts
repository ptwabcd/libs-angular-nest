import { Observable } from 'rxjs';

export type SwResourceResult<R extends {}> = R & {
  $resolved?: boolean;
  $error?: boolean;
  $observable?: Observable<R>;
  $abort?(): void;
};
