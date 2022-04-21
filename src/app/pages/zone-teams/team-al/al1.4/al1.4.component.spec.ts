import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.4Component } from './al1.4.component';

describe('Al1.4Component', () => {
  let component: Al1.4Component;
  let fixture: ComponentFixture<Al1.4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
