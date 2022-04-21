import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al2.2Component } from './al2.2.component';

describe('Al2.2Component', () => {
  let component: Al2.2Component;
  let fixture: ComponentFixture<Al2.2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al2.2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al2.2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
