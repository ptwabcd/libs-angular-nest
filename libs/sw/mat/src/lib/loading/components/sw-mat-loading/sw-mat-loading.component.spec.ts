import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwMatLoadingComponent } from './sw-mat-loading.component';

describe('LoadingComponent', () => {
  let component: SwMatLoadingComponent;
  let fixture: ComponentFixture<SwMatLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwMatLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
