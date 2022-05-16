import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable ,  Subscriber } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SwBaseComponent, SwResourceResult } from 'sw-ng';

@Component({
  selector: 'libs-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent extends SwBaseComponent implements OnInit, OnChanges {

  @Input() resourceResult: SwResourceResult<any>;

  @Output() onComplete: EventEmitter<any> = new EventEmitter();

  progressObservable: Observable<any>;

  progressValue = 0;

  isOpen = false;

  constructor() {
    super();
  }

  ngOnInit() {
    this.progressObservable = Observable.create((subscriber: Subscriber<any>) => {
      this.resourceResult.$observable.pipe(takeUntil(this.destroyed$)).subscribe(
        (res) => {
          this.isOpen = true;
          switch (res.type) {
            case HttpEventType.UploadProgress:
              if (res.total) {
                this.progressValue = Math.round(100 * res.loaded / res.total);
              }
              break;
            case HttpEventType.Response:
              subscriber.next(res.body.data);
              break;
          }
        },
        (error: HttpErrorResponse) => {
          subscriber.error(new Error(error.message));
        },
        () => subscriber.complete()
      );
    });
  }

  ngOnChanges(changes) {
    if (changes.resourceResult.currentValue && this.progressObservable) {
      this.progressValue = 0;
      this.progressObservable.pipe(takeUntil(this.destroyed$)).subscribe(result => {
        setTimeout(() => {
          this.resourceResult.$resolved = true;
          this.onComplete.emit(result);
          this.isOpen = false;
        }, 1000);
      });
    }
  }

}
