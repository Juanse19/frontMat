import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.5Component } from './al1.5.component';

describe('Al1.5Component', () => {
  let component: Al1.5Component;
  let fixture: ComponentFixture<Al1.5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
