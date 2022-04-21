import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.7Component } from './al1.7.component';

describe('Al1.7Component', () => {
  let component: Al1.7Component;
  let fixture: ComponentFixture<Al1.7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
