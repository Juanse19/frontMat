import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1_4Component } from './cs1.4.component';

describe('Cs1.4Component', () => {
  let component: Cs1_4Component;
  let fixture: ComponentFixture<Cs1_4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1_4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1_4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
