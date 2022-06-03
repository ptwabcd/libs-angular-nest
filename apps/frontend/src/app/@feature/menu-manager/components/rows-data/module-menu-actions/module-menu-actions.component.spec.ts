import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMenuActionsComponent } from './module-menu-actions.component';

describe('ModuleMenuActionsComponent', () => {
  let component: ModuleMenuActionsComponent;
  let fixture: ComponentFixture<ModuleMenuActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleMenuActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleMenuActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
