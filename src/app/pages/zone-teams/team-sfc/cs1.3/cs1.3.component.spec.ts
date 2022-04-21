import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs1_3Component } from './cs1.3.component';

describe('Cs1.3Component', () => {
  let component: Cs1_3Component;
  let fixture: ComponentFixture<Cs1_3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cs1_3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cs1_3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
