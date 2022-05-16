import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatTaiwanAddressComponent } from './sw-mat-taiwan-address.component';

describe('TaiwanAddressComponent', () => {
  let component: SwMatTaiwanAddressComponent;
  let fixture: ComponentFixture<SwMatTaiwanAddressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatTaiwanAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatTaiwanAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
