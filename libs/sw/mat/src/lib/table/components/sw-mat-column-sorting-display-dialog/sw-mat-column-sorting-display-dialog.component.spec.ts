import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwMatColumnSortingDisplayDialogComponent } from './sw-mat-column-sorting-display-dialog.component';

describe('ColumnSortingDisplayDialogComponent', () => {
  let component: SwMatColumnSortingDisplayDialogComponent;
  let fixture: ComponentFixture<SwMatColumnSortingDisplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwMatColumnSortingDisplayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatColumnSortingDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
