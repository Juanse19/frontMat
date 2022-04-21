import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.9Component } from './al1.9.component';

describe('Al1.9Component', () => {
  let component: Al1.9Component;
  let fixture: ComponentFixture<Al1.9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
