import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwMatTreeComponent } from './sw-mat-tree.component';

describe('TreeComponent', () => {
  let component: SwMatTreeComponent;
  let fixture: ComponentFixture<SwMatTreeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwMatTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMatTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
