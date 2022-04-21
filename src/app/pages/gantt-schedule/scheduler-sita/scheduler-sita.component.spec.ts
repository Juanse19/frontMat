import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerSitaComponent } from './scheduler-sita.component';

describe('SchedulerSitaComponent', () => {
  let component: SchedulerSitaComponent;
  let fixture: ComponentFixture<SchedulerSitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerSitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerSitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
