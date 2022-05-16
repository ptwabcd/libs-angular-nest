import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatI18nSelectionComponent } from './sw-mat-i18n-selection.component';

describe('I18nSelectionComponent', () => {
  let component: SwMatI18nSelectionComponent;
  let fixture: ComponentFixture<SwMatI18nSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatI18nSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatI18nSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
