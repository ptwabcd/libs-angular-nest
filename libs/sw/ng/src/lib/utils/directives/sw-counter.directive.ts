import { Directive, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
  selector: '[swCounter]'
})
export class SwCounterDirective implements OnChanges, OnDestroy {

  private _counterSource$ = new Subject<any>();
  private _subscription = Subscription.EMPTY;

  @Input() libsCounter: number;
  @Input() interval: number;
  @Output() value = new EventEmitter<number>();

  constructor() {

    this._subscription = this._counterSource$.pipe(
      switchMap(({ interval, count }) =>
        timer(0, interval).pipe(
          take(count),
          tap(() => this.value.emit(--count))
        )
      )
    ).subscribe();
  }

  ngOnChanges() {
    this._counterSource$.next({ count: this.libsCounter, interval: this.interval });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
