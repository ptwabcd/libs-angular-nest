import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatIconComponent } from './sw-mat-icon.component';

describe('MatIconComponent', () => {
  let component: SwMatIconComponent;
  let fixture: ComponentFixture<SwMatIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
