import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowMaintenanceComponent } from './window-maintenance.component';

describe('WindowMaintenanceComponent', () => {
  let component: WindowMaintenanceComponent;
  let fixture: ComponentFixture<WindowMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
