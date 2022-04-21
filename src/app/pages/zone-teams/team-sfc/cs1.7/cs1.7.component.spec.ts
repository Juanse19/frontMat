import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1_7Component } from './cs1.7.component';

describe('Cs1_7Component', () => {
  let component: Cs1_7Component;
  let fixture: ComponentFixture<Cs1_7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1_7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1_7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
