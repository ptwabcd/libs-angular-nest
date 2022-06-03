import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMenuListComponent } from './module-menu-list.component';

describe('ModuleMenuListComponent', () => {
  let component: ModuleMenuListComponent;
  let fixture: ComponentFixture<ModuleMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleMenuListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
