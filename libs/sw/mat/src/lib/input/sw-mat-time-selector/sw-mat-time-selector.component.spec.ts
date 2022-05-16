import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatTimeSelectorComponent } from './sw-mat-time-selector.component';

describe('TimeSelectorComponent', () => {
  let component: SwMatTimeSelectorComponent;
  let fixture: ComponentFixture<SwMatTimeSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatTimeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatTimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
