import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_7Component } from './sf1.7.component';

describe('Sf1_7Component', () => {
  let component: Sf1_7Component;
  let fixture: ComponentFixture<Sf1_7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
