import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1_6Component } from './cs1.6.component';

describe('Cs1_6Component', () => {
  let component: Cs1_6Component;
  let fixture: ComponentFixture<Cs1_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
