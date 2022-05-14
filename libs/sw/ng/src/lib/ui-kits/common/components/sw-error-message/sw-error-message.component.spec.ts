import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwErrorMessageComponent } from './sw-error-message.component';

describe('ErrorMessageComponent', () => {
  let component: SwErrorMessageComponent;
  let fixture: ComponentFixture<SwErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
