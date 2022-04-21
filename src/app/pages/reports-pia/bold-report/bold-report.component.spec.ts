import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldReportComponent } from './bold-report.component';

describe('BoldReportComponent', () => {
  let component: BoldReportComponent;
  let fixture: ComponentFixture<BoldReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoldReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoldReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
