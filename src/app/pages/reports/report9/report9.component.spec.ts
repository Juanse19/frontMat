import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report9Component } from './report9.component';

describe('Report9Component', () => {
  let component: Report9Component;
  let fixture: ComponentFixture<Report9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
