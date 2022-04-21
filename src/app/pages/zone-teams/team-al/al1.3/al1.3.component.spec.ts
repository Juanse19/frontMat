import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al1.3Component } from './al1.3.component';

describe('Al1.3Component', () => {
  let component: Al1.3Component;
  let fixture: ComponentFixture<Al1.3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al1.3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al1.3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
