import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatPrintContentComponent } from './sw-mat-print-content.component';

describe('PrintContentComponent', () => {
  let component: SwMatPrintContentComponent;
  let fixture: ComponentFixture<SwMatPrintContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatPrintContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatPrintContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
