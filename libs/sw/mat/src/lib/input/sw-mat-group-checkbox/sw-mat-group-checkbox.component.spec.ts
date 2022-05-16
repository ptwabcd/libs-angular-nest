import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatGroupCheckboxComponent } from './sw-mat-group-checkbox.component';

describe('GroupCheckboxComponent', () => {
  let component: SwMatGroupCheckboxComponent;
  let fixture: ComponentFixture<SwMatGroupCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatGroupCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatGroupCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
