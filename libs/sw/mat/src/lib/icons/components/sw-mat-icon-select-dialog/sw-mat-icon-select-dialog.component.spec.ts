import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SwMatIconSelectDialogComponent } from './sw-mat-icon-select-dialog.component';


describe('SwMatIconSelectDialogComponent', () => {
  let component: SwMatIconSelectDialogComponent;
  let fixture: ComponentFixture<SwMatIconSelectDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatIconSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatIconSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
