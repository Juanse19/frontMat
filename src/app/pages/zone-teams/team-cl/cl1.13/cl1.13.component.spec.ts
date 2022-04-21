import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cl1_13Component } from './cl1.13.component';

describe('Cl1_13Component', () => {
  let component: Cl1_13Component;
  let fixture: ComponentFixture<Cl1_13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cl1_13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cl1_13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
