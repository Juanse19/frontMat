import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.8Component } from './al1.8.component';

describe('Al1.8Component', () => {
  let component: Al1.8Component;
  let fixture: ComponentFixture<Al1.8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
