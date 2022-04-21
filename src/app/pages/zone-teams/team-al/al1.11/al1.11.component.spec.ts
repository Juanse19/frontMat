import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.11Component } from './al1.11.component';

describe('Al1.11Component', () => {
  let component: Al1.11Component;
  let fixture: ComponentFixture<Al1.11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
