import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatNoDataComponent } from './sw-mat-no-data.component';

describe('NoDataComponent', () => {
  let component: SwMatNoDataComponent;
  let fixture: ComponentFixture<SwMatNoDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
