import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al2.4Component } from './al2.4.component';

describe('Al2.4Component', () => {
  let component: Al2.4Component;
  let fixture: ComponentFixture<Al2.4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al2.4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al2.4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
