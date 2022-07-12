import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportParametrizableComponent } from './report-parametrizable.component';

describe('ReportParametrizableComponent', () => {
  let component: ReportParametrizableComponent;
  let fixture: ComponentFixture<ReportParametrizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportParametrizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportParametrizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
