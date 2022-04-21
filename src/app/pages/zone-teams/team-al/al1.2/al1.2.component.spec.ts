import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.2Component } from './al1.2.component';

describe('Al1.2Component', () => {
  let component: Al1.2Component;
  let fixture: ComponentFixture<Al1.2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
