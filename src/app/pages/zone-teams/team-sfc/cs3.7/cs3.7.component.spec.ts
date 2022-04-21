import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs3_7Component } from './cs3.7.component';

describe('Cs3_7Component', () => {
  let component: Cs3_7Component;
  let fixture: ComponentFixture<Cs3_7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs3_7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs3_7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
