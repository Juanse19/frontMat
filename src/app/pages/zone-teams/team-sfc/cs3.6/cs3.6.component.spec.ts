import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs3_6Component } from './cs3.6.component';

describe('Cs3_6Component', () => {
  let component: Cs3_6Component;
  let fixture: ComponentFixture<Cs3_6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs3_6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs3_6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
