import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatUploadToolDialogComponent } from './sw-mat-upload-tool-dialog.component';

describe('UploadToolDialogComponent', () => {
  let component: SwMatUploadToolDialogComponent;
  let fixture: ComponentFixture<SwMatUploadToolDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatUploadToolDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatUploadToolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
