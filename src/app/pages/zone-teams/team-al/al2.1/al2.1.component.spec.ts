import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al2.1Component } from './al2.1.component';

describe('Al2.1Component', () => {
  let component: Al2.1Component;
  let fixture: ComponentFixture<Al2.1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al2.1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al2.1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
