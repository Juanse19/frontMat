import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sf1_11Component } from './sf1.11.component';

describe('Sf1_11Component', () => {
  let component: Sf1_11Component;
  let fixture: ComponentFixture<Sf1_11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sf1_11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sf1_11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
