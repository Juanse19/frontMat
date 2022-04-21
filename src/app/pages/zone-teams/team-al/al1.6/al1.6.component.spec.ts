import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.6Component } from './al1.6.component';

describe('Al1.6Component', () => {
  let component: Al1.6Component;
  let fixture: ComponentFixture<Al1.6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
