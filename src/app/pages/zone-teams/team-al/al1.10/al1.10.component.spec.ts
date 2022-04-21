import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.10Component } from './al1.10.component';

describe('Al1.10Component', () => {
  let component: Al1.10Component;
  let fixture: ComponentFixture<Al1.10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
