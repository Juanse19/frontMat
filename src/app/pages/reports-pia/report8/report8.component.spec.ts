import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report8Component } from './report8.component';

describe('Report8Component', () => {
  let component: Report8Component;
  let fixture: ComponentFixture<Report8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
