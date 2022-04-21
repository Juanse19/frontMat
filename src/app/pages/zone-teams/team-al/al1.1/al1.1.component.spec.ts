import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.1Component } from './al1.1.component';

describe('Al1.1Component', () => {
  let component: Al1.1Component;
  let fixture: ComponentFixture<Al1.1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
