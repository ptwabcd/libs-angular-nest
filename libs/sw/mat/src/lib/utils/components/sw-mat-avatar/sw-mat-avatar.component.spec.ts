import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatAvatarComponent } from './sw-mat-avatar.component';

describe('AvatarComponent', () => {
  let component: SwMatAvatarComponent;
  let fixture: ComponentFixture<SwMatAvatarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
