import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRepots2Component } from './chart-repots2.component';

describe('ChartRepots2Component', () => {
  let component: ChartRepots2Component;
  let fixture: ComponentFixture<ChartRepots2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRepots2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRepots2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
