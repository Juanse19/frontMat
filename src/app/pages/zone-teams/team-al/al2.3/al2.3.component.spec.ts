import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Al2.3Component } from './al2.3.component';

describe('Al2.3Component', () => {
  let component: Al2.3Component;
  let fixture: ComponentFixture<Al2.3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Al2.3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Al2.3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
