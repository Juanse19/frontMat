import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_6Component } from './sf1.6.component';

describe('Sf1_6Component', () => {
  let component: Sf1_6Component;
  let fixture: ComponentFixture<Sf1_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
