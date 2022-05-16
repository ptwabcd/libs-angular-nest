import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatVirtualScrollSelectComponent } from './sw-mat-virtual-scroll-select.component';

describe('VirtualScrollSelectComponent', () => {
  let component: SwMatVirtualScrollSelectComponent;
  let fixture: ComponentFixture<SwMatVirtualScrollSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatVirtualScrollSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatVirtualScrollSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
