import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowsSchedulerComponent } from './windows-scheduler.component';

describe('WindowsSchedulerComponent', () => {
  let component: WindowsSchedulerComponent;
  let fixture: ComponentFixture<WindowsSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowsSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowsSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
