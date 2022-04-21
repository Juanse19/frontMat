import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerganttComponent } from './schedulergantt.component';

describe('SchedulerganttComponent', () => {
  let component: SchedulerganttComponent;
  let fixture: ComponentFixture<SchedulerganttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerganttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerganttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
