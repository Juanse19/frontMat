import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_18Component } from './cl1.18.component';

describe('Cl1_18Component', () => {
  let component: Cl1_18Component;
  let fixture: ComponentFixture<Cl1_18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
